import React, { Component } from 'react'
import { GoogleMap, LoadScript, Circle, Marker, InfoWindow } from '@react-google-maps/api'
import { googleApiKey } from '../../config'

class TheMap extends Component {
  render() {
     return (
      <LoadScript
        id="script-loader"
        googleMapsApiKey={googleApiKey}
      >
        <GoogleMap
          id="circle-example"
          mapContainerStyle={{
          height: "95vh",
          width: "100vw"
          }}
          zoom={14}
          center={{
          lat: 33.848996,
          lng: -84.373326
          }}
        >
        <Marker
          position={{
          lat: 33.848996,
          lng: -84.373326
          }}
        />
        <InfoWindow
        onLoad={infoWindow => {
        console.log('infoWindow: ', infoWindow)
        }}
          position={{
          lat: 33.848996,
          lng: -84.373326
          }}
          onCloseClick={(e) => {
          console.log('bye')
          }}
          >
          <div style={{
          background: `white`,
          padding: '5px',
          }}>
          <h5>InfoWindow</h5>
          </div>
        </InfoWindow>
        <Circle
          // optional
          // onLoad={circle => {
          // console.log('Circle onLoad circle: ', circle)
          // }}
          // optional
          // onUnmount={circle => {
          // console.log('Circle onUnmount circle: ', circle)
          // }}
          // required
          center={{
          lat: 33.848996,
          lng: -84.373326
          }}
          // required
          options={{
          strokeColor: '#FF0000',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#FF0000',
          fillOpacity: 0.35,
          clickable: false,
          draggable: false,
          editable: false,
          visible: true,
          radius: 1000,
          zIndex: 1
          }}
        />
          {/* ...Your map components */}
        </GoogleMap>
      </LoadScript>
     )
  }
}

export default TheMap