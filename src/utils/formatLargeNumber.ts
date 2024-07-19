import { formatCurrency, Locale } from './formatCurrency';

export function formatLargeNumber(value: number, locale?: Locale, currencyCode?: string) {
   const suffixes = [
      '',
      'juta',
      'miliar',
      'triliun',
      'kuadriliun',
      'kuintiliun',
      'sekstiliun',
      'septiliun',
      'oktiliun',
      'noniliun',
      'desiliun',
   ];
   const suffixIndex = Math.floor(Math.log10(Math.abs(value)) / 3); // Tidak perlu dikurangi 1

   let scaledAmount = value / Math.pow(1000, suffixIndex);

   // Penanganan khusus untuk angka di bawah 1
   if (value < 1_000_000) {
      const decimalPlaces = Math.max(0, -Math.floor(Math.log10(Math.abs(value))));
      scaledAmount = +(value * 100).toFixed(decimalPlaces);
   }

   // Format angka dengan pemisah ribuan sesuai locale
   const formattedScaledAmount = scaledAmount.toLocaleString(locale, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
   });

   // Penanganan khusus untuk angka di bawah 1 juta
   if (suffixIndex === 0) {
      return formatCurrency(value, locale);
   }

   return `${formattedScaledAmount} ${suffixes[suffixIndex]}`;
}
