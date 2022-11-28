# “Waterable” Flower NFTs - Changes Metadata as It Accrues Tokens From a Superfluid Stream

## What is Superfluid

Moving tokens between accounts is usually pretty boring. It's typically done through basic ERC20 transfers. Say I transfer you 100 DAI - this causes my balance to go down by 100 and yours to go up by 100. 

Superfluid's smart contract framework takes this a step forward by introducing a new token standard, called the **Super Token**. 

The Super Token extends the basic ERC20 transfer functionality to include Super Agreements. These Super Agreements give us new and more powerful ways to move tokens on-chain!

The Constant Flow Agreement (CFA) is the most popular Super Agreement and lets us *stream* our Super Tokens. What does streaming even mean?

Streaming refers to the by-the-second movement of tokens between accounts. Imagine Alice is streaming to Bob at a flow rate of 1 DAIx/second. This means that with every passing second, Alice's balance is increasing by 1 DAI and Bob's is decreasing.
<br></br>
<center>
<img src="./resources/img/money-streaming-basic.gif" alt="process" width="40%"/>
</center>
<br></br>

Want to learn more? A more holistic explainer of Superfluid can be found [here](https://docs.superfluid.finance/superfluid/protocol-overview/in-depth-overview).

## Flower NFTs (non-technical overview)

Interacting with the [Flower NFT Contract](./contracts/Flower.sol) is simple - you start by creating a stream of `acceptedToken` to the Flower contract.

The Flower contract reacts and mints a Flower NFT to your address. As your stream goes on, the metadata of the Flower NFT will graduate images as the amount you've streamed so far into the contract increases. You can increase/decrease your flow rate or delete your stream as you please!

Addresses can only have one Flower NFT at once. If you transfer your Flower to another address (that doesn't already have a Flower), you will have your `acceptedToken` stream automatically cancelled if you haven't already done so. The metadata on the NFT will be unchanged (not reset to the first image) after the transfer.