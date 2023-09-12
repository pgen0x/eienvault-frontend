export function parsingImagesIpfs(Uri) {
  return Uri.startsWith("ipfs") ? Uri.replace("ipfs://", "https://ipfs.io/ipfs/") : Uri;
}