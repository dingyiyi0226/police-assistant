import React, { Component } from 'react';

class GetRecords extends Component {

  constructor(props) {
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
    this.setState({ 'record_count': response })
  }
  getRecords = async () => {
    const { contract, accounts } = this.state
    const response = await this.props.contract.methods.getAllCrimeDetails().call()
    console.log(response)
    // this.setState({'record_count': response})
  }

  render() {
    if (!this.props.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <React.Fragment>
        <div className="container d-flex justify-content-center">
          <div className="card" style={{ width: "60%", textAlign: 'left' }}>
            <div className="card-body">
              <ul className="list-group">
                <li className="list-group-item">
                  Record Counts: {this.state.record_count}
                  <button type="button" className="btn btn-primary" style={{ float: 'right' }} onClick={() => this.getRecordCount()}>Get Record Counts</button>
                </li>
                <li className="list-group-item">
                  Records: {this.state.records}
                  <button type="button" className="btn btn-primary" style={{ float: 'right' }} onClick={() => this.getRecords()}>Get Records</button>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </React.Fragment>
    )
  }
}

export default GetRecords