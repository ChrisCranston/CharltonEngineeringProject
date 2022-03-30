import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';

const mapStyles = {
    position:'absolute',
  width: '100%',
  height: '100%'
};

/**
 * Google Maps Component
 *
 * This component is generated to display a map showing the company's location on the home page
 * The API key is owned by Kess Strongman and would be dellegated to ownership from the company
 *
 * code is sourced from npmjs: https://www.npmjs.com/package/google-maps-react (2020)
 * version installed is 2.0.6
 * accessed 2022 March
 * 
 * @author Kess Strongman
 */
export class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showingInfoWindow: false,  // Hides or shows the InfoWindow
            activeMarker: {},          // Shows the active marker upon click
            selectedPlace: {}          // Shows the InfoWindow to the selected place upon a marker
      };
    }
    onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };
  render() {
    return (
      <Map
        google={this.props.google}
        zoom={10}
        style={mapStyles}
        initialCenter={
          {
            lat: 54.90140,
            lng: -1.552611
          }
        }
      >
      <Marker
          onClick={this.onMarkerClick}
          name={'Charlton Engineering Services'}
        />
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow>
        </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAtBFNJw5AP_QgpwMATXzvLxUtLqIBW_ac'
})(MapContainer);
