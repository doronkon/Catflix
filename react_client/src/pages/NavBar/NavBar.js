import './NavBar.css'

function NavBar() {
    return (
      <header>
        <img className="logo" src="http://localhost:8080/media/userLogos/Catflix.jpg" alt="Catflix Logo" />
        <nav>
          <a href="/">Home</a>
          <a href="/profile">Profile</a>
          <a href="/search">Search</a>
        </nav>
      </header>
    );
  }
export default NavBar;  