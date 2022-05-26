const request = require('request');
const forecast = (lat, lng, callback) => {
    url =
        `http://api.weatherstack.com/current?access_key=d205cc02c28c7237ea1fc3af0e380a84&query=${lat},${lng}&units=m`;
    // console.log(weatherUrl)
    request(
        { url, json: true },
        (error, response) => {
            if (error) {
                callback("Unable to connect to service", undefined)
            }
            else if (response.body.error) {
                callback("Location Not found",undefined);
            }
            else {
                let {body} = response;
                let data = body.current;
                callback(undefined, `It is currently ${data.temperature} degrees outside. It feels like ${data.feelslike} degrees out.`);
            }
        },
    );
}

module.exports = forecast