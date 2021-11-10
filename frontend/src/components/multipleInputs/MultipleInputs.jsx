import React, { useState, useContext, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import Dropdown from '../dropdown/Dropdown';
import { GlobalContext } from '../../context/globalContext';
import axios from 'axios';
import LamboLoader from '../lamboLoader/LamboLoader';

export default function MultipleInputs() {
  // When page loads, for current user
  // Go get the users wallets
  // If there are no wallets, create one
  // If there are wallets, set the state to the wallets

  const { userID } = useContext(GlobalContext);

  useEffect(() => {
    async function getWallets() {
      try {
        const response = await axios.get(`multi/user-wallet-list/${userID}`, {
          headers: { Authorization: `JWT ${localStorage.getItem('token')}` },
        });
        setInputFields(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getWallets();
  }, []);

  // id: 3
  // user: 1;
  // wallet_address: '';
  // wallet_type: '';

  const [inputFields, setInputFields] = useState([]);

  const handleInputChange = (e, walletID) => {
    console.log(e);
    console.log(walletID);
    let values = [...inputFields];

    values[values.findIndex((x) => x.id === walletID)][e.target.name] =
      e.target.value;
    setInputFields(values);
  };

  const handleAdd = (index) => {
    console.log('adding new');
    // let values = [...inputFields];
    // values.splice(index + 1, 0, {
    //   wallet_id: '',
    //   seq: index + 1,
    //   wallet_type: '',
    //   wallet_address: '',
    // });
    // setInputFields(values);
  };

  // not working, working on veganswap though? client/src/components/forms/MultiFormAddIngredients.jsx
  const handleRemove = (index) => {
    let values = [...inputFields];
    // console.log(values);
    values.splice(index, 1);
    setInputFields(values);
  };

  return (
    <>
      {inputFields || inputFields.length === 0 ? (
        inputFields.map((wallet) => (
          <div key={wallet['id']} className="multipleInputRow">
            <div className="multi-dropdown">
              <Dropdown
                name="wallet_type"
                placeholderValue="Select wallet type"
                dropdownOptions={['Ethereum', 'Bitcoin', 'BSC']}
                widthClass="dropdown-width-max"
                parentSetInputFields={setInputFields}
                parentInputFields={inputFields}
                // currentIndex={index}
              />
              {console.log(inputFields)}
            </div>
            <div className="multi-input">
              <input
                name="wallet_address"
                type="text"
                className="multi-input-field"
                placeholder="e.g 0x0613Cd2076bd432C7A60a1b926b11B17BaAaFE11"
                onChange={(e) => handleInputChange(e, wallet['id'])}
              />
            </div>

            <div className="plusMinus">
              <FontAwesomeIcon
                icon={faPlus}
                onClick={() => handleAdd(wallet['id'])}
              />
              {wallet['id'] === 0 ? (
                <></>
              ) : (
                <FontAwesomeIcon
                  icon={faMinus}
                  onClick={() => handleRemove(wallet['id'])}
                />
              )}
            </div>
          </div>
        ))
      ) : (
        <LamboLoader />
      )}
    </>
  );
}
