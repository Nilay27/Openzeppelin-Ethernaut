const { expect } = require("chai");
const { ethers } = require("hardhat");
const path = require("path");
const { isTypedArray } = require("util/types");
const util = require("../utils.js");

var scriptName = path.basename(__filename);

const CHALLENGE_ADDRESS = "0xDeAAD08f184773ba7bAC8D510dc037c8c4fc1a66";
describe("Elevator", () => {
  beforeEach(async () => {
    const accounts = await hre.ethers.getSigners();
    deployer = accounts[0];
    hacker = accounts[1];
    const factory = await ethers.getContractFactory("Elevator");
    contract = factory.attach(CHALLENGE_ADDRESS);
  });

  it("initiates hack", async () => {
    console.log("Deploying hacking contract");
    const hackFactory = await ethers.getContractFactory("HackElevator");
    const hackContract = await hackFactory.deploy();
    await hackContract.deployed();
    console.log("Contract deployed");

    console.log("initiating hack!");
    const tx = await hackContract.callGoTO(1, contract.address);
    expect(await contract.top()).to.eq(true);
    console.log("Hacked!!");
    util.updateTotalSolved(scriptName);
  });
});
