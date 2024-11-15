import React, { createContext, useState, useEffect, useContext } from 'react';

// Create the context with a default empty array
const NotesContext = createContext();

// Provider component that will supply the data
export const NotesProvider = ({ children }) => {
  const [notesData, setNotesData] = useState([]);
  const [loading, setLoading] = useState(true); // Optionally handle loading state
  const [error, setError] = useState(null); // Optionally handle errors
  const [user,setuser]=useState([]);
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/fetchData', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category: 'All' }),
      });
      const data = await response.json();
      setNotesData(data[0]); // Assuming the first element is the notes data
      setuser(data[1]);
    } catch (err) {
      setError('Error fetching data');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false); // Once the fetch is done, stop the loading state
    }
  };

  useEffect(() => {
    fetchData();
  }, [notesData,user]); // Empty dependency array ensures this runs once when the component mounts

  return (
    <NotesContext.Provider value={{ notesData, loading, error, fetchData,user }}>
      {children}
    </NotesContext.Provider>
  );
};

// Custom hook to use Notes context
export const useNotes = () => useContext(NotesContext);
