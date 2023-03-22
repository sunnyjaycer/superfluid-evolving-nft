// Cancel streams to the Flower contract and get rid of Flower NFT in possession

const hre = require("hardhat");
const { Framework } = require("@superfluid-finance/sdk-core");
const deployedContracts = require("./utils/deployedContracts");
const { ethers } = require("hardhat");
const flowerABI = require("../artifacts/contracts/Flower.sol/Flower.json");

const banishAddress = "0x455E5AA18469bC6ccEF49594645666C587A3a71B";

async function main() {

    const url = `${process.env.ALCHEMY_GOERLI_URL}`;
    const customHttpProvider = new ethers.providers.JsonRpcProvider(url);
    // const network = await customHttpProvider.getNetwork();

    // const sf = await Framework.create({
    //     chainId: 5,
    //     provider: customHttpProvider,
    //     customSubgraphQueriesEndpoint: "",
    //     dataMode: "WEB3_ONLY"
    // });

    const signer = await hre.ethers.getSigner();  // receives minted WATER tokens

    // const deleteFlowOp = sf.cfaV1.deleteFlow({
    //     superToken: deployedContracts.superWater.address,
    //     sender: signer.address,
    //     receiver: deployedContracts.flower.address
    // });

    // // delete flow
    // if ((await sf.cfaV1.getFlow({
    //     superToken: deployedContracts.superWater.address,
    //     sender: signer.address,
    //     receiver: deployedContracts.flower.address,
    //     providerOrSigner: signer
    //   })).flowRate != 0 ) {

    //     console.log("Deleting stream");

    //     let tx = await deleteFlowOp.exec(signer);
    //     await tx.wait();

    //     console.log("Stream successfully deleted!")

    // }


    let flower = await hre.ethers.getContractAt( flowerABI.abi, deployedContracts.flower.address );
    
    console.log("Expelling Token ID", await flower.flowerOwned(signer.address));

    // transfer away NFT
    await flower.connect(signer).transferFrom(
        signer.address,
        deployedContracts.superWater.address,
        await flower.flowerOwned(signer.address)
    );

    console.log("Flower successfully expelled!")

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});