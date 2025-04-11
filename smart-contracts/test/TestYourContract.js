const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("YourContract", function () {
    let yourContract;

    beforeEach(async function () {
        const YourContract = await ethers.getContractFactory("YourContract");
        yourContract = await YourContract.deploy();
        await yourContract.deployed();
    });

    it("should deploy with the correct initial message", async function () {
        expect(await yourContract.message()).to.equal("Hello, ZeroXchange!");
    });

    it("should update the message when setMessage is called", async function () {
        await yourContract.setMessage("New message");
        expect(await yourContract.message()).to.equal("New message");
    });
});