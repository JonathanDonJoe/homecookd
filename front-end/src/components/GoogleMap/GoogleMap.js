import React, { Component, createRef } from 'react'
import { connect } from 'react-redux';



class GoogleMap extends Component {

  googleMapRef = createRef()

  componentDidUpdate(){
    if(this.props.event.event.attending){
      this.googleMap = this.createGoogleMap()
      if(this.props.event.event.attending.includes(this.props.auth.user_id)){
        this.infoWindow = this.createIW()
        this.marker = this.createMarker()
        this.marker.addListener('click', ()=> {
          this.infoWindow.open(this.map, this.marker);
        });
      }else{
        this.circle = this.createCircle()
      }
    }
  }

  createGoogleMap = () => {
    return(
      new window.google.maps.Map(this.googleMapRef.current, {
        zoom: 16,
        center: {
          lat: this.props.event.event.lat,
          lng: this.props.event.event.lng,
        }
      })
    )
  }

  createMarker = () => {
    return(
      new window.google.maps.Marker({
        position: { lat: this.props.event.event.lat, lng: this.props.event.event.lng },
        map: this.googleMap,
      })
    )
  }

  createCircle = () => {
    return(
      new window.google.maps.Circle({
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        map: this.googleMap,
        center: this.googleMap.center,
        radius: 600
      })
    )
  }

  createIW = () => {
    let urlAddress = this.props.event.event.event_address.replace(/\s/g, '+');
    let directionUrl = `https://www.google.com/maps/dir//${urlAddress}/`
    return(
      new window.google.maps.InfoWindow({
        content: `<a href=${directionUrl} target='_blank' <h1>${this.props.event.event.event_address}</h1> </a>`
      })
    )
  }



  render() {
      return (
        <div
          id="google-map"
          ref={this.googleMapRef}
          style={{ width: '100vw', height: '95vh' }}
        />
      )
  }
}

function mapStateToProps(state) {
  return ({
      auth: state.auth
  })
}

export default connect(mapStateToProps)(GoogleMap);