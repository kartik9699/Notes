import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const [Login, setLogin] = useState({
        email: "",
        password: "",
    });

    const onChange = (e) => {
        setLogin({ ...Login, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:4000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(Login),
            });

            const data = await response.json(); // Await the response.json() to get the data

            if (response.ok) {
                // Handle successful login
                console.log('Login successful:', data);
                // Store the token in localStorage or state
                localStorage.setItem('token', data.token);
                localStorage.setItem('id', data.id);
                navigate('/');  // Redirect to the home page or dashboard
            } else {
                // Handle error message from server
                console.log('Login failed:', data.message);
                alert(data.message);  // Show an alert with the error message
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('An error occurred while logging in.');
        }
    };

    return (
        <div>
            <div className="login">
                <h2>Login</h2>
                <form onSubmit={onSubmit}>  {/* Attach onSubmit to the form element */}
                    <label htmlFor="email">Email:</label><br />
                    <input
                        type="email"
                        id="email"
                        name="email"
                        onChange={onChange}
                        value={Login.email}
                        required
                    /><br />
                    <label htmlFor="password">Password:</label><br />
                    <input
                        type="password"
                        id="password"
                        name="password"
                        onChange={onChange}
                        value={Login.password}
                        required
                    /><br />
                    <hr />
                    <input type="submit" className="btn btn-primary" value="Login" />
                </form>
            </div>
        </div>
    );
}

export default Login;
