import React from "react";
import "./styles.css";
import Toggle from "../Toggle";
import Icon from "../Icon";

const Header = ({
  tempScale,
  changeTempScale,
  locationChosen,
  changeLocation
}) =>
  <header>
    <h1 className="header__title">Weather NOW!</h1>
    {locationChosen &&
      <div className="header__right">
        <Toggle
          name="scale"
          checkedItem={tempScale}
          onChange={changeTempScale}
          value1="f"
          label1="f"
          value2="c"
          label2="c"
        />
        <button onClick={changeLocation}>
          <Icon icon="marker" className="icon" /><span className="hide-sm">Change location</span>
        </button>
      </div>}
  </header>;

export default Header;
