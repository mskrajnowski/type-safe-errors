import { Result } from 'type-safe-errors';
import { payForProduct } from './pay';
import { MissingPriceError, InvalidCVCError } from './types';

const userCard = {
  number: '1234',
  cvc: Math.random() > 0.5 ? '456' : '',
};

const product = {
  price: Math.random() > 0.5 ? 12.5 : null,
};

const paymentResult = Result.from(() => payForProduct(userCard, product))
  .mapErr(InvalidCVCError, () => {
    return 'Your card do not have proper CVC code';
  })
  .mapErr(MissingPriceError, () => {
    return 'Product do not have price';
  });

paymentResult.promise().then((resultText) => console.log(resultText));
