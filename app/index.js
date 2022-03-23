const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
var express = require('express')
const app = express()

var port  = process.env.PORT || 3000;

const getWeatherData = async (address) => {
    try {
        const {
            location,
            latitude,
            longitude
        } = await geocode(address)
        const weatherData = await forecast(latitude, longitude)
        return {
            location: location,
            weatherData: weatherData.result,
            icon: weatherData.icon
        };
    } catch (err) {
        return {
            weatherData: err
        };
    }
}
app.get('/weather', async (req, res) => {
    const address = req.query.q
    const result = await getWeatherData(address)
    res.json({
        result
    })
})

app.listen(port)