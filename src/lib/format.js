import { CURRENCY } from '../data/products';

const whole = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: CURRENCY,
  maximumFractionDigits: 0,
});

const cents = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: CURRENCY,
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/** 449.99 -> "$449.99"; 39 -> "$39" */
export const formatPrice = (amount) => (Number.isInteger(amount) ? whole : cents).format(amount);
