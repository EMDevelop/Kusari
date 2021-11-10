import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../../context/globalContext';
import { useSnackbar } from 'notistack';

function Signup(props) {
  const { setUserID, setLoggedInUserName, setLoggedIn } =
    useContext(GlobalContext);
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
      props.storeDetailsInApp(response.data.token);
      success('Account Created');
    } catch (error) {
      console.log(error);
    }
    handleLogin(e);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    // axios post request to url with body as data
    try {
      const response = await axios.post('/token-auth/', {
        username: username,
        password: password,
      });
      props.storeDetailsInApp(response.data.token);
      setUserID(response.data.user_id);
      setUsername(response.data.user.username);
      setLoggedIn(true);
      navigate('/');
      success(`Welcome To Kusari ${response.data.user.username}!`);
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
