const Web3 = require('web3');
const TruffleContract = require('@truffle/contract');
const HDWalletProvider = require("@truffle/hdwallet-provider");

import simpleCounterArtifact from '../contracts-out/SimpleCounter.json';

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
    (<any>window).simpleCounter = simpleCounter;
    // await simpleCounter.count(web3.utils.fromUtf8("t3"), {from: '0x8D094820dde30B96C3bA3e77AE8A83c6b2eBe474'})
    // await simpleCounter.increment(web3.utils.fromUtf8("t3"), {from: '0x8D094820dde30B96C3bA3e77AE8A83c6b2eBe474'})
})();

(<any>window).web3 = web3;


