import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SaveImage from '../components/SaveImage';
import './Profile.css';
import NavBar from '../NavBar/NavBar';
import Loading from '../components/Loading';

const Profile = ({ currentUser, logout,isAdmin }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false); // State to toggle input visibility
    const [displayName, setDisplayName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [image, setImage] = useState('');

    const navigate = useNavigate();

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
                            return;
                        }
                        throw new Error('Failed to fetch user details');
                    }

                    const data = await response.json();
                    setUser(data);
                    setDisplayName(data.displayName);
                } catch (error) {
                    setError(error.message || 'An error occurred while fetching user details.');
                }
            };

            fetchUserDetail();
        }
    }, [currentUser]);

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
                    return;
                }
                throw new Error('Failed to update user details');
            }

            const data = await response.json();
            setUser(data);
            setDisplayName(data.displayName);
            setPassword('');
            setIsEditing(false);
            setError('');
            navigate('/');
        } catch (error) {
            setError('Password should have: one uppercase letter, one lowercase letter, one digit, one special character @$!%*?&, and a length of 8 or more.');
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        updateUserDetails();
    };

    if (!user) return <Loading/>;

    let realProfileImage = user.image;
    if (realProfileImage?.[0] === '.') {
        realProfileImage = realProfileImage.substring(realProfileImage.lastIndexOf('/') + 1);
    }

    return (
        <div>
            <div class='nav'>
                <NavBar currentUser={currentUser} isAdmin={isAdmin} logout={logout} />
            </div>
            <div className="profile-container">
                <div className="profile-background" />
                <h1 className="profile-welcome">Hey {user.displayName}!</h1>
                <img
                    src={`http://localhost:8080/media/userLogos/${realProfileImage}`}
                    alt={user.image}
                    className="profile-image"
                />
                <button id='cancel-button'
                    className="profile-edit-button"
                    onClick={() => setIsEditing(!isEditing)}
                >
                    {isEditing ? 'Cancel' : 'Edit Profile'}
                </button>
                {isEditing && (
                    <form className="profile-form" onSubmit={handleFormSubmit}>
                        <div className="input-group">
                            <label htmlFor="displayName">Display Name:</label>
                            <input
                                type="text"
                                id="displayName"
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}
                                placeholder="Enter your name"
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="password">Password:</label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                            />
                            <button
                                type="button"
                                className="show-password"
                                id='show-password-profile'
                                onClick={() => setShowPassword((prev) => !prev)}
                            >
                                {showPassword ? '🙈' : '👁️'}
                            </button>
                        </div>
                        <div className="input-group">
                            <label htmlFor="image">Profile Image:</label>
                            <SaveImage setImage={setImage} />
                        </div>
                        <button type="submit" className="profile-save-button">
                            Save Changes
                        </button>
                    </form>
                )}
                {error && <p className="profile-error">{error}</p>}
            </div>
        </div>
    );
};

export default Profile;