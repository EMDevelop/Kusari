import React, { useEffect } from 'react';
import { useSnackbar } from 'notistack';
import MultipleInputs from '../../multipleInputs/MultipleInputs';

export default function MyWallets() {
  const { enqueueSnackbar } = useSnackbar();

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
        <h1>My Wallets</h1>
      </div>
      <div className="add-wallets-container">
        <div className="multiple-wallets-container">
          <MultipleInputs />
        </div>
      </div>
    </div>
  );
}
