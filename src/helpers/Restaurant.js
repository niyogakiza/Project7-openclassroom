export const createSampleRestaurant = (name, geopoint, imageUrl) =>{
    return{
        "place_id": Date.now() + Math.floor(Math.random() * 100),
       "icon": "http://www.myiconfinder.com/uploads/iconsets/256-256-56165014858e6dbadaf3ba00d782f125.png",
        "name": name,
        "vicinity": geopoint.formatted_address,
        "geometry": {
            "location":{
                "lat": function(){
                    return geopoint.geometry.location.lat;
                },
                "lng": function(){
                    return geopoint.geometry.location.lng;
                }
            }
        },
        "rating": null,
        "photo":[{
            "getUrl": function () {
                return imageUrl;
            }
        }]
    }
};

//'http://maps.google.com/mapfiles/arrow.png'