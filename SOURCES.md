# Sources

| Source | Use |
| --- | --- |
| [eosio.token](https://github.com/eosio/eosio.contracts) | Asset amount + symbol precision |
| [docs.wax.io](https://docs.wax.io/) | WAX development |
| [docs.eosnetwork.com](https://docs.eosnetwork.com/) | Asset type |

**Org policy:** PXJ precision is **always 8**. `wholeToAmount(1n, 8)` is `100_000_000n`. Issuing `1` is one minor unit, not one whole token.

This simulator allows precision **0–18** so students can see the mistake. Production PXJ does not.

`MAX_AMOUNT` is `2^62 - 1`. Do not pass those magnitudes through JS `Number`.

## Related labs

| Lab | Topic |
| --- | --- |
| [ledger](https://github.com/pixel-journey/px-token-balance-ledger) | sum(balances) === supply |
| [hybrid blend](https://github.com/pixel-journey/px-blend-hybrid-ft-plus-nft) | Refuses 4-decimal PXJ |
| [px-token-dust-truncation-visualizer](https://github.com/pixel-journey/px-token-dust-truncation-visualizer) | Floor tax at a fixed precision |
| [dex tax](https://github.com/pixel-journey/px-token-dex-differentiated-tax) | Bigint, not Number |
| `px-contract-examples-vault` (private; not this public course) | Units first |
