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

  it("accepts precision 0 and 18", () => {
    assert.equal(createToken("AAA", 0, 100n).spec.precision, 0);
    assert.equal(createToken("BBB", 18, 100n).spec.precision, 18);
  });

  it("refuses precision above 18", () => {
    assert.throws(() => createToken("WAX", 19, 100n), /precision/);
  });

  it("refuses negative precision", () => {
    assert.throws(() => createToken("WAX", -1, 100n), /precision/);
  });

  it("refuses zero maxSupply", () => {
    assert.throws(() => createToken("WAX", 4, 0n), /maxSupply/);
  });

  it("refuses a bad symbol", () => {
    assert.throws(() => createToken("wax", 4, 100n), /bad symbol/);
  });
});

describe("issue / retire", () => {
  it("issues within maxSupply", () => {
    let t = createToken("PXJ", 4, 1_0000n);
    t = issue(t, 5000n);
    assert.equal(t.supply, 5000n);
  });

  it("issues exactly to maxSupply", () => {
    let t = createToken("PXJ", 4, 100n);
    t = issue(t, 100n);
    assert.equal(t.supply, 100n);
  });

  it("refuses issue past maxSupply", () => {
    const t = createToken("PXJ", 4, 100n);
    assert.throws(() => issue(t, 101n), /maxSupply/);
  });

  it("refuses zero issue", () => {
    const t = createToken("PXJ", 4, 100n);
    assert.throws(() => issue(t, 0n), /positive/);
  });

  it("retires and refuses over-retire", () => {
    let t = createToken("PXJ", 4, 100n);
    t = issue(t, 50n);
    t = retire(t, 20n);
    assert.equal(t.supply, 30n);
    assert.throws(() => retire(t, 31n), /exceeds supply/);
  });

  it("refuses zero retire", () => {
    let t = createToken("PXJ", 4, 100n);
    t = issue(t, 10n);
    assert.throws(() => retire(t, 0n), /positive/);
  });

  it("full retire leaves zero supply", () => {
    let t = createToken("PXJ", 4, 100n);
    t = issue(t, 40n);
    t = retire(t, 40n);
    assert.equal(t.supply, 0n);
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
