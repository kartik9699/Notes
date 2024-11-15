import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import Notes from '../Components/Notes';
import { useNotes } from '../Components/DataContext'; // Assuming this is the correct import

function Home() {
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const { user, fetchData } = useNotes(); // Getting user and fetchData from context
  const id = localStorage.getItem('id'); // Correct way to get data from localStorage
  
  // Fetch data if the user exists and is not empty
  useEffect(() => {
    if (user && user.length === 0) {
      fetchData(); // Fetch the data only if the user array is empty
    }
  }, [user, fetchData]); // Ensure this runs when user data changes

  // Function to update time and date
  const updateTime = () => {
    const now = new Date();

    // Format the time as HH:MM:SS
    const hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const timeStr = `${hours}:${minutes}:${seconds}`;

    // Format the date as Month Day, Year
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const day = now.getDate();
    const month = monthNames[now.getMonth()];
    const year = now.getFullYear();
    const dateStr = `${month} ${day}, ${year}`;

    // Update state with the new time and date
    setTime(timeStr);
    setDate(dateStr);
  };

  // Use useEffect to update the time every second
  useEffect(() => {
    updateTime(); // Initial update when the component mounts

    const intervalId = setInterval(updateTime, 1000); // Update time every second

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <Navbar />
      <div className="box">
        <div className="time">
          <p>{date}</p>
          <p>{time}</p>
        </div>
        <div className="Welcome">
          {/* Dynamically show the user's name if available */}
          {user && id && user.length > 0 && user.filter(item => item._id === id).map(item => (
            <div key={item._id}>
              <h1>Welcome, {item.name}</h1>
            </div>
          ))}
        </div>
      </div>
      <Notes />
    </div>
  );
}

export default Home;
