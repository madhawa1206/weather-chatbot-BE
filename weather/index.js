const axios = require('axios');

/**
 * Function to fetch weather forecast for a given location.
 * @param {string} location - Location for which weather forecast is needed.
 * @returns {Object} - Object containing weather forecast data and summary string.
 */
async function getWeatherForecast(location) {
    const weatherApiEndpoint = process.env.WEATHER_API_ENDPOINT;
    try {
        // Construct URL for weather API request
        const weatherApi = `${weatherApiEndpoint}?q=${location}&days=${process.env.DATE_DURATION}&key=${process.env.WEATHER_API_KEY}&hour=24&alerts=Disable&aqi=Disable&tp=24`;

        // Fetch weather data from the API
        const response = await axios.get(weatherApi);
        const weatherData = response.data.forecast.forecastday;

        // Remove unnecessary astro data from each forecast
        weatherData.forEach(item => {
            delete item.astro;
        });

        // Generate a summary string for the weather forecast
        const weatherSummaryStr = weatherData.map(item => `${item.date} weather ${item.day.condition.text}`).join(', ');

        return { weatherData, weatherSummaryStr };
    } catch (error) {
        // Handle errors from weather API
        if (error.response && error.response.data && error.response.data.error) {
            const errorMessage = error.response.data.error.message;
            return { weatherApiError: errorMessage };
        } else {
            // Log and throw other errors
            console.error('Error fetching weather data:', error);
            throw error;
        }
    }
}

module.exports = { getWeatherForecast };
