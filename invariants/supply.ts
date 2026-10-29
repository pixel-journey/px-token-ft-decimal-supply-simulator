/**
 * FT decimal + max-supply lab (educational).
 * Models classic int64 asset bounds without deploying eosio.token.
 */

/** Antelope-style asset amount ceiling used in this lab. */
export const MAX_AMOUNT = 4_611_686_018_427_387_903n; // 2^62 - 1

export type TokenSpec = {
  symbol: string;
  /** Decimal places 0..18 inclusive */
  precision: number;
  maxSupply: bigint;
};

export type TokenState = {
  spec: TokenSpec;
  supply: bigint;
};

const SYMBOL = /^[A-Z]{1,7}$/;

export function assertPrecision(precision: number): number {
  if (!Number.isInteger(precision) || precision < 0 || precision > 18) {
    throw new Error("precision must be an integer from 0 to 18");
  }
  return precision;
}

export function assertSymbol(symbol: string): string {
  if (!SYMBOL.test(symbol)) throw new Error("bad symbol");
  return symbol;
}

export function assertAmount(amount: bigint): bigint {
  if (typeof amount !== "bigint") throw new Error("amount must be bigint");
  if (amount < 0n) throw new Error("amount must not be negative");
  if (amount > MAX_AMOUNT) throw new Error("amount exceeds MAX_AMOUNT");
  return amount;
}

/**
 * Create a token spec. maxSupply must be > 0 and <= MAX_AMOUNT.
 */
export function createToken(
  symbol: string,
  precision: number,
  maxSupply: bigint
): TokenState {
  assertSymbol(symbol);
  assertPrecision(precision);
  assertAmount(maxSupply);
  if (maxSupply === 0n) throw new Error("maxSupply must be positive");
  return { spec: { symbol, precision, maxSupply }, supply: 0n };
}

/** Issue into circulation; refuses past maxSupply or MAX_AMOUNT. */
export function issue(state: TokenState, amount: bigint): TokenState {
  assertAmount(amount);
  if (amount === 0n) throw new Error("issue amount must be positive");
  const next = state.supply + amount;
  if (next > state.spec.maxSupply) throw new Error("exceeds maxSupply");
  if (next > MAX_AMOUNT) throw new Error("exceeds MAX_AMOUNT");
  return { ...state, supply: next };
}

/** Retire from circulation; refuses more than supply. */
export function retire(state: TokenState, amount: bigint): TokenState {
  assertAmount(amount);
  if (amount === 0n) throw new Error("retire amount must be positive");
  if (amount > state.supply) throw new Error("exceeds supply");
  return { ...state, supply: state.supply - amount };
}

/**
 * Scale a whole-unit display count into integer amount units.
 * whole=1, precision=4 → 10000n. Refuses overflow past MAX_AMOUNT.
 */
export function wholeToAmount(whole: bigint, precision: number): bigint {
  assertPrecision(precision);
  if (typeof whole !== "bigint" || whole < 0n) throw new Error("whole must be a non-negative bigint");
  let scale = 1n;
  for (let i = 0; i < precision; i++) scale *= 10n;
  // overflow guard: whole * scale <= MAX_AMOUNT
  if (whole > 0n && scale > MAX_AMOUNT / whole) {
    throw new Error("whole*scale exceeds MAX_AMOUNT");
  }
  return whole * scale;
}

/** True if this precision can represent at least `whole` whole units under MAX_AMOUNT. */
export function canRepresentWhole(whole: bigint, precision: number): boolean {
  try {
    wholeToAmount(whole, precision);
    return true;
  } catch {
    return false;
  }
}
