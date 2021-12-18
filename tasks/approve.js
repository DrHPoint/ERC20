const { parseUnits } = require("ethers/lib/utils");
const { TOKEN_ADDR } = process.env;

task("approve", "Get approve to some address")
 .addParam("spender", "The spender's address")
 .addParam("value", "The approved value")
 .setAction(async (taskArgs, hre) => {
   const [addr1, addr2, ...addrs] = await hre.ethers.getSigners();

   const token = await hre.ethers.getContractAt("ERC20", process.env.TOKEN_ADDR);

   const decimals = await token.decimals();

   await token.approve(taskArgs.spender, parseUnits(taskArgs.value, decimals));

   console.log('approve task Done!');
 });
