const request = require('request')
const geocode = (location, callback) => {
    const geocodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + location + '.json?access_token=pk.eyJ1IjoiZmFyYWgxMjMiLCJhIjoiY2tpb3ZrNnE4MDB0cjJ0cDlzZXZ5eHQ5dSJ9.F6mgRF14yRJ6WN9JqtpWtw'

    request({ url: geocodeUrl, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connecnt to location service', undefined)
        }
        else if (response.body.message) {
            callback('Please login', undefined)
        }
        else if (response.body.features.length == 0) {
            callback('Unable to find location.. Please try again', undefined)
        }
        else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longtiude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}


module.exports = geocode