import React, { Component, createRef } from 'react'
import { googleApiKey } from '../../config'


class GoogleMap extends Component {
  googleMapRef = createRef()

  componentDidMount() {
    const googleMapScript = document.createElement('script')
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${googleApiKey}&libraries=places`
    window.document.body.appendChild(googleMapScript)

    googleMapScript.addEventListener('load', ()=>{
      this.googleMap = this.createGoogleMap()
      this.marker = this.createMarker()
    })
  }

  createGoogleMap = () => {
    return(
      new window.google.maps.Map(this.googleMapRef.current, {
        zoom: 16,
        center: {
          lat: 48.858264,
          lng: 2.294653,
        }
      })
    )
  }

  createMarker = () => {
    return(
      new window.google.maps.Marker({
        position: { lat: 48.858264, lng: 2.294653 },
        map: this.googleMap,
      })
    )
  }

  render() {
    return (
      <div
        id="google-map"
        ref={this.googleMapRef}
        style={{ width: '400px', height: '300px' }}
      />
    )
  }
}

export default GoogleMap