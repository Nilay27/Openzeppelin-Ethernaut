const { expect } = require("chai");
const { ethers } = require("hardhat");
const path = require("path");
const { isTypedArray } = require("util/types");
const util = require("../utils.js");

var scriptName = path.basename(__filename);

describe("Telephone", () => {
  beforeEach(async () => {
    const accounts = await hre.ethers.getSigners();
    deployer = accounts[0];
    hacker = accounts[1];
    const factory = await ethers.getContractFactory("Telephone");
    contract = await factory.deploy();
    await contract.deployed();
  });
  it("sets deployer as owner", async () => {
    expect(await contract.owner()).to.eq(deployer.address);
  });

  it("does not set hacker as owner", async () => {
    expect(await contract.owner()).to.not.eq(hacker.address);
  });

  it("initiates hack", async () => {
    console.log("initiating hack!, deploying TelephoneAttack");
    const telephoneAttackFacotry = await ethers.getContractFactory(
      "TelephoneAttack"
    );
    console.log("setting address of Telephone as target contract!");
    telephoneAttack = await telephoneAttackFacotry.deploy(contract.address);
    await telephoneAttack.deployed();
    console.log(
      "calling attact() of Telephone Attack to ensure msg.sender!=tx.origin"
    );
    await telephoneAttack.connect(hacker).attack({ gasLimit: 3e6 });
    expect(await contract.owner()).to.eq(hacker.address);
    console.log("Hacked!!");
    util.updateTotalSolved(scriptName);
  });
});
