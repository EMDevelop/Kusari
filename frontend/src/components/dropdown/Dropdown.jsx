import React, { useState, useEffect } from 'react';

export default function Dropdown(props) {
  const [selectedValue, setSelectedValue] = useState(props.placeholderValue);

  const onDropdownSelect = (e) => {
    setSelectedValue(e.target.value);
    props.handleOptionSelect && props.handleOptionSelect(e.target.value);
  };

  useEffect(() => {
    props.parentValue && setSelectedValue(props.parentValue);
  }, []);

  const handleMultipleInputs = (e) => {
    let values = [...props.parentInputFields];
    values[values.findIndex((x) => x.id === props.parentWalletID)][props.name] =
      e.target.value;

    props.parentSetInputFields(values);
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
