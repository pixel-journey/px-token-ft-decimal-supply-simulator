# Tips — precision and supply design

## Product constants

- **PXJ product precision in this org is always 8.**  
- Display "1 token" is `10^precision` minor units (`wholeToAmount(1n, 8) === 100_000_000n`).  
- Prefer **bigint** for all amount math; never use JS `Number` near 2^62.

## Do

- Store and compute **minor units** only inside contracts.  
- Convert at the UI boundary with a fixed precision.  
- Cap max supply at `MAX_AMOUNT` (`2^62 - 1`).  
- Re-issue after retire is allowed by the counter model — document if product forbids it.

## Don't

- Call `issue(1n)` when the user said "one whole token" at precision 8.  
- Compare only the symbol letters and ignore precision (PXJ@4 ≠ PXJ@8).  
- Allow precision 19 or max supply 0.

## Common mistakes

1. Treating amount `100000000` as "100 million tokens" instead of 1 PXJ@8.  
2. Mixing precision 4 and 8 under the same symbol string.  
3. Using `Number` for MAX_AMOUNT checks ([dex tax](https://github.com/pixel-journey/px-token-dex-differentiated-tax) shows the collapse).  
4. Assuming this lab writes per-account balances (it does not).

## Nice-to-have extensions (not in this repo)

- Balance table ([ledger](https://github.com/pixel-journey/px-token-balance-ledger)).  
- Transfer tax on issue/retire paths.  
- Issuer auth + pause.  
- Dust thresholds at a given bps (`px-token-dust-truncation-visualizer` (private; not this public course)).

## Related

[ledger](https://github.com/pixel-journey/px-token-balance-ledger) · `px-token-dust-truncation-visualizer` (private; not this public course) · [dex tax](https://github.com/pixel-journey/px-token-dex-differentiated-tax) · [invariant-kit quantity](https://github.com/pixel-journey/px-invariant-kit)
