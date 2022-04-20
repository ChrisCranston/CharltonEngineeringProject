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
      this.onMarkerClick = this.onMarkerClick.bind(this)
      this.onClose = this.onClose.bind(this)
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
          <a href="https://www.google.co.uk/maps/place/Charlton+Engineering+Services/@54.9014034,-1.5548096,17z/data=!3m1!4b1!4m5!3m4!1s0x487e7b047ec02325:0x7f8627ed98c4dd63!8m2!3d54.9014034!4d-1.5526209?hl=en-GB" target="_blank" rel="noreferrer">
            <h4>
                    Charlton Engineering Services Limited</h4></a>
          </div>
        </InfoWindow>
        </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAtBFNJw5AP_QgpwMATXzvLxUtLqIBW_ac'
})(MapContainer);
