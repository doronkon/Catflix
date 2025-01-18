import { Link } from 'react-router-dom'; // Import Link from React Router
import './NavBar.css';

function NavBar() {

    return (
        <header>
            <img className="logo" src="http://localhost:8080/media/userLogos/Catflix.jpg" alt="Catflix Logo" />
            <nav>
                <Link to="/">Home</Link>
                <Link to="/profile">Profile</Link>
                <Link to="/search">Search</Link>
                {<Link to="/UploadMovie">Upload just test all hard coded</Link>}

            </nav>
        </header>
    );
}

export default NavBar;
