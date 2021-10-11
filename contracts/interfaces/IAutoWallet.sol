// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./IAutoTaskList.sol";
import "../core/VirtualMachine.sol";
/**
  * @title IAutoWallet Smart Contract
  * @author Kames Geraghty
  * @notice The IAutoWallet interface defines automated wallet execution.
 */
interface IAutoWallet {

  event Executed(uint32 timestamp, bool isFlashLoan);
  event TasksSet(IAutoTaskList indexed tasks);
  event VirtualMachineSet(VirtualMachine indexed virtualmachine);

    /**
      * @notice Execute chained transactions.
    */
    function execute(bytes32[] calldata commands, bytes[] memory state) external returns (bytes[] memory);

    /**
      * @notice Execute approved chained transaction.
    */
    function task(bytes32[] calldata commands, bytes[] memory state) external returns (bytes[] memory);

    /**
      * @notice Withdraw ETH from contract as owner.
    */
    function withdraw(address payable to, uint256 amount) external;

    /**
      * @notice Get tasks variable.
    */     
    function tasks() external view returns (IAutoTaskList);

    /**
      * @notice Get virtualmachine variable.
    */     
    function virtualmachine() external view returns (VirtualMachine);

    /**
      * @notice Get approved tasks list.
    */     
    function getTasks() external returns (IAutoTaskList);

    /**
      * @notice Get virtualmachine library.
    */     
    function getVirtualMachine() external returns (VirtualMachine);

    /**
      * @notice Set approved tasks list.
    */     
    function setTasks(IAutoTaskList tasks) external;

    /**
      * @notice Set virtualmachine library.
    */     
    function setVirtualMachine(VirtualMachine virtualmachine) external;
  
}
