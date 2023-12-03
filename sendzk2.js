const { Wallet: ZkSyncWallet, Provider } = require("zksync-web3");
const ethers = require("ethers");
require('dotenv').config(); // Đọc các biến môi trường từ file .env
const zksync = require("zksync");

const privateKey = process.env.PRIVATE_KEY;
const provider = new Provider("https://testnet.era.zksync.dev");

async function main() {
  const wallet = new ZkSyncWallet(privateKey).connect(provider);

  const committedEthBalance = await wallet.getBalance(ethers.utils.getAddress(ethers.constants.AddressZero));
  const committedEthBalanceValue = ethers.utils.formatEther(committedEthBalance);
  console.log("Committed ETH Balance:", committedEthBalanceValue);

  const finalizedEthBalance = await wallet.getBalance(ethers.utils.getAddress(ethers.constants.AddressZero), "finalized");
  const finalizedEthBalanceValue = ethers.utils.formatEther(finalizedEthBalance);
  console.log("Finalized ETH Balance:", finalizedEthBalanceValue);

  const toAddress = process.env.TO_ADDRESS;
  const wallet2 = new ZkSyncWallet(toAddress).connect(provider);

  const amount = ethers.utils.parseEther("0.0001");

  const transfer = await wallet.transfer({
    to: wallet2.address,
    token: zksync.utils.ETH_ADDRESS,
    amount,
  });
}

main().catch(error => {
  console.error(error);
});
