// import simpleCounterArtifact from "contracts-out/SimpleCounter.json";

import uuid from "uuid/v4";

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

// let text = "Hello World!"
//
// let bytes32 = ethers.utils.formatBytes32String(text)
// // "0x48656c6c6f20576f726c64210000000000000000000000000000000000000000"
//
// let originalText = ethers.utils.parseBytes32String(bytes32)

class EtherService {

    constructor() {
        this.contract = null;

    }


    async initialize() {
        if (this.contract !== null) return;

        const provider = new ethers.providers.InfuraProvider('ropsten', 'b0699ff0c673456ea963164da0ab26dc');
        mnemonicWallet = ethers.Wallet.fromMnemonic(MNEMONIC).connect(provider);

        this.contract = new ethers.Contract('0x63384CCc277C574c75DB29dd24a60aE23d064b37', abi, mnemonicWallet);
        window.contract = this.contract;
    }

    async getUsers() {
        const pwd1 = "pwd1";
        let messageBytes = ethers.utils.toUtf8Bytes(pwd1);
        const pwdHash1 = ethers.utils.keccak256(messageBytes);

        console.log(pwdHash1);
    }

    async register(username) {
        await this.initialize();
        const pwd = uuid().substring(0,31);

        console.log(this.contract);

        console.log(pwd);

        await this.contract.register(
            ethers.utils.formatBytes32String(username),
            ethers.utils.keccak256(ethers.utils.formatBytes32String(pwd))
        );
        localStorage.setItem("USERNAME", `${username}`);
        localStorage.setItem("PWD", `${pwd}`);
    }
}


export const etherService = new EtherService();


