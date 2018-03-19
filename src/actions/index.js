export const dispatchPlaces = places =>{
    return{
        type: 'PLACES',
        payload: places
    }
};

export const addReview = (text, rating, pid) =>{
    return{
        type: 'ADD_REVIEW',
        payload:{
            text: text,
            rating: rating,
            place_id: pid
        }
    }
};

export const addRestaurant = (restaurant = {}) =>{
    console.log('inside addd res actttt', restaurant)
    return{
        type: 'ADD_RESTAURANT',
        payload: restaurant
    }
};

export const showStreetView = isStreetView =>{
    return{
        type: 'STREETVIEW',
        payload: isStreetView
    }
};



export const showCreateRestaurant = ( showComponent = false ) =>{
    return{
        type: 'TOGGLE_RESTAURANT',
        payload: showComponent
    }
};