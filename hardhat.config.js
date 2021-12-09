require("@nomiclabs/hardhat-waffle");
require('solidity-coverage');
require('@nomiclabs/hardhat-ethers');
require("@nomiclabs/hardhat-web3");

const { parseEther } = require("ethers/lib/utils");
const { MNEMONIC, INFURA_URL, TOKEN_ADDR } = require('./secret.js')

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

 task("mint", "Mint some tokens to some address")
 .addParam("to", "The some address")
 .addParam("value", "The expected value")
 .setAction(async (taskArgs, hre) => {
   const [addr1, addr2, ...addrs] = await hre.ethers.getSigners();

   const token = await hre.ethers.getContractAt("ERC20", TOKEN_ADDR);

   await token.connect(addr1).mint(taskArgs.to, parseEther(taskArgs.value));

   console.log('mint task Done!');
 });

 task("transfer", "Transfer some tokens to some address")
 .addParam("to", "The some address")
 .addParam("value", "The expected value")
 .setAction(async (taskArgs, hre) => {
   const [addr1, addr2, ...addrs] = await hre.ethers.getSigners();

   const token = await hre.ethers.getContractAt("ERC20", TOKEN_ADDR);

   await token.transfer(taskArgs.to, parseEther(taskArgs.value));

   console.log('transfer task Done!');
 });

 task("transferFrom", "Transfer some tokens to some address")
 .addParam("from", "The some address")
 .addParam("to", "The some address")
 .addParam("value", "The expected value")
 .setAction(async (taskArgs, hre) => {
   const [addr1, addr2, ...addrs] = await hre.ethers.getSigners();

   const token = await hre.ethers.getContractAt("ERC20", TOKEN_ADDR);

   await token.transferFrom(taskArgs.from, taskArgs.to, parseEther(taskArgs.value));

   console.log('transferFrom task Done!');
 });

 task("burn", "Burn some tokens from some address")
 .addParam("from", "The some address")
 .addParam("value", "The expected value")
 .setAction(async (taskArgs, hre) => {
   const [addr1, addr2, ...addrs] = await hre.ethers.getSigners();

   const token = await hre.ethers.getContractAt("ERC20", TOKEN_ADDR);

   await token.burn(taskArgs.from, parseEther(taskArgs.value));

   console.log('burn task Done!');
 });

 task("approve", "Get approve to some address")
 .addParam("spender", "The spender's address")
 .addParam("value", "The approved value")
 .setAction(async (taskArgs, hre) => {
   const [addr1, addr2, ...addrs] = await hre.ethers.getSigners();

   const token = await hre.ethers.getContractAt("ERC20", TOKEN_ADDR);

   await token.approve(taskArgs.spender, parseEther(taskArgs.value));

   console.log('approve task Done!');
 });


module.exports = {
  solidity: "0.8.1",
  networks: {
    rinkeby: {
      // gas: 5000000,
      // gasPrice: 20000000000,
      url: INFURA_URL,
      accounts: { 
        mnemonic: MNEMONIC
      },
    }
  }
};