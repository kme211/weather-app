import React from "react";
import Map from "../Map";
import Icon from "../Icon";
import "./styles.css";

const LocationChooser = ({
  location,
  address,
  setLocation,
  getLocation,
  chooseLocation
}) =>
  <div className="location-chooser">
    <button onClick={getLocation}>
      <Icon className="icon" icon="crosshairs" /> Get my location
    </button>
    <Map location={location} address={address} setLocation={setLocation} />
    {address.length > 0 && <button onClick={chooseLocation}>
      <Icon className="icon" icon="checkmark" /> Use this location
    </button>}
  </div>;

export default LocationChooser;
