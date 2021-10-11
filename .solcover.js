module.exports = {
    providerOptions: {
        network_id: 1337,
        _chainId: 1337,
        _chainIdRpc: 1337,
    },
    skipFiles: [
        'external',
        'test',
        'interfaces',
        'core/VirtualMachine.sol',
        'core/CommandBuilder.sol',
    ],
};
