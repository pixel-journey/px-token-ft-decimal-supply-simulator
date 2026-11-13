# Worked examples — precision and max supply

## Example A — create

`createToken("PXJ", 8, 1_000_000_00000000n)` → supply 0, precision 8.

## Example B — issue to ceiling

Issue within maxSupply ok; one unit past max refused.

## Example C — retire

Cannot retire more than supply.

## Example D — whole units

`wholeToAmount(1n, 4) === 10000n`  
`wholeToAmount(1n, 8) === 100000000n` (PXJ-style)

## Example E — overflow guard

Large whole × high precision that exceeds MAX_AMOUNT (2^62−1) → refused.

## Example F — canRepresentWhole

Returns false when `wholeToAmount` would throw.
