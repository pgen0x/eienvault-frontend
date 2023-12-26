'use client';

import ModalGrantRole from '@/components/admin/modal/grantRole';
import ModalRescueERC20 from '@/components/admin/modal/rescueERC20';
import ModalRescueERC721 from '@/components/admin/modal/rescueERC721';
import ModalUpdateCommission from '@/components/admin/modal/updateCommission';
import ModalUpdateVault from '@/components/admin/modal/updateVault';
import { useState } from 'react';

const MarketplacePage = () => {
  const [isOpenModalERC721, setIsOpenModalERC721] = useState(false);
  const [isOpenModalERC20, setIsOpenModalERC20] = useState(false);
  const [isOpenModalGranRole, setIsOpenModalGrantRole] = useState(false);
  const [isOpenModalupdateCommission, setIsOpenModalupdateCommission] =
    useState(false);
  const [isOpenModalupdateVault, setIsOpenModalupdateVault] = useState(false);
  const [isOpenModalPause, setIsOpenModalPause] = useState(false);
  const [isOpenModalUnpause, setIsOpenModalUnpause] = useState(false);
  const [isOpenModalupdateMarketAddress, setIsOpenModalupdateMarketAddress] =
    useState(false);

  const rescueERC721 = () => {
    setIsOpenModalERC721(true);
  };

  function closeModalERC721() {
    setIsOpenModalERC721(false);
  }

  const rescueERC20 = () => {
    setIsOpenModalERC20(true);
  };

  function closeModalERC20() {
    setIsOpenModalERC20(false);
  }

  const GrantRole = () => {
    setIsOpenModalGrantRole(true);
  };

  function closeModalGrantRole() {
    setIsOpenModalGrantRole(false);
  }

  const UpdateCommission = () => {
    setIsOpenModalupdateCommission(true);
  };

  function closeModalUpdateCommission() {
    setIsOpenModalupdateCommission(false);
  }

  const UpdateVault = () => {
    setIsOpenModalupdateVault(true);
  };

  function closeModalUpdateVault() {
    setIsOpenModalupdateVault(false);
  }

  const Pause = () => {
    setIsOpenModalPause(true);
  };

  function closeModalPause() {
    setIsOpenModalPause(false);
  }

  const Unpause = () => {
    setIsOpenModalUnpause(true);
  };

  function closeModalUnPause() {
    setIsOpenModalUnpause(false);
  }

  const UpdateMarketAddress = () => {
    setIsOpenModalupdateMarketAddress(true);
  };

  function closeModalUpdateMarketAddress() {
    setIsOpenModalupdateMarketAddress(false);
  }
  return (
    <div>
      <div className="flex items-center justify-between py-5">
        <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
          Marketplace Contract Setting
        </h3>
      </div>
      <div className="mt-4 flex items-stretch justify-evenly gap-4">
        <div className="block flex-1 rounded-lg bg-white text-center dark:bg-neutral-900">
          <div className="flex h-full flex-col rounded-lg bg-white text-center dark:bg-neutral-900">
            <div className="border-b-2 border-neutral-100 px-6 py-3 text-xl font-medium text-neutral-700 dark:border-neutral-600 dark:text-neutral-50">
              Rescue ERC-721
            </div>
            <div className="flex flex-grow flex-col justify-around p-4">
              <h5 className="mb-2 text-lg font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                Retrieve All ERC-721 Tokens
              </h5>
              <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                This service is dedicated to retrieving all ERC-721 tokens
                associated with a contract. Whether your tokens are stuck, lost,
                or inaccessible, our solution ensures the comprehensive
                retrieval of ERC-721 tokens.
              </p>
            </div>
            <div className="border-t-2 border-neutral-100 px-6 py-3 dark:border-neutral-600 dark:text-neutral-50">
              <button
                type="button"
                onClick={rescueERC721}
                className="mt-auto w-full rounded-full bg-primary-500 px-4 py-2 text-center text-sm font-bold text-white hover:bg-primary-300 disabled:cursor-not-allowed disabled:bg-primary-200 disabled:hover:bg-primary-200 dark:bg-white dark:text-neutral-700 dark:hover:bg-neutral-300 dark:disabled:bg-neutral-200 dark:disabled:text-neutral-100"
              >
                Rescue ERC-721
              </button>
            </div>
          </div>
        </div>
        <div className="block flex-1 rounded-lg bg-white text-center dark:bg-neutral-900">
          <div className="flex h-full flex-col rounded-lg bg-white text-center dark:bg-neutral-900">
            <div className="border-b-2 border-neutral-100 px-6 py-3 text-xl font-medium text-neutral-700 dark:border-neutral-600 dark:text-neutral-50">
              Rescue ERC-20
            </div>
            <div className="flex flex-grow flex-col justify-around p-4">
              <h5 className="mb-2 text-lg font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                Retrieve All ERC-20 Tokens
              </h5>
              <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                Our ERC-20 token rescue service is designed to efficiently
                retrieve all ERC-20 tokens from a contract. If you&lsquo;re
                facing challenges accessing your tokens, our solution ensures
                the comprehensive recovery of ERC-20 tokens.
              </p>
            </div>
            <div className="border-t-2 border-neutral-100 px-6 py-3 dark:border-neutral-600 dark:text-neutral-50">
              <button
                type="button"
                onClick={rescueERC20}
                className="mt-auto w-full rounded-full bg-primary-500 px-4 py-2 text-center text-sm font-bold text-white hover:bg-primary-300 disabled:cursor-not-allowed disabled:bg-primary-200 disabled:hover:bg-primary-200 dark:bg-white dark:text-neutral-700 dark:hover:bg-neutral-300 dark:disabled:bg-neutral-200 dark:disabled:text-neutral-100"
              >
                Rescue ERC-20
              </button>
            </div>
          </div>
        </div>
        <div className="block flex-1 rounded-lg bg-white text-center dark:bg-neutral-900">
          <div className="flex h-full flex-col rounded-lg bg-white text-center dark:bg-neutral-900">
            <div className="border-b-2 border-neutral-100 px-6 py-3 text-xl font-medium text-neutral-700 dark:border-neutral-600 dark:text-neutral-50">
              Grant a Role
            </div>
            <div className="flex flex-grow flex-col justify-around p-4">
              <h5 className="mb-2 text-lg font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                Grant a Role Service
              </h5>
              <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                The &quot;Grant a Role&quot; function is a dedicated service
                that allows users to be assigned specific roles, including
                DEFAULT_ADMIN_ROLE, PAUSER_ROLE, and UPGRADER_ROLE.
              </p>
            </div>
            <div className="border-t-2 border-neutral-100 px-6 py-3 dark:border-neutral-600 dark:text-neutral-50">
              <button
                type="button"
                onClick={GrantRole}
                className="mt-auto w-full rounded-full bg-primary-500 px-4 py-2 text-center text-sm font-bold text-white hover:bg-primary-300 disabled:cursor-not-allowed disabled:bg-primary-200 disabled:hover:bg-primary-200 dark:bg-white dark:text-neutral-700 dark:hover:bg-neutral-300 dark:disabled:bg-neutral-200 dark:disabled:text-neutral-100"
              >
                Set Role
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-stretch justify-evenly gap-4">
        <div className="block flex-1 rounded-lg bg-white text-center dark:bg-neutral-900">
          <div className="flex h-full flex-col rounded-lg bg-white text-center dark:bg-neutral-900">
            <div className="border-b-2 border-neutral-100 px-6 py-3 text-xl font-medium text-neutral-700 dark:border-neutral-600 dark:text-neutral-50">
              Update Commission
            </div>
            <div className="flex flex-grow flex-col justify-around p-4">
              <h5 className="mb-2 text-lg font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                Update Commission in Bases Points
              </h5>
              <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                The &quot;Update Commission&quot; function is designed to modify
                the sale fee percentage denominated in bases points (bp). Bases
                points, ranging from 0 to 100, are scaled up to a representation
                of 0 to 10,000. For instance, a 5% fee corresponds to 500 bases
                points.
              </p>
            </div>
            <div className="border-t-2 border-neutral-100 px-6 py-3 dark:border-neutral-600 dark:text-neutral-50">
              <button
                type="button"
                onClick={UpdateCommission}
                className="mt-auto w-full rounded-full bg-primary-500 px-4 py-2 text-center text-sm font-bold text-white hover:bg-primary-300 disabled:cursor-not-allowed disabled:bg-primary-200 disabled:hover:bg-primary-200 dark:bg-white dark:text-neutral-700 dark:hover:bg-neutral-300 dark:disabled:bg-neutral-200 dark:disabled:text-neutral-100"
              >
                Update Commission
              </button>
            </div>
          </div>
        </div>
        <div className="block flex-1 rounded-lg bg-white text-center dark:bg-neutral-900">
          <div className="flex h-full flex-col rounded-lg bg-white text-center dark:bg-neutral-900">
            <div className="border-b-2 border-neutral-100 px-6 py-3 text-xl font-medium text-neutral-700 dark:border-neutral-600 dark:text-neutral-50">
              Update Vault
            </div>
            <div className="flex flex-grow flex-col justify-around p-4">
              <h5 className="mb-2 text-lg font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                Vault Contract Address Updates
              </h5>
              <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                The &quot;Update Vault&quot; function is designed for the
                modification of the vault contract address
              </p>
            </div>
            <div className="border-t-2 border-neutral-100 px-6 py-3 dark:border-neutral-600 dark:text-neutral-50">
              <button
                type="button"
                onClick={UpdateVault}
                className="mt-auto w-full rounded-full bg-primary-500 px-4 py-2 text-center text-sm font-bold text-white hover:bg-primary-300 disabled:cursor-not-allowed disabled:bg-primary-200 disabled:hover:bg-primary-200 dark:bg-white dark:text-neutral-700 dark:hover:bg-neutral-300 dark:disabled:bg-neutral-200 dark:disabled:text-neutral-100"
              >
                Update Vault
              </button>
            </div>
          </div>
        </div>
        <div className="block flex-1 rounded-lg bg-white text-center dark:bg-neutral-900">
          <div className="flex h-full flex-col rounded-lg bg-white text-center dark:bg-neutral-900">
            <div className="border-b-2 border-neutral-100 px-6 py-3 text-xl font-medium text-neutral-700 dark:border-neutral-600 dark:text-neutral-50">
              Update Listing Price
            </div>
            <div className="flex flex-grow flex-col justify-around p-4">
              <h5 className="mb-2 text-lg font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                Listing Fee Management
              </h5>
              <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                The &quot;Update Listing Price&quot; service focuses on
                adjusting the listing fee denominated in HLUSD
              </p>
            </div>
            <div className="border-t-2 border-neutral-100 px-6 py-3 dark:border-neutral-600 dark:text-neutral-50">
              <button
                type="button"
                className="mt-auto w-full rounded-full bg-primary-500 px-4 py-2 text-center text-sm font-bold text-white hover:bg-primary-300 disabled:cursor-not-allowed disabled:bg-primary-200 disabled:hover:bg-primary-200 dark:bg-white dark:text-neutral-700 dark:hover:bg-neutral-300 dark:disabled:bg-neutral-200 dark:disabled:text-neutral-100"
              >
                Update Listing Price
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-stretch justify-evenly gap-4">
        <div className="block flex-1 rounded-lg bg-white text-center dark:bg-neutral-900">
          <div className="flex h-full flex-col rounded-lg bg-white text-center dark:bg-neutral-900">
            <div className="border-b-2 border-neutral-100 px-6 py-3 text-xl font-medium text-neutral-700 dark:border-neutral-600 dark:text-neutral-50">
              Pause
            </div>
            <div className="flex flex-grow flex-col justify-around p-4">
              <h5 className="mb-2 text-lg font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                Pause Smart Contract
              </h5>
              <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                The &quot;Pause&quot; feature enables the temporary suspension
                of smart contract functionality.
              </p>
            </div>
            <div className="border-t-2 border-neutral-100 px-6 py-3 dark:border-neutral-600 dark:text-neutral-50">
              <button
                type="button"
                className="mt-auto w-full rounded-full bg-primary-500 px-4 py-2 text-center text-sm font-bold text-white hover:bg-primary-300 disabled:cursor-not-allowed disabled:bg-primary-200 disabled:hover:bg-primary-200 dark:bg-white dark:text-neutral-700 dark:hover:bg-neutral-300 dark:disabled:bg-neutral-200 dark:disabled:text-neutral-100"
              >
                Pause
              </button>
            </div>
          </div>
        </div>
        <div className="block flex-1 rounded-lg bg-white text-center dark:bg-neutral-900">
          <div className="flex h-full flex-col rounded-lg bg-white text-center dark:bg-neutral-900">
            <div className="border-b-2 border-neutral-100 px-6 py-3 text-xl font-medium text-neutral-700 dark:border-neutral-600 dark:text-neutral-50">
              Unpause
            </div>
            <div className="flex flex-grow flex-col justify-around p-4">
              <h5 className="mb-2 text-lg font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                Unpause Smart Contract
              </h5>
              <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                The &quot;Unpause&quot; function is dedicated to resuming normal
                operations after a pause.
              </p>
            </div>
            <div className="border-t-2 border-neutral-100 px-6 py-3 dark:border-neutral-600 dark:text-neutral-50">
              <button
                type="button"
                className="mt-auto w-full rounded-full bg-primary-500 px-4 py-2 text-center text-sm font-bold text-white hover:bg-primary-300 disabled:cursor-not-allowed disabled:bg-primary-200 disabled:hover:bg-primary-200 dark:bg-white dark:text-neutral-700 dark:hover:bg-neutral-300 dark:disabled:bg-neutral-200 dark:disabled:text-neutral-100"
              >
                Unpause
              </button>
            </div>
          </div>
        </div>
      </div>
      <ModalRescueERC721
        isOpenModal={isOpenModalERC721}
        onClose={closeModalERC721}
        onModalClose={closeModalERC721}
        type="marketplace"
      />
      <ModalRescueERC20
        isOpenModal={isOpenModalERC20}
        onClose={closeModalERC20}
        onModalClose={closeModalERC20}
        type="marketplace"
      />
      <ModalGrantRole
        isOpenModal={isOpenModalGranRole}
        onClose={closeModalGrantRole}
        onModalClose={closeModalGrantRole}
        type="marketplace"
      />
      <ModalUpdateCommission
        isOpenModal={isOpenModalupdateCommission}
        onClose={closeModalUpdateCommission}
        onModalClose={closeModalUpdateCommission}
        type="marketplace"
      />
      <ModalUpdateVault
        isOpenModal={isOpenModalupdateVault}
        onClose={closeModalUpdateVault}
        onModalClose={closeModalUpdateVault}
        type="marketplace"
      />
    </div>
  );
};

export default MarketplacePage;
