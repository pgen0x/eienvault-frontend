const BlockchainPage = () => {
  return (
    <div>
      <div className="flex items-center justify-between py-5">
        <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
          Marketplace Contract Setting
        </h3>
      </div>
      <div className="flex items-center justify-evenly gap-4">
        <div class="block rounded-lg bg-white text-center dark:bg-neutral-900">
          <div class="border-b-2 border-neutral-100 px-6 py-3 text-xl font-medium dark:border-neutral-600 dark:text-neutral-50">
            Rescue ERC-721
          </div>
          <div class="p-6">
            <h5 class="mb-2 text-lg font-medium leading-tight text-neutral-800 dark:text-neutral-50">
              Retrieve All ERC-721 Tokens
            </h5>
            <p class="mb-4 text-base text-neutral-600 dark:text-neutral-200">
              This service is dedicated to retrieving all ERC-721 tokens
              associated with a contract. Whether your tokens are stuck, lost,
              or inaccessible, our solution ensures the comprehensive retrieval
              of ERC-721 tokens.
            </p>
            <button
              type="button"
              class="!w-fit w-full rounded-full bg-primary-500 px-4 py-2 text-center text-sm font-bold text-white hover:bg-primary-300 disabled:cursor-not-allowed disabled:bg-primary-200 disabled:hover:bg-primary-200 dark:bg-white dark:text-neutral-700 dark:hover:bg-neutral-300 dark:disabled:bg-neutral-200 dark:disabled:text-neutral-100"
            >
              Rescue ERC-721
            </button>
          </div>
        </div>
        <div class="block rounded-lg bg-white text-center dark:bg-neutral-900">
          <div class="border-b-2 border-neutral-100 px-6 py-3 text-xl font-medium dark:border-neutral-600 dark:text-neutral-50">
            Rescue ERC-20
          </div>
          <div class="p-6">
            <h5 class="mb-2 text-lg font-medium leading-tight text-neutral-800 dark:text-neutral-50">
              Retrieve All ERC-20 Tokens
            </h5>
            <p class="mb-4 text-base text-neutral-600 dark:text-neutral-200">
              Our ERC-20 token rescue service is designed to efficiently
              retrieve all ERC-20 tokens from a contract. If you&lsquo;re facing
              challenges accessing your tokens, our solution ensures the
              comprehensive recovery of ERC-20 tokens.
            </p>
            <button
              type="button"
              class="!w-fit w-full rounded-full bg-primary-500 px-4 py-2 text-center text-sm font-bold text-white hover:bg-primary-300 disabled:cursor-not-allowed disabled:bg-primary-200 disabled:hover:bg-primary-200 dark:bg-white dark:text-neutral-700 dark:hover:bg-neutral-300 dark:disabled:bg-neutral-200 dark:disabled:text-neutral-100"
            >
              Rescue ERC-20
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockchainPage;
