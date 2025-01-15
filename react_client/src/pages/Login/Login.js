import React, { useState , useEffect} from 'react';

const Login = () => {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('Login:', { user, password });
      // Add logic to send data to the server
        useEffect(() => {
          const fetchMovies = async () => {
            try {
              const response = await fetch('http://localhost:8080/api/tokens', {
                method: 'GET',
                body: {
                  'user': {user},
                  'password' : {password},
                  'Content-Type': 'application/json',
                },
              });
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              console.log("welcome: ",{user});
      
            } catch (error) {
              setError(error);
            } finally {
              setLoading(false);
            }
          };
      
          fetchMovies();
        }, []);
    };

    return (
        <form onSubmit={handleSubmit}>
        <div>
          <label>UserName:</label>
          <input
            value={user}
            onChange={(e) => setUser(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      );
};



export default Login;
