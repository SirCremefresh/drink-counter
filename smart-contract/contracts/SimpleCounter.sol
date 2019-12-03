pragma solidity ^0.5.12;
pragma experimental ABIEncoderV2;

contract SimpleCounter {
    bytes32[] public usernames;
    mapping(bytes32 => bytes32) public userPwdHash;
    mapping(bytes32 => bool) public registeredUsers;
    mapping(bytes32 => uint16[7]) public score;

    struct UserDate {
        bytes32 username;
        uint16 score;
    }

    event UserRegistered(bytes32 username);
    event UserIncremented(bytes32 username, uint16 score);

    modifier usernameExists(bytes32 username) {
        require(registeredUsers[username], "the username does not exist");
        _;
    }

    modifier checkPassword(bytes32 username, bytes memory pwd) {
        require(userPwdHash[username] == keccak256(pwd), "The pwd does not match");
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
        emit UserRegistered(username);
    }

    function increment(
        bytes32 username,
        uint16 barId,
        bytes calldata pwd,
        bytes32 pwdHash
    )
    usernameExists(username)
    checkPassword(username, pwd)
    updatePassword(username, pwdHash)
    external
    {
        require(barId < 7, "The barId is not valid");
        score[username][barId]++;
        emit UserIncremented(username, userScore(username));
    }

    function userScore(bytes32 username) usernameExists(username) view public returns (uint16) {
        uint16[7] storage userScores = score[username];
        return userScores[0] + userScores[1] + userScores[2] + userScores[3] + userScores[4] + userScores[5] + userScores[6];
    }

    function getAllUsers() public view returns (UserDate[] memory) {
        UserDate[] memory result = new UserDate[](usernames.length);

        for (uint i = 0; i < usernames.length; i++) {
            uint16[7] storage userScores = score[usernames[i]];
            result[i] = UserDate(usernames[i], userScores[0] + userScores[1] + userScores[2] + userScores[3] + userScores[4] + userScores[5] + userScores[6]);
        }

        return result;
    }
}
