export function formatMoney(number) {
  if (typeof number === "string") {
    number = parseInt(number);
  }

  const formattedNumber = number.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  if (number < 0) {
    return `(${formattedNumber})`;
  }
  return formattedNumber;
}

export const convertCurrencyToInteger = (currency) => {
  return Number(currency.replace(/[^0-9.-]+/g, ""));
};
