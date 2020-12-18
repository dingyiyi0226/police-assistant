import React, { Component } from 'react';
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";

class Record extends Component {


  state = {
    storageValue: 0, web3: null, accounts: null, contract: null,
    crime_id: '',
    timestamp: '',
    offense_code: '',
    description: ''
  };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorageContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  onSubmit = (event) => {
      const { accounts, contract } = this.state;
      event.preventDefault()
      this.onGetDate();
      contract.methods.addCrimeReport(this.state.crime_id, this.state.timestamp, this.state.offense_code, this.state.description).send({from: accounts[0]});
    }

  onGetDate = () => {
    var date = new Date();
    var year = date.getFullYear().toString();
    var month = (date.getMonth() + 101).toString().substring(1);
    var day = (date.getDate() + 100).toString().substring(1);
    var hour = (date.getHours() + 100).toString().substring(1);
    var mins = (date.getMinutes() + 100).toString().substring(1);
    var sec = (date.getSeconds() + 100).toString().substring(1);
    this.setState({
      timestamp : year + "-" + month + "-" + day + " " + hour + ":" + mins + ":" + sec
    });
  }


  render (){
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <form onSubmit={this.onSubmit}>
        <div className="input-field">
          <input type="text" id="caseId" onChange={(evt) => { this.state.crime_id =  evt.target.value; }} required/>
          <label htmlFor="email">Case ID</label>
        </div>
        <div className="input-field">
          <input value={this.state.timestamp} type="text" id="timestamp" readOnly onChange={(evt) => { this.state.timestamp =  evt.target.value; }} required/>
          {/* <label htmlFor="email">Time Stamp</label> */}
        </div>
        <div className="input-field">
          <input type="text" id="offCode" onChange={(evt) => { this.state.offense_code =  evt.target.value; }} required/>
          <label htmlFor="offCode">Offense Code</label>
        </div>

        <div className="form-submit center">
            <button type="submit" className="dropbtn1" style={{marginTop:"10px"}}>Upload to Blockchain</button>
        </div>
      </form>
    )

  }
}

export default Record