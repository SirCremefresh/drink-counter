import registerHtml from './register.html';
import scanHtml from './scan.html';
import rankingHtml from './ranking.html';
// @ts-ignore
import QrScanner from 'qr-scanner';
const uuid = require('uuid/v4');
import simpleCounterArtifact from '../contracts-out/SimpleCounter.json';


const Web3 = require('web3');
const TruffleContract = require('@truffle/contract');
const HDWalletProvider = require("@truffle/hdwallet-provider");
// var register = document.getElementById('register');
// register.innerHTML = registerHtml;

console.info('Starting application with parameters: ', {
    NODE_ENV: process.env.NODE_ENV,
    HTTP_ENDPOINT: process.env.HTTP_ENDPOINT,
    PUBLIC_ADDRESS: process.env.PUBLIC_ADDRESS
});

let provider;
if (process.env.NODE_ENV === 'dev') {
    provider = new Web3.providers.HttpProvider(process.env.HTTP_ENDPOINT);
} else {
    new HDWalletProvider(process.env.MNEMONIC, `https://ropsten.infura.io/v3/${process.env.INFURA_ROPSTEN_PROJECT_ID}`);
}
const web3 = new Web3(provider);

const SimpleCounter = TruffleContract(simpleCounterArtifact);
SimpleCounter.setProvider(web3.currentProvider);

(async () => {
    const simpleCounter = await SimpleCounter.deployed();
    // (<any>window).simpleCounter = simpleCounter;
    // await simpleCounter.count(web3.utils.fromUtf8("t3"), {from: '0x8D094820dde30B96C3bA3e77AE8A83c6b2eBe474'})
    // await simpleCounter.increment(web3.utils.fromUtf8("t3"), {from: '0x8D094820dde30B96C3bA3e77AE8A83c6b2eBe474'}
    //
    (<any>window).web3 = web3;

    const rootEl = document.getElementById("root");

    if (localStorage.getItem("USERNAME") === null) {
        await showPage('REGISTER');
    } else {
        await showPage('SCAN');
    }


    async function showPage(page: 'REGISTER' | 'SCAN' | 'RANKING') {
        if (page === 'REGISTER') {
            rootEl.innerHTML = registerHtml;

            const usernameInput = <HTMLInputElement>document.querySelector("[data-el=register-username-input]");
            const registerButton = document.querySelector("[data-el=register-button]");

            registerButton.addEventListener('click', async () => {
                const username = usernameInput.value;
                const pwd = uuid();
                await simpleCounter.register(
                        web3.utils.fromUtf8(username),
                        web3.utils.keccak256(pwd),
                        {from: process.env.PUBLIC_ADDRESS}
                    );
                localStorage.setItem("USERNAME", `${username}`);
                localStorage.setItem("PWD", `${pwd}`);
                await showPage('SCAN');
            });
        } else if (page === 'SCAN') {
            rootEl.innerHTML = scanHtml;
            const video = document.getElementById('qr-video');

            const scanner = new QrScanner(video, result => {
                if (result) {
                    const barId = parseInt(result.substring(0, 1));
                    if (barId >= 0 && barId <= 6) {
                        scanner.destroy();
                        let newPwd = uuid();
                        /*
                        simpleCounter.increment(
                                web3.utils.fromUtf8(localStorage.getItem("USERNAME")),
                                barId,
                                web3.utils.fromUtf8(localStorage.getItem("PWD")),
                                web3.utils.keccak256(newPwd)
                            );
                        localStorage.setItem("PWD", `${newPwd}`);
                         */
                    }
                }
            });
            scanner._qrWorker = new Worker('../node_modules/qr-scanner/qr-scanner-worker.min.js');

            await scanner.start();
        } else if (page === 'RANKING') {
            rootEl.innerHTML = rankingHtml;
        }
    }

})();


