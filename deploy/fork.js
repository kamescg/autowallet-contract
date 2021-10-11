const { dim, green } = require("../utils/colors");
const { chainName } = require("../utils/chainName");
const { deployContract } = require("../utils/deployContract");

module.exports = async (hardhat) => {
    const { getNamedAccounts, deployments, getChainId, ethers } = hardhat;
    const { deploy } = deployments;
    const chainId = parseInt(await getChainId(), 10);
    const { deployer, AaveLendingProvider, AaveLendingPool } = await getNamedAccounts();

    // 31337 is unit testing, 1337 is for coverage
    const isTestEnvironment = chainId === 31337 || chainId === 1337;

    if (process.env.DEPLOY != "fork") {
        dim(`Ignoring Deployment...`);
        return;
    } else {
        dim(`Deploying contracts on the Fork network...`);
    }

    dim("\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    dim(" Starting Contracts Deployment");
    dim("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n");
    dim(`Network: ${chainName(chainId)} (${isTestEnvironment ? "local" : "remote"})`);
    dim(`Deployer: ${deployer}`);

    await deployContract(deploy, "ModuleAaveFlash", deployer, [AaveLendingProvider]);
    await deployContract(deploy, "BeanCounter", deployer);
    await deployContract(deploy, "ERC20Mintable", deployer, ["Token", "TOK"]);
    const VirtualMachineResult = await deployContract(deploy, "VirtualMachine", deployer);
    const AutoTaskListResult = await deployContract(deploy, "AutoTaskList", deployer);
    await deployContract(deploy, "AutoWallet", deployer, [
        VirtualMachineResult.address,
        AutoTaskListResult.address,
    ]);

    dim("\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    green("Contract Deployments Complete!");
    dim("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n");
};
