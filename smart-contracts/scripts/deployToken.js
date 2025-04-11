// filepath: /home/pragadeesh/ZeroXchange/smart-contracts/scripts/deployToken.js
const hre = require("hardhat");

async function main() {
    const initialSupply = 1000000; // set an initial supply for the token
    const MyToken = await hre.ethers.getContractFactory("MyToken");
    const myToken = await MyToken.deploy(initialSupply);

    await myToken.deployed();

    console.log("MyToken deployed to:", myToken.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});