import React, { Component } from "react";
import "./styles.css";

export default class Map extends Component {
  componentDidMount() {
    if(window.gMapsReady) {
      this.initMap();
    } else {
      window.initMap = this.initMap;
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location !== this.props.location) {
      const { lat, lng } = this.props.location;
      this.gMap.panTo(new window.google.maps.LatLng(lat, lng));
      this.gMap.setZoom(10);
      this.input.value = this.props.address;
    }
  }

  initMap = () => {
    window.gMapsReady = true; // Need this for the scenario when Google Maps is ready first
    const { location, address } = this.props;
    const mapOptions = {
      center: location,
      zoom: 10
    };
    
    this.autocomplete = new window.google.maps.places.Autocomplete(this.input);
    this.gMap = new window.google.maps.Map(this.map, mapOptions);
    this.autocomplete.addListener("place_changed", this.updateMapLocation);
    if(address.length) {
      this.input.value = address;
    } else {
      this.gMap.setZoom(2);
    }
  }

  updateMapLocation = () => {
    const place = this.autocomplete.getPlace();
    const location = place.geometry.location;
    const lat = location.lat();
    const lng = location.lng();
    this.props.setLocation({ lat, lng }, place.formatted_address);
  }

  render() {
    return (
      <div>
        <input
          className="autcomplete"
          type="text"
          placeholder="Start typing location..."
          ref={input => {
            this.input = input;
          }}
        />
        <div
          className="map"
          ref={map => {
            this.map = map;
          }}
        />
      </div>
    );
  }
}
