import React, { useState } from 'react';

export default function Dropdown(props) {
  const [selectedValue, setSelectedValue] = useState(props.placeholderValue);

  const onDropdownSelect = (e) => {
    setSelectedValue(e.target.value);
    props.handleOptionSelect(e.target.value);
  };

  return (
    <select
      className="dropdown"
      value={selectedValue}
      onChange={(e) => onDropdownSelect(e)}
    >
      <option className="disabled-option" disabled>
        {props.placeholderValue}
      </option>
      {props.dropdownOptions.map((option, index) => {
        return (
          <option key={index} value={option}>
            {option}
          </option>
        );
      })}
    </select>
  );
}
