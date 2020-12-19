import React, { Component } from 'react';
import { BrowserRouter, NavLink, Switch, Route } from 'react-router-dom'
import CrimeDataContract from "./contracts/CrimeData.json";
import getWeb3 from "./getWeb3";

import Record from './record.js'
import GetRecords from './getRecords.js'
import "./App.css";

import Navbar from './components/Navbar';

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      web3: null,
      accounts: null,
      contract: null,
    };
  }

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      console.log('componentDidMount')
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = CrimeDataContract.networks[networkId];
      const instance = new web3.eth.Contract(
        CrimeDataContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  render() {
    const { web3, accounts, contract} = this.state
    return (
      <BrowserRouter>
        <div className="App">
            <Navbar />
            <Switch>
              <Route path='/upload' render={props => {
                return <Record web3={web3} accounts={accounts} contract={contract}></Record>
              }}></Route>
              <Route path='/record' render={props => {
                return <GetRecords web3={web3} accounts={accounts} contract={contract}></GetRecords>
              }}></Route>
            </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
