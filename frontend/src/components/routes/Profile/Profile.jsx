import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';

import MultipleInputs from '../../multipleInputs/MultipleInputs';

export default function Profile() {
  return (
    <div className="profile-page">
      <div className="page-title">
        <h1>My Profile</h1>
      </div>
      <div className="profile-description-container">
        <p className="profile-description">
          Add all of your wallets here, we'll keep them safe and secure.
        </p>
        <p className="profile-description">
          You can see your balance for these wallets in the "My Portfolio" menu
          option.
        </p>
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
