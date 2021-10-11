const { cyan, displayResult } = require('./colors')

export async function deployContract(deploy: Function, contract: string, deployer: string, args: Array<any>) {
  cyan(`\nDeploying ${contract}...`)
  const result = await deploy(contract, {
    from: deployer,
    args: args
  })
  displayResult(`${contract}`, result)

  return result
}

export default deployContract;