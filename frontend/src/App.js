import React, { useState, Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import './styles/App.scss';

// Components
import Navbar from './components/routes/navbar/Navbar';

// Routes
import LookupWallet from './components/routes/LookupWallet/LookupWallet';
import Login from './components/routes/Login/Login';
import Signup from './components/routes/Signup/Signup';
import Profile from './components/routes/Profile/Profile';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayed_form: '',
      logged_in: localStorage.getItem('token') ? true : false,
      username: '',
    };
  }

  componentDidMount() {
    if (this.state.logged_in) {
      fetch('http://localhost:8000/prices/current_user/', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`,
        },
      })
        .then((res) => res.json())
        .then((json) => {
          this.setState({ username: json.username });
        });
    }
  }

  handle_login = (e, data) => {
    e.preventDefault();
    fetch('http://localhost:8000/token-auth/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((json) => {
        localStorage.setItem('token', json.token);
        this.setState({
          logged_in: true,
          displayed_form: '',
          username: json.user.username,
        });
      });
  };

  handle_signup = (e, data) => {
    e.preventDefault();
    fetch('http://localhost:8000/prices/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((json) => {
        localStorage.setItem('token', json.token);
        this.setState({
          logged_in: true,
          displayed_form: '',
          username: json.username,
        });
      });
  };

  handle_logout = () => {
    localStorage.removeItem('token');
    this.setState({ logged_in: false, username: '' });
  };

  display_form = (form) => {
    this.setState({
      displayed_form: form,
    });
  };

  render() {
    let form;
    switch (this.state.displayed_form) {
      case 'login':
        form = <Login handle_login={this.handle_login} />;
        break;
      case 'signup':
        form = <Signup handle_signup={this.handle_signup} />;
        break;
      default:
        form = null;
    }

    return (
      <div className="App">
        <Navbar
          logged_in={this.state.logged_in}
          display_form={this.display_form}
          handle_logout={this.handle_logout}
        />
        <main>
          <Router>
            <Routes>
              <Route path="/" element={<LookupWallet />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </Router>
        </main>
        {form}
        <h3>
          {this.state.logged_in
            ? `Hello, ${this.state.username}`
            : 'Please Log In'}
        </h3>
      </div>
    );
  }
}

// function App() {
//   return (
//     <div className="app">
//       <Navbar />
//       <main>
//         <Router>
//           <Routes>
//             <Route path="/" element={<LookupWallet />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/profile" element={<Profile />} />
//           </Routes>
//         </Router>
//       </main>
//     </div>
//   );
// }

export default App;
