export function humanize(text: string): string {
  if (!text) return '';

  return text
    .replace(/[_-]+/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/([0-9])([A-Z])/g, '$1 $2')
    .replace(/\w\S*/g, w => w[0].toUpperCase() + w.slice(1));
}
