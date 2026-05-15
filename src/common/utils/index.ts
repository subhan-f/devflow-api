/**
 * Returns `undefined` for empty strings and `null`, otherwise returns the value as-is.
 * Useful for normalising optional string fields before persisting.
 */
export function emptyToUndefined<T>(value: T | null | undefined): T | undefined {
  if (value === null || value === undefined) return undefined;
  if (typeof value === 'string' && value.trim() === '') return undefined;
  return value;
}

/** Picks a subset of keys from an object (type-safe alternative to lodash.pick). */
export function pick<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  return keys.reduce(
    (acc, key) => {
      if (key in obj) acc[key] = obj[key];
      return acc;
    },
    {} as Pick<T, K>,
  );
}

/** Omits a subset of keys from an object. */
export function omit<T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  const result = { ...obj };
  keys.forEach((key) => delete result[key]);
  return result as Omit<T, K>;
}
