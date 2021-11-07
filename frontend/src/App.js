import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/App.scss';

// axios
import axios from 'axios';

// Components
import Navbar from './components/routes/navbar/Navbar';

// Routes
import LookupWallet from './components/routes/LookupWallet/LookupWallet';
import Login from './components/routes/Login/Login';
import Signup from './components/routes/Signup/Signup';
import Profile from './components/routes/Profile/Profile';

function App() {
  const [displayedForm, setDisplayedForm] = useState('');
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem('token') ? true : false
  );
  const [username, setUsername] = useState(undefined);

  // If user is logged in, check if their stored token is still valid
  // This will be valid for 2 weeks by django default.
  useEffect(() => {
    authorizeTokenFromStorage();
  }, []);

  const authorizeTokenFromStorage = async (token) => {
    try {
      const response = await axios.get('/prices/current_user/', {
        headers: { Authorization: `JWT ${localStorage.getItem('token')}` },
      });
      setLoggedIn(true); //???
      setUsername(response.data.user.username); // previously this.setState({ username: json.username });
    } catch (error) {
      setLoggedIn(false);
    }
  };

  const handleLogin = async (e, data) => {
    console.log(data);
    e.preventDefault();
    // axios post request to url with body as data
    try {
      const response = await axios.post(
        '/token-auth/',
        data // JSON.stringify(data)
      );
      storeLoginCredentials(response.data.user.username, response.data.token);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignup = async (e, data) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:8000/prices/users/',
        data // JSON.stringify(data)
      );
      storeLoginCredentials(response.data.user.username, response.data.token);
    } catch (error) {
      console.log(error);
    }
  };

  const storeLoginCredentials = (username, token) => {
    setLoggedIn(true);
    setUsername(username);
    token && localStorage.setItem('token', token);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUsername('');
    setLoggedIn(false);
  };

  return (
    <div className="app">
      <Navbar
        loggedIn={loggedIn}
        // display_form={display_form}
        handleLogout={handleLogout}
      />
      <main>
        <Router>
          <Routes>
            <Route path="/" element={<LookupWallet />} />
            <Route
              path="/login"
              element={<Login handleLogin={handleLogin} />}
            />
            <Route path="/profile" element={<Profile />} />
            <Route
              path="/signup"
              element={<Signup handleSignup={handleSignup} />}
            />
          </Routes>
        </Router>
      </main>
    </div>
  );
}

export default App;

//   handle_logout = () => {
//     localStorage.removeItem('token');
//     this.setState({ logged_in: false, username: '' });
//   };

// export default App;

// class App extends Component {
//   //
//   constructor(props) {
//     super(props);
//     console.log('constructor');
//     this.state = {
//       displayed_form: '',
//       logged_in: localStorage.getItem('token') ? true : false,
//       username: '',
//     };
//   }

//   // If user is logged in, check if their stored token is still valid
//   // This will be valid for 2 weeks by django default.
//   componentDidMount() {
//     console.log('componentDidMount');
//     if (this.state.logged_in) {
//       fetch('http://localhost:8000/prices/current_user/', {
//         headers: {
//           Authorization: `JWT ${localStorage.getItem('token')}`,
//         },
//       })
//         .then((res) => res.json())
//         .then((json) => {
//           this.setState({ username: json.username });
//         });
//     }
//   }

//   handle_login = (e, data) => {
//     e.preventDefault();
//     fetch('http://localhost:8000/token-auth/', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(data),
//     })
//       .then((res) => res.json())
//       .then((json) => {
//         localStorage.setItem('token', json.token);
//         this.setState({
//           logged_in: true,
//           displayed_form: '',
//           username: json.user.username,
//         });
//       });
//   };

//   handle_signup = (e, data) => {
//     e.preventDefault();
//     fetch('', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(data),
//     })
//       .then((res) => res.json())
//       .then((json) => {
//         localStorage.setItem('token', json.token);
//         this.setState({
//           logged_in: true,
//           displayed_form: '',
//           username: json.username,
//         });
//       });
//   };

//   handle_signup = (e, data) => {
//     e.preventDefault();
//     fetch('http://localhost:8000/prices/users/', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(data),
//     })
//       .then((res) => res.json())
//       .then((json) => {
//         localStorage.setItem('token', json.token);
//         this.setState({
//           logged_in: true,
//           displayed_form: '',
//           username: json.username,
//         });
//       });
//   };

//   handle_logout = () => {
//     localStorage.removeItem('token');
//     this.setState({ logged_in: false, username: '' });
//   };

//   display_form = (form) => {
//     this.setState({
//       displayed_form: form,
//     });
//   };

//   render() {
//     let form;
//     switch (this.state.displayed_form) {
//       case 'login':
//         form = <Login handle_login={this.handle_login} />;
//         break;
//       case 'signup':
//         form = <Signup handle_signup={this.handle_signup} />;
//         break;
//       default:
//         form = null;
//     }

//     return (
//       <div className="App">
//         <Navbar
//           logged_in={this.state.logged_in}
//           display_form={this.display_form}
//           handle_logout={this.handle_logout}
//         />
//         <main>
//           <Router>
//             <Routes>
//               <Route path="/" element={<LookupWallet />} />
//               <Route path="/login" element={<Login />} />
//               <Route path="/signup" element={<Signup />} />
//               <Route path="/profile" element={<Profile />} />
//             </Routes>
//           </Router>
//           {form}
//         </main>

//          <h3>
//           {this.state.logged_in
//             ? `Hello, ${this.state.username}`
//             : 'Please Log In'}
//         </h3>
//       </div>
//     );
//   }
// }
