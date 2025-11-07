import { useCurrency } from '../context/CurrencyContext';

export const usePrice = () => {
  const { convertPrice } = useCurrency();
  
  const formatPrice = (price) => {
    return convertPrice(price);
  };

  return { formatPrice };
};
