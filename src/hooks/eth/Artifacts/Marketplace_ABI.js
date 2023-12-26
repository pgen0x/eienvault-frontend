export const marketplaceABI = {
  address: '0xe614733b89707fA4c9c1a0a7E4A41AF9745AC806',
  abi: [
    {
      inputs: [],
      stateMutability: 'nonpayable',
      type: 'constructor',
    },
    {
      inputs: [],
      name: 'AccessControlBadConfirmation',
      type: 'error',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
        {
          internalType: 'bytes32',
          name: 'neededRole',
          type: 'bytes32',
        },
      ],
      name: 'AccessControlUnauthorizedAccount',
      type: 'error',
    },
    {
      inputs: [],
      name: 'Address0',
      type: 'error',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'target',
          type: 'address',
        },
      ],
      name: 'AddressEmptyCode',
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
      inputs: [
        {
          internalType: 'address',
          name: 'implementation',
          type: 'address',
        },
      ],
      name: 'ERC1967InvalidImplementation',
      type: 'error',
    },
    {
      inputs: [],
      name: 'ERC1967NonPayable',
      type: 'error',
    },
    {
      inputs: [],
      name: 'Ended',
      type: 'error',
    },
    {
      inputs: [],
      name: 'EnforcedPause',
      type: 'error',
    },
    {
      inputs: [],
      name: 'ExpectedPause',
      type: 'error',
    },
    {
      inputs: [],
      name: 'FailedInnerCall',
      type: 'error',
    },
    {
      inputs: [],
      name: 'InvalidInitialization',
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
      name: 'NotInitializing',
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
      name: 'ReentrancyGuardReentrantCall',
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
      inputs: [],
      name: 'UUPSUnauthorizedCallContext',
      type: 'error',
    },
    {
      inputs: [
        {
          internalType: 'bytes32',
          name: 'slot',
          type: 'bytes32',
        },
      ],
      name: 'UUPSUnsupportedProxiableUUID',
      type: 'error',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'uint64',
          name: 'version',
          type: 'uint64',
        },
      ],
      name: 'Initialized',
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
          indexed: true,
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
          indexed: false,
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
      ],
      name: 'Paused',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
      ],
      name: 'ReceivedFunds',
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
          internalType: 'uint256',
          name: 'ItemId',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'Amount',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'PaidWith',
          type: 'address',
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
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'bytes32',
          name: 'role',
          type: 'bytes32',
        },
        {
          indexed: true,
          internalType: 'bytes32',
          name: 'previousAdminRole',
          type: 'bytes32',
        },
        {
          indexed: true,
          internalType: 'bytes32',
          name: 'newAdminRole',
          type: 'bytes32',
        },
      ],
      name: 'RoleAdminChanged',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'bytes32',
          name: 'role',
          type: 'bytes32',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'sender',
          type: 'address',
        },
      ],
      name: 'RoleGranted',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'bytes32',
          name: 'role',
          type: 'bytes32',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'sender',
          type: 'address',
        },
      ],
      name: 'RoleRevoked',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
      ],
      name: 'Unpaused',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'implementation',
          type: 'address',
        },
      ],
      name: 'Upgraded',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'newAddress',
          type: 'address',
        },
      ],
      name: 'VaultUpdated',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'address',
          name: 'token',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
      ],
      name: 'rescue',
      type: 'event',
    },
    {
      inputs: [],
      name: 'DEFAULT_ADMIN_ROLE',
      outputs: [
        {
          internalType: 'bytes32',
          name: '',
          type: 'bytes32',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'PAUSER_ROLE',
      outputs: [
        {
          internalType: 'bytes32',
          name: '',
          type: 'bytes32',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'UPGRADER_ROLE',
      outputs: [
        {
          internalType: 'bytes32',
          name: '',
          type: 'bytes32',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'UPGRADE_INTERFACE_VERSION',
      outputs: [
        {
          internalType: 'string',
          name: '',
          type: 'string',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'Vault',
      outputs: [
        {
          internalType: 'contract IVault',
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
          internalType: 'struct IVault.MarketItem[]',
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
            {
              internalType: 'address',
              name: 'paidWith',
              type: 'address',
            },
          ],
          internalType: 'struct IVault.Auction[]',
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
          internalType: 'bytes32',
          name: 'role',
          type: 'bytes32',
        },
      ],
      name: 'getRoleAdmin',
      outputs: [
        {
          internalType: 'bytes32',
          name: '',
          type: 'bytes32',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bytes32',
          name: 'role',
          type: 'bytes32',
        },
        {
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
      ],
      name: 'grantRole',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bytes32',
          name: 'role',
          type: 'bytes32',
        },
        {
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
      ],
      name: 'hasRole',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '_listingPrice',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: '_commisonBP',
          type: 'uint256',
        },
        {
          internalType: 'address',
          name: '_vault',
          type: 'address',
        },
        {
          internalType: 'address',
          name: '_admin',
          type: 'address',
        },
      ],
      name: 'initialize',
      outputs: [],
      stateMutability: 'nonpayable',
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
      name: 'pause',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'paused',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'proxiableUUID',
      outputs: [
        {
          internalType: 'bytes32',
          name: '',
          type: 'bytes32',
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
      inputs: [
        {
          internalType: 'bytes32',
          name: 'role',
          type: 'bytes32',
        },
        {
          internalType: 'address',
          name: 'callerConfirmation',
          type: 'address',
        },
      ],
      name: 'renounceRole',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: '_contract_address',
          type: 'address',
        },
      ],
      name: 'rescue_erc20',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: '_contract_address',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: '_tokenID',
          type: 'uint256',
        },
      ],
      name: 'rescue_erc721',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bytes32',
          name: 'role',
          type: 'bytes32',
        },
        {
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
      ],
      name: 'revokeRole',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'saleCommission',
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
          internalType: 'bytes4',
          name: 'interfaceId',
          type: 'bytes4',
        },
      ],
      name: 'supportsInterface',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'unpause',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '_newCommissionBP',
          type: 'uint256',
        },
      ],
      name: 'updateCommission',
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
          name: '_newVault',
          type: 'address',
        },
      ],
      name: 'updateVault',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'newImplementation',
          type: 'address',
        },
        {
          internalType: 'bytes',
          name: 'data',
          type: 'bytes',
        },
      ],
      name: 'upgradeToAndCall',
      outputs: [],
      stateMutability: 'payable',
      type: 'function',
    },
    {
      stateMutability: 'payable',
      type: 'receive',
    },
  ],
};
