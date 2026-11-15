# Worked examples — FT precision and supply bounds

## createToken

Starts at supply **0**. Precision **0** and **18** accepted; **19** and **-1** refused. Zero maxSupply refused. Symbol must match uppercase style (`wax` fails).

## issue / retire

| Op | Result |
| --- | --- |
| issue 5000 of max 10000 | supply 5000 |
| issue exactly max | ok |
| issue 101 of max 100 | maxSupply |
| issue 0 | positive |
| issue 50, retire 20 | supply 30 |
| retire 31 of 30 | exceeds supply |
| full retire | supply 0 |

## wholeToAmount

| whole | precision | amount |
| --- | --- | --- |
| 1 | 4 | 10_000 |
| 1 | 8 | 100_000_000 |
| 1 | 0 | 1 |

`wholeToAmount(MAX_AMOUNT, 2)` refuses. `canRepresentWhole(1, 8)` true; `canRepresentWhole(MAX_AMOUNT, 2)` false.

PXJ product convention remains precision **8** in other labs; this simulator explores the full 0–18 range safely against `MAX_AMOUNT`.
