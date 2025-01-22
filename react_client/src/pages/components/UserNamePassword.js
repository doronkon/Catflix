import React, { useState } from 'react';
import '../SignUp/SignUp.css';
import './UserNamePassword.css'



const UserNamePassword = ({ user, password, setUser, setPassword }) => {
  const [showPassword, setShowPassword] = useState(false);


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
      <div className="password-container">
        <label class='text'>Password:</label>
        <input
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
                <button
          type="button" class="show-password" id='reveal-password'
          onClick={() => {
            setShowPassword((prevShowPassword) => !prevShowPassword);
          }}
        >
          {showPassword ? '🙈' : '👁️'} {/* Replace with an icon library if desired */}
        </button>
      </div>
    </div>
  );
};

export default UserNamePassword;