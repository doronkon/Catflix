import React, { useState,useEffect } from 'react';
import UserNamePassword from '../components/UserNamePassword';  // Import the new component
import SaveImage from '../components/SaveImage';  // Import the new component



const SignUp = () => {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [dispalyName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState('');



    const [loading, setLoading] = useState(false);
    const [errorMessage, setError] = useState('');

    useEffect(()=>{
        console.log(image)
    },[image])

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent form default submission
        setLoading(true); // Show loading state
        setError('');


        try {
            const response = await fetch('http://localhost:8080/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',  // Set the correct content type header
                  },
                  body: JSON.stringify({ 
                    displayName : dispalyName,
                    name: user,  // Add user data
                    password: password,  // Add password data
                    image
                  }),
            });
            console.log({ user }, { password })

            if (!response.ok) {
                const errorResponse = await response.json(); // Parse error details from response
                console.log(errorResponse.errors)
                setError(errorResponse.errors);
                return;
            }

            const data = await response.json();
            console.log(data)


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
                <UserNamePassword
                    user={user}
                    password={password}
                    setUser={setUser}
                    setPassword={setPassword}/>
                <div>
                    <label>Confirm Password:</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Display Name:</label>
                    <input
                        value={dispalyName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>image:</label>
                    <SaveImage setImage ={setImage}/>
                </div>

                <button type="submit">Login</button>
            </form>
            {errorMessage && <p style={{ color: 'red' }}>Error: {errorMessage}</p>}

        </div>

    );
};



export default SignUp;
