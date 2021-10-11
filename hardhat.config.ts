import '@nomiclabs/hardhat-etherscan';
import '@nomiclabs/hardhat-waffle';
import 'hardhat-abi-exporter';
import 'hardhat-deploy';
import 'hardhat-deploy-ethers';
import 'hardhat-gas-reporter';
import 'solidity-coverage';
import { HardhatUserConfig } from 'hardhat/config';
import networks from './hardhat.network';

// Tasks
require('./tasks')

const optimizerEnabled = !process.env.OPTIMIZER_DISABLED;

const config: HardhatUserConfig = {
  // defaultNetwork: 'hardhat',
  abiExporter: {
    path: './abis',
    clear: true,
    flat: true,
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  gasReporter: {
    currency: 'USD',
    gasPrice: 100,
    enabled: process.env.REPORT_GAS ? true : false,
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
    maxMethodDiff: 10,
  },
  mocha: {
    timeout: 30000,
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
    WETH: {
      default: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'
    },
    AaveLendingProvider: {
      default: '0xB53C1a33016B2DC2fF3653530bfF1848a515c8c5',
      1: '0xB53C1a33016B2DC2fF3653530bfF1848a515c8c5',
    },
    AaveLendingPool: {
      default: '0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9',
      1: '0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9',
    },
  },
  networks,
  solidity: {
    compilers: [
      {
        version: '0.8.6',
        settings: {
          optimizer: {
            enabled: optimizerEnabled,
            runs: 2000,
          },
          evmVersion: 'berlin',
        },
      },
    ],
  },
};



export default config;
