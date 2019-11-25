const SimpleCounter = artifacts.require("SimpleCounter");

contract("SimpleCounter", accounts => {
    it("...should create user.", async () => {
        const simpleCounter = await SimpleCounter.deployed();
        const username = "Donato";
        const pwd = "pwd";

        await simpleCounter.register(web3.utils.fromUtf8(username), web3.utils.keccak256(pwd), {from: accounts[0]});
        //
        // // Get stored value
        const isRegistered = await simpleCounter.registeredUsers(web3.utils.fromUtf8(username));
        //
        assert.equal(isRegistered, true, "User is in registered mapping");
    });
});
