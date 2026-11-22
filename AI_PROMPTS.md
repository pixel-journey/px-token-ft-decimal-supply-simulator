# AI handoff — FT decimal supply simulator

## Agent tooling

```bash
git clone https://github.com/wharfkit/skill.git ~/.claude/skills/wharfkit
```

| Source | Role |
| --- | --- |
| [eosio.token](https://github.com/eosio/eosio.contracts) | Asset amount + symbol precision |
| [token ledger](https://github.com/pixel-journey/px-token-balance-ledger) | Conservation after units |
| [hybrid blend](https://github.com/pixel-journey/px-blend-hybrid-ft-plus-nft) | Refuses 4-decimal PXJ |

## Non-negotiables

1. **PXJ precision is always 8.** `wholeToAmount(1n, 8)` is `100_000_000n`.
2. This simulator allows precision **0–18** so students can see the mistake. Production PXJ does not.
3. Issuing `1` is one **minor unit**, not one whole token.
4. `MAX_AMOUNT` is `2^62 - 1`. Do not pass those magnitudes through JS `Number`.
5. Unit math ports; symbol and production precision policy do not.

## Prompt seeds

- "wholeToAmount(1n, 8) — what integer?"
- "Show why 1.0000 PXJ is refused in hybrid blend."
- "Port 1.0000 EOS (precision 4) without using PXJ's 100_000_000."
- "Refuse Number(MAX_AMOUNT)."

## Do not

- Change production PXJ to precision 4.
- Treat minor unit 1 as one whole token.
- Use JS Number for max amounts.
