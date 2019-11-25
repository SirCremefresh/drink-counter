pragma solidity ^0.5.0;

contract SimpleCounter {
    bytes32[] public usernames;
    mapping(bytes32 => bytes32) public userPwdHash;
    mapping(bytes32 => bool) public registeredUsers;
    mapping(bytes32 => uint16[7]) public score;

    modifier usernameExists(bytes32 username) {
        require(registeredUsers[username]);
        _;
    }

    modifier checkPassword(bytes32 username, bytes32 pwd) {
        require(userPwdHash[username] == keccak256(abi.encodePacked(pwd)));
        _;
    }

    modifier updatePassword(bytes32 username, bytes32 pwdHash) {
        require(userPwdHash[username] != pwdHash, "you can not use the same password twice");
        userPwdHash[username] = pwdHash;
        _;
    }

    function register(bytes32 username, bytes32 pwdHash) external {
        require(username.length != 0, "username can not have length 0");
        require(registeredUsers[username] == false, "the username is already taken");
        registeredUsers[username] = true;
        userPwdHash[username] = pwdHash;
        usernames.push(username);
    }

    function increment(
        bytes32 username,
        uint16 barId,
        bytes32 pwd,
        bytes32 pwdHash
    )
    usernameExists(username)
    checkPassword(username, pwd)
    updatePassword(username, pwdHash)
    external
    {
        require(barId < 7, "The barId is not valid");
        score[username][barId]++;
    }

    function userScore(bytes32 username) usernameExists(username) view external returns (uint16) {
        uint16[7] storage userScores = score[username];
        return userScores[0] + userScores[1] + userScores[2] + userScores[3] + userScores[4] + userScores[5] + userScores[6];
    }
}