import React, { Component } from 'react'

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
