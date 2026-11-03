# Education — precision, issue, and the asset cap

> **Rung:** `npm test` passes. There is no balance table and no wasm.  
> **The test is the rule.**

## What you should be able to do

| Level | After this file |
| --- | --- |
| Beginner | Turn 1 whole unit into 10000 minor units at precision 4, and into 1 at precision 0 |
| Intermediate | Issue and retire without crossing max supply or the current supply |
| Masterclass | Say why a display amount and an `eosio::asset` amount are not the same integer |

---

## Beginner — one scene

`createToken("WAX", 8, 1_000_000_00000000n)` starts at supply 0. Precision 19 throws. Max supply 0 throws.

`PXJ` at precision 4, max supply `10000n` (that is 1.0000 if you read the precision), issue `5000n`. Supply is 5000. Those 5000 are **minor units**, not "5000 whole tokens."

```text
wholeToAmount(1n, 4) = 10000n
wholeToAmount(1n, 8) = 100000000n
wholeToAmount(1n, 0) = 1n
```

Issue 101 against max 100 throws `exceeds maxSupply`. Issue 50 then retire 20 leaves 30. Retire 31 throws `exceeds supply`.

### Words

| Word | Meaning here |
| --- | --- |
| Precision | Integer 0..18. How many digits sit to the right of the display point |
| Amount | The integer the chain stores. Not the number a human reads |
| `MAX_AMOUNT` | `2^62 - 1` (`4611686018427387903`) |
| Max supply | A cap on `issue`, also ≤ `MAX_AMOUNT`, and not zero |

### Predict, then run

```bash
npm test
```

1. `wholeToAmount(MAX_AMOUNT, 2)` throws. `canRepresentWhole(MAX_AMOUNT, 2)` is false.
2. `canRepresentWhole(1n, 8)` is true.
3. Symbol `WAX` is accepted. Precision lives on the spec even though `issue` does not look at it again.

---

## Intermediate — what each function refuses

`createToken` checks symbol `^[A-Z]{1,7}$`, precision, then amount. Zero max supply fails after the amount check, with `maxSupply must be positive`.

`issue` refuses 0, a result above max supply, and a result above `MAX_AMOUNT`. The second check matters when max supply itself sits at the cap and the add would pass it. The test that students see first is the max-supply one (`101` into `100`).

`retire` refuses 0 and any amount above current supply. It does not change max supply. Retired units can be issued again until the max. The tests do not re-issue after a retire. The source allows it because supply is just a counter.

`wholeToAmount` multiplies by `10^precision`. If `whole > 0` and `scale > MAX_AMOUNT / whole`, it throws before the multiply. That is the overflow guard. Precision 2 on `MAX_AMOUNT` cannot fit.

There is no per-account balance. `issue` does not name a recipient.

### Attack → test

| Attack | Naive code | This lab | Test |
| --- | --- | --- | --- |
| Precision 19 | A symbol the asset type cannot hold | refused | `refuses precision above 18` |
| Max supply 0 | A token that can never issue, or a weird open mint | refused | `refuses zero maxSupply` |
| Issue past the published cap | Silent inflation | `exceeds maxSupply` | `refuses issue past maxSupply` |
| Retire more than exists | Supply wraps | `exceeds supply` | `retires and refuses over-retire` |
| Scale a huge whole unit | `whole * 10^precision` wraps | `whole*scale exceeds MAX_AMOUNT` | `refuses whole*scale past MAX_AMOUNT` |

---

## Masterclass — the human number is not the asset

A UI that lets someone type `1` and then calls `issue(state, 1n)` on a precision-4 token has issued `0.0001`, not one whole token. The function that matches the spoken sentence "issue 1 PXJ" is `issue(state, wholeToAmount(1n, spec.precision))`. The tests never compose those two calls. You have to.

Classic `eosio::asset` stores `amount` and `symbol` (code + precision) together. This lab stores them on a spec object and never checks that an incoming transfer's precision matches. A neighbor that only compares the letters `PXJ` will accept 4-decimal and 8-decimal amounts as if they were the same unit. `px-treasury-incoming-fee-splitter` is that letter check. Do not bolt them together without a precision compare.

`MAX_AMOUNT` is the educational stand-in for the asset ceiling (`2^62`, exclusive). It is not a JavaScript `Number`. See `px-token-dex-differentiated-tax` for the test that `Number(MAX_AMOUNT)` collapses with one past it. This file happens to use bigint throughout.

Still absent: a balance map, `require_auth` of an issuer, symbol-mismatch on retire, and wasm.

### Exercise

1. Precision 8, one whole unit, in minor units? (`100000000n`. Tested.)
2. Max supply 100, issue 50, retire 20. Supply? (30. Tested.) Can you issue 70 afterward? (Derived: yes, 30 + 70 = 100. The test does not do it.)
3. Why is precision 8 on the WAX create-token test unused by `issue`? (Issue only adds a bigint. Precision matters when you scale a display value.)

---

## What this course will not teach

- A wallet balance
- That `issue(1n)` means one whole token
- A deployed `eosio.token`
