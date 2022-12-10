import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prompt = req.body.prompt;
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `I want to take a vacation that matches this description: ${prompt}. Pick a destination for my vacation and give me a three day itinerary. For each day include a list of places as a comma separated list labelled "Places to Visit", and three restaurants as a comma separated list labelled "Restaurants".`,
    temperature: 0.7,
    max_tokens: 1024,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  res.status(201).json({ itinerary: response.data.choices[0].text });
}
