// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;
pragma experimental ABIEncoderV2;

contract CrimeData {
  struct CrimeDetails {
    uint crimeId;
    string name;
    string account;
    string offenseCode;
    string description;
    string timestamp;
    string imageCID;
    string location;

    int rewardState; // 0 for not verified crime, 1 for verified crime
  }
  CrimeDetails[] public crime;

  function addCrimeReport(string memory name, string memory account, string memory offenseCode, string memory description, string memory timestamp, string memory imageCID, string memory location) public returns(uint) {
    crime.length++;
    crime[crime.length-1].crimeId = crime.length-1;
    crime[crime.length-1].name = name;
    crime[crime.length-1].account = account;
    crime[crime.length-1].offenseCode = offenseCode;
    crime[crime.length-1].description = description;
    crime[crime.length-1].timestamp = timestamp;
    crime[crime.length-1].imageCID = imageCID;
    crime[crime.length-1].location = location;
    crime[crime.length-1].rewardState = 0;
    return crime.length;
  }
  
  function getCrimeCount() public view returns(uint) {
    return crime.length;
  }

  function getAllCrimeDetails() public view returns (CrimeDetails[] memory){
    CrimeDetails[] memory allCrime = new CrimeDetails[](crime.length);
    for (uint i = 0; i < crime.length; i++) {
      CrimeDetails storage tempCrime = crime[i];
      allCrime[i] = tempCrime;
    }
    return allCrime;
  }

  function setRewardState(uint crimeId) public returns(bool) {
    crime[crimeId].rewardState = 1;
    return true;
  }

}
