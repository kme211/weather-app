import React from "react";
import "./styles.css";
import Toggle from "../Toggle";

const Header = ({ tempScale, changeTempScale }) => (
  <header>
    <h1 className="header__title">
      Weather NOW!
    </h1>
    <Toggle
      name="scale"
      checkedItem={tempScale}
      onChange={changeTempScale}
      value1="f"
      label1="f"
      value2="c"
      label2="c"
    />
  </header>
);

export default Header;
