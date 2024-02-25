// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const waterABI = require("../artifacts/contracts/utils/TestToken.sol/TestToken.json");
const superWaterABI = require("../artifacts/@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperToken.sol/ISuperToken.json")

async function main() {

  // Setting up network object - this is set as the sepolia url, but can be changed to reflect your RPC URL and network of choice
  const url = `${process.env.ALCHEMY_SEPOLIA_URL}`;

  const waterAddress = "0xE99Eecb5D6fCaE4f091Ea4d5fED613843939272A";
  const waterXAddress = "0x875Fa8aCaAe9fD57De678f9e52dF324B6279FF58";
  const mintAmount = ethers.utils.parseEther("10000000000");                   

  const signer = await hre.ethers.getSigner();  // receives minted WATER tokens

  console.log(`Minting ${ethers.utils.formatUnits(mintAmount)} WATERx to ${signer.address} on Goerli`)


  const water = await hre.ethers.getContractAt( waterABI.abi, waterAddress );
  const superWater = await hre.ethers.getContractAt( superWaterABI.abi, waterXAddress );

  await water.connect(signer).mint( signer.address, mintAmount );
  console.log("minted water");

  let approveTx = await water.connect(signer).approve( waterXAddress, mintAmount);
  await approveTx.wait();
  console.log("approved super water");

  let upgradeTx = await superWater.connect(signer).upgrade( mintAmount );
  await upgradeTx.wait();

  console.log(`Success! ${signer.address} WATERx Balance: ${await superWater.balanceOf(signer.address)}`);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});