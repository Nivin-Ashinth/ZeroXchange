// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract YourContract {
    string public message;

    constructor() {
        message = "Hello, ZeroXchange!";
    }

    function setMessage(string memory newMessage) public {
        message = newMessage;
    }
}