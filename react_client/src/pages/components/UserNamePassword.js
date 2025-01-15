import React from 'react';

const UserNamePassword = ({ user, password, setUser, setPassword }) => {
  return (
    <div>
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
    </div>
  );
};

export default UserNamePassword;