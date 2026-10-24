export function formatCurrency(amount, currency = "USD") {
  const numericAmount = Number(amount) || 0;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: numericAmount % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(numericAmount);
}
