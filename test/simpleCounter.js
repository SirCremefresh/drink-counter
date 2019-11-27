const uuid = require('uuid/v4');
const SimpleCounter = artifacts.require("SimpleCounter");

contract("SimpleCounter", (accounts) => {
    let simpleCounter;

    let counter = 0;
    let username = "";
    const pwd1 = "pwd1";
    const pwdHash1 = web3.utils.keccak256(pwd1);
    const pwd2 = "pwd2";
    const pwdHash2 = web3.utils.keccak256(pwd2);
    const pwd3 = "pwd3";
    const pwdHash3 = web3.utils.keccak256(pwd3);
    const pwd4 = "pwd4";
    const pwdHash4 = web3.utils.keccak256(pwd4);


    beforeEach(async () => {
        simpleCounter = await SimpleCounter.new();
        username = "test-user" + counter++;
    });

    it("...should create user.", async () => {
        await simpleCounter.register(web3.utils.fromUtf8(username), pwdHash1, {from: accounts[0]});

        const isRegistered = await simpleCounter.registeredUsers(web3.utils.fromUtf8(username));
        assert.equal(isRegistered, true, "User is in registered mapping");
    });

    it("...should increment count.", async () => {
        await simpleCounter.register(web3.utils.fromUtf8(username), pwdHash1, {from: accounts[0]});

        await simpleCounter.increment(web3.utils.fromUtf8(username), 0, web3.utils.fromUtf8(pwd1), pwdHash2, {from: accounts[0]});


        assert.equal(await simpleCounter.score(web3.utils.fromUtf8(username), 0), 1, "Bar zero should be Incremented");
        assert.equal(await simpleCounter.score(web3.utils.fromUtf8(username), 1), 0, "Bar one should still be zero");
        assert.equal(await simpleCounter.userScore(web3.utils.fromUtf8(username)), 1, "Userscore should also be incremented");
    });

    it("...should increment count multiple times.", async () => {
        await simpleCounter.register(web3.utils.fromUtf8(username), pwdHash1, {from: accounts[0]});

        await simpleCounter.increment(web3.utils.fromUtf8(username), 0, web3.utils.fromUtf8(pwd1), pwdHash2, {from: accounts[0]});
        await simpleCounter.increment(web3.utils.fromUtf8(username), 0, web3.utils.fromUtf8(pwd2), pwdHash3, {from: accounts[0]});
        await simpleCounter.increment(web3.utils.fromUtf8(username), 1, web3.utils.fromUtf8(pwd3), pwdHash4, {from: accounts[0]});


        assert.equal(await simpleCounter.score(web3.utils.fromUtf8(username), 0), 2, "Bar zero should be two");
        assert.equal(await simpleCounter.score(web3.utils.fromUtf8(username), 1), 1, "Bar one should be Incremented to one");
        assert.equal(await simpleCounter.score(web3.utils.fromUtf8(username), 2), 0, "Bar two should still be zero");
        assert.equal(await simpleCounter.userScore(web3.utils.fromUtf8(username)), 3, "Userscore should also be incremented");
    });


    it("...should get score when no users registered", async () => {
        const users = await simpleCounter.getAllUsers();
        assert.equal(users.length, 0, "There should come no users");
    });

    it("...should get all users with there amount", async () => {
        const username1 = 'username1';
        const score1 = 4;

        const username2 = 'username2';
        const score2 = 5;


        const username3 = 'username3';
        const score3 = 0;

        await createUserWithScore(username1, score1, simpleCounter, accounts);
        await createUserWithScore(username2, score2, simpleCounter, accounts);
        await createUserWithScore(username3, score3, simpleCounter, accounts);

        const users = mapUserStruct(await simpleCounter.getAllUsers());

        assert.equal(users.length, 3, "There should be 3 users");
        assert.equal(users.find((user) => user.username === username1).score, score1, "user1 should have score" + score1);
        assert.equal(users.find((user) => user.username === username2).score, score2, "user2 should have score" + score2);
        assert.equal(users.find((user) => user.username === username3).score, score3, "user3 should have score" + score3);
    });
});

function mapUserStruct(users) {
    return users.map((user) => {
        return {
            username: web3.utils.toUtf8(user.username),
            score: +user.score
        }
    })
}

async function createUserWithScore(username, score, simpleCounter, accounts) {
    let {pwd, pwdHash} = getPwdAndHash();

    await simpleCounter.register(web3.utils.fromUtf8(username), pwdHash, {from: accounts[0]});

    for (let i = 0; i < score; i++) {
        let {pwd: pwdNew, pwdHash: pwdHashNew} = getPwdAndHash();
        await simpleCounter.increment(web3.utils.fromUtf8(username), 0, web3.utils.fromUtf8(pwd), pwdHashNew, {from: accounts[0]});
        pwd = pwdNew;
    }
}

function getPwdAndHash() {
    const pwd = uuid();
    const pwdHash = web3.utils.keccak256(pwd);
    return {
        pwd,
        pwdHash
    };
}