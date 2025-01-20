import { Link } from 'react-router-dom'; 
import './NavBar.css';
import '../Search/Search'

function NavBar({ isAdmin, logout}) {
    
    return (
        <header>
            <div className="bar-container">
                <nav>
                <button onClick={logout}>logout</button>
                    <div id="nav-logo">
                        <a href="/">
                            <img src="/assets/img/catflix-logo.png" alt="logo" />
                        </a>
                    </div>
                    <Link to="/">Home</Link>
                    <Link to="/profile">Profile</Link>
                    {!isAdmin && <Link to ="/Admin">Admin</Link>}
                    <Link to="/search">Search</Link>

                </nav>
            </div>
        </header>
    );
}

export default NavBar;
