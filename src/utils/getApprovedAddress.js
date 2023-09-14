import { marketplaceABI } from '@/hooks/eth/Artifacts/Marketplace_ABI';

export async function getApprovedAddress(address, publicClient) {
  const ApprovedAddress = await publicClient.readContract({
    ...marketplaceABI,
    functionName: 'listingPrice',
  });
  return ApprovedAddress;
}
