import React, { Component } from 'react'
import { googleApiKey } from '../../config'


export class AddressAutocomplete extends Component {
    
    state={
        address: ''
    }

    changeAddress = (e) => {
        this.setState({
            address: e.target.value
        }, () =>{this.props.changeAddress(this.state.address) })
    }  
    componentDidMount() {
        this.googleAuto = this.createGoogleAuto()
        // console.log(this.googleAuto);
        this.googleAuto.setFields(['address_component']);
        this.googleAuto.addListener('place_changed', this.fillInAddress);
    }
    
    createGoogleAuto = () => {
        return(
            new window.google.maps.places.Autocomplete(
                document.getElementById('autocomplete'), {types: ['geocode']})
        )
    }

    fillInAddress = () => {
        this.place = this.googleAuto.getPlace();
    } 
    render() {
        console.log(this.state.address);
        return (<>
            <div id="locationField" className="col s12">
                <input
                id="autocomplete"
                placeholder="Enter your address"
                type="text"
                onChange={this.changeAddress}
                onClick={this.changeAddress}
                />
            </div>


        </>)
    }
}

export default AddressAutocomplete
