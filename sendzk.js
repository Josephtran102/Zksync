const { Wallet: ZkSyncWallet, Provider } = require("zksync-web3");
const ethers = require("ethers");
require('dotenv').config(); 
const zksync = require("zksync");

const privateKey = process.env.PRIVATE_KEY;
const provider = new Provider("https://testnet.era.zksync.dev");

// Tạo một async function để sử dụng await
async function main() {
  const wallet = new ZkSyncWallet(privateKey).connect(provider);

  // Retrieving the current (committed) zkSync ETH balance of an account
  const committedEthBalance = await wallet.getBalance(ethers.utils.getAddress(ethers.constants.AddressZero));

  // Chuyển đổi giá trị BigNumber sang số thực
  const committedEthBalanceValue = ethers.utils.formatEther(committedEthBalance);

  // Retrieving the ETH balance of an account in the last finalized zkSync block.
  const finalizedEthBalance = await wallet.getBalance(ethers.utils.getAddress(ethers.constants.AddressZero), "finalized");

  // Chuyển đổi giá trị BigNumber sang số thực
  const finalizedEthBalanceValue = ethers.utils.formatEther(finalizedEthBalance);

  console.log("Committed ETH Balance:", committedEthBalanceValue);
  console.log("Finalized ETH Balance:", finalizedEthBalanceValue);

  // Sử dụng cùng cách khai báo như trên để tạo wallet thứ hai
  const privateKey2 = process.env.PRIVATE_KEY2; // Cần phải khai báo PRIVATE_KEY2 từ môi trường hoặc giá trị khác
  const wallet2 = new ZkSyncWallet(privateKey2).connect(provider);

  const amount = ethers.utils.parseEther("0.0001");

  const transfer = await wallet.transfer({
    to: wallet2.address,
    token: zksync.utils.ETH_ADDRESS,
    amount,
  });

  const transferReceipt = await transfer.wait();
  console.log(`Tx transfer hash: ${transferReceipt.transactionHash}`);
}

main().catch(error => {
  console.error(error);
});
