import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../../context/globalContext';
import { useSnackbar } from 'notistack';

function Login(props) {
  const { setUserID, setLoggedInUserName, setLoggedIn } =
    useContext(GlobalContext);

  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/token-auth/', {
        username: username,
        password: password,
      });
      props.storeDetailsInApp(response.data.token);
      console.log(response.data);
      setUserID(response.data.user_id);
      setLoggedInUserName(response.data.user.username);
      setUsername(response.data.user.username);
      setLoggedIn(true);
      navigate('/');
      success(`Welcome Back To Kusari ${response.data.user.username}!`);
    } catch (error) {
      console.log(error);
    }
  };

  const { enqueueSnackbar } = useSnackbar();

  const success = (message) => {
    enqueueSnackbar(message, {
      variant: 'success',
    });
  };

  const fail = (message) => {
    enqueueSnackbar(message, {
      variant: 'error',
    });
  };
  const info = (message) => {
    enqueueSnackbar(message, {
      variant: 'info',
    });
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
