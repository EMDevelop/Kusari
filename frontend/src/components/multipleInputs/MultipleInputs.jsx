import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import Dropdown from '../dropdown/Dropdown';

export default function MultipleInputs() {
  const [inputFields, setInputFields] = useState([
    { wallet_id: '', seq: 1, wallet_type: '', wallet_address: '' },
  ]);

  const handleInputChange = (index, e) => {
    let values = [...inputFields];
    let accumulator = 1;
    values[index][e.target.name] = e.target.value;
    // Set Sequence Every Time, Index unreliable
    values.map((row) => {
      row['seq'] = accumulator;
      accumulator = accumulator + 1;
    });
    setInputFields(values);
  };

  const handleAdd = (index) => {
    let values = [...inputFields];
    values.splice(index + 1, 0, {
      wallet_id: '',
      seq: index + 1,
      wallet_type: '',
      wallet_address: '',
    });
    setInputFields(values);
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
      {inputFields.map((_, index) => (
        <div key={index} className="multipleInputRow">
          <div className="multi-dropdown">
            <Dropdown
              name="wallet-type"
              placeholderValue="Select wallet type"
              dropdownOptions={['Ethereum', 'Bitcoin', 'BSC']}
              widthClass="dropdown-width-max"
              parentSetInputFields={setInputFields}
              parentInputFields={inputFields}
              currentIndex={index}
            />
          </div>
          <div className="multi-input">
            <input
              name="wallet_address"
              type="text"
              className="multi-input-field"
              placeholder="e.g 0x0613Cd2076bd432C7A60a1b926b11B17BaAaFE11"
              onChange={(e) => handleInputChange(index, e)}
            />
          </div>

          <div className="plusMinus">
            <FontAwesomeIcon icon={faPlus} onClick={() => handleAdd(index)} />
            {index === 0 ? (
              <></>
            ) : (
              <FontAwesomeIcon
                icon={faMinus}
                onClick={() => handleRemove(index)}
              />
            )}
          </div>
        </div>
      ))}
    </>
  );
}
