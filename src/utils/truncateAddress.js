export function truncateAddress(address) {
  if (address === null || address === undefined) return '';
  return address.slice(0, 10) + '...' + address.slice(-4);
}
