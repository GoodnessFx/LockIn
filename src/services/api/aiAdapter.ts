const SERVER = process.env.EXPO_PUBLIC_AI_PROXY || "https://your-proxy.example.com";

export async function askAI(prompt: string) {
  const res = await fetch(`${SERVER}/ai`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt }),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`AI proxy error ${res.status}: ${text}`);
  }
  return res.json();
}

