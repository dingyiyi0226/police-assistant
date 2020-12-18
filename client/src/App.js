import React, { Component } from "react";
// import SimpleStorageContract from "./contracts/SimpleStorage.json";
// import getWeb3 from "./getWeb3";

import Record from './record.js'
import "./App.css";

class App extends Component {

  render() {
    return (
      <div className="App">
        <Record />
      </div>
    );
  }
}

export default App;
