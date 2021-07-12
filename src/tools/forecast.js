const request = require('request')
const forecast = (latitude, longtiude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=e818390445c98dfad0da1c00a33ad9f8&query=' + latitude + ',' + longtiude

    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect waether stack service!!', undefined)
        }
        else if (response.body.error) {
            callback('Unable to find location', undefined)
        }
        else {
            callback(undefined, 'In ' + response.body.location.country + ' It is now ' + response.body.current.temperature + ' degrees. It is ' + response.body.current.weather_descriptions[0])
        }
    })
}

module.exports = forecast