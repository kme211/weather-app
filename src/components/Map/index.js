import React, { Component } from "react";
import "./styles.css";

class Map extends Component {
  constructor(props) {
    super(props);

    this.initMap = this.initMap.bind(this);
    this.updateMapLocation = this.updateMapLocation.bind(this);
  }

  componentDidMount() {
    if(window.gMapsReady) {
      this.initMap();
    } else {
      window.initMap = this.initMap;
    }
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.location !== this.props.location) {
      const { lat, lng } = this.props.location;
      this.gMap.panTo(new window.google.maps.LatLng(lat, lng));
      this.input.value = this.props.address;
    }
  }

  initMap() {
    window.gMapsReady = true; // Need this for the scenario when Google Maps is ready first
    const { location, address } = this.props;
    const mapOptions = {
      center: location,
      zoom: 10
    };
    if(address.length) this.input.value = address;
    this.autocomplete = new window.google.maps.places.Autocomplete(this.input);
    this.gMap = new window.google.maps.Map(this.map, mapOptions);
    this.autocomplete.addListener("place_changed", this.updateMapLocation);
  }

  updateMapLocation() {
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

export default Map;
