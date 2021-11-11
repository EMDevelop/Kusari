import React, { useState, useEffect } from 'react';

export default function Dropdown(props) {
  const [selectedValue, setSelectedValue] = useState(props.placeholderValue);

  const handleInputChange = (e) => {
    if (props.location === 'multipleInputs') {
      handleMultipleInputs(e);
    } else if (props.location === 'portfolio') {
      handlePortfolioSelect(e);
    } else {
      onDropdownSelect(e);
    }
  };

  const handlePortfolioSelect = (e) => {
    setSelectedValue(e.target.value);
    props.setSelectedValue(e.target.value);
  };

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
      onChange={(e) => handleInputChange(e)}
    >
      <option className="disabled-option" disabled>
        {props.placeholderValue}
      </option>
      {props.location === 'portfolio' && <option>See All</option>}
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
