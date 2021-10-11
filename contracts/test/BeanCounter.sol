// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

contract BeanCounter {
  uint256 public counter;
  constructor() {
    counter = 1;
  }

  function nextCounter() external view returns (uint256) {
    return counter + 1;
  }

  function setCounter(uint256 _counter) external {
    counter = _counter;
  }
}