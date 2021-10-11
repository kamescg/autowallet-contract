// SPDX-License-Identifier: GPT-3.0
pragma solidity 0.8.6;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "../../interfaces/aave/IFlashLoanReceiver.sol";
import "../../interfaces/aave/ILendingPool.sol";
import "../../interfaces/aave/ILendingPoolAddressesProvider.sol";


abstract contract AaveFlashLoanReceiverBase is IFlashLoanReceiver {
  using SafeERC20 for IERC20;
  using SafeMath for uint256;

  ILendingPool public immutable _LENDING_POOL;
  ILendingPoolAddressesProvider public immutable _ADDRESSES_PROVIDER;

  constructor(ILendingPoolAddressesProvider provider) {
    _ADDRESSES_PROVIDER = provider;
    _LENDING_POOL = ILendingPool(provider.getLendingPool());
  }

  function LENDING_POOL() external view returns(ILendingPool) {
    return _LENDING_POOL;
  }
  function ADDRESSES_PROVIDER() external view returns(ILendingPoolAddressesProvider) {
    return _ADDRESSES_PROVIDER;
  }
}