const openaiApiKey = process.env.OPENAI_API_KEY;

const Headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${openaiApiKey}`,
};

export async function fetchChatCompletion(query?: string) {
  const API_URL = "https://api.openai.com/v1/completions";
  // Define the properties and data for the API request
  const requestOptions = {
    method: "POST",
    headers: Headers,
    body: JSON.stringify({
      model: "text-davinci-003",
      prompt: query,
      max_tokens: 2048,
      temperature: 0.2,
      n: 1,
      stop: null,
    }),
  };

  try {
    const response = await (await fetch(API_URL, requestOptions)).json();
    return response.choices[0].text;
  } catch (error) {
    console.log(error);
  }
}

// import { Configuration, OpenAIApi } from "openai";

// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// const openai = new OpenAIApi(configuration);

// export async function fetchChatCompletion(query?: string) {
//   const res = await openai
//     .createCompletion({
//       model: "gpt-3.5-turbo",
//       prompt: query,
//       temperature: 0.9,
//       max_tokens: 3000,
//       frequency_penalty: 0,
//       presence_penalty: 0,
//     })
//     .then((res) => console.log(res.data.choices[0].text))
//     .catch((err) => console.warn(`Chat_GPT catch earr : ${err.message} `));
//   return res;
// }
