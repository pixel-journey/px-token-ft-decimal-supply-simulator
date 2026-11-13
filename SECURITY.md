# Security notes — supply bounds

| Mitigated | Behavior |
| --- | --- |
| Precision outside 0..18 | refused |
| Issue past maxSupply / MAX_AMOUNT | refused |
| Retire past supply | refused |
| whole×scale overflow | refused |

Production: still need auth, open accounts, and real `eosio.token` (or equivalent) custody.
