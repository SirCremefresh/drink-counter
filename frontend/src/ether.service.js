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

const options = { gasLimit: 750000 };


let abi = [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "bytes32",
                "name": "username",
                "type": "bytes32"
            },
            {
                "indexed": false,
                "internalType": "uint16",
                "name": "score",
                "type": "uint16"
            }
        ],
        "name": "UserIncremented",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "bytes32",
                "name": "username",
                "type": "bytes32"
            }
        ],
        "name": "UserRegistered",
        "type": "event"
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
        this.subscriber = null;
    }


    async initialize() {
        if (this.contract !== null) return;
        localStorage.setItem("USERS", JSON.stringify([]));


        // const provider = new ethers.providers.InfuraProvider('ropsten', 'b84d7d0e220a4f2aa32948882c0c8682');
        // const provider = new ethers.providers.InfuraProvider('ropsten', 'b0699ff0c673456ea963164da0ab26dc');
        const provider = new ethers.providers.InfuraProvider('ropsten', '3c73e78c751948a39868ad85c594747b');
        mnemonicWallet = ethers.Wallet.fromMnemonic(MNEMONIC).connect(provider);

        this.contract = new ethers.Contract('0xd52BD602BE0b60fa53176ef203e92fA6fB7dE0fe', abi, mnemonicWallet);
        window.contract = this.contract;
        window.provider = provider;
        window.wallet = mnemonicWallet;

        const users = await this.getAllUsers();
        localStorage.setItem("USERS", JSON.stringify(users));

        this.contract.on("UserRegistered", (oldValue, newValue, event) => {
            console.log("UserRegistered", oldValue, newValue, event);

            const username = ethers.utils.parseBytes32String(newValue.args.username);

            const users = JSON.parse(localStorage.getItem("USERS"));

            users.push({
                username,
                score: 0
            });

            localStorage.setItem("USERS", JSON.stringify(users));
            this.notifySubscriber();
        });
        this.contract.on("UserIncremented", (oldValue, newValue, event) => {
            console.log("UserIncremented", oldValue, newValue, event);

            const users = JSON.parse(localStorage.getItem("USERS"));
            const user = {
                username: ethers.utils.parseBytes32String(event.args.username),
                score: event.args.score
            };

            if (user.username === localStorage.getItem("USERNAME")) {
                localStorage.setItem("INCREMENT_BUFFER", `${+localStorage.getItem("INCREMENT_BUFFER") - 1}`);
            }

            const savedUser = users.find(r => r.username === user.username);
            savedUser.score = user.score;

            localStorage.setItem("USERS", JSON.stringify(users));
            console.log("UserIncremented", user);
            this.notifySubscriber();
        });
    }

    async register(username) {
        await this.initialize();
        const pwd = uuid().substring(0, 31);

        console.log(this.contract);

        console.log(pwd);

        await this.contract.register(
            ethers.utils.formatBytes32String(username),
            ethers.utils.keccak256(ethers.utils.formatBytes32String(pwd)),
            options
        );
        localStorage.setItem("USERNAME", `${username}`);
        localStorage.setItem("PWD", `${pwd}`);
    }

    async getAllUsers() {
        await this.initialize();
        let ranking = await this.contract.getAllUsers();

        return ranking.map((user) => {
            return {
                username: ethers.utils.parseBytes32String(user.username),
                score: user.score
            }
        });
    }

    async increment(barId) {
        await this.initialize();
        const username = localStorage.getItem("USERNAME");
        const pwd = localStorage.getItem("PWD");
        const newPwd = uuid().substring(0, 31);
        const newHash = ethers.utils.keccak256(ethers.utils.formatBytes32String(newPwd));

        console.log(barId, username, pwd, newPwd, newHash);

        localStorage.setItem("INCREMENT_BUFFER", `${+localStorage.getItem("INCREMENT_BUFFER") + 1}`);
        localStorage.setItem("PWD", `${newPwd}`);

        this.notifySubscriber();

        setTimeout(async () => {
            try {
                await this.contract.increment(
                    ethers.utils.formatBytes32String(username),
                    barId,
                    ethers.utils.formatBytes32String(pwd),
                    newHash,
                    options
                );
            } catch (e) {
                if (e.code === "REPLACEMENT_UNDERPRICED") {
                    console.log("Ignoring replacement error", e);
                } else {
                    console.error(e);
                    localStorage.setItem("PWD", `${pwd}`);
                    localStorage.setItem("INCREMENT_BUFFER", `${+localStorage.getItem("INCREMENT_BUFFER") - 1}`);
                }
            } finally {
                this.notifySubscriber();
            }
        }, 100);

    }

    notifySubscriber() {
        if (this.subscriber != null) {
            this.subscriber();
        }
    }

    getUsersData$(callback) {
        this.subscriber = () => {
            let users = JSON.parse(localStorage.getItem("USERS"));
            let user = users.find(r => r.username === localStorage.getItem("USERNAME"));
            if (user === undefined) {
                user = {
                    username: localStorage.getItem("USERNAME"),
                    score: 0
                };
                users.push(user);
            }
            user.score += +localStorage.getItem("INCREMENT_BUFFER");

            users.sort((x, y) => (x.score < y.score) ? 1 : -1);

            users = users.map((u, index) => {
                u.rank = index + 1;
                return u;
            });

            console.log({
                user,
                users
            });

            callback({
                user,
                users
            });
        };
        this.subscriber();
    }
}


export const etherService = new EtherService();


