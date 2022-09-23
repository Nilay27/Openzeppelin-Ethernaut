const { expect } = require("chai");
const { ethers } = require("hardhat");
const path = require("path");
const { isTypedArray } = require("util/types");
const util = require("../utils.js");

var scriptName = path.basename(__filename);

const CHALLENGE_ADDRESS = "0x647A8A3bB0FF149222dBc1daE1B8d154aE38D317";
describe("GatekeeperTwo", () => {
  beforeEach(async () => {
    const accounts = await hre.ethers.getSigners();
    deployer = accounts[0];
    hacker = accounts[1];
    const factory = await ethers.getContractFactory("GatekeeperTwo");
    contract = factory.attach(CHALLENGE_ADDRESS);
  });

  it("initiates hack", async () => {
    console.log("deploying GatekeeperTwoHack");
    const gateKeeperHackFactory = await ethers.getContractFactory(
      "GatekeeperTwoHack"
    );
    const hackContract = await gateKeeperHackFactory.deploy(contract.address);
    await hackContract.deployed();
    console.log("GatekeeperTwoHack deployed");
    expect(await contract.entrant()).to.eq(deployer.address);
    util.updateTotalSolved(scriptName);
  });
});
