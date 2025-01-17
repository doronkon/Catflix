import React, { useState } from 'react';
import UserNamePassword from '../components/UserNamePassword';  // Import the new component
import './Login.css'

const Login = () => {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setError] = useState('');
    const [currentToken, setToken] = useState('');
    const [isAdmin, setAdmin] = useState(false);



    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent form default submission
        setLoading(true); // Show loading state
        setError('');
        setAdmin(false)
        setToken('')


        try {
            const response = await fetch('http://localhost:8080/api/tokens', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    user: user, // Add user as a header
                    password: password, // Add password as a header
                },
            });
            console.log({ user }, { password })

            if (!response.ok) {
                const errorResponse = await response.json(); // Parse error details from response
                console.log(errorResponse.errors)
                setError(errorResponse.errors);
                return;
            }

            const data = await response.json();
            setToken(data.token)
            setAdmin(data.admin)


            // Additional logic after successful login can be added here
        } catch (error) {
            throw new Error("Server not running!")
        } finally {
            setLoading(false); // Reset loading state
        }
    };
    if (loading) return <p>Loading...</p>;

    return (
        <div class='login-container'>
            <form onSubmit={handleSubmit}>
            <UserNamePassword
                    user={user}
                    password={password}
                    setUser={setUser}
                    setPassword={setPassword}
                />
                <button type="submit">Login</button>
            </form>
            {errorMessage && <p style={{ color: 'red' }}>Error: {errorMessage}</p>}
            {isAdmin && <div>hi admin :X , token: {currentToken}</div>}
            {currentToken && !isAdmin && <div>hi user   {currentToken}</div>}



        </div>

    );
};



export default Login;
