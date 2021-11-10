import React, { useState } from 'react';

export default function Dropdown(props) {
  const [selectedValue, setSelectedValue] = useState(props.placeholderValue);

  const onDropdownSelect = (e) => {
    setSelectedValue(e.target.value);
    props.handleOptionSelect && props.handleOptionSelect(e.target.value);
  };

  const handleMultipleInputs = (e) => {
    let values = [...props.parentInputFields];
    console.log(values);
    console.log('props.parentWalletID' + props.parentWalletID);
    console.log('props.parentInputFields' + props.parentInputFields);
    console.log(values);

    values[values.findIndex((x) => x.id === props.parentWalletID)][props.name] =
      e.target.value;

    props.parentSetInputFields(values);
    console.log(values);
    setSelectedValue(e.target.value);
  };

  return (
    <select
      className={props.widthClass ? props.widthClass : 'dropdown'}
      value={selectedValue}
      onChange={
        props.location === 'multipleInputs'
          ? (e) => handleMultipleInputs(e)
          : (e) => onDropdownSelect(e)
      }
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
