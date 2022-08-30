const { expect } = require("chai");
const { ethers } = require("hardhat");
const path = require("path");
const { isTypedArray } = require("util/types");
const util = require("../utils.js");

var scriptName = path.basename(__filename);

describe("CoinFlip", () => {
  beforeEach(async () => {
    const accounts = await hre.ethers.getSigners();
    deployer = accounts[0];
    hacker = accounts[1];
    const factory = await ethers.getContractFactory("CoinFlip");
    contract = await factory.deploy();
    await contract.deployed();
  });

  it("initiates hack", async () => {
    console.log("deploying CoinFlipAttack!");
    const coinFlipAttackFactory = await ethers.getContractFactory(
      "CoinFlipAttack"
    );
    coinFlipAttack = await coinFlipAttackFactory.deploy(contract.address);
    await coinFlipAttack.deployed();
    console.log("CoinFlipAttackDeployed");
    console.log("initiating hack by calling hackFlip() in a loop!");
    for (i = 0; i < 10; i++) {
      await coinFlipAttack.connect(hacker).hackFlip();
    }
    expect(await contract.consecutiveWins()).to.eq(10);
    console.log("Hacked!!");
    util.updateTotalSolved(scriptName);
  });
});
