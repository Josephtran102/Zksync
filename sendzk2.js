const { Wallet: ZkSyncWallet, Provider } = require("zksync-web3");
const ethers = require("ethers");
require('dotenv').config(); // Đọc các biến môi trường từ file .env
const zksync = require("zksync");

const privateKey = process.env.PRIVATE_KEY;
const zkSyncProvider = new zksync.Provider("https://testnet.era.zksync.dev");
const zkSyncWallet = new zksync.Wallet(privateKey).connect(zkSyncProvider);

const receiverWallet = "";
const _JOSE = "";// contract token

async function l2transfer() {
  const amount = ethers.BigNumber.from("1000000000000000000");

  console.log(`FROM this L2 wallet: "${ethers.utils.formatUnits(await zkSyncWallet.getBalance(_JOSE), 18)}" JOSE`);
  console.log(`TO receiver account: "${ethers.utils.formatUnits(await zkSyncWallet.getBalance(receiverWallet, _JOSE), 18)}" JOSE`);

  const transfer = await zkSyncWallet.transfer({
    to: receiverWallet,
    token: _JOSE,
    amount,
  });

  const transferReceipt = await transfer.awaitReceipt();
  console.log(`Tx transfer hash for DAI: ${transferReceipt.blockHash}`);

  console.log(`FROM this L2 wallet: "${ethers.utils.formatUnits(await zkSyncWallet.getBalance(_JOSE), 18)}" JOSE`);
  console.log(`TO receiver wallet: "${ethers.utils.formatUnits(await zkSyncWallet.getBalance(receiverWallet, _JOSE), 18)}" JOSE`);
}

l2transfer().catch(error => {
  console.error(error);
});
