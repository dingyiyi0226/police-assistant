var CrimeData = artifacts.require("./CrimeData.sol");

module.exports = function(deployer) {
  deployer.deploy(CrimeData);
};
