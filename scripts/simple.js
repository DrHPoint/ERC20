const hre = require("hardhat");

async function main() {


  const ERC20 = await hre.ethers.getContractFactory("ERC20");
  const token = await ERC20.deploy("Doctor", "WHO", 18);

  await token.deployed();

  console.log("ERC20 deployed to:", token.address);
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });