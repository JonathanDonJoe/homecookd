import React, { Component } from 'react'
import { googleApiKey } from '../../config'


export class AddressAutocomplete extends Component {
    
    
    componentDidMount() {
        const googleAutoScript = document.createElement('script')
        googleAutoScript.src = `https://maps.googleapis.com/maps/api/js?key=${googleApiKey}&libraries=places`
        window.document.body.appendChild(googleAutoScript)
        
        googleAutoScript.addEventListener('load', ()=>{
            this.googleAuto = this.createGoogleAuto()
            console.log(this.googleAuto);
            this.googleAuto.setFields(['address_component']);
            this.googleAuto.addListener('place_changed', this.fillInAddress);
        })
    }
    
    createGoogleAuto = () => {
        return(
            new window.google.maps.places.Autocomplete(
                document.getElementById('autocomplete'), {types: ['geocode']})
        )
    }

    fillInAddress = () => {
        this.place = this.googleAuto.getPlace();
        this.componentForm = {
            street_number: 'short_name',
            route: 'long_name',
            locality: 'long_name',
            administrative_area_level_1: 'short_name',
            country: 'long_name',
            postal_code: 'short_name'
          };

        // Get each component of the address from the place details,
        // and then fill-in the corresponding field on the form.
        for (var i = 0; i < this.place.address_components.length; i++) {
          var addressType = this.place.address_components[i].types[0];
          if (this.componentForm[addressType]) {
            var val = this.place.address_components[i][this.componentForm[addressType]];
            document.getElementById(addressType).value = val;
          }
        }

    } 
    render() {
        return (<>

            <div id="locationField">
                <input id="autocomplete"
                placeholder="Enter your address"
                type="text"/>
            </div>


        </>)
    }
}

export default AddressAutocomplete
