import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSignInAlt,
  faHome,
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons';

// Credit to: https://codepen.io/JFarrow/pen/fFrpg for the navbar

export default function Navbar() {
  return (
    <nav className="main-menu">
      <ul>
        <li>
          <a href="/">
            <div className="fa-home">
              <FontAwesomeIcon icon={faHome} />
            </div>
            <span className="nav-text">Dashboard</span>
          </a>
        </li>
        <li>
          <a href="/">
            <div className="fa-home">
              <FontAwesomeIcon icon={faSignInAlt} />
            </div>
            <span className="nav-text">Signup/Signin</span>
          </a>
        </li>
        <li>
          <a href="/">
            <div className="fa-home">
              <FontAwesomeIcon icon={faUserCircle} />
            </div>
            <span className="nav-text">Profile</span>
          </a>
        </li>
      </ul>

      <ul className="logout">
        <li>
          <a href="#">
            <i className="fa fa-power-off fa-2x"></i>
            <span className="nav-text">Logout</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}
