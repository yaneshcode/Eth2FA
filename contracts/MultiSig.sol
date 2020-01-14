pragma solidity ^0.6.1;

// A very simple multi-signature contract for demonstration.
// One signature requires a 2FA token through the server to sign.
// Improvements to this contract in documentation.
contract MultiSig {

  address public owner;
  address public server;

  mapping(address => bool) public signed;

  constructor(address _owner) public {
    server = 0x783a5Bb7F476EA5ef198df382C24e39D9cE63865;
    owner = _owner;
  }

  function Sign() public {
    require (msg.sender == server || msg.sender == owner);
    require (signed[msg.sender] == false);
    signed[msg.sender] = true;
  }

  function Action() public returns (string memory) {
    require (signed[server] == true && signed[owner] == true);
    signed[server] = false;
    signed[owner] = false;
    return "Action approved!";

  }

}
