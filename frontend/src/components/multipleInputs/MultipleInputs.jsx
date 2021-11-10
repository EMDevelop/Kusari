import React, { useState, useContext, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import Dropdown from '../dropdown/Dropdown';
import { GlobalContext } from '../../context/globalContext';
import axios from 'axios';
import LamboLoader from '../lamboLoader/LamboLoader';
import { useCookies } from 'react-cookie';

axios.defaults.withCredentials = true;
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
axios.defaults.xsrfCookieName = 'csrftoken';

export default function MultipleInputs() {
  // When page loads, for current user
  // Go get the users wallets
  // If there are no wallets, create one
  // If there are wallets, set the state to the wallets

  const { userID } = useContext(GlobalContext);
  const [inputFields, setInputFields] = useState([]);
  const [latestID, setLatestID] = useState(0);
  const [deleted, setDeleted] = useState(true);

  // Need to configure CSRS
  const [cookies, setCookie] = useCookies(['name']);
  const csrfToken = cookies.csrftoken;

  useEffect(() => {
    async function getWallets() {
      try {
        const response = await fetchAllWalletData();
        setInputFields(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getWallets();
  }, []);

  // Add use Effect
  useEffect(() => {
    async function getWallets() {
      try {
        const response = await fetchAllWalletData();
        setInputFields(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getWallets();
  }, [latestID]);

  // Delete use Effect
  useEffect(() => {
    async function getWallets() {
      try {
        const response = await fetchAllWalletData();
        setInputFields(response.data);
        setDeleted(false);
      } catch (error) {
        console.log(error);
      }
    }
    getWallets();
  }, [deleted]);

  const fetchAllWalletData = async () => {
    return await axios.get(`multi/user-wallet-list/${userID}`, {
      headers: {
        Authorization: `JWT ${localStorage.getItem('token')}`,
      },
    });
  };

  const handleInputChange = (e, walletID) => {
    let values = [...inputFields];
    values[values.findIndex((x) => x.id === walletID)][e.target.name] =
      e.target.value;
    setInputFields(values);
  };

  const handleAdd = async () => {
    try {
      const response = await axios.post(`multi/wallet-create/`, {
        headers: {
          csrftoken: csrfToken,
          Authorization: `JWT ${localStorage.getItem('token')}`,
        },
        body: {
          user: userID,
          wallet_address: '',
          wallet_type: '',
        },
      });
      if (latestID < response.data.id) setLatestID(response.data.id);
    } catch (error) {
      console.log(error);
    }
  };

  // not working, working on veganswap though? client/src/components/forms/MultiFormAddIngredients.jsx
  const handleRemove = async (index) => {
    try {
      const response = await axios.delete(`multi/wallet-delete/${index}/`, {
        headers: {
          csrftoken: csrfToken,
          Authorization: `JWT ${localStorage.getItem('token')}`,
        },
      });
      if (response.status === 200) setDeleted(true);
    } catch (error) {
      console.log(error);
    }
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
              <FontAwesomeIcon icon={faPlus} onClick={() => handleAdd()} />
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
