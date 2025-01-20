import NavBar from "../NavBar/NavBar";
import { Link } from 'react-router-dom'; // Import Link from React Router
import './AdminTerminal.css'; // Import the CSS file for styling

function AdminTerminal({logout,isAdmin}) {
    return (
        <div className="admin-terminal">
            <NavBar isAdmin={isAdmin} logout={logout}/>
            <div className="admin-content">
                <h1>Admin Terminal</h1>
                <p>Welcome to the admin dashboard. Manage your categories and movies easily using the links below.</p>
                <div className="admin-links">
                    <Link to="/UploadMovie" className="admin-link">
                        📽️ Upload Movie
                    </Link>
                    <Link to="/UploadCategory" className="admin-link">
                        🗂️ Upload Category
                    </Link>
                    <Link to="/UpdateCategory" className="admin-link">
                         Update Category
                    </Link>
                    <Link to="/deleteCategory" className="admin-link">
                        ❌ Delete Category
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default AdminTerminal;
