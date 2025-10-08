import axios from "axios";

const SERVER = process.env.EXPO_PUBLIC_AI_PROXY || "https://your-proxy.example.com";

export async function askAI(prompt: string) {
const res = await axios.post(`${SERVER}/ai`, { prompt });
return res.data;
}

