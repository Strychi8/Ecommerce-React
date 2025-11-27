// Utilidades de formato reutilizables
export function parsePrice(value) {
  if (value == null) return 0;
  const cleaned = String(value).trim().replace(/\./g, '').replace(',', '.');
  const num = Number(cleaned);
  return Number.isFinite(num) ? num : 0;
}

const moneyFormatter = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 });

export function formatMoney(value) {
  const n = Math.round(parsePrice(value));
  return moneyFormatter.format(n);
}

export function formatDateShort(iso) {
  if (!iso) return '-';
  try {
    const date = new Date(iso);
    return new Intl.DateTimeFormat('es-AR', { day: '2-digit', month: '2-digit', year: '2-digit' }).format(date);
  } catch {
    return '-';
  }
}
