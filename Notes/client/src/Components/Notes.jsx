import React, { useEffect, useState } from 'react';
import { useNotes } from '../Components/DataContext'; // Import the custom hook

function Notes() {
  // Access the notes data, loading, and error from context
  const { notesData, loading, error, fetchData } = useNotes();
  
  // State to manage editing a note
  const [editNote, setEditNote] = useState({
    title: '',
    desc: ''
  });

  const [editingId, setEditingId] = useState(null); // To track the note being edited

  useEffect(() => {
    if (notesData.length === 0) {
      fetchData(); // Fetch the data only if it's not already fetched
    }
  }, [notesData, fetchData]);

  // Handle Delete
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/api/DeleteNotes/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      console.log(data); // Optionally handle success or update UI after deletion
    } catch (error) {
      console.error(error);
    }
  };

  // Handle Edit (When clicking "Edit" button)
  const handleEdit = (id, title, desc) => {
    setEditNote({ title, desc }); // Set the note data to be edited in the state
    setEditingId(id); // Set the id of the note being edited
  };

  // Submit the Edit (Send the PUT request)
  const handleSubmitEdit = async (e) => {
    e.preventDefault(); // Prevent page reload on form submit

    try {
      const response = await fetch(`http://localhost:4000/api/EditNotes/${editingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editNote), // Send the updated note data
      });
      const data = await response.json();
      console.log(data); // Optionally handle success or update UI after edit
      setEditingId(null); // Reset the editing state
      fetchData(); // Fetch data again to reflect the changes
    } catch (error) {
      console.error(error);
    }
  };

  // Handle loading and error states
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container">
      {/* Edit Modal */}
      {editingId && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Edit Note</h2>
            <form onSubmit={handleSubmitEdit}>
              <div>
                <label htmlFor="title">Title:</label>
                <input
                  type="text"
                  id="title"
                  value={editNote.title}
                  onChange={(e) => setEditNote({ ...editNote, title: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="desc">Description:</label>
                <textarea
                  id="desc"
                  value={editNote.desc}
                  onChange={(e) => setEditNote({ ...editNote, desc: e.target.value })}
                />
              </div>
              <button type="submit">Save</button>
              <button type="button" onClick={() => setEditingId(null)}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Notes Table */}
      <table>
        <thead>
          <tr>
            <th>Sr No</th>
            <th>Title</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* Map through NotesData and render each note */}
          {notesData.map((item, index) => (
            <tr key={item._id}>
              <td>{index + 1}</td> {/* Display index + 1 for Sr No */}
              <td>{item.title}</td> {/* Replace 'item.title' with the actual field name */}
              <td>{item.desc}</td> {/* Replace 'item.description' with the actual field name */}
              <td>
                <button
                  className="btn btn-primary btn1"
                  onClick={() => handleEdit(item._id, item.title, item.desc)} // Pass note data to edit
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(item._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Notes;
