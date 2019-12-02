const path = require('path');
const {config} = require('dotenv');
const HDWalletProvider = require("@truffle/hdwallet-provider");

config();

module.exports = {
    networks: {
        develop: {
            host: '127.0.0.1',
            port: 7545,
            network_id: '5777'
        },
        test: {
            host: '127.0.0.1',
            port: 7545,
            network_id: '5777'
        },
        ropsten: {
            provider: () => {
                return new HDWalletProvider(process.env.MNEMONIC, `https://ropsten.infura.io/v3/${process.env.INFURA_ROPSTEN_PROJECT_ID}`)
            },
            network_id: 3
        }
    },
    contracts_build_directory: path.join(__dirname, "../frontend/public/contracts-out"),
};
