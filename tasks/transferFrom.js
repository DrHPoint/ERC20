const { parseUnits } = require("ethers/lib/utils");
const { TOKEN_ADDR } = process.env;

task("transferFrom", "Transfer some tokens to some address")
 .addParam("from", "The some address")
 .addParam("to", "The some address")
 .addParam("value", "The expected value")
 .setAction(async (taskArgs, hre) => {
   const [addr1, addr2, ...addrs] = await hre.ethers.getSigners();

   const token = await hre.ethers.getContractAt("ERC20", process.env.TOKEN_ADDR);

   const decimals = await token.decimals();

   await token.transferFrom(taskArgs.from, taskArgs.to, parseUnits(taskArgs.value, decimals));

   console.log('transferFrom task Done!');
 });
