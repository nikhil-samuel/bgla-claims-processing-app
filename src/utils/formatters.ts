/**
 * Formats a date string or Date object into a localized date string
 */
export const formatDate = (date: string | Date, options?: Intl.DateTimeFormatOptions): string => {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  // Default options for date formatting
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    ...options
  };
  
  return dateObj.toLocaleDateString(undefined, defaultOptions);
};

/**
 * Formats a number as currency with the specified currency symbol and decimal places
 */
export const formatCurrency = (
  amount: number, 
  currency = 'USD', 
  decimals = 2
): string => {
  if (amount === undefined || amount === null) return '';
  
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(amount);
};
