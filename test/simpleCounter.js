const SimpleCounter = artifacts.require("SimpleCounter");

contract("SimpleCounter", accounts => {
    let counter = 0;
    let username = "";
    const pwd1 = "pwd1";
    const pwdHash1 = web3.utils.keccak256(pwd1);
    const pwd2 = "pwd2";
    const pwdHash2 = web3.utils.keccak256(pwd2);
    const pwd3 = "pwd3";
    const pwdHash3 = web3.utils.keccak256(pwd3);
    const pwd4 = "pwd4";
    const pwdHash4= web3.utils.keccak256(pwd4);

    
    beforeEach(() => {
        username = "test-user" + counter++;
    });

    it("...should create user.", async () => {
        const simpleCounter = await SimpleCounter.deployed();

        await simpleCounter.register(web3.utils.fromUtf8(username), pwdHash1, {from: accounts[0]});

        const isRegistered = await simpleCounter.registeredUsers(web3.utils.fromUtf8(username));
        assert.equal(isRegistered, true, "User is in registered mapping");
    });

    it("...should increment count.", async () => {
        const simpleCounter = await SimpleCounter.deployed();


        await simpleCounter.register(web3.utils.fromUtf8(username), pwdHash1, {from: accounts[0]});

        await simpleCounter.increment(web3.utils.fromUtf8(username), 0, web3.utils.fromUtf8(pwd1), pwdHash2, {from: accounts[0]});


        assert.equal(await simpleCounter.score(web3.utils.fromUtf8(username), 0), 1, "Bar zero should be Incremented");
        assert.equal(await simpleCounter.score(web3.utils.fromUtf8(username), 1), 0, "Bar one should still be zero");
        assert.equal(await simpleCounter.userScore(web3.utils.fromUtf8(username)), 1, "Userscore should also be incremented");
    });

    it("...should increment count multiple times.", async () => {
        const simpleCounter = await SimpleCounter.deployed();


        await simpleCounter.register(web3.utils.fromUtf8(username), pwdHash1, {from: accounts[0]});

        await simpleCounter.increment(web3.utils.fromUtf8(username), 0, web3.utils.fromUtf8(pwd1), pwdHash2, {from: accounts[0]});
        await simpleCounter.increment(web3.utils.fromUtf8(username), 0, web3.utils.fromUtf8(pwd2), pwdHash3, {from: accounts[0]});
        await simpleCounter.increment(web3.utils.fromUtf8(username), 1, web3.utils.fromUtf8(pwd3), pwdHash4, {from: accounts[0]});


        assert.equal(await simpleCounter.score(web3.utils.fromUtf8(username), 0), 2, "Bar zero should be two");
        assert.equal(await simpleCounter.score(web3.utils.fromUtf8(username), 1), 1, "Bar one should be Incremented to one");
        assert.equal(await simpleCounter.score(web3.utils.fromUtf8(username), 2), 0, "Bar two should still be zero");
        assert.equal(await simpleCounter.userScore(web3.utils.fromUtf8(username)), 3, "Userscore should also be incremented");
    });
});