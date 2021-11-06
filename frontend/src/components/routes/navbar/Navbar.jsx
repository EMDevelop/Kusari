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

// Credit to: https://codepen.io/JFarrow/pen/fFrpg for the navbar

function Nav(props) {
  const logged_out_nav = (
    <ul>
      <li onClick={() => props.display_form('login')}>login</li>
      <li onClick={() => props.display_form('signup')}>signup</li>
    </ul>
  );

  const logged_in_nav = (
    <ul>
      <li onClick={props.handle_logout}>logout</li>
    </ul>
  );
  return <div>{props.logged_in ? logged_in_nav : logged_out_nav}</div>;
}

export default Nav;

Nav.propTypes = {
  logged_in: PropTypes.bool.isRequired,
  display_form: PropTypes.func.isRequired,
  handle_logout: PropTypes.func.isRequired,
};

// export default function Navbar() {
//   return (
//     <nav className="main-menu">
//       <ul>
//         <li>
//           <a href="/">
//             <div className="fa-home">
//               <FontAwesomeIcon icon={faHome} />
//             </div>
//             <span className="nav-text">Dashboard</span>
//           </a>
//         </li>

//         <li>
//           <a href="/profile">
//             <div className="fa-home">
//               <FontAwesomeIcon icon={faUserCircle} />
//             </div>
//             <span className="nav-text">My Profile</span>
//           </a>
//         </li>
//         <li>
//           <a href="/">
//             <div className="fa-home">
//               <FontAwesomeIcon icon={faWallet} />
//             </div>
//             <span className="nav-text">My Portfolio</span>
//           </a>
//         </li>
//         <li>
//           <a href="/">
//             <div className="fa-home">
//               <FontAwesomeIcon icon={faSearch} />
//             </div>
//             <span className="nav-text">Lookup Wallet</span>
//           </a>
//         </li>
//       </ul>
//       <li>
//         <a href="/login">
//           <div className="fa-home">
//             <FontAwesomeIcon icon={faSignInAlt} />
//           </div>
//           <span className="nav-text">Signup/Signin</span>
//         </a>
//       </li>
//       <ul className="logout">
//         <li>
//           <a href="#">
//             <i className="fa fa-power-off fa-2x"></i>
//             <span className="nav-text">Logout</span>
//           </a>
//         </li>
//       </ul>
//     </nav>
//   );
// }
