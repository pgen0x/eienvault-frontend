export function truncateAddress4char(address) {
  if (address === null || address === undefined) return '';
  return address.slice(0, 4) + '...' + address.slice(-4);
}
