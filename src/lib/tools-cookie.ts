import { createHmac, timingSafeEqual } from "node:crypto";

export const TOOLS_COOKIE = "nq_tools";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 400;

export function signToolAccess(email: string, secret: string, now = Date.now()): string {
  const payload = Buffer.from(
    JSON.stringify({ e: email, exp: now + MAX_AGE_SECONDS * 1000 }),
  ).toString("base64url");
  const sig = createHmac("sha256", secret).update(payload).digest("base64url");
  return `${payload}.${sig}`;
}

export function readToolToken(
  token: string | undefined,
  secret: string | undefined,
  now = Date.now(),
): { email: string } | null {
  if (!token || !secret) return null;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return null;
  const expected = createHmac("sha256", secret).update(payload).digest("base64url");
  const left = Buffer.from(sig);
  const right = Buffer.from(expected);
  if (left.length !== right.length || !timingSafeEqual(left, right)) return null;
  try {
    const parsed = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as {
      e?: unknown;
      exp?: unknown;
    };
    if (typeof parsed.e !== "string" || typeof parsed.exp !== "number") return null;
    if (parsed.exp <= now) return null;
    return { email: parsed.e };
  } catch {
    return null;
  }
}

export function toolCookieHeader(token: string, secure: boolean, clear = false): string {
  const parts = [
    `${TOOLS_COOKIE}=${clear ? "" : token}`,
    "HttpOnly",
    "SameSite=Lax",
    "Path=/",
    `Max-Age=${clear ? 0 : MAX_AGE_SECONDS}`,
  ];
  if (secure) parts.push("Secure");
  return parts.join("; ");
}
