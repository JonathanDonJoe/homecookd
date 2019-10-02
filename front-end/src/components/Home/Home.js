import React, { Component } from 'react'
import './Home.css'


import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import modalAction from '../../actions/modalAction';

class Home extends Component {
    
    state = {
        imageLink : '',
        text: ''
    };

    componentDidMount(){

        // this.props.modal('openModal');
        let d = new Date()
        let time = d.getHours()
        let picLink = ''
        let text = ''
        console.log(time)
        switch(true){
            case (time<5 || time>=22):
                picLink = 'https://marvel-cdn.bc0a.com/Campbellsoup/s3.amazonaws.com/origin.www.cscassets.com/recipes/wide_cknew/wide_61905.jpg'
                text = 'Looking for a late-night snack?'
                break;
            case (time>=5 && time<11):
                picLink = 'https://media.eggs.ca/assets/RecipePhotos/_resampled/FillWyIxMjgwIiwiNzIwIl0/Fluffy-Pancakes-New-CMS.jpg'
                text = 'Breakfast is the most important meal of the day!'
                break;
            case (time>=11 && time<16):
                picLink = 'https://prods3.imgix.net/images/articles/2014_08/Web-Article-NONOMBERS-BLT-Bacon-Lettuce-Tomato-Construction-Manual-Sandwich.jpg?auto=format%2Ccompress&ixjsv=2.2.3&w=750'
                text = `It's time for lunch!`
                break;
            case (time>=16 && time<22):
                picLink = 'https://images-gmi-pmc.edge-generalmills.com/8a61d4b7-8967-47f0-b486-71a0e86ca82a.jpg'
                text = 'Find homecooked dinners in your area!'
                break;
            default: 
                picLink = 'https://images.immediate.co.uk/production/volatile/sites/4/2018/08/GettyImages-87987137-932ecf3.jpg?quality=90&resize=940,404'
                text = `Let's get some food!`
                break;
        }
        this.setState({
            imageLink : picLink,
            text: text
        })
    }
    render(){
        return(
            <div className="container-fluid">
                <div className="row">
                    <div className="home col s12">
                        <div className="upper-fold" style={{backgroundImage: `url(${this.state.imageLink})`}}>
                        </div>
                    </div>
                    <h1> {this.state.text}</h1>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return ({
        auth: state.auth
    })
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        modal: modalAction
    }, dispatch)
}

// export default NavBar;
export default connect(mapStateToProps, mapDispatchToProps)(Home)