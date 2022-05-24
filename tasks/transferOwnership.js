const { parseUnits } = require("ethers/lib/utils");
const { TOKEN_ADDR } = process.env;

task("tokentransferownership", "Transfer Token ownership")
.setAction(async (taskArgs, hre) => {
  const [addr1, addr2, ...addrs] = await hre.ethers.getSigners();

  const token = await hre.ethers.getContractAt("ERC20", process.env.TOKEN_ADDR);
  //const hermes = await hre.ethers.getContractAt("Hermes", process.env.HERMES_ADDR as string);
  await token.transferOwnership(process.env.HERMES_ADDR);

  console.log('tokenTransferOwnership task Done!'); 
});