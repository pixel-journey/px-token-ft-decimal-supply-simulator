# Worked examples — FT precision and supply

## createToken

`createToken("WAX", 8, 1_000_000_00000000n)` starts at supply 0, precision 8.

| Input | Result |
| --- | --- |
| precision 0 or 18 | ok |
| precision 19 or -1 | precision error |
| maxSupply 0 | maxSupply error |
| symbol `wax` (lowercase) | bad symbol |

## issue / retire

PXJ precision 4, max 100: issue 50 → 50; issue 101 → maxSupply; issue 0 → positive.

Issue 50, retire 20 → 30. Retire 31 → exceeds supply. Full retire to 0 allowed. Zero retire refused.

## wholeToAmount

| whole | precision | amount |
| --- | --- | --- |
| 1 | 4 | 10_000 |
| 1 | 8 | 100_000_000 |
| 1 | 0 | 1 |

`wholeToAmount(MAX_AMOUNT, 2)` throws. `canRepresentWhole(1n, 8)` true; `(MAX_AMOUNT, 2)` false.

**PXJ is always precision 8** in the Pixel Journey stack. This lab also exercises 0..18 for teaching bounds.
