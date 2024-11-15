import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation after successful signup

function SignUp() {
  const navigate = useNavigate(); // For redirecting after successful signup
  const [SignUp, setSignUp] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState(''); // For handling error messages
  const [loading, setLoading] = useState(false); // To handle loading state

  // Handle changes to form fields
  const onChange = (e) => {
    setSignUp({ ...SignUp, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Simple client-side validation
    if (!SignUp.email || !SignUp.username || !SignUp.password) {
      setError('All fields are required!');
      return;
    }

    // Password validation (example: at least 6 characters)
    if (SignUp.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true); // Start loading

    try {
      // Send POST request to server
      const response = await fetch('http://localhost:4000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Sending JSON data
        },
        body: JSON.stringify(SignUp), // Sending form data as JSON
      });

      const result = await response.json(); // Parse JSON response

      if (response.ok) {
        console.log('Signup successful:', result);
        // Redirect to login page or show success message
        navigate('/login');
      } else {
        setError(result.message || 'Signup failed. Please try again.');
        console.error('Signup failed:', result);
      }
    } catch (error) {
      setError('Error during signup. Please try again.');
      console.error('Error during signup:', error);
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div>
      <div className="signup">
        <h2>Sign Up</h2>
        
        {error && <div className="error-message">{error}</div>} {/* Display error message */}

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username:</label><br />
            <input
              type="text"
              id="username"
              name="username"
              onChange={onChange}
              value={SignUp.username}
              required
            /><br />
          </div>

          <div>
            <label htmlFor="email">Email:</label><br />
            <input
              type="email"
              id="email"
              name="email"
              onChange={onChange}
              value={SignUp.email}
              required
            /><br />
          </div>

          <div>
            <label htmlFor="password">Password:</label><br />
            <input
              type="password"
              id="password"
              name="password"
              onChange={onChange}
              value={SignUp.password}
              required
            /><br />
          </div>

          <hr />
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Signing Up...' : 'Sign Up'} {/* Display loading state */}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
