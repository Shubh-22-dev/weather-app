const axios = require('axios')

const geocode = async (address) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=<your-access-token>&limit=1'

    try {
        var res = await axios.get(url)
        return {
            location: res.data.features[0].place_name,
            latitude: res.data.features[0].center[1],
            longitude: res.data.features[0].center[0]
        };
    } catch {
        if (res.data.features.length === 0) {
            throw 'Unable to find location. Try changing search term!'
        }
        throw 'Unable to connect to location service!'
    }
}
module.exports = geocode