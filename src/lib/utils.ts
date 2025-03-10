
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Helper function to format currency values as Indonesian Rupiah
export function formatCurrency(value: number, options?: Intl.NumberFormatOptions): string {
  const defaultOptions: Intl.NumberFormatOptions = {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    currencyDisplay: 'symbol',
    ...options
  };
  
  // Format using Intl.NumberFormat
  const formatted = new Intl.NumberFormat('id-ID', defaultOptions).format(value);
  
  // Replace the default "Rp" with "Rp." as requested
  return formatted.replace('Rp', 'Rp.');
}
