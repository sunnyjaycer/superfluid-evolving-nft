const hre = require("hardhat");

const flowerABI = require("../../artifacts/contracts/Flower.sol/Flower.json");
const waterABI = require("../../artifacts/contracts/utils/TestToken.sol/TestToken.json");
const superWaterABI = require("../../artifacts/@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperToken.sol/ISuperToken.json")

const flowerAddress = "0xfC88F809b30353FF36189e6157be4249Ec3CC280"
const waterAddress = "0xE99Eecb5D6fCaE4f091Ea4d5fED613843939272A"
const superWaterAddress = "0x875Fa8aCaAe9fD57De678f9e52dF324B6279FF58"


module.exports = {
    flower: {
        address: flowerAddress,
        contract: hre.ethers.getContractAt( flowerABI.abi, flowerAddress )
    },
    water: {
        address: waterAddress,
        contract: hre.ethers.getContractAt( waterABI.abi, waterAddress )
    },
    superWater: {
        address: superWaterAddress,
        contract: hre.ethers.getContractAt( superWaterABI.abi, superWaterAddress )    
    }
};