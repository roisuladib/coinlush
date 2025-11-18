export function formatCurrency(value: number | string | null, locale = 'US', currency = 'USD') {
  if (!value) return '';

  const formatter = new Intl.NumberFormat(locale, { style: 'currency', currency });

  return formatter.format(+value);
}
