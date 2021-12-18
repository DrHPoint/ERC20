const { parseUnits } = require("ethers/lib/utils");
const { TOKEN_ADDR } = process.env;

task("mint", "Mint some tokens to some address")
 .addParam("to", "The some address")
 .addParam("value", "The expected value")
 .setAction(async (taskArgs, hre) => {
   const [addr1, addr2, ...addrs] = await hre.ethers.getSigners();

   const token = await hre.ethers.getContractAt("ERC20", TOKEN_ADDR);

   const decimals = await token.decimals();

   await token.connect(addr1).mint(taskArgs.to, parseUnits(taskArgs.value, decimals));

   console.log('mint task Done!');
 });