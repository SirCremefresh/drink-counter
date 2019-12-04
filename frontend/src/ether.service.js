// import simpleCounterArtifact from "contracts-out/SimpleCounter.json";

import uuid from "uuid/v4";

const MNEMONIC = 'quit image fetch gap soul eight laptop neutral develop jar fold void';

const options = {gasLimit: 750000};


let abi = [
    "event UserIncremented(bytes32 username, uint16 score)",
    "event UserRegistered(bytes32 username)",
    "function registeredUsers(bytes32) view returns (bool)",
    "function score(bytes32, uint256) view returns (uint16)",
    "function userPwdHash(bytes32) view returns (bytes32)",
    "function usernames(uint256) view returns (bytes32)",
    "function register(bytes32 username, bytes32 pwdHash)",
    "function increment(bytes32 username, uint16 barId, bytes pwd, bytes32 pwdHash)",
    "function userScore(bytes32 username) view returns(uint16)",
    "function getAllUsers() view returns(tuple(bytes32 username, uint16 score)[])",
];

class EtherService {

    constructor() {
        this.contract = null;
        this.mnemonicWallet = null;
        this.subscriber = null;
    }


    async initialize() {
        if (this.contract !== null) return;
        localStorage.setItem("USERS", JSON.stringify([]));

        const keys = ['b84d7d0e220a4f2aa32948882c0c8682', 'b0699ff0c673456ea963164da0ab26dc', '3c73e78c751948a39868ad85c594747b'];
        const key = keys[Math.floor(Math.random() * keys.length)];
        const provider = new ethers.providers.InfuraProvider('ropsten', key);
        this.mnemonicWallet = ethers.Wallet.fromMnemonic(MNEMONIC).connect(provider);

        this.contract = new ethers.Contract('0x8888B9A2b2bA788209299373aF4a7038DB6215c1', abi, this.mnemonicWallet);
        window.contract = this.contract;
        window.provider = provider;
        window.wallet = this.mnemonicWallet;

        const users = await this.getAllUsers();
        localStorage.setItem("USERS", JSON.stringify(users));

        this.notifySubscriber();

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
        localStorage.setItem("NEXT_SCAN", `${new Date().getTime() + 1 * 60000}`);
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
        console.log(`increment before initialize with barId: ${barId}`);
        await this.initialize();
        const username = localStorage.getItem("USERNAME");
        const pwd = localStorage.getItem("PWD");
        const newPwd = uuid().substring(0, 31);
        const newHash = ethers.utils.keccak256(ethers.utils.formatBytes32String(newPwd));

        console.log(barId, username, pwd, newPwd, newHash);

        localStorage.setItem("INCREMENT_BUFFER", `${+localStorage.getItem("INCREMENT_BUFFER") + 1}`);
        localStorage.setItem("NEXT_SCAN", `${new Date().getTime() + 2 * 60000}`);
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

    async isUsernameTaken(username) {
        return await this.contract.registeredUsers(ethers.utils.formatBytes32String(username))
    }
}


export const etherService = new EtherService();


