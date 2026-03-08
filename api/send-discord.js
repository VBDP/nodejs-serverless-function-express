// api/send-discord.js
import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Solo POST permitido");
  }

  const { message, webhook } = req.body;

  if (!message || !webhook) {
    return res.status(400).send("Faltan parámetros");
  }

  try {
    await axios.post(webhook, { content: message });
    res.status(200).json({ status: "ok" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", error: err.message });
  }
}
