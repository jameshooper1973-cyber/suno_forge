export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.HF_TOKEN;
  if (!apiKey) {
    return res.status(500).json({ error: 'HF_TOKEN not set in Vercel environment variables' });
  }

  const { prompt } = req.body || {};
  if (!prompt) {
    return res.status(400).json({ error: 'prompt is required' });
  }

  try {
    const response = await fetch(
      'https://api-inference.huggingface.co/models/Qwen/Qwen2.5-7B-Instruct/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'Qwen/Qwen2.5-7B-Instruct',
          max_tokens: 800,
          temperature: 0.9,
          stream: false,
          messages: [{ role: 'user', content: prompt }]
        })
      }
    );

    let data;
    try { data = await response.json(); }
    catch { return res.status(502).json({ error: 'HuggingFace returned unparseable response' }); }

    if (!response.ok) {
      return res.status(response.status).json({ error: data?.error || `HuggingFace error ${response.status}` });
    }

    const lyrics = data.choices?.[0]?.message?.content || '';
    if (!lyrics) return res.status(502).json({ error: 'No lyrics returned' });

    return res.status(200).json({ lyrics });

  } catch (err) {
    return res.status(503).json({ error: 'Could not reach HuggingFace: ' + err.message });
  }
}
