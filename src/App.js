
import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import  GoogleMap from "./components/map/GoogleMap";
import Listing from "./components/RestaurantList/Listing/Listing";
import StreetView from "./components/streetView/StreetView";
import CreateResto from "./components/createResto/CreateResto";
import './App.css';
import {showCreateRestaurant} from "./actions";
import {bindActionCreators} from "redux";


class App extends Component{
    constructor(props){
        super(props);

        this.state = {
            userLocation: null,
            isModalOpen: false,

        };

        this.searchNearby = this.searchNearby.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount(){
        const getPosition = position =>{
            this.setState({
                userLocation:{
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                }
            })
        };

        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(getPosition, handleError.bind(this));

            function handleError(error){
                if(error.code && error.PERMISSION_DENIED){
                    this.setState({
                        userLocation:{
                            lat:'48.8534100',
                            lng: '2.3488000'
                        }
                    })
                }
            }
        }

    }

    openModal() {
        this.setState({
            isModalOpen: true,
        })
    }

    handleClick() {
        if (!this.props.streetview) {
            this.props.showCreateRestaurant(true);
            this.openModal();
        }
    }

    searchNearby(
        google,
        dispatchPlaces,
        map,
        center){
        const service = new google.maps.places.PlacesService(map);
        this.setState({service});
        const request = {
            location: center,
            radius: '1000',
            type: ['restaurant']
        };

        service.nearbySearch(request, (places, status, pagination) =>{
            if(status === google.maps.places.PlacesServiceStatus.OK){
                this.setState({ places: places });
                dispatchPlaces(places);
            }

        });

    }

    render(){
        const { userLocation, service } = this.state;
        const { places, streetview, sampleResto } = this.props;
        return(
            <Fragment>
                {streetview && <StreetView/>}
                <GoogleMap
                    handleClick={this.handleClick}
                    userLocation={userLocation}
                    searchNearby={this.searchNearby}
                    places={places}
                />

                <Listing
                    service={service}
                    places={places}
                    userLocation={userLocation}
                />
                {!streetview && sampleResto ? <CreateResto /> : ''}

            </Fragment>
        );
    }
}



const mapStateToProps = state =>{
    return{
        places: state.places,
        streetview: state.streetview,
        sampleResto: state.sampleResto
    }
};

const mapDispatchToProps = dispatch  =>{
    return bindActionCreators({
        showCreateRestaurant: showCreateRestaurant
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(App);