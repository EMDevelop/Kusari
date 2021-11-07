import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faWallet } from '@fortawesome/free-solid-svg-icons';

import MultipleInputs from '../../multipleInputs/MultipleInputs';

export default function Profile() {
  return (
    <div className="profile-page">
      <div className="page-title">
        <h1>My Profile</h1>
      </div>
      <div className="profile-description-container">
        <p className="profile-description">
          Store your wallets, save, and head to your portfolio →
        </p>
        <div className="fa-home">
          <FontAwesomeIcon icon={faWallet} />
        </div>
      </div>
      <div className="add-wallets-container">
        <div className="profile-save-container">
          <div className="icon-save-profile">
            <FontAwesomeIcon icon={faSave} />
          </div>
        </div>
        <div className="multiple-wallets-container">
          <MultipleInputs />
        </div>
      </div>
    </div>
  );
}
