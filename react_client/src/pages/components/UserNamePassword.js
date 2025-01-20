import React from 'react';
import '../SignUp/SignUp.css';



const UserNamePassword = ({ user, password, setUser, setPassword }) => {
  return (
    <div>
      <div>
        <label class='text'>UserName:</label>
        <input
          value={user}
          onChange={(e) => setUser(e.target.value)}
          required
        />
      </div>
      <div>
        <label class='text'>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
    </div>
  );
};

export default UserNamePassword;