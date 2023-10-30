export const notNullable = <T>(value: T | undefined | null): value is T =>
  value !== undefined && value !== null;

export const isString = (value: unknown): value is string =>
  typeof value === 'string';
