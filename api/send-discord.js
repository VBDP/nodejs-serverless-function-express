import axios from "axios";

export default async function handler(req, res) {
  try {
    // Tomamos message y webhook desde POST o GET
    const message = req.body?.message || req.query?.message;
    const webhook = req.body?.webhook || req.query?.webhook;

    if (!message || !webhook) {
      return res.status(400).json({ status: "error", error: "Faltan parámetros" });
    }

    // POST a Discord
    await axios.post(webhook, { content: message });

    // Respuesta OK
    return res.status(200).json({ status: "ok" });
  } catch (err) {
    console.error("Error en send-discord:", err?.message || err);
    // Retornamos 500 pero no crasheamos la función
    return res.status(500).json({ status: "error", error: err?.message || "Error desconocido" });
  }
}
