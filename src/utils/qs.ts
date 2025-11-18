type QueryValue = string | number | boolean | null | undefined;
type QueryArray = QueryValue[];
type QueryObject = Record<string, QueryValue | QueryArray>;

export function stringifyArray(key: string, values: QueryArray): string {
  if (!values.length) return '';

  return values
    .filter(v => v != null && v !== '')
    .map(v => `${key}[]=${encodeURIComponent(String(v))}`)
    .join('&');
}

export function stringify(obj: QueryObject | null | undefined): string {
  if (!obj || typeof obj !== 'object') return '';

  return Object.entries(obj)
    .filter(([_, value]) => value != null && value !== '')
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return stringifyArray(key, value);
      }
      return `${key}=${encodeURIComponent(String(value))}`;
    })
    .filter(Boolean)
    .join('&');
}
