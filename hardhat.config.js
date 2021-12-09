require("@nomiclabs/hardhat-waffle");
require('solidity-coverage')

const { PRIVATE_KEY, INFURA_URL } = require('./secret.js')

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

module.exports = {
  solidity: "0.8.1",
  networks: {
    rinkeby: {
      url: INFURA_URL,
      accounts: [`0x${PRIVATE_KEY}`]
    }
  }
};