import React, { Component } from 'react';
import axios from 'axios';
import './styleNew.css';
import {API_KEY} from "../../actions/Keys";
import {addRestaurant,showCreateRestaurant} from "../../actions";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {createSampleRestaurant} from "../../helpers/Restaurant";
import Modal from "./Modal";

class CreateResto extends Component{
    constructor(props){
        super(props);

        this.state = {
            name: '',
            address: '',
            city: '',
            imageUrl: '',
            error: ''
        };

        this.handleClose = this.handleClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(ev){
        ev.preventDefault();
        const { name, address, city, imageUrl } = this.state;
        const { addRestaurant, showCreateRestaurant } = this.props;

        if(name && address && city ){

            axios.post(`https://maps.googleapis.com/maps/api/geocode/json?address=${address},${city}&key=${API_KEY}`)
                .then((res) =>{
                    console.log('response from add restatttttttttttt', res);
                    const geopoint = res.data.results[0];
                    if(geopoint){
                        const restaurant = createSampleRestaurant(name, geopoint, imageUrl);
                        //addRestaurant(restaurant);
                        showCreateRestaurant(false);
                    } else {
                        this.setState({ error: 'Sorry we can\'t find your address'});
                    }
                }).catch(err => console.log('error occured while adding restaurant', err));

        }
    }

    closeModal() {
        this.setState({
            isModalOpen: false
        })
    }

    handleChange(ev){
        const name = ev.target.name;
        const value = ev.target.value;
        this.setState({ [name]: value });
    }

    handleClose(){
        const { showCreateRestaurant } = this.props;
        //this.closeModal();
        this.props.showCreateRestaurant(false);
    }

    render(){
        const { name, address, city, imageUrl, error, state } = this.state;

        return(
                    <div className="resto-modal create_resto">
                        <span onClick={this.handleClose}>Close</span>
                        <form onSubmit={this.handleSubmit}>
                            <input
                                type="text"
                                placeholder="name"
                                value={name}
                                name="name"
                                onChange={this.handleChange}
                            />
                            <input
                                type="text"
                                placeholder="Address"
                                value={address}
                                name="address"
                                onChange={this.handleChange}
                            />
                            <input
                                type="text"
                                placeholder="City"
                                value={city}
                                name="city"
                                onChange={this.handleChange}
                            />
                            <input
                                type="text"
                                placeholder="Optional Image url"
                                value={imageUrl}
                                name="imageUrl"
                                onChange={this.handleChange}
                            />
                            <button type="submit">Create Restaurant</button>
                        </form>
                        {error && <div>{error}</div>}
                    </div>

        );
    }
}

const mapStateToProps = state =>{
    return{
        places: state.places,
        newRestaurant: state.restaurant
    }
};

const mapDispatchToProps = dispatch =>{
    return bindActionCreators({
        showCreateRestaurant: showCreateRestaurant,
        addRestaurant: addRestaurant
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateResto);