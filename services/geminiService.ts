import { GoogleGenAI, Type } from "@google/genai";
import type { Review, VibePairing } from "../types";

// Fix: Aligned with Gemini API guidelines by removing the 'as string' cast.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const schema = {
    type: Type.OBJECT,
    properties: {
        activity: {
            type: Type.OBJECT,
            properties: {
                name: { type: Type.STRING, description: "The name of the suggested activity." },
                description: { type: Type.STRING, description: "A short, compelling reason why this activity pairs well with the product." },
            },
            required: ["name", "description"],
        },
        music: {
            type: Type.OBJECT,
            properties: {
                album: { type: Type.STRING, description: "The name of a suggested album." },
                artist: { type: Type.STRING, description: "The artist of the suggested album." },
                description: { type: Type.STRING, description: "A short, compelling reason why this music pairs well with the product." },
            },
            required: ["album", "artist", "description"],
        },
        movie: {
            type: Type.OBJECT,
            properties: {
                title: { type: Type.STRING, description: "The title of a suggested movie or TV show." },
                year: { type: Type.INTEGER, description: "The release year of the movie." },
                description: { type: Type.STRING, description: "A short, compelling reason why this movie pairs well with the product." },
            },
             required: ["title", "year", "description"],
        },
    },
    required: ["activity", "music", "movie"],
};

export const generateVibePairing = async (review: Review): Promise<VibePairing> => {
    const prompt = `
        Based on the following cannabis product review, suggest a "vibe pairing". This includes one activity, one music album, and one movie or TV show that would complement the experience.

        Product Name: ${review.name}
        Strain Type: ${review.strain}
        Reported Effects: ${review.effects.join(', ')}
        Flavor Profile: ${review.flavors.join(', ')}
        Review Summary: ${review.summary}

        Generate a creative, fitting, and interesting pairing. Be specific with your suggestions. For example, instead of "a rock album", suggest a specific album by a specific artist.
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: schema,
                temperature: 0.8,
                topP: 0.9,
            },
        });
        
        const jsonText = response.text.trim();
        const parsedJson = JSON.parse(jsonText);

        // Basic validation to ensure the structure matches VibePairing
        if (
            parsedJson.activity &&
            parsedJson.music &&
            parsedJson.movie &&
            typeof parsedJson.activity.name === 'string' &&
            typeof parsedJson.music.album === 'string' &&
            typeof parsedJson.movie.title === 'string'
        ) {
            return parsedJson as VibePairing;
        } else {
            throw new Error("AI response did not match the expected format.");
        }

    } catch (error) {
        console.error("Error generating vibe pairing:", error);
        throw new Error("Failed to communicate with the Gemini API or parse its response.");
    }
};