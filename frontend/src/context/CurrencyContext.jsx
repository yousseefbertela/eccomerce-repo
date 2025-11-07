import { createContext, useContext, useState } from 'react';

const CurrencyContext = createContext();

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within CurrencyProvider');
  }
  return context;
};

const CURRENCIES = {
  USD: { symbol: '$', rate: 1, label: 'USD' },
  EUR: { symbol: '€', rate: 0.92, label: 'EUR' },
  GBP: { symbol: '£', rate: 0.79, label: 'GBP' },
};

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState('USD');

  const convertPrice = (price) => {
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    const converted = numPrice * CURRENCIES[currency].rate;
    return `${CURRENCIES[currency].symbol}${converted.toFixed(2)}`;
  };

  const changeCurrency = (newCurrency) => {
    if (CURRENCIES[newCurrency]) {
      setCurrency(newCurrency);
    }
  };

  const value = {
    currency,
    currencies: Object.keys(CURRENCIES),
    currencySymbol: CURRENCIES[currency].symbol,
    currencyLabel: CURRENCIES[currency].label,
    convertPrice,
    changeCurrency,
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};
