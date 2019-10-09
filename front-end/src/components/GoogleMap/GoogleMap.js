
import React, { Component } from 'react';
import { GoogleApiWrapper, Map, InfoWindow, Marker, Circle } from 'google-maps-react';
import { googleApiKey } from '../../config'


export class MapContainer extends Component {
  state = {
   showingInfoWindow: false,  //Hides or the shows the infoWindow
   activeMarker: {},          //Shows the active marker upon click
   selectedPlace: {}          //Shows the infoWindow to the selected place upon a marker
 };

 onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
 }

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

render() {
      const style = {
      width: '100vw',
      height: '95vh',
      marginTop: '5vh'
    }
  return (
    <Map
      google={this.props.google}
      zoom={14}
      style={style}
      initialCenter={{ lat: 33.848996, lng: -84.373326 }}
    >
      <Circle
      radius={1}
      />
      <Marker
        onClick={this.onMarkerClick}
        name={'Atlanta Tech Village'}
       />
      <InfoWindow
        marker={this.state.activeMarker}
        visible={this.state.showingInfoWindow}
        onClose={this.onClose}
      >
        <div>
          <a href='https://www.google.com/maps/dir//3151+Roswell+Rd+NW,+Atlanta,+GA+30305/'><h4>Big Summer Blowout</h4></a>
        </div>
      </InfoWindow>
    </Map>
  );
}
}

export default GoogleApiWrapper({
  apiKey: googleApiKey
})(MapContainer);

// import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
// import React, { Component } from 'react'
// import './GoogleMap.css'
// import InfoWindowEx from './InfoWindowEx';


// export class MapContainer extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       showingInfoWindow: false,
//       activeMarker: {},
//     }
//   }
//   onMarkerClick = (props, marker, e) =>{

//     this.setState({
//       showingInfoWindow: true,
//       activeMarker: marker
//     });
//     console.log('Show me the info');
//   }

//   render() {
//     const style = {
//       width: '100vw',
//       height: '100vh'
//     }
//     return (
//       <div className='map-container'>
//         <Map
//           onClick={this.onMapClicked}
//           google={this.props.google}
//           style={style}
//           zoom={13}
//           initialCenter={{ lat: 33.848996, lng: -84.373326}}
//         >
//           <Marker
//             onClick={this.onMarkerClick}
//             name={'Atlanta Tech Village'}
//             position={{lat: 33.848996, lng: -84.373326}}>
//             <InfoWindowEx
//               marker={this.state.activeMarker}
//               visible={this.state.showingInfoWindow}
//               >
//               <div>
//               <h3>Info Test</h3>
//               </div>
//             </InfoWindowEx>
//           </Marker>
//         </Map>
//       </div>
//     );
//   }
// }

// export default GoogleApiWrapper({
//   apiKey: googleApiKey
// })(MapContainer);
