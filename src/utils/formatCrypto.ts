import BigNumber from 'bignumber.js';

/**
 * Format a cryptocurrency value with a specific precision.
 *
 * @param value - The value to format (number or string).
 * @param precision - The number of decimal places to include.
 * @returns The formatted cryptocurrency value as a string.
 */
export function formatCrypto(value: number | string, precision: number) {
   const multiplier = new BigNumber(10).pow(precision);
   const truncatedValue = new BigNumber(value)
      .times(multiplier)
      .integerValue(BigNumber.ROUND_FLOOR)
      .div(multiplier);

   return (
      truncatedValue.toFormat(0, BigNumber.ROUND_FLOOR) +
      '.' +
      truncatedValue.toFixed(precision).split('.')[1]
   );

   // return truncatedValue.toFixed(precision);
}
