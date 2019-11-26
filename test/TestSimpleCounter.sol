pragma solidity ^0.5.0;

import "truffle/Assert.sol";
import "truffle/AssertUint.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/SimpleCounter.sol";

contract TestSimpleCounter {

    function testItSavesRegisteredUser() public {
        SimpleCounter simpleCounter = SimpleCounter(DeployedAddresses.SimpleCounter());

        bytes32 username = "pauler";
        bytes memory pwd = "pwd";
        bytes32 pwdHash = keccak256(pwd);

        simpleCounter.register(username, pwdHash);

        Assert.equal(simpleCounter.registeredUsers(username), true, "It should return true");
        Assert.equal(simpleCounter.userPwdHash(username), pwdHash, "It should return true");
    }

    function testItShouldIncrementCount() public {
        SimpleCounter simpleCounter = SimpleCounter(DeployedAddresses.SimpleCounter());

        bytes32 username = "pauler2";
        bytes memory pwd = "pwd";
        bytes memory pwd2 = "pwd2";
        bytes32 pwdHash2 = keccak256(pwd2);
        registerUser(username, pwd);
        uint16 barIdToIncrement = 1;
        uint16 barIdNotIncrement = 0;

        simpleCounter.increment(
            username,
            barIdToIncrement,
            pwd,
            pwdHash2
        );

        AssertUint.equal(simpleCounter.score(username, barIdToIncrement), 1, "the count for barIdToIncrement is incremented to 1");
        AssertUint.equal(simpleCounter.score(username, barIdNotIncrement), 0, "the count for barIdNotIncrement is still 0");
        AssertUint.equal(simpleCounter.userScore(username), 1, "entire score should also be incremented");
    }

    function testDefaultCountIsZero() public {
        SimpleCounter simpleCounter = SimpleCounter(DeployedAddresses.SimpleCounter());

        bytes32 username = "pauler3";
        bytes memory pwd = "pwd";
        registerUser(username, pwd);
        uint16 barId = 1;

        AssertUint.equal(simpleCounter.score(username, barId), 0, "the count for barId is default 0");
    }


    function testIncrementMultipleBars() public {
        SimpleCounter simpleCounter = SimpleCounter(DeployedAddresses.SimpleCounter());

        bytes32 username = "pauler4";
        bytes memory pwd1 = "pwd1";
        registerUser(username, pwd1);

        bytes memory pwd2 = "pwd2";
        bytes32 pwdHash2 = keccak256(pwd2);

        bytes memory pwd3 = "pwd3";
        bytes32 pwdHash3 = keccak256(pwd3);

        bytes memory pwd4 = "pwd4";
        bytes32 pwdHash4 = keccak256(pwd4);


        simpleCounter.increment(
            username,
            1,
            pwd1,
            pwdHash2
        );

        simpleCounter.increment(
            username,
            1,
            pwd2,
            pwdHash3
        );

        simpleCounter.increment(
            username,
            4,
            pwd3,
            pwdHash4
        );

        AssertUint.equal(simpleCounter.score(username, 1), 2, "the count for 1 is incremented to 2");
        AssertUint.equal(simpleCounter.score(username, 4), 1, "the count for 4 is incremented to 1");
        AssertUint.equal(simpleCounter.score(username, 2), 0, "the count for 2 is still 0");
        AssertUint.equal(simpleCounter.userScore(username), 3, "entire score should also be incremented");
    }

    function registerUser(bytes32 username, bytes memory pwd) private returns (bytes32 pwdHash) {
        SimpleCounter simpleCounter = SimpleCounter(DeployedAddresses.SimpleCounter());

        pwdHash = keccak256(pwd);
        simpleCounter.register(username, pwdHash);
    }
}