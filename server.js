require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { getWeatherForecast } = require('./weather');
const { getAssistantResponse } = require('./openAi');

const app = express();
const port = process.env.PORT | 3000;

app.use(bodyParser.json());
app.use(cors());

// API endpoint to handle chatbot requests
app.post('/chat', async (req, res) => {
  const { assistantId, apiKey: openaiApiKey, location, previousThreadId } = req.body.message;

  let weatherData, weatherSummaryStr, weatherApiError;

  try {
    if (location) {
      ({ weatherData, weatherSummaryStr, weatherApiError } = await getWeatherForecast(location, assistantId, openaiApiKey));
    }

    const { response, threadId, openAiExceedQuotaError } = await getAssistantResponse(assistantId, openaiApiKey, weatherSummaryStr, previousThreadId);
    res.json({ response, weather: weatherData, threadId, weatherApiError, openAiExceedQuotaError});
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
