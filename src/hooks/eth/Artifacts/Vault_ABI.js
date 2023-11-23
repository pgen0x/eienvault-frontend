export const vaultABI = {
  address: '0xE75446f8AD776922EA40Fd5F9ab5A1b429837fCB',
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
      name: 'withdrawn',
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
      name: 'Marketplace',
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
      inputs: [
        {
          internalType: 'bool',
          name: '_auctioned',
          type: 'bool',
        },
        {
          internalType: 'address',
          name: '_user',
          type: 'address',
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
        {
          internalType: 'uint256',
          name: '_listingPrice',
          type: 'uint256',
        },
      ],
      name: 'addItem',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
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
          internalType: 'struct IVault.Auction',
          name: '_offer',
          type: 'tuple',
        },
        {
          internalType: 'uint256',
          name: '_marketId',
          type: 'uint256',
        },
      ],
      name: 'addOffer',
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
      name: 'getItem',
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
          internalType: 'struct IVault.MarketItem',
          name: '',
          type: 'tuple',
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
          internalType: 'struct IVault.MarketItem[]',
          name: '',
          type: 'tuple[]',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'getMarketID',
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
          internalType: 'address',
          name: '_user',
          type: 'address',
        },
      ],
      name: 'getOffer',
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
          internalType: 'struct IVault.Auction',
          name: '',
          type: 'tuple',
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
      inputs: [],
      name: 'initialize',
      outputs: [],
      stateMutability: 'nonpayable',
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
          internalType: 'uint256',
          name: '_amount',
          type: 'uint256',
        },
        {
          internalType: 'address',
          name: '_token',
          type: 'address',
        },
      ],
      name: 'paid',
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
        {
          internalType: 'address',
          name: '_user',
          type: 'address',
        },
      ],
      name: 'removeAnOffer',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
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
      name: 'removeItem',
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
      inputs: [
        {
          internalType: 'address',
          name: '_nftAddress',
          type: 'address',
        },
        {
          internalType: 'address',
          name: '_newOwner',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: '_tokenId',
          type: 'uint256',
        },
      ],
      name: 'transferOwnership',
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
          name: '_paidWith',
          type: 'address',
        },
        {
          internalType: 'address',
          name: '_user',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: '_amount',
          type: 'uint256',
        },
      ],
      name: 'transferToken',
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
      name: 'unpause',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: '_marketNewAddress',
          type: 'address',
        },
      ],
      name: 'updateMarketAddress',
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
      inputs: [
        {
          internalType: 'uint256',
          name: '_amount',
          type: 'uint256',
        },
        {
          internalType: 'address',
          name: '_token',
          type: 'address',
        },
      ],
      name: 'withdrawFeeCommission',
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
          name: '',
          type: 'address',
        },
      ],
      name: 'withdrawable',
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
      stateMutability: 'payable',
      type: 'receive',
    },
  ],
};
