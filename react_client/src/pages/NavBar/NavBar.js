import { Link } from 'react-router-dom'; // Import Link from React Router
import './NavBar.css';

function NavBar({isAdmin,logout}) {

    return (
        <header>
            <img className="logo" src="http://localhost:8080/media/userLogos/Catflix.jpg" alt="Catflix Logo" />
            <nav>
                <button onClick={logout}>logout</button>
                <Link to="/">Home</Link>
                <Link to="/profile">Profile</Link>
                <Link to="/search">Search</Link>
                {!isAdmin && <Link to ="/Admin">Admin</Link>}
            </nav>
        </header>
    );
}

export default NavBar;
