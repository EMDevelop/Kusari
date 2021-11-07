import React, { useState } from 'react';
import Dropdown from '../dropdown/Dropdown';

export default function SearchDropdown(props) {
  const [containerClass, setContainerClass] = useState('');
  const [listGroup, setListGroup] = useState('');
  const [resultList, setResultList] = useState('');
  const [input, setInput] = useState('');

  return (
    <div className="dropdown-container">
      <input
        type="text"
        className="dropdown-input"
        placeholder={props.placeholder}
        aria-label="InputSelect"
        // onChange={onInputChange}
        value={props.textValue}
      />
      <ul className="dropdown-list">
        <button
          type="button"
          className="dropdown-button"
          // onClick={(e) => handleInputSelect(e, item.id, item.type)}
        >
          <p>hello</p>
        </button>
      </ul>
    </div>
  );
}
