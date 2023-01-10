// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {

  const Flower = await hre.ethers.getContractFactory("Flower");
  const flower = await Flower.deploy(
    [
      hre.ethers.utils.parseEther("1000"),
      hre.ethers.utils.parseEther("1000"),
      hre.ethers.utils.parseEther("1000")
    ],
    "0x875Fa8aCaAe9fD57De678f9e52dF324B6279FF58", // water
    "0x22ff293e14F1EC3A09B137e9e06084AFd63adDF9", // host
    "0xEd6BcbF6907D4feEEe8a8875543249bEa9D308E8"  // cfa
  );

  await flower.deployed();

  console.log(
    `Flower Contract deployed to ${flower.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// https://goerli.etherscan.io/address/0x4ac88E3FA431a6DCbDa6e20c9Be28e40704117f8#code