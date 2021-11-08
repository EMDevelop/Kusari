import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/prices/users/', {
        username: username,
        password: password,
      });
      props.storeDetailsInApp(response.data.user.username, response.data.token);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={(e) => handleSignup(e)}>
      <h4>Sign Up</h4>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input type="submit" />
    </form>
  );
}

export default Signup;

Signup.propTypes = {
  handleSignup: PropTypes.func.isRequired,
};
