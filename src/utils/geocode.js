const request = require('request');

const geoCode = (searchQuery, callback) => {
    let url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(searchQuery)}.json?access_token=pk.eyJ1Ijoic2hpdm05OSIsImEiOiJjbDF2NDR1YjMwdm5hM2txdjBzY3ZqMTNxIn0.W5RmntfIa0ZuRVJ44pVqEw`;
    request(
        { url, json: true },
        (error, response) => {
            if (error) {
                callback("Unable to connect to service", undefined);
            }
            else if (response.code || !response.body.features.length) {
                callback("Location Not found", undefined);
            }
            else {
                let {body} = response; //equivalent to response.body
                let coords = body.features[0].center;
                let lat = coords[1];
                let lng = coords[0];
                callback(undefined, {"Latitude": lat, "Longitude": lng, "location":  body.features[0].place_name})
            }
        },
    );
}

module.exports = geoCode