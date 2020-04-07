import { Price } from '../src/types';

export const parsePrice = (priceString: string): Price | null => {
  const matched = priceString.replace(/,/g, '').match(/([\d]+)x*\s(.+)/);
  return matched
    ? {
        amount: Number(matched[1]),
        currency: matched[2] || 'Bells',
      }
    : null;
};
