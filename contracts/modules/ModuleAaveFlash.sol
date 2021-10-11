// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;
import "./aave/AaveFlashLoanReceiverBase.sol";

contract ModuleAaveFlash is AaveFlashLoanReceiverBase {
  uint256 public counter;
  constructor(ILendingPoolAddressesProvider provider) AaveFlashLoanReceiverBase(provider) {}

  function loan(address[] calldata _assets, uint256[] calldata _amounts) external payable returns (uint256) {
    require(_assets.length == _amounts.length, "ModuleAaveFlash/invalid-loan-request");
    uint256[] memory _modes = new uint256[](_assets.length);
    for (uint256 index = 0; index < _assets.length; index++) {
        _modes[index] = 0;
    }

    bytes memory params = "";
    uint16 referralCode = 0;
    _LENDING_POOL.flashLoan(
        msg.sender, // receiver
        _assets,
        _amounts,
        _modes,
        msg.sender, // onBehalfOf
        params,
        referralCode
    );

  }

  function executeOperation(
    address[] calldata assets,
    uint256[] calldata amounts,
    uint256[] calldata premiums,
    address initiator,
    bytes calldata params
  ) external override returns (bool) {

    return true;
  }

}