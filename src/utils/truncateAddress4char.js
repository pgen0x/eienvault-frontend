export function truncateAddress4char(address) {
  return address.slice(0, 4) + '...' + address.slice(-4);
}
