# Tips — precision design

- **PXJ product precision in this org is always 8.**
- Display “1 token” is `10^precision` minor units.
- Prefer bigint for all amount math; never use JS `Number` near 2^62.
- Related: [dust](https://github.com/pixel-journey/px-token-dust-truncation-visualizer), [ledger](https://github.com/pixel-journey/px-token-balance-ledger).
