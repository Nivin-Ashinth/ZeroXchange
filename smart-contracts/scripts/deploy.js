const hre = require("hardhat");

async function main() {
    // Get the contract to deploy
    const YourContract = await hre.ethers.getContractFactory("YourContract");
    const yourContract = await YourContract.deploy();

    await yourContract.deployed();

    console.log("YourContract deployed to:", yourContract.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});