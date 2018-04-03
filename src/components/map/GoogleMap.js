/* eslint-disable no-undef */
import React, {Component, Fragment} from 'react'
import isEqual from 'lodash.isequal'
import {API_KEY} from "../../actions/Keys"
import {Map, Marker, GoogleApiWrapper} from "google-maps-react"
import { connect } from 'react-redux'
import {bindActionCreators} from "redux";
import {dispatchPlaces, showCreateRestaurant } from "../../actions/index"
import restaurant from "../../helpers/SampleResto"

import './styleG.css'




class GoogleMap extends Component {
    constructor(props){
        super(props);

        this.state = {
            userLocation: null,
            isReady: false,
            samplePlaces: restaurant
        };
        this.fetchPlaces = this.fetchPlaces.bind(this);
        this.movedCenter = this.movedCenter.bind(this);
        this.searchNearby = this.searchNearby.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }




    componentWillReceiveProps(nextProps){
        const { userLocation } = this.props;
        const { samplePlaces } = this.state;
        if(!isEqual(nextProps.userLocation, userLocation)){
            this.setState({ userLocation: nextProps.userLocation});
        }

          if(Object.keys(nextProps.sampleResto)[0]){
             const samplePlacesClone = [...samplePlaces];
             samplePlacesClone.unshift(nextProps.sampleResto);
             this.setState({samplePlaces: samplePlacesClone})
         }
    }



    fetchPlaces(mapProps, map){
        this.setState({ isReady: true });
        this.searchNearby(map, map.center);

    }



    searchNearby(map, center) {
        const { google, dispatchPlaces } = this.props;
        this.props.searchNearby(google, dispatchPlaces, map, center);
    }


    movedCenter(mapProps, map){
        const { isReady } = this.state;
        if(isReady){
            this.searchNearby(map, map.center);

        }
    }

    handleClick() {
        this.props.handleClick();
    }

    render(){
        const{ google, places} = this.props;
        const { userLocation,samplePlaces} = this.state;

        return(
            <Fragment>
                {userLocation && google ?
                    <Map
                        className='map'
                        google={google}
                        initialCenter={userLocation}
                        zoom={12}
                        onReady={this.fetchPlaces}
                        onClick={this.handleClick}
                        onDragend={this.movedCenter}
                    >

                        <Marker
                            title={'Your location!'}
                            name={'currentLocation'}
                            position={userLocation}
                            icon={{
                                url: userLocation,
                                anchor: new google.maps.Point(20,20),
                                scaledSize: new google.maps.Size(40,40)
                            }}
                        />

                        {console.log('all first placesssssssss', places)}


                        {places[0] &&
                            places.map((place, i) => {
                            return (
                            <Marker
                            visible={true}
                            key={i}
                            title={place.name}
                            name={place.name}
                            position={{
                            lat: place.geometry.location.lat(),
                            lng: place.geometry.location.lng()
                        }}

                            icon={{
                            url: place.icon,
                            anchor: new google.maps.Point(20, 20),
                            scaledSize: new google.maps.Size(40, 40)

                        }}
                            />
                            );
                        })
                        }

                        {/*{console.log('all second placesssssssss', samplePlaces)}*/}

                        {
                            samplePlaces[0] &&
                            samplePlaces.map((place, i) => {
                            return (
                                <Marker
                                    visible={true}
                                    key={i}
                                    title={place.name}
                                    name={place.name}
                                    position={{
                                        lat: place.geometry.location.lat,
                                        lng: place.geometry.location.lng
                                    }}
                                    icon={{
                                        url: place.icon,
                                        anchor: new google.maps.Point(20,20),
                                        scaledSize: new google.maps.Size(40, 40)
                                    }}
                                />

                            );
                        })
                        }
                    </Map> :<div id="loading-wrapper">
                        <div id="loading-text">Loading Map..</div>
                        <div id="loading-content"></div>
                    </div>



                }
            </Fragment>

        )
    }


}

const mapStateToProps = state =>{
    return { sampleResto: state.sampleResto };
};

const mapDispatchToProps = dispatch  =>{
    return bindActionCreators({
        dispatchPlaces: dispatchPlaces,
        showCreateRestaurant: showCreateRestaurant
    }, dispatch);
};

export  default connect(mapStateToProps, mapDispatchToProps)(GoogleApiWrapper({
    apiKey: API_KEY,
    version: '3'
})(GoogleMap));








