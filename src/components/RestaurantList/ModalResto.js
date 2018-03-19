/* eslint-disable no-undef */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {showStreetView} from "../../actions";
//import axios from 'axios';
import isEqual from 'lodash.isequal';
import Image from './image';
import Reviews from '../reviews/Reviews'
import Stars from './Stars';
import UserReview from '../reviews/UserReview';
import './Listing/styles/style.css';






class Model extends Component{
    constructor(props){
        super(props);

        this.state = {
            modelOpen: false,
            reviews: []
        };

        this.toggleStreetView = this.toggleStreetView.bind(this);
        this.toggleReviews = this.toggleReviews.bind(this);
        this.renderReviews = this.renderReviews.bind(this);
    }

    componentWillReceiveProps(nextProps){
        const { place, newReview } = this.props;
        const { modelOpen, reviews } = this.state;

        if(!isEqual(nextProps.newReview, newReview) &&
        nextProps.newReview.place_id === place.place_id && modelOpen){
            const  reviewsClone = [...reviews];
            reviewsClone.unshift(nextProps.newReview);
            this.setState({ reviews: reviewsClone });
        }
        if(!isEqual(nextProps.place, place)){
            this.setState({ modelOpen: false, reviews: []});
        }
    }


    toggleReviews(){
        const { modelOpen, reviews } = this.state;
        const { place, userLocation } = this.props;

        this.setState({ modelOpen: !modelOpen});

        if(!modelOpen && place.rating && !reviews[0] && !place.sample){

            console.log('if condddddddd');

            this.props.service.getDetails({
                placeId: place.place_id
            }, (place, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    console.log('new google place reviwssssssssssss', place.reviews);
                    this.setState({ reviews: place.reviews });
                    // Intended behavior is to set this.setState({places.place.reviews})
                }
            });


            // axios.get(`https://maps.googleapis.com/maps/api/place/details/json?key=AIzaSyB48K7MnLGjHOLRg8YlZVgGg2kIj2zNrXU&place_id=${place.place_id}`)
            //     .then(res =>{
            //         console.log('reviewsssssssssss thenn', res.data.result.reviews.map(review => review.text));
            //         if(res.data && res.data.result && res.data.result.reviews && res.data.result.reviews.length){
            //             this.setState({ reviews: res.data.result.reviews });
            //         }
            //     }).catch(err => {
            //     console.log('reviewsssssssssss catchhhh', err);
            // })
        } else if(!modelOpen && place.sample && !reviews[0]){
            console.log('else condddddddd');
            this.setState({ reviews: place.ratings })
        }

    }

    toggleStreetView(){
        const { streetview, showStreetView, place } = this.props;
        streetview ? showStreetView(false) : showStreetView(place);
    }

    renderReviews(){
        const { modelOpen, reviews } = this.state;
        const { place } = this.props;
        if(modelOpen){
            if(reviews){
                console.log('got reviewss', reviews);
                return(
                    <Fragment>
                        <UserReview pid={place.place_id} />
                        <Reviews reviews={reviews} />
                    </Fragment>
                );
            }
            else if(!reviews.length){
                console.log('no reviewss');
                return(
                    <div>
                        No Reviews for {place.name} yet
                       <UserReview pid={place.place_id} />
                    </div>
                );

            }
        }
    }

    render(){
        const { place} = this.props;
        const { modelOpen } = this.state;
        const renderReviews = this.renderReviews();

        return(
            <div className="card">
                <Image place={place}/>

                <div className="card-text">
                    <h3 className="styles">{place.name}</h3>
                    {
                        place.rating && <Stars rating={place.rating} />
                    }
                    <p>Address: {place.vicinity}</p>
                    {/*<p>Address: {place.vicinity}</p>*/}
                    <button onClick={this.toggleStreetView}>Street View</button>
                    <button onClick={this.toggleReviews}>{modelOpen ? 'Hide' : 'Show'} Reviews</button>
                    {renderReviews}
                </div>
            </div>
        );
    }

}
const mapStateToProps = state =>{
    return { streetview: state.streetview, newReview: state.newReview }
};

const mapDispatchToProps = dispatch =>{
    return bindActionCreators({
        showStreetView: showStreetView
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Model);