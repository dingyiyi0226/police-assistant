// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;
pragma experimental ABIEncoderV2;

contract CrimeData {
  struct CrimeDetails {
    string account;
    string timestamp;
    string offenseCode;
    string description;
    string imageURL;

    int rewardState;
  }
  CrimeDetails[] public crime;

  function addCrimeReport(string memory _account, string memory _timestamp, string memory _offenseCode, string memory _description, string memory _imageURL) public returns(uint) {
    crime.length++;
    crime[crime.length-1].account = _account;
    crime[crime.length-1].timestamp = _timestamp;
    crime[crime.length-1].offenseCode = _offenseCode;
    crime[crime.length-1].description = _description;
    crime[crime.length-1].imageURL = _imageURL;
    crime[crime.length-1].rewardState = -1;  // -1 not verified crime
    return crime.length;
  }
  
  function getCrimeCount() public view returns(uint) {
    return crime.length;
  }
  
  function getCrimeBlock(uint index) public view returns (string memory, string memory, string memory, string memory, string memory){
    return (crime[index].account, crime[index].timestamp, crime[index].offenseCode, crime[index].description, crime[index].imageURL);
  }

  function getAllCrimeDetails() public view returns (CrimeDetails[] memory){
    CrimeDetails[] memory allCrime = new CrimeDetails[](crime.length);
    for (uint i = 0; i < crime.length; i++) {
      CrimeDetails storage tempCrime = crime[i];
      allCrime[i] = tempCrime;
    }
    return allCrime;
  }

}
