// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const { Framework } = require("@superfluid-finance/sdk-core");
const deployedContracts = require("./utils/deployedContracts");
const { ethers } = require("hardhat");

async function main() {

    const url = `${process.env.ALCHEMY_SEPOLIA_URL}`;
    const customHttpProvider = new ethers.providers.JsonRpcProvider(url);
    // const network = await customHttpProvider.getNetwork();

    const sf = await Framework.create({
        chainId: 5,
        provider: customHttpProvider,
        customSubgraphQueriesEndpoint: "",
        dataMode: "WEB3_ONLY"
    });

    const signer = await hre.ethers.getSigner();  // receives minted WATER tokens

    const createFlowOp = sf.cfaV1.createFlow({
        superToken: deployedContracts.superWater.address,
        sender: signer.address,
        receiver: deployedContracts.flower.address,
        flowRate: "83333333333333330" // 10 WATERx / 2 min
    });
    let tx = await createFlowOp.exec(signer);
    await tx.wait();

    console.log("Stream successfully created!")

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});