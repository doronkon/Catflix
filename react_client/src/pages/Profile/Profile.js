import { useState, useEffect } from 'react';

const Profile = ({currentUser}) => {

    const [user, setUser] = useState(null);

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
                        throw new Error('Failed to fetch user details');
                    }

                    const data = await response.json();
                    setUser(data);
                } catch (error) {
                    console.error(error);
                }
            };

            fetchUserDetail();
        }
    }, [currentUser]);

    if (!user) {
        return <div>Loading...</div>;
    }

    let realProfileImage = user.image;
    if (realProfileImage?.[0] === '.') {
        realProfileImage = realProfileImage.substring(realProfileImage.lastIndexOf('/') + 1);
    }

    return (
        <div>
            <h1>Hi there {user.name}!</h1>
            <img src={`http://localhost:8080/media/userLogos/${realProfileImage}`} alt={user.image} />
        </div>
    );
};

export default Profile;
