import Web3 from "web3";
import TruffleContract from "@truffle/contract";
import HDWalletProvider from "@truffle/hdwallet-provider";
import simpleCounterArtifact from "../../contracts-out/SimpleCounter";

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



class EtherService {

    async getUsers() {
        const simpleCounter = await SimpleCounter.deployed();
        window.simpleCounter = simpleCounter;
    }

}


export const etherService = new EtherService();


