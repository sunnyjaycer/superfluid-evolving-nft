const hre = require("hardhat");

const flowerABI = require("../../artifacts/contracts/Flower.sol/Flower.json");
const waterABI = require("../../artifacts/contracts/utils/Water.sol/Water.json");
const superWaterABI = require("../../artifacts/@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperToken.sol/ISuperToken.json")

const flowerAddress = "0x015b0C429B9cC32AB8470c3cb3E11AB548cBe996"
const waterAddress = "0xe9D358a664d93AbA845CD5d614D2C3363a0ba6A7"
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