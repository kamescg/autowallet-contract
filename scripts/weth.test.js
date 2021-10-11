// const { default: WETH } = config.namedAccounts.WETH;
// const wrappedEthCont = await ethers.getContractAt('IWrapped', WETH);
// const wrappedEth = new ethers.Contract(WETH, IWrapped, wallet);

// await wrappedEthCont.deposit({
//     value: toWei('10'),
// });

// await wrappedEth.transfer(AutoWallet.address, toWei('50'));
// // @ts-ignore
// const moduleAaveFlashWeiRoll = WeiContract.createContract(ModuleAaveFlash);
// const wrappedEthWeiRoll = WeiContract.createContract(wrappedEth);

// console.log('Starting Flash Loan');
// planner.add(wrappedEthWeiRoll.deposit().withValue(toWei('10')));
// planner.add(moduleAaveFlashWeiRoll.loan([WETH], [toWei(args.amount)]));
// planner.add(wrappedEthWeiRoll.balanceOf(AutoWallet.address).staticcall());
// planner.add(wrappedEthWeiRoll.withdraw(toWei('1')));
// const { commands, state } = planner.plan();
// await AutoWallet.execute(commands, state);

// console.log(await ethers.utils.formatEther(await wrappedEth.balanceOf(AutoWallet.address)));
// console.log('Flash Loan Complete');
