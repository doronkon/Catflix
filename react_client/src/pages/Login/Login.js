import React, { useState } from 'react';

const Login = () => {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setError] = useState('');
    const [currentToken, setToken] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent form default submission
        setLoading(true); // Show loading state
        setError('');


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
            console.log('response:', data);
            

            // Additional logic after successful login can be added here
        } catch (error) {
            throw new Error("Server not running!")
        } finally {
            setLoading(false); // Reset loading state
        }
    };
    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>UserName:</label>
                    <input
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            {errorMessage && <p style={{ color: 'red' }}>Error: {errorMessage}</p>}
        </div>

    );
};



export default Login;
