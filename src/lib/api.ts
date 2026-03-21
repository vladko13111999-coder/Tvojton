export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface ChatResponse {
  done: string;
  answer: string;
  reasoning: string;
  agent_name: string;
  success: string;
  blocks: Record<string, unknown>;
  status: string;
  uid: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://i5nrun-ci2ahz-7777.proxy.runpod.net";

export async function sendMessage(query: string): Promise<ChatResponse> {
  const response = await fetch(`${API_URL}/query`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      tts_enabled: false,
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: "Unknown error" }));
    throw new Error(error.error || `HTTP ${response.status}`);
  }

  return response.json();
}

export async function checkHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${API_URL}/health`);
    return response.ok;
  } catch {
    return false;
  }
}
