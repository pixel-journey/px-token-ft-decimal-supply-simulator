# Security notes

| Issue | Lab mitigation |
|-------|----------------|
| Issue past maxSupply | refused |
| Retire past supply | refused |
| Amount > MAX_AMOUNT | refused |
| Precision outside 0–18 | refused |
| whole×scale overflow | refused |

Production tokens still need authority checks (`issuer` / `require_auth`), symbol code identity, and transfer rules — see hardened token and tax quests.
