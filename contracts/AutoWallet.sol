// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;
import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/IAutoTaskList.sol";
import "./interfaces/IAutoWallet.sol";
import "./core/VirtualMachine.sol";
import "./core/FlasnLoanReceiver.sol";
/**
  * @title AutoWallet Smart Contract
  * @author Kames Geraghty
  * @notice The AutoWallet contract executes dynamic transactions using a EVM contract.
 */
contract AutoWallet is IAutoWallet, Ownable {
    
    /// @notice EVM to execute order transactions
    VirtualMachine public override virtualmachine;
    
    /// @notice Approved task list of executable transaction bundles.
    IAutoTaskList public override tasks;

    /* ======================================== */
    // Constructor ----------------------------
    /* ======================================== */
    
    /**
      * @notice Set initial smart contract parameters during deploy.
      * @dev    Token is immutable. Once set it CAN NOT be updated.
      * @param  _tasks          Approved Tasks
      * @param  _virtualmachine EVM contract
    */
    constructor(
        IAutoTaskList _tasks,
        VirtualMachine _virtualmachine
    ) Ownable() {
        virtualmachine = _virtualmachine;
        tasks = _tasks;
    }

    /* ======================================== */
    // External Functions ---------------------
    /* ======================================== */

    fallback() external payable {}
    
    receive() external payable {}
    
    /* Core ----------------------------------- */

    /// @inheritdoc IAutoWallet
    function execute(bytes32[] calldata commands, bytes[] memory state) external override onlyOwner returns (bytes[] memory) {
        (bool success, bytes memory data) = address(virtualmachine).delegatecall(
            abi.encodeWithSelector(VirtualMachine.execute.selector, commands, state)
        );
        require(success, "Wallet/execution-failed");
        emit Executed(uint32(block.timestamp), false);
        return abi.decode(data, (bytes[]));
    }

    /// @inheritdoc IAutoWallet
    function task(bytes32[] calldata commands, bytes[] memory state) external override returns (bytes[] memory) {
        bool _isExecutable = tasks.isSet(keccak256(abi.encode(commands, state)));
        require(_isExecutable, "Wallet/unauthorized");
        return _execute(commands, state);
    }

    /// @inheritdoc IAutoWallet
    function withdraw(address payable to, uint256 amount) external override onlyOwner {
        _send(to, amount);
    }

    /* Getters -------------------------------- */

    /// @inheritdoc IAutoWallet
    function getTasks() external view override returns (IAutoTaskList) {
        return tasks;
    }
    
    /// @inheritdoc IAutoWallet
    function getVirtualMachine() external view override returns (VirtualMachine) {
        return virtualmachine;
    }

    /* Setters -------------------------------- */

    /// @inheritdoc IAutoWallet
    function setTasks(IAutoTaskList _tasks) external override onlyOwner {
        _setTasks(_tasks);
    }

    /// @inheritdoc IAutoWallet
    function setVirtualMachine(VirtualMachine _virtualmachine) external override onlyOwner {
        _setVirtualMachine(_virtualmachine);
    }

    /* ======================================== */
    // Internal Functions ---------------------
    /* ======================================== */

    function _execute(bytes32[] memory commands, bytes[] memory state) internal returns (bytes[] memory) {
        (bool success, bytes memory data) = address(virtualmachine).delegatecall(
            abi.encodeWithSelector(VirtualMachine.execute.selector, commands, state)
        );
        require(success, "Wallet/execution-failed");
        return abi.decode(data, (bytes[]));
    }

    function _setTasks(IAutoTaskList _tasks) internal returns (IAutoTaskList) {
        tasks = _tasks;
        emit TasksSet(_tasks);
        return _tasks;
    }

    function _setVirtualMachine(VirtualMachine _virtualmachine) internal returns (VirtualMachine) {
        virtualmachine = _virtualmachine;
        emit VirtualMachineSet(_virtualmachine);
        return _virtualmachine;
    }

    function _send(address payable _to, uint256 _amount) internal {
        (bool sent,) = _to.call{value: _amount}("");
        require(sent, "Wallet/eth-transfer-failed");
    }
}
