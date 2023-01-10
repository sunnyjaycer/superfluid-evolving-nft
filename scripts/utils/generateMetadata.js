fs = require('fs');
const { type } = require('os');
const path = require('path');

// Example: https://ipfs.io/ipfs/QmUcqndszybSEsMvvWaZJrJpzPRza94wRynKipKmJh6C2Y

async function main() {

    const baseIpfs = "ipfs://Qmd4Sp9oSFMzFEuzwUQdihFMd3sYKQpoy4D8ckYd6bPVeC/"

    // Get array of image file names
    let fileNames = []
    fs.readdirSync("./resources/img/plant-stages").forEach(file => {
        fileNames.push( path.parse(file).name )
    });

    // generate metadata file for each image file
    for (let i = 0; i < fileNames.length; i++) {
        const baseText = `
{
    "name": "Evolving Flower NFT",
    "description": "Water an NFT with a Superfluid stream and watch it grow",
    "image": "${baseIpfs}${fileNames[i]}.png"
}
        `
        // var writeStream = await fs.createWriteStream("../../resources/flower-metadatas/test.txt");
        // await writeStream.write(baseText);
    
        fs.writeFile(`./resources/flower-metadatas/${fileNames[i]}.json`,baseText, function (err) {
            if (err) return console.log("Make sure you run this in the base of the repo");
        });
    };
}

main();