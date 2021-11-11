import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import {
  faSignInAlt,
  faCoins,
  faSearch,
  faWallet,
  faChartPie,
  faPowerOff,
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

// Credit to: https://codepen.io/JFarrow/pen/fFrpg for the navbar

function Navbar(props) {
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const success = (message) => {
    enqueueSnackbar(message, {
      variant: 'success',
    });
  };

  const handleClick = (e, route) => {
    e.preventDefault();
    navigate(route);
  };

  const [buttonPopup, setButtonPopup] = useState(false);

  const storeLoginCredentials = (token) => {
    token && localStorage.setItem('token', token);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    props.setLogged(false);
    props.setUsername('');
    navigate('/');
    success('Logged out successfully.');
  };

  const logged_out_nav = (
    <>
      <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
        <Login storeDetailsInApp={storeLoginCredentials} />
        <Signup storeDetailsInApp={storeLoginCredentials} />
      </Popup>
      <nav className="main-menu">
        <ul>
          <li>
            <a onClick={(e) => handleClick(e, '/')}>
              <div className="fa-home">
                <FontAwesomeIcon icon={faSearch} />
              </div>
              <span className="nav-text">Lookup Wallet</span>
            </a>
          </li>
        </ul>
        <li>
          <a onClick={() => setButtonPopup(true)}>
            <div className="fa-home">
              <FontAwesomeIcon icon={faSignInAlt} />
            </div>
            <span className="nav-text">Login / Signup</span>
          </a>
        </li>
      </nav>
    </>
  );

  const loggedIn_nav = (
    <nav className="main-menu">
      <ul>
        <li>
          <a onClick={(e) => handleClick(e, '/')}>
            <div className="fa-home">
              <FontAwesomeIcon icon={faSearch} />
            </div>
            <span className="nav-text">Lookup Wallet</span>
          </a>
        </li>
        <li>
          <a onClick={(e) => handleClick(e, '/profile')}>
            <div className="fa-home">
              <FontAwesomeIcon icon={faWallet} />
            </div>
            <span className="nav-text">My Wallets</span>
          </a>
        </li>
        <li>
          <a onClick={(e) => handleClick(e, '/portfolio')}>
            <div className="fa-home">
              <FontAwesomeIcon icon={faChartPie} />
            </div>
            <span className="nav-text">My Portfolio</span>
          </a>
        </li>
      </ul>
      <li>
        <a onClick={(e) => handleClick(e, '/top-coins')}>
          <div className="fa-home">
            <FontAwesomeIcon icon={faCoins} />
          </div>
          <span className="nav-text">Top Coins</span>
        </a>
      </li>
      <ul className="logout">
        <li>
          <a onClick={() => handleLogout()}>
            <div className="fa-home">
              <FontAwesomeIcon icon={faPowerOff} />
            </div>
            <span className="nav-text">Logout</span>
          </a>
        </li>
      </ul>
    </nav>
  );

  return <div>{props.loggedIn ? loggedIn_nav : logged_out_nav}</div>;
}

Navbar.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  handle_logout: PropTypes.func.isRequired,
};

export default Navbar;
