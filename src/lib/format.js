import { CURRENCY } from '../data/products';

const formatter = new Intl.NumberFormat('en-IE', {
  style: 'currency',
  currency: CURRENCY,
  maximumFractionDigits: 0,
});

/** 349 -> "€349" */
export const formatPrice = (amount) => formatter.format(amount);
