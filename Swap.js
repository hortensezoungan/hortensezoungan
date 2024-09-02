const Web3 = require('web3');

// Connect to BSC
const web3 = new Web3('https://bsc-dataseed.binance.org/');

// PancakePair contract address and ABI (replace with actual address and ABI)
const contractAddress = '0xYourContractAddress';
const contractAbi = [
    // Insert the ABI of the contract here as a JSON array
];

// Connect to the contract
const pancakePair = new web3.eth.Contract(contractAbi, contractAddress);

// Swap function parameters
const account = '0xYourAccountAddress';
const privateKey = 'YourPrivateKey';
const toAddress = '0xRecipientAddress';
const amount0Out = web3.utils.toWei('1', 'ether');  // 1 token (assuming 18 decimals)
const amount1Out = '0';
const data = '0x';  // Additional data, if any

async function swapTokens() {
    const nonce = await web3.eth.getTransactionCount(account, 'latest');

    // Build transaction for swap
    const tx = {
        from: account,
        to: contractAddress,
        gas: 200000,  // Adjust gas limit as needed
        gasPrice: web3.utils.toWei('5', 'gwei'),  // Adjust gas price as needed
        data: pancakePair.methods.swap(amount0Out, amount1Out, toAddress, data).encodeABI(),
        nonce: nonce,
        chainId: 56  // BSC Mainnet
    };

    // Sign the transaction
    const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
    
    // Send the transaction
    web3.eth.sendSignedTransaction(signedTx.rawTransaction)
    .on('receipt', console.log)
    .on('error', console.error);
}

// Execute the swap
swapTokens();
