import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { isPaidToolsSession } from "./tools-pass.ts";
import { readToolToken, signToolAccess } from "./tools-cookie.ts";

describe("tool access cookie", () => {
  it("round-trips the checkout email", () => {
    const token = signToolAccess("ada@example.com", "secret", 1_000);
    assert.deepEqual(readToolToken(token, "secret", 1_000), { email: "ada@example.com" });
  });

  it("rejects a tampered token, the wrong secret, and an expired token", () => {
    const token = signToolAccess("ada@example.com", "secret", 1_000);
    assert.equal(readToolToken(`${token}x`, "secret", 1_000), null);
    assert.equal(readToolToken(token, "other", 1_000), null);
    assert.equal(readToolToken(token, "secret", Date.now() + 10_000_000_000), null);
  });
});

describe("isPaidToolsSession", () => {
  const paid = {
    payment_status: "paid",
    amount_subtotal: 4900,
    amount_total: 4900,
    currency: "usd",
    livemode: true,
    metadata: { product: "novaqi-browser-tools" },
  };

  it("accepts the live $49 payment, including tax added on top", () => {
    assert.equal(isPaidToolsSession(paid), true);
    assert.equal(isPaidToolsSession({ ...paid, amount_total: 5390 }), true);
  });

  it("rejects unpaid, test-mode, or differently priced sessions", () => {
    assert.equal(isPaidToolsSession({ ...paid, payment_status: "unpaid" }), false);
    assert.equal(isPaidToolsSession({ ...paid, livemode: false }), false);
    assert.equal(isPaidToolsSession({ ...paid, amount_subtotal: 2900, amount_total: 2900 }), false);
    assert.equal(isPaidToolsSession({ ...paid, metadata: { product: "other" } }), false);
  });
});
