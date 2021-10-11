# AutoWallet - On-Chain Task Runner

The AutoWallet contract is a smart wallet with *"efficient operation-chaining/scripting language for the EVM."*

Owners can execute chained transactions. The transactions can share state. Return values can be passed into subsequent transactions.

Anyone can run approved tasks. The tasks or "batched transactions" are approved by the Owner. After an approval, a task runner is free to submit the (and perhaps be rewarded) batched transactions via the `task` function.

### Tasks
Approved tasks are stored in the `AutoTaskList`. 

The AutoWallet points the `tasks` to a deployed `IAutoTaskList` contract.

- **set:** approve a task
- **unset:** disable approved task
- **isSet:** check if task is approved

### Execute
Generalized transaction chaining allows the AutoWallet to execute arbitrary transaction bundles with shared state between function calls.

**In short, it's an advanced muticall.** With room for interesting experiments.

To create the chain transactions use [Weiroll.js](https://github.com/weiroll/weiroll.js)

**Github:** https://github.com/weiroll/weiroll.js

The library helps encode transaction data and shared state with a task `Planner`.

 ## Attributions
[Weiroll](https://github.com/weiroll/weiroll) powers the VM and CommandBundler functionality.

# Getting Started

The repo can be cloned from Github for contributions.

```sh
$ git clone https://github.com/kamescg/autowallet-contracts
```

```sh
$ yarn
```

We use [direnv](https://direnv.net/) to manage environment variables.  You'll likely need to install it.

```sh
cp .envrc.example .envrv
```

Infura is a generalized enpoint and Alchemy provides archnive node support.

- [Infura](https://infura.io/)<br/>
- [Alchemy](https://www.alchemy.com/)

To enable forking support add an Alchemy API and API URL to the `environment` variables.

# Compiling
Compile the smart contracts using `pragma solidity 0.8.6` and generate artifacts/abis.

```sh
$ yarn compile
```

# Deploying
Easily deploy to multiple environments using the the `deploy` command.

The `VirtualMachine.sol` can be deployed once for multiple instances of `AutoWallet.sol`

```sh
$ yarn deploy:mainnet
```
```sh
$ yarn deploy:fork
```
```sh
$ yarn deploy:rinkeby
```
```sh
$ yarn deploy:goerli
```
```sh
$ yarn deploy:matic
```
```sh
$ yarn deploy:mumbai
```
# Testing

The contracts are tested using [Hardhat](https://hardhat.dev) and [hardhat-deploy](https://github.com/wighawag/hardhat-deploy) plus the standard [Chai](https://www.chaijs.com/) assertion library 

To run unit & integration tests:

```sh
$ yarn test
```

To run coverage:

```sh
$ yarn coverage
```

# Fork Testing

Ensure your environment variables are set up.  Make sure your Alchemy URL is set.  Now start a local fork:

```sh
$ yarn fork:start
```

```sh
$ yarn fork:setup
```
```sh
$ yarn fork:impersonate
```
```sh
$ yarn fork:distribute
```
```sh
$ yarn fork:flash
```
