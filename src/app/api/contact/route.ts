import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sendContactMessage } from "@/lib/contact";

const bodySchema = z.object({
  name: z.string().min(1, "Name is required."),
  email: z.string().email("Please enter a valid email address."),
  role: z.enum(["customer", "provider"], {
    message: "Select Customer or Provider.",
  }),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

// --- In-memory rate limit (v1) ---
// Upgrade path: replace with Vercel KV + @vercel/kv for production.
// See https://vercel.com/docs/storage/vercel-kv
const rateMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5; // requests
const RATE_WINDOW_MS = 60_000; // 1 minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT) return false;
  entry.count += 1;
  return true;
}

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again in a minute." },
      { status: 429 },
    );
  }

  let parsed;
  try {
    const body = await request.json();
    parsed = bodySchema.safeParse(body);
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body." },
      { status: 400 },
    );
  }

  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    return NextResponse.json(
      { ok: false, fieldErrors },
      { status: 400 },
    );
  }

  const result = await sendContactMessage(parsed.data);

  if (!result.ok) {
    return NextResponse.json(
      { ok: false, error: result.error ?? "Failed to send message." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}