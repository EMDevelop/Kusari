import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faWallet } from '@fortawesome/free-solid-svg-icons';
import { useSnackbar } from 'notistack';

import MultipleInputs from '../../multipleInputs/MultipleInputs';

export default function Profile() {
  const { enqueueSnackbar } = useSnackbar();

  const success = (message) => {
    enqueueSnackbar(message, {
      variant: 'success',
    });
  };

  const fail = (message) => {
    enqueueSnackbar(message, {
      variant: 'error',
    });
  };
  const info = (message) => {
    enqueueSnackbar(message, {
      variant: 'info',
    });
  };

  useEffect(() => {
    info(
      'Add your wallets and then click the save icon to see your live portfolio!'
    );
  }, []);

  return (
    <div className="profile-page">
      <div className="page-title">
        <h1>My Profile</h1>
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
