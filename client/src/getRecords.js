import React, { Component } from 'react';

class GetRecords extends Component {

  constructor(props){
    super(props)
    this.state = {
      record_count: 0,
      records: '',
    };
  }

  getRecordCount = async () => {
    const { contract, accounts } = this.state
    const response = await this.props.contract.methods.getCrimeCount().call();
    console.log(response)
    this.setState({'record_count': response})
  }
  getRecords = async () => {
    const { contract, accounts } = this.state
    const response = await this.props.contract.methods.getCrimeBlock(1).call()
    console.log(response)
    // this.setState({'record_count': response})
  }

  render () {
    if (!this.props.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <React.Fragment>
        <button onClick={() => this.getRecordCount()}>
          Get Record Counts
        </button>
        <p>Record Counts: {this.state.record_count}</p>
        <button onClick={() => this.getRecords()}>
          Get Records
        </button>
        <p>Records: {this.state.records}</p>
      </React.Fragment>
    )
  }
}

export default GetRecords