<h1>Chatbot Weather Assistant</h1>

<p>This project implements a chatbot weather assistant backend using Node.js. It utilizes OpenAI's ChatGPT for conversational AI and WeatherAPI for weather forecast data.</p>

<h2>Getting Started</h2>

<p>To get started with the project, follow these steps:</p>

<ol>
  <li>Clone the repository:</li>
</ol>

<pre><code>git clone &lt;https://github.com/madhawa1206/weather-chatbot-BE.git&gt;
</code></pre>

<ol start="2">
  <li>Install dependencies:</li>
</ol>

<pre><code>cd &lt;project-directory&gt;
npm install
</code></pre>

<ol start="3">
  <li>Set up environment variables:</li>
</ol>

<p>Copy the <code>.env-sample</code> file to <code>.env</code> and replace the placeholder values with your actual OpenAI and WeatherAPI keys.</p>

<ol start="4">
  <li>Start the server:</li>
</ol>

<pre><code>npm start
</code></pre>

<h2>Usage</h2>

<p>Once the server is running, you can interact with the chatbot via API endpoints to get weather forecast summaries.</p>

<h2>Environment Variables</h2>

<p>The following environment variables need to be set:</p>

<ul>
  <li><code>OPENAI_API_KEY</code>: Your OpenAI API key.</li>
  <li><code>OPENAI_ASSISTANT_ID</code>: Your OpenAI assistant ID.</li>
  <li><code>WEATHER_API_KEY</code>: Your WeatherAPI API key.</li>
  <li><code>WEATHER_API_ENDPOINT</code>: The endpoint for WeatherAPI.</li>
</ul>

<h2>Supported Node.js Version</h2>

<p>This project is tested and supported on Node.js version 20.</p>

<h2>Development</h2>

<p>During development, you can use the following command to start the server with hot reloading:</p>

<pre><code>npm run dev
</code></pre>

<h2>API Limits</h2>

<p>Please note that the WeatherAPI used in this project may have usage limits. The current implementation uses a 14-day trial version.</p>
