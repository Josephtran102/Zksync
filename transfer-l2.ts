import * as zksync from "zksync-web3";
import * as ethers from "ethers";
import * as dotenv from "dotenv";
dotenv.config(); 
// Load PRIVATE_KEY in .env file
const privateKey = process.env.PRIVATE_KEY; 
if (!privateKey) {
    throw new Error('Private key is not defined in the .env file.');
}

const provider = new zksync.Provider("https://testnet.era.zksync.dev");
const wallet = new zksync.Wallet(privateKey).connect(provider);
// Receive Address:
const receiverWallet = "0x8fD344b274Db0F5da89822E41DCAC9F342aD8aa6"; 
// Token Address:
const _JOS = "0xfb525657e563369CB299E705d6129D1Cc3a63082"; 

async function l2transfer() {
    const amount = ethers.utils.parseUnits("1000", 18); // Change Token quantity: 1000 

    console.log(`FROM this L2 wallet: "${ethers.utils.formatUnits(await provider.getBalance(wallet.address, "latest", _JOS), 18)}" JOSE`);
    console.log(`TO receiver account: "${ethers.utils.formatUnits(await provider.getBalance(receiverWallet, "latest", _JOS), 18)}" JOSE`);

    const transfer = await wallet.transfer({
        to: receiverWallet,
        token: _JOS,
        amount,
    });

    const transferReceipt = await transfer.wait();
    console.log(`Tx transfer hash for JOSE: ${transferReceipt.blockHash}`);

    console.log(`FROM this L2 wallet: "${ethers.utils.formatUnits(await provider.getBalance(wallet.address, "latest", _JOS), 18)}" JOSE`);
    console.log(`TO receiver wallet: "${ethers.utils.formatUnits(await provider.getBalance(receiverWallet, "latest", _JOS), 18)}" JOSE`);
}

l2transfer().catch(error => console.error(error));

// npx ts-node transfer-l2.ts

// Compile TypeScript to java= npx tsc transfer-l2.ts
