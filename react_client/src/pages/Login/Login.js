import React, { useState } from 'react';
import UserNamePassword from '../components/UserNamePassword';  // Import the new component
import { useNavigate } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import './Login.css';



const Login = ({setIsAdmin,setCurrentUser}) => {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setError] = useState('');
    const [currentToken, setToken] = useState('');
    const [isAdmin, setAdmin] = useState(false);
    const navigate = useNavigate(); // Hook for navigation



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
                },
                body : JSON.stringify({user,password})
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
            localStorage.setItem('Token',data.token)
            setIsAdmin(data.admin)
            setCurrentUser(data.id)
            console.log(data)
            navigate('/');


            // Additional logic after successful login can be added here
        } catch (error) {
            throw new Error("Server not running!")
        } finally {
            setLoading(false); // Reset loading state
        }
    };
    if (loading) return <p>Loading...</p>;

    return (
        <div className="login-container">
            <div className="background"></div> {/* Add background div */}
                <div class='input-container'>
                    <form onSubmit={handleSubmit}>
                        <UserNamePassword
                            user={user}
                            password={password}
                            setUser={setUser}
                            setPassword={setPassword}
                            />
                            <div class='buttons-container'>
                                <button type="submit">Login</button>
                                <button type='button' onClick={()=>{navigate('/');}}>SignUp</button>
                            </div>
                    </form>
                </div>
            {errorMessage && <p style={{ color: 'red' }}>Error: {errorMessage}</p>}
        </div>
    );
};



export default Login;
