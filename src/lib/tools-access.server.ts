import { getCookie, getRequestUrl } from "@tanstack/react-start/server";
import { TOOLS_COOKIE, readToolToken, signToolAccess, toolCookieHeader } from "./tools-cookie";
import { readToolHtml } from "./tools-files.server";
import {
  TOOLS_PRICE_ID,
  TOOLS_PRODUCT_KEY,
  isPaidToolsSession,
  toolFile,
  type ToolsCheckout,
} from "./tools-pass";

type StripeObject = {
  url?: string;
  id?: string;
  data?: StripeObject[];
  payment_status?: string | null;
  amount_subtotal?: number | null;
  amount_total?: number | null;
  currency?: string | null;
  livemode?: boolean | null;
  metadata?: { product?: string | null } | null;
  customer_details?: { email?: string | null } | null;
};
const NOT_READY = "Card payment is not switched on yet. Please try again later.";
const NOT_FOUND = "We could not find a paid order for that email. Use the email on your Stripe receipt.";
const START_FAILED = "We could not start the payment. Please try again.";
const CONFIRM_FAILED = "We could not confirm that payment. If you were charged, enter the email from your receipt.";

export function paymentsReady(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY?.trim());
}

export function readToolAccess(request?: Request): { email: string } | null {
  const secret = process.env.STRIPE_SECRET_KEY?.trim();
  const token = request ? cookieValue(request, TOOLS_COOKIE) : getCookie(TOOLS_COOKIE);
  return readToolToken(token, secret);
}

export function accessCookie(email: string, request: Request): string {
  const secret = process.env.STRIPE_SECRET_KEY?.trim();
  if (!secret) throw new Error("missing stripe secret");
  return toolCookieHeader(signToolAccess(email, secret), isSecure(request));
}

export function clearAccessCookie(request: Request): string {
  return toolCookieHeader("", isSecure(request), true);
}

export async function createCheckout(request: Request): Promise<{ url: string } | { message: string }> {
  const key = process.env.STRIPE_SECRET_KEY?.trim();
  if (!key) return { message: NOT_READY };
  const origin = siteOrigin(request);
  const body = new URLSearchParams();
  body.set("mode", "payment");
  body.set("line_items[0][price]", TOOLS_PRICE_ID);
  body.set("line_items[0][quantity]", "1");
  body.set("customer_creation", "always");
  body.set("metadata[product]", TOOLS_PRODUCT_KEY);
  body.set("success_url", `${origin}/api/tools/confirm?session_id={CHECKOUT_SESSION_ID}`);
  body.set("cancel_url", `${origin}/library?cancelled=1`);
  const session = await stripe(key, "POST", "/checkout/sessions", body);
  if (!session || typeof session.url !== "string") return { message: START_FAILED };
  return { url: session.url };
}

export async function confirmSession(
  sessionId: string,
): Promise<{ email: string } | { message: string }> {
  if (!/^cs_(live|test)_[A-Za-z0-9]+$/.test(sessionId)) return { message: CONFIRM_FAILED };
  const key = process.env.STRIPE_SECRET_KEY?.trim();
  if (!key) return { message: NOT_READY };
  const session = await stripe(key, "GET", `/checkout/sessions/${sessionId}`);
  if (!session) return { message: CONFIRM_FAILED };
  const email = paidEmail(session);
  if (!email) return { message: CONFIRM_FAILED };
  return { email };
}

export async function restoreByEmail(
  rawEmail: string,
): Promise<{ email: string } | { message: string }> {
  const email = normalizeEmail(rawEmail);
  if (!email) return { message: "Enter the email address you used at checkout." };
  const key = process.env.STRIPE_SECRET_KEY?.trim();
  if (!key) return { message: NOT_READY };
  const customers = await stripe(
    key,
    "GET",
    `/customers?email=${encodeURIComponent(email)}&limit=5`,
  );
  const list = Array.isArray(customers?.data) ? customers.data : [];
  for (const customer of list) {
    if (!customer || typeof customer.id !== "string") continue;
    const sessions = await stripe(
      key,
      "GET",
      `/checkout/sessions?customer=${encodeURIComponent(customer.id)}&limit=100`,
    );
    const rows = Array.isArray(sessions?.data) ? sessions.data : [];
    for (const row of rows) {
      const paid = paidEmail(row);
      if (paid) return { email: paid };
    }
  }
  return { message: NOT_FOUND };
}

export async function handleToolGet(name: string, request: Request): Promise<Response> {
  const file = toolFile(name);
  if (!file) return new Response("That tool is not on this site.", { status: 404 });
  if (!readToolAccess(request)) {
    return Response.redirect(new URL("/library", request.url), 302);
  }
  const html = readToolHtml(file);
  if (!html) return new Response("That tool is not on this site.", { status: 404 });
  return new Response(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "private, no-store",
      "x-robots-tag": "noindex",
    },
  });
}

function paidEmail(session: ToolsCheckout & { customer_details?: { email?: string | null } | null }): string | null {
  if (!isPaidToolsSession(session)) return null;
  const email = normalizeEmail(session.customer_details?.email ?? "");
  return email;
}

function normalizeEmail(value: string): string | null {
  const email = value.trim().toLowerCase();
  if (email.length < 3 || email.length > 200) return null;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return null;
  return email;
}

function cookieValue(request: Request, name: string): string | undefined {
  const header = request.headers.get("cookie");
  if (!header) return undefined;
  for (const part of header.split(";")) {
    const [key, ...rest] = part.trim().split("=");
    if (key === name) return decodeURIComponent(rest.join("="));
  }
  return undefined;
}

function isSecure(request: Request): boolean {
  return siteOrigin(request).startsWith("https://");
}

function siteOrigin(request: Request): string {
  try {
    return getRequestUrl({ xForwardedHost: true, xForwardedProto: true }).origin;
  } catch {
    return new URL(request.url).origin;
  }
}

async function stripe(
  key: string,
  method: "GET" | "POST",
  path: string,
  body?: URLSearchParams,
): Promise<StripeObject | null> {
  try {
    const response = await fetch(`https://api.stripe.com/v1${path}`, {
      method,
      headers: {
        Authorization: `Bearer ${key}`,
        ...(body ? { "content-type": "application/x-www-form-urlencoded" } : {}),
      },
      body,
    });
    const payload = (await response.json()) as StripeObject & { error?: { message?: string } };
    if (!response.ok) {
      console.error("stripe", path, payload?.error?.message ?? response.status);
      return null;
    }
    return payload;
  } catch (error) {
    console.error("stripe", path, error);
    return null;
  }
}
