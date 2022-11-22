const { expect } = require("chai")
const { Framework } = require("@superfluid-finance/sdk-core")
const { ethers } = require("hardhat")
const frameworkDeployer = require("@superfluid-finance/ethereum-contracts/scripts/deploy-test-framework")
const TestToken = require("@superfluid-finance/ethereum-contracts/build/contracts/TestToken.json")

let sfDeployer
let contractsFramework
let sf
let moneyRouter
let dai
let daix

// Test Accounts
let owner
let alice
let bob

const thousandEther = ethers.utils.parseEther("10000")

before(async function () {
    // get hardhat accounts
    ;[owner, alice, bob] = await ethers.getSigners()

    sfDeployer = await frameworkDeployer.deployTestFramework()

    // GETTING SUPERFLUID FRAMEWORK SET UP

    // deploy the framework locally
    contractsFramework = await sfDeployer.getFramework()

    // initialize framework
    sf = await Framework.create({
        chainId: 31337,
        provider: owner.provider,
        resolverAddress: contractsFramework.resolver, // (empty)
        protocolReleaseVersion: "test"
    })

    // DEPLOYING DAI and DAI wrapper super token
    tokenDeployment = await sfDeployer.deployWrapperSuperToken(
        "Fake DAI Token",
        "fDAI",
        18,
        ethers.utils.parseEther("100000000").toString()
    )

    daix = await sf.loadSuperToken("fDAIx")
    dai = new ethers.Contract(
        daix.underlyingToken.address,
        TestToken.abi,
        owner
    )
    // minting test DAI
    await dai.mint(owner.address, thousandEther)
    await dai.mint(alice.address, thousandEther)
    await dai.mint(bob.address, thousandEther)

    // approving DAIx to spend DAI (Super Token object is not an ethers contract object and has different operation syntax)
    await dai.approve(daix.address, ethers.constants.MaxInt256)
    await dai
        .connect(alice)
        .approve(daix.address, ethers.constants.MaxInt256)
    await dai
        .connect(bob)
        .approve(daix.address, ethers.constants.MaxInt256)

    // Upgrading all DAI to DAIx
    const ownerUpgrade = daix.upgrade({ amount: thousandEther })
    const aliceUpgrade = daix.upgrade({ amount: thousandEther })
    const bobUpgrade = daix.upgrade({ amount: thousandEther })

    await ownerUpgrade.exec(owner)
    await aliceUpgrade.exec(alice)
    await bobUpgrade.exec(bob)

    let FlowerFactory = await ethers.getContractFactory("Flower", owner)

    console.log("Host", sf.settings.config.hostAddress);
    console.log("CFA ", sf.settings.config.cfaV1Address);

    flower = await FlowerFactory.deploy(
        [1000, 1000, 1000],
        daix.address,
        sf.settings.config.hostAddress,
        sf.settings.config.cfaV1Address
    )
    await flower.deployed()
})

describe("Money Router", function () {

    it("Happy path", async function () {

        // Bob starts a stream to the Flower contract
        let flowOp = sf.cfaV1.createFlow({
            superToken: daix.address,
            sender: bob.address,
            receiver: flower.address,
            flowRate: "1"
        });
        await flowOp.exec(bob);

        // Verify that Bob has a Flower NFT
        expect(
            await flower.balanceOf(bob.address)
        ).to.eq(1);

        // Verify that metadata is [0], Print its metadata
        expect(
            await flower.tokenURI("1")
        ).to.eq("https://ipfs.io/ipfs/Qmd4Sp9oSFMzFEuzwUQdihFMd3sYKQpoy4D8ckYd6bPVeC/plant1.png");
        console.log(await flower.tokenURI("1"));

        // Fastforward 1000 sec
        await network.provider.send("evm_increaseTime", [1000]);
        await network.provider.send("evm_mine");

        // Verify that metadata is [1], Print its metadata
        expect(
            await flower.tokenURI("1")
        ).to.eq("https://ipfs.io/ipfs/Qmd4Sp9oSFMzFEuzwUQdihFMd3sYKQpoy4D8ckYd6bPVeC/plant2.png");
        console.log(await flower.tokenURI("1"));

        // Fastforward 1000 sec
        await network.provider.send("evm_increaseTime", [1000]);
        await network.provider.send("evm_mine");

        // Verify that metadata is [2], Print its metadata
        expect(
            await flower.tokenURI("1")
        ).to.eq("https://ipfs.io/ipfs/Qmd4Sp9oSFMzFEuzwUQdihFMd3sYKQpoy4D8ckYd6bPVeC/plant3.png");
        console.log(await flower.tokenURI("1"));

        // Fastforward 1000 sec
        await network.provider.send("evm_increaseTime", [1000]);
        await network.provider.send("evm_mine");

        // Verify that metadata is [2], Print its metadata
        expect(
            await flower.tokenURI("1")
        ).to.eq("https://ipfs.io/ipfs/Qmd4Sp9oSFMzFEuzwUQdihFMd3sYKQpoy4D8ckYd6bPVeC/plant3.png");
        console.log(await flower.tokenURI("1"));


    });

});