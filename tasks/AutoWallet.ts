import { ethers, utils } from "ethers"
import { Planner as WeiPlanner, Contract as WeiContract } from '@weiroll/weiroll.js'
import { getUserAndWallet } from '../utils/getUserAndWallet';
import { getcontractAtConnectWallet } from '../utils/getcontractAtConnectWallet';
import { getContractConnectWallet } from '../utils/getContractConnectWallet';
import IWrapped from '../abis/IWrapped.json';

const toWei = ethers.utils.parseEther

interface state {
   ethers: any
   config: any
   provider: any
}

/**
 * @name AutoWallet.execute()
 */
// @ts-ignore
task("execute", "Execute FlashLoan")
   .addParam("commands", "<string>")
   .addParam("state", "<string>")
   .addOptionalParam("user", "<address>")
   .addOptionalParam("wallet", "<address>")
   .setAction(async (args: any, { ethers, provider, config }: state) => {
      const { wallet } = await getUserAndWallet(ethers, args)
      const AutoWallet = await getContractConnectWallet(ethers, 'AutoWallet', wallet)
      console.log('Executing Transaction...')
      await AutoWallet.execute(args.commands, args.state)
      console.log('Transaction Complete')
   });

/**
 * @name AutoWallet.withdraw()
 */
// @ts-ignore
task("withdraw", "Burn Shares and Receive Tokens")
   .addParam("amount", "<uint256>")
   .addOptionalParam("user", "<address>")
   .addOptionalParam("wallet", "<address>")
   .setAction(async (args: any, { ethers }: state) => {
      const { wallet } = await getUserAndWallet(ethers, args)
      const stakeToken = await getContractConnectWallet(ethers, 'StakeToken', wallet)
      console.log('Starting Deposit')
      await stakeToken.withdraw(toWei(args.amount))
      console.log('Deposit C`omplete')
   });