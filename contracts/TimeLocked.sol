pragma solidity ^0.6.1;

// A very simple time-locked multi-signature contract for demonstration.

contract TimeLocked {

  address public owner;
  address public server;
  address public owner_backup;
  address public last_unlocked_by;
  uint public time_lock;

  modifier onlyOwner {
    require(msg.sender == owner || msg.sender == owner_backup, "You are not the Owner.");
    _;
  }

  modifier onlyAuthorized {
    require(msg.sender == owner || msg.sender == owner_backup || msg.sender == server, "You are not the Authorized.");
    _;
  }

  constructor(address _owner, address _owner_backup) public {
    server = 0x783a5Bb7F476EA5ef198df382C24e39D9cE63865;
    owner = _owner;
    owner_backup = _owner_backup;
  }
  

  function Unlock() public onlyAuthorized {
    // 3 minute window
    time_lock = block.number + 12;
    last_unlocked_by = msg.sender;
  }

  function SendTo(address payable address_to, uint256 amount) public onlyOwner {
    require(block.number < time_lock && msg.sender != last_unlocked_by, "Contract is locked.");
    address_to.transfer(amount);
  }

}
