import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleDown } from '@fortawesome/free-solid-svg-icons';

export default function Dropdown(props) {
  const [selectedValue, setSelectedValue] = useState(props.placeholderValue);

  const onDropdownSelect = (e) => {
    setSelectedValue(e.target.value);
    props.handleOptionSelect && props.handleOptionSelect(e.target.value);
    if (props.name === 'wallet-type') {
      handleMultiDropdownSelect(e);
    }
  };

  const handleMultiDropdownSelect = (e) => {
    let values = [...props.parentInputFields];
    let accumulator = 1;
    values[props.currentIndex][props.name] = e.target.value;
    // Set Sequence Every Time, Index unreliable
    values.map((row) => {
      row['seq'] = accumulator;
      accumulator = accumulator + 1;
    });
    props.parentSetInputFields(values);
    console.log(values);
  };

  return (
    <select
      className={props.widthClass ? props.widthClass : 'dropdown'}
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
