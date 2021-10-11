import { expect } from 'chai';
import { ethers } from 'hardhat';
import { Signer } from '@ethersproject/abstract-signer';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { Contract, ContractFactory } from 'ethers';
import { Planner as WeiPlanner, Contract as WeiContract } from '@weiroll/weiroll.js'

async function deployLibrary(name: string) {
    const factory = await ethers.getContractFactory(name);
    const contract = await factory.deploy();
    // @ts-ignore
    return WeiContract.createLibrary(contract);
}

const { getSigners, utils } = ethers;
const { parseEther: toWei } = utils;

describe('AutoWallet', () => {
    // WALLETS
    let wallet1: SignerWithAddress;
    let wallet2: SignerWithAddress;
    let wallet3: SignerWithAddress;
    let wallet4: SignerWithAddress;

    // FACTORIES
    let AutoWalletFactory: ContractFactory
    let AutoTaskListFactory: ContractFactory
    let BeanCounterFactory: ContractFactory
    let ERC20MintableFactory: ContractFactory
    let VirtualMachineFactory: ContractFactory

    // CONTRACTS
    let autoWallet: Contract
    let autoWalletUnauthorized: Contract
    let autoTaskList: Contract
    let beanCounter: Contract
    let virtualMachine: Contract
    let token: Contract

    let BEANS: any
    let beanCounterWeiRoll: any
    let tokenWeiRoll: any

    before(async () => {
        [wallet1, wallet2, wallet3, wallet4] = await getSigners();
        AutoWalletFactory = await ethers.getContractFactory('AutoWallet');
        AutoTaskListFactory = await ethers.getContractFactory('AutoTaskList');
        BeanCounterFactory = await ethers.getContractFactory('BeanCounter');
        ERC20MintableFactory = await ethers.getContractFactory('ERC20Mintable');
        VirtualMachineFactory = await ethers.getContractFactory('VirtualMachine');
        BEANS = await deployLibrary("BeanCounter");
    });

    beforeEach(async () => {
        beanCounter = await BeanCounterFactory.deploy()
        virtualMachine = await VirtualMachineFactory.deploy()
        token = await ERC20MintableFactory.deploy('Token', 'TOK')

        // Default Task List
        autoTaskList = await AutoTaskListFactory.deploy()

        autoWallet = await AutoWalletFactory.deploy(autoTaskList.address, virtualMachine.address)
        autoWalletUnauthorized = autoWallet.connect(wallet4 as Signer)

        // @ts-ignore
        beanCounterWeiRoll = await WeiContract.createContract(beanCounter);
        // @ts-ignore
        tokenWeiRoll = await WeiContract.createContract(token);
    })

    describe('Core', () => {
        let planner: WeiPlanner;
        beforeEach(async () => {
            planner = new WeiPlanner();
        })

        describe('.execute()', () => {
            it('should succeed to execute transaction from authorized account', async () => {
                planner.add(beanCounterWeiRoll.setCounter(5));
                const { commands, state } = planner.plan();
                await autoWallet.execute(commands, state)
                expect(await beanCounter.counter())
                    .to.equal(5)
            })

            it('should succeed to execute transaction with nested state requirements', async () => {
                const next = planner.add(beanCounterWeiRoll.nextCounter());
                planner.add(beanCounterWeiRoll.setCounter(next));
                const { commands, state } = planner.plan();
                await autoWallet.execute(commands, state)
                expect(await beanCounter.counter())
                    .to.equal(2)
            })

            it('should succeed to execute transaction with subplan from flash loan', async () => {
                const next = planner.add(beanCounterWeiRoll.nextCounter());
                planner.add(beanCounterWeiRoll.setCounter(next));
                const { commands, state } = planner.plan();
                await autoWallet.execute(commands, state)
                expect(await beanCounter.counter())
                    .to.equal(2)
            })

            it('should fail to execute transaction on external contract from unauthorized account', async () => {
                planner.add(beanCounterWeiRoll.setCounter(5));
                const { commands, state } = planner.plan();
                await expect(autoWalletUnauthorized.execute(commands, state))
                    .to.be.revertedWith('Ownable: caller is not the owner')
            })
        })

        describe('.task()', () => {
            it('should succeed to execute authorized transaction from task list as anyone', async () => {
                const next = planner.add(beanCounterWeiRoll.nextCounter());
                planner.add(beanCounterWeiRoll.setCounter(next));
                const { commands, state } = planner.plan();
                await autoTaskList.set(commands, state)

                await autoWallet.connect(wallet4 as Signer).task(commands, state)
                expect(await beanCounter.counter())
                    .to.equal(2)
            })

            it('should fail to execute unauthorized transaction from task list as anyone', async () => {
                const next = planner.add(beanCounterWeiRoll.nextCounter());
                planner.add(beanCounterWeiRoll.setCounter(next));
                const { commands, state } = planner.plan();
                expect(autoWallet.connect(wallet4 as Signer).task(commands, state))
                    .to.be.revertedWith('Wallet/unauthorized')
            })

        })
    })

    describe('Setters', () => {
        it('should succeed to set approved tasks list address', async () => {
            expect(autoWallet.setTasks(wallet4.address))
                .to.emit(autoWallet, 'TasksSet')
        })

        it('should succeed to set virtualmachine library address', async () => {
            expect(autoWallet.setVirtualMachine(wallet4.address))
                .to.emit(autoWallet, 'VirtualMachineSet')
        })
    })

    describe('Getters', () => {
        it('should succeed to get approved tasks list address', async () => {
            expect(await autoWallet.tasks())
                .to.equal(autoTaskList.address)
        })

        it('should succeed to get virtualmachine library address', async () => {
            expect(await autoWallet.virtualmachine())
                .to.equal(virtualMachine.address)
        })
    })
})