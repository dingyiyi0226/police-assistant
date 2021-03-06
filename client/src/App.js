import React, { Component } from 'react';
import { BrowserRouter, NavLink, Switch, Route } from 'react-router-dom'
import CrimeDataContract from "./contracts/CrimeData.json";
import getWeb3 from "./getWeb3";
import Ipfs from 'ipfs-core';

import CrimeUploader from './crimeUploader.js'
import CrimePlatform from './crimePlatform.js'
import CrimeMap from './crimeMap.js'
import Navbar from './components/Navbar';
import "./App.css";

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      web3: null,
      accounts: null,
      contract: null,
      ipfs: null
    };
  }

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      // console.log('componentDidMount')
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
      // console.log(accounts)
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
    if (!this.state.ipfs) {
      const ipfsNode = await Ipfs.create()
      this.setState({ipfs: ipfsNode})
      console.log('Init Ipfs')
    }

  };

  render() {
    const { web3, accounts, contract, ipfs } = this.state
    if (!web3) {
      return <h4>Loading Web3, accounts, and contract...</h4>;
    }
    if (!ipfs) {
      return <h4>Loading Ipfs...</h4>;
    }
    return (
      <BrowserRouter>
        <div className="App">
            <Navbar />
            <Switch>
              <Route path='/upload' render={props => {
                return <CrimeUploader web3={web3} accounts={accounts} contract={contract} ipfs={ipfs}></CrimeUploader>
              }}></Route>
              <Route path='/record' render={props => {
                return <CrimePlatform web3={web3} accounts={accounts} contract={contract} ipfs={ipfs}></CrimePlatform>
              }}></Route>
              <Route path='/map' render={props => {
                return <CrimeMap web3={web3} accounts={accounts} contract={contract} ipfs={ipfs}></CrimeMap>
              }}></Route>
            </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
