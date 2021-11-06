import React from 'react';

export default function Dropdown(props) {
  const onDropdownSelect = (e) => {};

  return (
    <select
      className="dropdown"
      value={props.placeholderValue}
      onChange={(e) => onDropdownSelect(e)}
    >
      <option disabled>_____</option>
      <option value="recipe">Recipe</option>
      <option value="ingredient">Ingredient</option>
    </select>
  );
}
