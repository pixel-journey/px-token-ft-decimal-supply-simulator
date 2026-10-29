# Education

## The pattern

Classic Antelope assets store amounts as integers with a fixed **precision**. Human “1.0000 TOKEN” at precision 4 is `10000` base units.

Two ceilings interact:

1. **maxSupply** — issuer policy
2. **MAX_AMOUNT** (`2^62 − 1` in this lab) — practical int64 asset headroom

High precision makes “one whole token” consume many base units. At some pairs of `(whole, precision)`, `whole * 10^precision` no longer fits.

## What the tests teach

- Issue stops at maxSupply even when MAX_AMOUNT is far away
- Retire cannot invent negative supply
- Scaling whole units must fail closed on overflow — not wrap

## Classroom prompts

1. At precision 18, how many whole tokens fit under MAX_AMOUNT?
2. Why is maxSupply=0 refused at create time?
3. How does this lab relate to dust truncation (different bug class)?
