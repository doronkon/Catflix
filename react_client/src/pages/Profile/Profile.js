import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SaveImage from '../components/SaveImage';

const Profile = ({ currentUser, logout }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);  // State to toggle form visibility
    const [displayName, setDisplayName] = useState('');
    const [password, setPassword] = useState('');  // State for password
    const [error, setError] = useState('');
    const [image, setImage] = useState('');

    const navigate = useNavigate(); // Initialize navigate hook

    useEffect(() => {
        if (currentUser) {
            const fetchUserDetail = async () => {
                try {
                    const response = await fetch(`http://localhost:8080/api/users/${currentUser}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            user: localStorage.getItem('Token'),
                        },
                    });

                    if (!response.ok) {
                        if (response.status === 403) {
                            logout();
                            return
                        }
                        throw new Error('Failed to fetch user details');
                    }

                    const data = await response.json();
                    setUser(data);
                    setDisplayName(data.displayName);
                } catch (error) {
                    console.error(error);
                    setError(error.message || 'An error occurred while fetching user details.');
                }
            };

            fetchUserDetail();
        }
    }, [currentUser]);

    // Function to update user details
    const updateUserDetails = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/users/${currentUser}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    user: localStorage.getItem('Token'),
                },
                body: JSON.stringify({
                    displayName: displayName,
                    password: password,
                    image: image,
                }),
            });

            if (!response.ok) {
                if (response.status === 403) {
                    logout();
                    return
                }
                throw new Error('Failed to update user details');
            }

            const data = await response.json();
            setUser(data); // Update state with the new user data
            setDisplayName(data.displayName); // Update displayName state
            setPassword(''); // Clear the password field after update
            setIsEditing(false); // Close the form after submitting
            setError('');
            navigate('/'); // Redirect to the home screen
        } catch (error) {
            console.error(error);
            setError('Password should have: one Upper case letter, one lower case letter, one digit and a special char - @$!%*?& and length 8 or more ');
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        updateUserDetails();
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    let realProfileImage = user.image;
    if (realProfileImage?.[0] === '.') {
        realProfileImage = realProfileImage.substring(realProfileImage.lastIndexOf('/') + 1);
    }

    return (
        <div>
            <h1>Hi there {user.displayName}!</h1>
            <img
                src={`http://localhost:8080/media/userLogos/${realProfileImage}`}
                alt={user.image}
                className="profile-image"
                style={{ width: '150px', height: '150px' }} // Example size
            />

            {/* Button to toggle the form */}
            <button onClick={() => setIsEditing(!isEditing)}>
                {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>

            {/* Form to update user details */}
            {isEditing && (
                <form onSubmit={handleFormSubmit}>
                    <div>
                        <label className="signup-fields" >Display Name: </label>
                        <input
                            type="text"
                            id="displayName"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            placeholder="Enter your name"
                            required
                        />
                    </div>
                    <div>
                        <label className="signup-fields">Password: </label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                        />
                        <button
                            type="button"
                            onClick={() => {
                                setShowPassword((prevShowPassword) => !prevShowPassword);
                            }}
                        >
                            {showPassword ? '🙈' : '👁️'} {/* Replace with an icon library if desired */}
                        </button>
                    </div>

                    <div>
                        <label className="signup-fields">Image: </label>
                        {<SaveImage setImage={setImage} />}
                    </div>
                    <button type="submit">Save Changes</button>
                </form>
            )}

            {/* Display error message if any */}
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        </div>
    );
};

export default Profile;
