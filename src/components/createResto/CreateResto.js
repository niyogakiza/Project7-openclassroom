import React, { Component } from 'react';
import axios from 'axios';
import './styleNew.css';
import {API_KEY} from "../../actions/Keys";
import {addRestaurant,showCreateRestaurant, dispatchPlaces} from "../../actions";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {createSampleRestaurant} from "../../helpers/Restaurant";
import Modal from "./Modal";
import { Button} from 'react-materialize';

class CreateResto extends Component{
    constructor(props){
        super(props);

        this.state = {
            name: '',
            address: '',
            city: '',
            imageUrl:'',
            error: ''
        }
    }

    handleSubmit=(ev)=>{
        ev.preventDefault();
        const { name, address, city, imageUrl} = this.state;
        const { dispatchPlaces , showCreateRestaurant, places } = this.props;

        if(name && address && city ){

            axios.post(`https://maps.googleapis.com/maps/api/geocode/json?address=${address},${city}&key=${API_KEY}`)
                .then((res) =>{
                    const geopoint = res.data.results[0];
                    if(geopoint){
                        const restaurant = createSampleRestaurant(name, geopoint, imageUrl);
                        //addRestaurant(restaurant);
                        showCreateRestaurant(false);
                        //console.log('updated placesssssss in createRestrooo', places.concat(restaurant))
                        dispatchPlaces(places.concat(restaurant));

                    } else {
                        this.setState({ error: 'Sorry we can\'t find your address'});
                    }
                }).catch(err => console.log('error occured while adding restaurant', err));


        }
    };

    closeModal() {
        this.setState({
            isModalOpen: false
        })
    }

    handleChange =(ev) =>{
        const name = ev.target.name;
        const value = ev.target.value;
        this.setState({ [name]: value });
    };

    handleClose = () =>{
        this.closeModal();
        this.props.showCreateRestaurant(false);
    };

    render(){
        const { name, address, city,error } = this.state;
        let state = this.state;

        return(
            <Modal  className="Modal" isOpen={state.isModalOpen} onClose={() => this.closeModal()}>
                <h4>Create A Restaurant</h4>
                <div className="row">
                    <div className="input-field col s6">
                        <Button onClick={this.handleClose}>Close</Button>
                        <form onSubmit={this.handleSubmit} className="col s12">
                            <input
                                id="icon_prefix"
                                form="icon_prefix"
                                className="validate"
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
                            <Button type="submit">Create</Button>
                            {error && <div>{error}</div>}
                        </form>
                    </div>

                </div>
            </Modal>

        );
    }
}

const mapStateToProps = state =>{
    return{
        places: state.places,
        addRestaurant: state.restaurant
    }
};

const mapDispatchToProps = dispatch =>{
    return bindActionCreators({
        showCreateRestaurant: showCreateRestaurant,
        addRestaurant: addRestaurant,
        dispatchPlaces: dispatchPlaces
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateResto);