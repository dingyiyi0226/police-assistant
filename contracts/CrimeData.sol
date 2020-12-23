// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;
pragma experimental ABIEncoderV2;

contract CrimeData {
  struct CrimeDetails {
    string aaccount;
    string timestamp;
    string offense_code;
    string description;
    string image_url;

    int reward_state;
  }
  CrimeDetails[] public crime;

  function addCrimeReport(string memory _account, string memory _timestamp, string memory _offense_code, string memory _description, string memory _image_url) public returns(uint) {
    crime.length++;
    crime[crime.length-1].aaccount = _account;
    crime[crime.length-1].timestamp = _timestamp;
    crime[crime.length-1].offense_code = _offense_code;
    crime[crime.length-1].description = _description;
    crime[crime.length-1].image_url = _image_url;
    crime[crime.length-1].reward_state = -1;  // -1 not verified crime
    return crime.length;
  }
  
  function getCrimeCount() public view returns(uint) {
    return crime.length;
  }
  
  function getCrimeBlock(uint index) public view returns (string memory, string memory, string memory, string memory, string memory)
  {
    return (crime[index].aaccount, crime[index].timestamp, crime[index].offense_code, crime[index].description, crime[index].image_url);
  }

  function getAllCrimeDetails() public view returns (CrimeDetails[] memory){
    CrimeDetails[] memory allCrime = new CrimeDetails[](crime.length);
    for (uint i = 0; i < crime.length; i++) {
      CrimeDetails storage tempCrime = crime[i];
      allCrime[i] = tempCrime;
    }
    return allCrime;
  }

  // function sendReward(address _sender, uint value) public payable
  // {
  //   _sender.send(value)
  // }

}
