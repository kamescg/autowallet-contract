import hardhat from 'hardhat'
import { ethers } from 'ethers'
import weiroll from '@weiroll/weiroll.js'

function main() {
  const AutoWallet = new ethers.Contract('AutoWallet');
  const contract = weiroll.Contract.createLibrary(AutoWallet);

  const planner = new weiroll.Planner();
  planner.add(contract.func2(ret));
}

main()