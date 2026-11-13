# Precision, max supply, and whole-unit scaling

> **Domain:** FT decimals / supply ceiling  
> **Sources:** [SOURCES.md](SOURCES.md)  
> **Path:** [TREASURY-TOKEN-LEARNING-PATH.md](https://github.com/pixel-journey/px-contract-examples-vault/blob/main/docs/TREASURY-TOKEN-LEARNING-PATH.md)

**Goal:** Teach **precision 0–18**, **maxSupply**, and **MAX_AMOUNT (2^62−1)** for issue/retire and whole-unit scaling. **PXJ uses precision 8.**

**Code under test:** `npm test`. Not a deployed `eosio.token`, not wasm.

## Learning materials

| Doc | Role |
| --- | --- |
| [EDUCATION.md](EDUCATION.md) | Course |
| [WORKED-EXAMPLES.md](WORKED-EXAMPLES.md) | Issue, scale, overflow |
| [TIPS.md](TIPS.md) | PXJ@8 |
| [SECURITY.md](SECURITY.md) | Bounds |
| [SOURCES.md](SOURCES.md) | Official |

## What is true (executed)

| Rule | Result |
| --- | --- |
| createToken | supply 0; precision 0–18 |
| issue / retire | maxSupply and supply gates |
| wholeToAmount(1, 4) | `10000n` |
| overflow scale | refused |

```bash
npm test
```

MIT — Pixel Journey
