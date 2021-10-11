// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

/**
  * @title IAutoTaskList Smart Contract
  * @author Kames Geraghty
  * @notice The IAutoTaskList interface defines storage of auto task structs.
 */
interface IAutoTaskList {

    /**
      * @notice Set an approved Task.
    */
    function set(bytes32[] calldata commands, bytes[] memory state) external;
    
    /**
      * @notice Unset an approved Task.
    */
    function unset(bytes32[] calldata commands, bytes[] memory state) external;

    /**
      * @notice Check if Task IS set to approved.
    */
    function isSet(bytes32 _id) external returns (bool);
    


}
