import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../../context/globalContext';

function Login(props) {
  const { setUserID, setUsername, username, setLoggedIn } =
    useContext(GlobalContext);

  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/token-auth/', {
        username: username,
        password: password,
      });
      props.storeDetailsInApp(response.data.user.username, response.data.token);
      setUserID(response.data.user_id);
      setUsername(response.data.user.username);
      setLoggedIn(true);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={(e) => handleLogin(e)}>
      <h4>Log In</h4>
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

export default Login;

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired,
};
