require("@nomiclabs/hardhat-waffle");
require('solidity-coverage');
require('@nomiclabs/hardhat-ethers');
require("@nomiclabs/hardhat-web3");
require('dotenv').config();
require("./tasks");


const { parseEther } = require("ethers/lib/utils");
const { MNEMONIC, INFURA_URL, TOKEN_ADDR } = process.env;

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
 

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