// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract Delegate {
    address public owner;

    constructor(address _owner) public {
        owner = _owner;
    }

    /**
     * When invoked via delegate call, msg.sender will be the EOA
     * which invoked fallback() of Delegation.
     *
     * Slot of owner is 0 in both contracts, so owner = msg.sender,
     * will change the state variable at 0 slot (i.e owner!) in Delegation.
     */
    function pwn() public {
        owner = msg.sender;
    }
}

contract Delegation {
    address public owner;
    Delegate delegate;

    constructor(address _delegateAddress) public {
        delegate = Delegate(_delegateAddress);
        owner = msg.sender;
    }

    /**
     * We can trigger fallback function with msg.data containing
     * signature of pwn().
     * As pwn() changes value of slot 0 variable, hence value of owner
     * in Delegation will change to msg.sender
     */
    fallback() external {
        (bool result, ) = address(delegate).delegatecall(msg.data);
        if (result) {
            this;
        }
    }
}
