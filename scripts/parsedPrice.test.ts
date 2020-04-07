import { parsePrice } from './parsePrice';

test('parsePrice parses prices correctly', () => {
  expect(parsePrice('N/A')).toBe(null);
  expect(parsePrice('*')).toBe(null);
  expect(parsePrice('* Bells')).toBe(null);
  expect(parsePrice('N/A Bells')).toBe(null);
  expect(parsePrice('*Nook Miles')).toBe(null);
  expect(parsePrice('1,000 Bells')).toEqual({
    amount: 1000,
    currency: 'Bells',
  });
  expect(parsePrice('5,000 Nook Miles')).toEqual({
    amount: 5000,
    currency: 'Nook Miles',
  });
  expect(parsePrice('3x Peacock butterflies')).toEqual({
    amount: 3,
    currency: 'Peacock butterflies',
  });
});
