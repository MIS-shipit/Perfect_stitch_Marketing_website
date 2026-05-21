interface ContactPayload {
  name: string;
  email: string;
  role: "customer" | "provider";
  message: string;
}

interface ContactResult {
  ok: boolean;
  error?: string;
}

export async function sendContactMessage(
  payload: ContactPayload,
): Promise<ContactResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return { ok: false, error: "Server misconfiguration: missing Resend API key." };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Perfect Stitch Contact <contact@perfectstitch.online>",
        to: ["support@perfectstitch.online"],
        replyTo: payload.email,
        subject: `[Perfect Stitch Contact] ${payload.name} (${payload.role})`,
        text: payload.message,
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      return { ok: false, error: `Resend error (${res.status}): ${body}` };
    }

    return { ok: true };
  } catch {
    return { ok: false, error: "Network error contacting email service." };
  }
}