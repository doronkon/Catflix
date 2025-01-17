import React, { useState } from 'react';
import UserNamePassword from '../components/UserNamePassword'; // Import the new component
import SaveImage from '../components/SaveImage'; // Import the new component
import './SignUp.css';

const SignUp = () => {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [dispalyName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent form default submission
        setError('');
        if (password !== confirmPassword) {
            setError("Confirm password must equal password");
            return;
        }
        setLoading(true); // Show loading state

        try {
            const response = await fetch('http://localhost:8080/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the correct content type header
                },
                body: JSON.stringify({
                    displayName: dispalyName,
                    name: user, // Add user data
                    password: password, // Add password data
                    image: image,
                }),
            });
            console.log({ user }, { password });

            if (!response.ok) {
                const errorResponse = await response.json(); // Parse error details from response
                console.log(errorResponse.errors);
                setError(errorResponse.errors);
                return;
            }

            const data = await response.json();
            console.log(data);

            // Additional logic after successful login can be added here
        } catch (error) {
            throw new Error("Server not running!");
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
    <div className="signup-container">
        <div class='background'></div>
         <nav>
            <div id="signup-logo">
                <a href="/">
                    <img src="/assets/img/catflix-logo.png" alt="logo" />
                </a>
            </div>
        </nav>
        <div className='signup-info'>
            <div>
                <form onSubmit={handleSubmit}>
                    <UserNamePassword
                        user={user}
                        password={password}
                        setUser={setUser}
                        setPassword={setPassword}
                    />
                    <div>
                        <label class='text'>Confirm Password:</label>
                        <input className='signup-fields'
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label class='text'>Display Name: </label>
                        <input className='signup-fields'
                            value={dispalyName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label class='text'>Email:</label>
                        <input className='signup-fields'
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className='signup-fields' class='text'>Image: </label>
                        <SaveImage setImage={setImage} />
                    </div>

                    <button type="submit">Sign Up</button>
                </form>
                {errorMessage && <p style={{ color: 'red' }}>Error: {errorMessage}</p>}
            </div>
        <div>
            </div>
        </div>
    </div>
    );
};

export default SignUp;