const TimeLocked = artifacts.require("TimeLocked");

module.exports = function(deployer) {
  deployer.deploy(TimeLocked);
};
