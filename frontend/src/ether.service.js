// import simpleCounterArtifact from "contracts-out/SimpleCounter.json";

const NODE_ENV = 'dev',
    HTTP_ENDPOINT = 'http://127.0.0.1:7545',
    INFURA_ROPSTEN_PROJECT_ID = 'b0699ff0c673456ea963164da0ab26dc',
    MNEMONIC = 'quit image fetch gap soul eight laptop neutral develop jar fold void';


let provider, mnemonicWallet;
// if (NODE_ENV === 'dev') {
//     mnemonicWallet = ethers.Wallet.fromMnemonic(MNEMONIC);
//     provider = new Web3.providers.HttpProvider(HTTP_ENDPOINT);
// } else {
//     new HDWalletProvider(process.env.MNEMONIC, `https://ropsten.infura.io/v3/${process.env.INFURA_ROPSTEN_PROJECT_ID}`);
// }
// const web3 = new Web3(provider);
//

let abi = [
    {
        "constant": true,
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "name": "registeredUsers",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "score",
        "outputs": [
            {
                "internalType": "uint16",
                "name": "",
                "type": "uint16"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "name": "userPwdHash",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "usernames",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "username",
                "type": "bytes32"
            },
            {
                "internalType": "bytes32",
                "name": "pwdHash",
                "type": "bytes32"
            }
        ],
        "name": "register",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "username",
                "type": "bytes32"
            },
            {
                "internalType": "uint16",
                "name": "barId",
                "type": "uint16"
            },
            {
                "internalType": "bytes",
                "name": "pwd",
                "type": "bytes"
            },
            {
                "internalType": "bytes32",
                "name": "pwdHash",
                "type": "bytes32"
            }
        ],
        "name": "increment",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "username",
                "type": "bytes32"
            }
        ],
        "name": "userScore",
        "outputs": [
            {
                "internalType": "uint16",
                "name": "",
                "type": "uint16"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getAllUsers",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "bytes32",
                        "name": "username",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "uint16",
                        "name": "score",
                        "type": "uint16"
                    }
                ],
                "internalType": "struct SimpleCounter.UserDate[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
];

class EtherService {

    async getUsers() {
        mnemonicWallet = ethers.Wallet.fromMnemonic(MNEMONIC);
        const provider = new ethers.providers.InfuraProvider('ropsten', 'b0699ff0c673456ea963164da0ab26dc');


        mnemonicWallet.connect(provider);
        console.log(mnemonicWallet);
        console.log(provider);
        let contract = new ethers.Contract('0xEB6bc10424Fd81854f2372eC9B26Ef39eA93b27c', abi, provider);
        console.log(contract)
    }

}


export const etherService = new EtherService();


