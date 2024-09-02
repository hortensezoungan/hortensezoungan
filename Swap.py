from web3 import Web3

# Connect to BSC
bsc = Web3(Web3.HTTPProvider('https://bsc-dataseed.binance.org/'))

# PancakePair contract address and ABI (replace with actual address)
contract_address = '0xYourContractAddress'
contract_abi = [
    # Insert the ABI of the contract here as a list
]

# Connect to the contract
pancake_pair = bsc.eth.contract(address=contract_address, abi=contract_abi)

# Example: Get reserves
reserves = pancake_pair.functions.getReserves().call()
reserve0 = reserves[0]
reserve1 = reserves[1]
block_timestamp_last = reserves[2]

print(f"Reserve0: {reserve0}, Reserve1: {reserve1}, Last Block Timestamp: {block_timestamp_last}")

# Example: Swap tokens
account = '0xYourAccountAddress'
private_key = 'YourPrivateKey'
to_address = '0xRecipientAddress'
amount0_out = 1000000000000000000  # 1 token (assuming 18 decimals)
amount1_out = 0

transaction = pancake_pair.functions.swap(amount0_out, amount1_out, to_address, b'').buildTransaction({
    'chainId': 56,
    'gas': 200000,
    'gasPrice': Web3.toWei('5', 'gwei'),
    'nonce': bsc.eth.getTransactionCount(account),
})

signed_txn = bsc.eth.account.signTransaction(transaction, private_key=private_key)
txn_hash = bsc.eth.sendRawTransaction(signed_txn.rawTransaction)

print(f"Transaction sent: {txn_hash.hex()}")
