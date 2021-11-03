import React from 'react';

// Credit to: https://codepen.io/JFarrow/pen/fFrpg for the navbar

export default function Nav() {
  return (
    <nav className="main-menu">
      <ul>
        <li>
          <a href="">
            <i className="fa fa-home fa-2x"></i>
            <span className="nav-text">Dashboard</span>
          </a>
        </li>
        <li>
          <a href="#">
            <i className="fa fa-bar-chart-o fa-2x"></i>
            <span className="nav-text">Graphs and Statistics</span>
          </a>
        </li>

        <li>
          <a href="#">
            <i className="fa fa-table fa-2x"></i>
            <span className="nav-text">Tables</span>
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
