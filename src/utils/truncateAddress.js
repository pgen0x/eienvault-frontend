export function truncateAddress(address) {
  return address.slice(0, 10) + '...' + address.slice(-4);
}
