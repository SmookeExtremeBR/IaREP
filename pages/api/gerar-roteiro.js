import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const { nicho, tipo, tom, duracao } = req.body;

  if (!nicho || !tipo || !tom || !duracao) {
    return res.status(400).json({ error: "Parâmetros inválidos" });
  }

  const prompt = `Crie um roteiro de vídeo para TikTok/Reels com as seguintes características:
Nicho: ${nicho}
Tipo: ${tipo}
Duração: ${duracao} segundos
Tom de voz: ${tom}

Inclua:
- Um gancho inicial
- Corpo principal do vídeo
- Call to action final
- Sugestão de legenda com hashtags`;

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const roteiro = completion.data.choices[0].message.content;
    res.status(200).json({ roteiro });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao gerar roteiro" });
  }
}
