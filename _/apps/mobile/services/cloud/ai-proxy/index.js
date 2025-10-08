const express = require("express");
const axios = require("axios");
const app = express();
app.use(express.json());

app.post("/ai", async (req, res) => {
const { prompt } = req.body;
const resp = await axios.post("https://api.openai.com/v1/chat/completions", {
model: "gpt-4o-mini",
messages: [{ role: "user", content: prompt }]
}, { headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` } });
res.json(resp.data);
});

module.exports = app;

