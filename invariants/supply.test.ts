import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  createToken,
  issue,
  retire,
  wholeToAmount,
  canRepresentWhole,
  MAX_AMOUNT,
} from "./supply.ts";

describe("createToken", () => {
  it("starts at zero supply", () => {
    const t = createToken("WAX", 8, 1_000_000_00000000n);
    assert.equal(t.supply, 0n);
    assert.equal(t.spec.precision, 8);
  });

  it("refuses precision above 18", () => {
    assert.throws(() => createToken("WAX", 19, 100n), /precision/);
  });

  it("refuses zero maxSupply", () => {
    assert.throws(() => createToken("WAX", 4, 0n), /maxSupply/);
  });
});

describe("issue / retire", () => {
  it("issues within maxSupply", () => {
    let t = createToken("PXJ", 4, 1_0000n);
    t = issue(t, 5000n);
    assert.equal(t.supply, 5000n);
  });

  it("refuses issue past maxSupply", () => {
    const t = createToken("PXJ", 4, 100n);
    assert.throws(() => issue(t, 101n), /maxSupply/);
  });

  it("retires and refuses over-retire", () => {
    let t = createToken("PXJ", 4, 100n);
    t = issue(t, 50n);
    t = retire(t, 20n);
    assert.equal(t.supply, 30n);
    assert.throws(() => retire(t, 31n), /exceeds supply/);
  });
});

describe("wholeToAmount", () => {
  it("scales by precision", () => {
    assert.equal(wholeToAmount(1n, 4), 10_000n);
    assert.equal(wholeToAmount(1n, 8), 100_000_000n);
    assert.equal(wholeToAmount(1n, 0), 1n);
  });

  it("refuses whole*scale past MAX_AMOUNT", () => {
    assert.throws(() => wholeToAmount(MAX_AMOUNT, 2), /MAX_AMOUNT/);
  });

  it("canRepresentWhole reflects the guard", () => {
    assert.equal(canRepresentWhole(1n, 8), true);
    assert.equal(canRepresentWhole(MAX_AMOUNT, 2), false);
  });
});
