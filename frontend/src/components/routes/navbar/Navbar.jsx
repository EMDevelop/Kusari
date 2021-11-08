import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import {
  faSignInAlt,
  faHome,
  faUserCircle,
  faSearch,
  faWallet,
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

// Credit to: https://codepen.io/JFarrow/pen/fFrpg for the navbar

function Navbar(props) {
  const navigate = useNavigate();

  const handleClick = (e, route) => {
    e.preventDefault();
    navigate(route);
  };

  const logged_out_nav = (
    <nav className="main-menu">
      <ul>
        <li>
          <a onClick={(e) => handleClick(e, '/')}>
            <div className="fa-home">
              <FontAwesomeIcon icon={faHome} />
            </div>
            <span className="nav-text">Dashboard</span>
          </a>
        </li>
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
        <a onClick={(e) => handleClick(e, '/login-signup')}>
          <div className="fa-home">
            <FontAwesomeIcon icon={faSignInAlt} />
          </div>
          <span className="nav-text">Login / Signup</span>
        </a>
      </li>
    </nav>
  );

  const loggedIn_nav = (
    <nav className="main-menu">
      <ul>
        <li>
          <a onClick={(e) => handleClick(e, '/')}>
            <div className="fa-home">
              <FontAwesomeIcon icon={faHome} />
            </div>
            <span className="nav-text">Dashboard</span>
          </a>
        </li>
        <li>
          <a onClick={(e) => handleClick(e, '/profile')}>
            <div className="fa-home">
              <FontAwesomeIcon icon={faUserCircle} />
            </div>
            <span className="nav-text">My Profile</span>
          </a>
        </li>
        <li>
          <a onClick={(e) => handleClick(e, '/')}>
            <div className="fa-home">
              <FontAwesomeIcon icon={faWallet} />
            </div>
            <span className="nav-text">My Portfolio</span>
          </a>
        </li>
        <li>
          <a onClick={(e) => handleClick(e, '/')}>
            <div className="fa-home">
              <FontAwesomeIcon icon={faSearch} />
            </div>
            <span className="nav-text">Lookup Wallet</span>
          </a>
        </li>
      </ul>
      <ul className="logout">
        <li onClick={props.handleLogout}>
          <a href="#">
            <i className="fa fa-power-off fa-2x"></i>
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
