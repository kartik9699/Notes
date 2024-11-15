import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const signUp = () => {
    navigate("/signUp");
  }
  const Login = () => {
    navigate("/login");
  }
  const Logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
  }

  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");

  const [Notes, setNotes] = useState({
    title: "",
    description: "",
    UserId: id
  });

  const onchange = (e) => {
    setNotes({ ...Notes, [e.target.name]: e.target.value });
  }

  const submit = async (e) => { 
    

    try {
      const response = await fetch('http://localhost:4000/api/addnotes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(Notes)
      });

      const data = await response.json();
      alert(data.message);

      // Optionally reset the form and close the modal
      if (data.success) {
        setNotes({ title: "", description: "", UserId: id }); // Reset form
        // Close the modal manually after successful submission
        const modalCloseButton = document.querySelector('.btn-close');
        modalCloseButton.click(); // This will close the modal programmatically
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <nav>
        <div className="Tags">
          Notes
        </div>
        {token === null ? (
          <ul>
            <li>
              <button className="btn btn-primary" onClick={signUp}>Sign Up</button>
            </li>
            <li>
              <button className="btn btn-primary" onClick={Login}>Login</button>
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <button className="btn btn-primary" onClick={Logout}>Logout</button>
            </li>
            <li>
              <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Add Notes <i className="fa-solid fa-plus"></i></button>
            </li>
          </ul>
        )}
      </nav>

      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">ADD NOTES</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body d-flex justify-content-center">
              <form onSubmit={submit}>
                <div>
                  <label htmlFor="title">Title:</label>
                  <input type="text" name="title" id="title" onChange={onchange} value={Notes.title} required />
                </div>
                <div>
                  <label htmlFor="description">Description:</label><br />
                  <textarea name="description" id="description" cols="50" rows="10" onChange={onchange} value={Notes.description} required></textarea>
                </div>
                <hr />
                <input type="submit" className="btn btn-primary" value="Add Notes" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar;
