import React from 'react';
import Login from '../../login/Login';
import Signup from '../../signup/Signup';

export default function LoginSignup(props) {
  return (
    <div className="login-signup-page">
      <Login storeDetailsInApp={props.storeDetailsInApp} />
      <Signup storeDetailsInApp={props.storeDetailsInApp} />
    </div>
  );
}
