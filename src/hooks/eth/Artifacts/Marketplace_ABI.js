export const marketplaceABI = {
  address: '0xCF36Ff82F557be9EC7eb2B209B6ba4C60f65acAc',
  abi: [
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '_listingPrice',
          type: 'uint256',
        },
      ],
      stateMutability: 'nonpayable',
      type: 'constructor',
    },
    {
      inputs: [],
      name: 'Address0',
      type: 'error',
    },
    {
      inputs: [],
      name: 'AmountNotEnough',
      type: 'error',
    },
    {
      inputs: [],
      name: 'AuctionItem',
      type: 'error',
    },
    {
      inputs: [],
      name: 'BuyDirectly',
      type: 'error',
    },
    {
      inputs: [],
      name: 'EndBeforeRelease',
      type: 'error',
    },
    {
      inputs: [],
      name: 'Ended',
      type: 'error',
    },
    {
      inputs: [],
      name: 'NotApproved',
      type: 'error',
    },
    {
      inputs: [],
      name: 'NotFound',
      type: 'error',
    },
    {
      inputs: [],
      name: 'NotStarted',
      type: 'error',
    },
    {
      inputs: [],
      name: 'OnlyOneOfferPerUser',
      type: 'error',
    },
    {
      inputs: [],
      name: 'OwnedByU',
      type: 'error',
    },
    {
      inputs: [],
      name: 'TimingError',
      type: 'error',
    },
    {
      inputs: [],
      name: 'TransferFailed',
      type: 'error',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'Collection',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'Seller',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'Price',
          type: 'uint256',
        },
        {
          indexed: true,
          internalType: 'uint256',
          name: 'TokenId',
          type: 'uint256',
        },
        {
          indexed: true,
          internalType: 'uint256',
          name: 'ItemId',
          type: 'uint256',
        },
      ],
      name: 'ItemListed',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'Collection',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'Seller',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'uint256',
          name: 'TokenId',
          type: 'uint256',
        },
        {
          indexed: true,
          internalType: 'uint256',
          name: 'ItemId',
          type: 'uint256',
        },
      ],
      name: 'ItemRemoved',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'Collection',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'Seller',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'TokenId',
          type: 'uint256',
        },
        {
          indexed: true,
          internalType: 'uint256',
          name: 'ItemId',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'Price',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'Buyer',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'PaidWith',
          type: 'address',
        },
      ],
      name: 'ItemSold',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'address',
          name: 'Collection',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'Seller',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'TokenId',
          type: 'uint256',
        },
        {
          indexed: true,
          internalType: 'uint256',
          name: 'ItemId',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'OfferedBy',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'Offer',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'PaidWith',
          type: 'address',
        },
      ],
      name: 'NewOffer',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'Collection',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'Seller',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'TokenId',
          type: 'uint256',
        },
        {
          indexed: true,
          internalType: 'uint256',
          name: 'ItemId',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'OfferedBy',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'Price',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'PaidWith',
          type: 'address',
        },
      ],
      name: 'OfferAccepted',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'Collection',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'Seller',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'NewOwner',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'TokenId',
          type: 'uint256',
        },
        {
          indexed: true,
          internalType: 'uint256',
          name: 'ItemId',
          type: 'uint256',
        },
      ],
      name: 'OwnershipTransfer',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'previousOwner',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'newOwner',
          type: 'address',
        },
      ],
      name: 'OwnershipTransferred',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'Collection',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'Seller',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'TokenId',
          type: 'uint256',
        },
        {
          indexed: true,
          internalType: 'uint256',
          name: 'ItemId',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'OfferedBy',
          type: 'address',
        },
      ],
      name: 'RemoveOffer',
      type: 'event',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '_marketId',
          type: 'uint256',
        },
        {
          internalType: 'address',
          name: '_user',
          type: 'address',
        },
      ],
      name: 'acceptOffer',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '_marketId',
          type: 'uint256',
        },
      ],
      name: 'buyERC20',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '_marketId',
          type: 'uint256',
        },
      ],
      name: 'buyNative',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'payable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '_marketId',
          type: 'uint256',
        },
      ],
      name: 'cancelMyOffer',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'getApprovedAddress',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'getItems',
      outputs: [
        {
          components: [
            {
              internalType: 'bool',
              name: 'auctioned',
              type: 'bool',
            },
            {
              internalType: 'address payable',
              name: 'seller',
              type: 'address',
            },
            {
              internalType: 'address',
              name: 'collection',
              type: 'address',
            },
            {
              internalType: 'address',
              name: 'paidWith',
              type: 'address',
            },
            {
              internalType: 'uint256',
              name: 'releaseDate',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: 'endDate',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: 'price',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: 'listingPrice',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: 'tokenId',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: 'marketId',
              type: 'uint256',
            },
          ],
          internalType: 'struct Marketplace.MarketItem[]',
          name: '',
          type: 'tuple[]',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '_marketId',
          type: 'uint256',
        },
      ],
      name: 'getOffers',
      outputs: [
        {
          components: [
            {
              internalType: 'uint256',
              name: 'offer',
              type: 'uint256',
            },
            {
              internalType: 'address',
              name: 'user',
              type: 'address',
            },
          ],
          internalType: 'struct Marketplace.Auction[]',
          name: '',
          type: 'tuple[]',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      name: 'items',
      outputs: [
        {
          internalType: 'bool',
          name: 'auctioned',
          type: 'bool',
        },
        {
          internalType: 'address payable',
          name: 'seller',
          type: 'address',
        },
        {
          internalType: 'address',
          name: 'collection',
          type: 'address',
        },
        {
          internalType: 'address',
          name: 'paidWith',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'releaseDate',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'endDate',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'price',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'listingPrice',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'marketId',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bool',
          name: '_auctioned',
          type: 'bool',
        },
        {
          internalType: 'address',
          name: '_collection',
          type: 'address',
        },
        {
          internalType: 'address',
          name: '_paidWith',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: '_tokenId',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: '_price',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: '_releaseDate',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: '_endDate',
          type: 'uint256',
        },
      ],
      name: 'list',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'payable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'listingPrice',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '_marketId',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: '_offer',
          type: 'uint256',
        },
      ],
      name: 'makeAnOfferERC20',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '_marketId',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: '_offer',
          type: 'uint256',
        },
      ],
      name: 'makeAnOfferNative',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'payable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'owner',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '_marketId',
          type: 'uint256',
        },
      ],
      name: 'removeListing',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'renounceOwnership',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'newOwner',
          type: 'address',
        },
      ],
      name: 'transferOwnership',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: '_newApprovedAddress',
          type: 'address',
        },
      ],
      name: 'updateApprovedAddress',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '_newListingPrice',
          type: 'uint256',
        },
      ],
      name: 'updateListingPrice',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: '_wallet',
          type: 'address',
        },
      ],
      name: 'updateWallet',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
  ],
};
