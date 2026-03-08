import axios from "axios";

export default async function handler(req, res) {
  // Tomamos message y webhook desde POST o GET
  const message = req.body?.message || req.query?.message;
  const webhook = req.body?.webhook || req.query?.webhook;

  if (!message || !webhook) {
    return res.status(400).json({ status: "error", error: "Faltan parámetros" });
  }

  try {
    await axios.post(webhook, { content: message });
    res.status(200).json({ status: "ok" });
  } catch (err) {
    console.error("Error enviando a Discord:", err);
    res.status(500).json({ status: "error", error: err.message });
  }
}
