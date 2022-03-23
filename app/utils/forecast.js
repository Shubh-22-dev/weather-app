const axios = require('axios')

const forecast = async (lat, long) => {
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=<your-access-token>&units=imperial`

    try {
        var res = await axios.get(url);

        let todayTemp = `Today's highest temperature is ${res.data.daily[0].temp.day} and lowest temperature is ${res.data.daily[0].temp.night}.`

        let result = `${res.data.current.weather[0].description}. It is currently ${res.data.current.temp} degrees out and  feels like ${res.data.current.feels_like}. There is a ${res.data.minutely[0].precipitation}% chance of rain. ${todayTemp}`

        return {
            result: result,
            icon: res.data.current.weather[0].icon
        }
    } catch (err) {
        if (res.data.error) {
            throw 'Unable to find location!'
        }
        throw 'Unable to connect to weather service!'
    }
}

module.exports = forecast