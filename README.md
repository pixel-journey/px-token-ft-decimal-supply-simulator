# px-token-ft-decimal-supply-simulator

> **Trust:** private educational lab (Tier A)  
> **Quest:** 112 — FT decimal / supply ceiling lab  
> **Vault:** [px-contract-examples-vault](https://github.com/pixel-journey/px-contract-examples-vault)

**One-sentence goal:** Teach **precision 0–18**, **maxSupply**, and **MAX_AMOUNT (2^62−1)** bounds for issue/retire and whole-unit scaling — with real tests.

**Real code:** `npm test`. **Not** a deployed `eosio.token`, **not** wasm.

---

## What is true (executed)

| Rule | Result |
|------|--------|
| `createToken` | supply starts at 0; precision 0–18; maxSupply > 0 |
| `issue` | within maxSupply; past max refused |
| `retire` | cannot exceed supply |
| `wholeToAmount(1, 4)` | `10000n` |
| `wholeToAmount` overflow | refused against MAX_AMOUNT |

```bash
npm test
```

---

## Layout

| Path | Role |
|------|------|
| `invariants/supply.ts` | create / issue / retire / scale |
| `invariants/supply.test.ts` | Executed claims |
| `EDUCATION.md` | Why precision hits the int64 ceiling |
| `SECURITY.md` | Supply and overflow surface |

Related: `px-token-dust-truncation-visualizer`, `px-token-dex-differentiated-tax`.

## License

MIT — Pixel Journey
