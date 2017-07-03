import React from "react";
import "./styles.css";

const Toggle = ({
  name,
  value1,
  value2,
  label1,
  label2,
  checkedItem,
  onChange
}) => (
  <div className="toggle">
    <input
      className="toggle__input"
      onChange={onChange}
      type="radio"
      name={name}
      id={value1}
      value={value1}
      checked={checkedItem === value1}
    />
    <input
      className="toggle__input"
      onChange={onChange}
      type="radio"
      name={name}
      id={value2}
      value={value2}
      checked={checkedItem === value2}
    />
    <div className="switch">
      <label
        className={
          `switch__label left ${checkedItem === value1 ? "active" : ""}`
        }
        htmlFor={value1}
      >
        {label1}
      </label>
      <label
        className={
          `switch__label right ${checkedItem === value2 ? "active" : ""}`
        }
        htmlFor={value2}
      >
        {label2}
      </label>
      <div className={`switch__active-bg ${checkedItem === value1 ? 'left' : 'right'}`}></div>
    </div>
  </div>
);

export default Toggle;
