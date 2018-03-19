export const places = (state = [], action) =>{
    return action.type === 'PLACES' ? action.payload : state;
};

export const streetview = ( state = false, action) =>{
    return action.type === 'STREETVIEW' ? action.payload :state;
};


export const newReview = (state = false, action) =>{
    return action.type === 'ADD_REVIEW' ? action.payload : state;
};


export const sampleResto = (state = false, action) =>{
    //return action.type === 'TOGGLE_RESTAURANT' ? action.payload : state;
    if (action.type === 'TOGGLE_RESTAURANT'){
        console.log('state dataaaaaaa sample restro', state);
        return action.payload;
    } else  {
        return state;
    }
};

export const restaurant = (state = {}, action) =>{
    if (action.type === 'ADD_RESTAURANT'){
        console.log('state dataaaaaaa', state);
        return action.payload;
    } else  {
        return state;
    }
};