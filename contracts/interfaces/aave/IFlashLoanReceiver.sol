pragma solidity ^0.8.6;

import "./ILendingPoolAddressesProvider.sol";
import "./ILendingPool.sol";

interface IFlashLoanReceiver {
  function executeOperation(
    address[] calldata assets,
    uint256[] calldata amounts,
    uint256[] calldata premiums,
    address initiator,
    bytes calldata params
  ) external returns (bool);

  // function ADDRESSES_PROVIDER() external view virtual returns (ILendingPoolAddressesProvider);

  // function LENDING_POOL() external view virtual returns (ILendingPool);
}