const SimpleCounter = artifacts.require("SimpleCounter");

contract("SimpleCounter", accounts => {
    const username = "test-user";
    const pwd = "pwd";
    
    beforeEach(() => {

    });

    it("...should create user.", async () => {
        const simpleCounter = await SimpleCounter.deployed();
        const username = "Donato";
        const pwd = "pwd";

        await simpleCounter.register(web3.utils.fromUtf8(username), web3.utils.keccak256(pwd), {from: accounts[0]});

        const isRegistered = await simpleCounter.registeredUsers(web3.utils.fromUtf8(username));
        assert.equal(isRegistered, true, "User is in registered mapping");
    });

    it("...should increment count.", async () => {
        const simpleCounter = await SimpleCounter.deployed();
        const username = "Donato";
        const pwd = "pwd";

        await simpleCounter.register(web3.utils.fromUtf8(username), web3.utils.keccak256(pwd), {from: accounts[0]});

        const isRegistered = await simpleCounter.registeredUsers(web3.utils.fromUtf8(username));
        assert.equal(isRegistered, true, "User is in registered mapping");
    });
});
