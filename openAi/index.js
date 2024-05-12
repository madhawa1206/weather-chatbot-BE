const OpenAI = require("openai");

/**
 * Function to interact with OpenAI's ChatGPT assistant to get a response.
 * @param {string} assistantId - OpenAI assistant ID.
 * @param {string} openaiApiKey - OpenAI API key.
 * @param {string} weatherData - Weather data for which summary is needed.
 * @param {string|null} previousThreadId - ID of the previous thread if exists.
 * @returns {Object} - Object containing response from the assistant or error message.
 */
async function getAssistantResponse(assistantId, openaiApiKey, weatherData, previousThreadId) {
  try {
    const openai = new OpenAI({
      apiKey: openaiApiKey,
    });

    /* ChatGpt can be used to create an assistant. But not necessary in this case */
    //  const assistant = await openai.beta.assistants.create({
    //     name: "Weather Summerier",
    //     instructions:
    //       `Need a summery of weather data given bellow`,
    //     tools: [{ type: "code_interpreter" }],
    //     model: "gpt-3.5-turbo",
    //   });


    // Create or retrieve thread based on previousThreadId
    const thread = (previousThreadId)
      ? await openai.beta.threads.retrieve(previousThreadId)
      : await openai.beta.threads.create();

    // Send message to the assistant
    await openai.beta.threads.messages.create(thread.id, {
      role: "user",
      content: `Please provide a brief summary of the weather forecast for the specified dates. Limit the summary to 2-3 sentences. Here are the weather details: ${weatherData}`,
    });

    // Create a new run in the thread
    const run = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: assistantId,
      instructions: "Please address the user as user",
    });

    let runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);

    // Wait until the run is completed or failed
    while (runStatus.status !== "completed") {
      await new Promise((resolve) => setTimeout(resolve, 5000));
      runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
      if (runStatus.status === "failed") {
        return { openAiExceedQuotaError: runStatus.last_error.message, threadId: thread.id }
      }
    }

    // Retrieve assistant's response from the thread
    const messages = await openai.beta.threads.messages.list(thread.id);
    const lastMessageForRun = messages.data
      .filter((message) => message.run_id === run.id && message.role === "assistant")
      .pop();

    return { response: lastMessageForRun, threadId: thread.id };
  } catch (error) {
    console.error('Error fetching assistant response:', error);
    throw error;
  }
}

module.exports = { getAssistantResponse };
