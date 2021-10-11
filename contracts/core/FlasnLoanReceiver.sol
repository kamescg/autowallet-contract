// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;
import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

/**
  * @title AutoWallet Smart Contract
  * @author Kames Geraghty
  * @notice The AutoWallet contract executes dynamic transactions using a EVM contract.
 */
abstract contract FlasnLoanReceiver {

  /// @dev Move paramter to external contract 
  address public lendingpool;

  function executeOperation(
        address[] calldata assets,
        uint256[] calldata amounts,
        uint256[] calldata premiums,
        address initiator,
        bytes calldata params
    )
        external
        returns (bool)
    {
        console.log("FlashLoan Executing");
        for (uint i = 0; i < assets.length; i++) {
            uint amountOwing = amounts[i] + (premiums[i]);
            IERC20(assets[i]).approve(lendingpool, amountOwing);
        }
        return true;
    }
}