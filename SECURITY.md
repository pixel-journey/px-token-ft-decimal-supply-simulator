# Security — FT decimal supply simulator

## Closed in tests

| Issue | Behavior |
| --- | --- |
| Precision outside 0..18 | refused |
| Issue past maxSupply / MAX_AMOUNT | refused |
| Retire past supply | refused |
| `wholeToAmount` overflow | refused |
| maxSupply 0 | refused |

**PXJ product precision in this org is always 8.** Display "1 token" is `100_000_000` minor units.

## Not closed (production)

| Concern | Guidance |
| --- | --- |
| Auth | Issuer-only issue/retire |
| Open accounts | Balance rows before first credit |
| Custody | Real `eosio.token` (or equivalent) |
| Symbol + precision pair | PXJ@4 ≠ PXJ@8 |
| JS Number near 2^62 | Use bigint always |

## Attack angles

1. Calling `issue(1)` when the user meant one whole token at precision 8.
2. Mixing precision 4 and 8 under the same symbol string.
3. Using `Number(MAX_AMOUNT)` for cap checks ([dex tax](https://github.com/pixel-journey/px-token-dex-differentiated-tax) shows the collapse).
4. Assuming this lab writes per-account balances (it does not).

## Honesty limits

Supply counter only. Related: [ledger](https://github.com/pixel-journey/px-token-balance-ledger) · `px-token-dust-truncation-visualizer` (private; not this public course).
