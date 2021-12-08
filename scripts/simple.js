const hre = require("hardhat");

async function main() {


  const ERC20 = await hre.ethers.getContractFactory("ERC20");
  const token = await ERC20.deploy();

  await token.deployed();

  console.log("Deposit deployed to:", token.address);
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });