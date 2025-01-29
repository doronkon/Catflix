import React, { useState } from 'react';
import UserNamePassword from '../components/UserNamePassword';  // Import the new component
import SaveImage from '../components/SaveImage';  // Import the new component
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';



const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [dispalyName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setError] = useState('');
    const navigate = useNavigate(); // Hook for navigation
    


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
            navigate('/login')

            // Additional logic after successful login can be added here
        } catch (error) {
            throw new Error("Server not running!");
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    if (loading) return <Loading/>;

    return (
        <div>
            <head>
                <link rel="icon" href="/assets/img/catflix-logo.png" type="image/x-icon" />
                <title>Catflix</title>
            </head>

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
                    <label class='text'>Confirm Password:</label>
                    <div className="password-container">
                        <input
                            className="signup-fields"
                            type={showPassword ? 'text' : 'password'}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            />
                        <button
                            type="button"
                            className="show-password"
                            id='show-confirm-password'
                            onClick={() => {
                                setShowPassword((prevShowPassword) => !prevShowPassword);
                            }}
                            >
                            {showPassword ? '🙈' : '👁️'}
                        </button>
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
                    <div class='buttons-container'>

                    <button id='login' type='button' onClick={()=>{navigate('/login');}}>Login</button>

                    <button id='signup' type="submit">Sign Up</button>
                    </div>
                </form>
                {errorMessage && <p style={{ color: 'red' }}>Error: {errorMessage}</p>}
            </div>
        <div>
            </div>
        </div>
    </div>
                             </div>
    );
};

export default SignUp;