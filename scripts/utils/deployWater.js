// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {

  const Token = await hre.ethers.getContractFactory("Water");
  const token = await Token.deploy(
    "Water",
    "WATER",
    "18",
    hre.ethers.constants.MaxUint256
  );

  await token.deployed();

  console.log(
    `Token Contract deployed to ${token.address}`
  );

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// https://sepolia.etherscan.io/address/0xe9D358a664d93AbA845CD5d614D2C3363a0ba6A7