const { parseUnits } = require("ethers/lib/utils");
const { TOKEN_ADDR } = process.env;

task("burn", "Burn some tokens from some address")
 .addParam("from", "The some address")
 .addParam("value", "The expected value")
 .setAction(async (taskArgs, hre) => {
   const [addr1, addr2, ...addrs] = await hre.ethers.getSigners();

   const token = await hre.ethers.getContractAt("ERC20", process.env.TOKEN_ADDR);

   const decimals = await token.decimals();

   await token.burn(taskArgs.from, parseUnits(taskArgs.value, decimals));

   console.log('burn task Done!');
 });

 