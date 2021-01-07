import React, { Component } from 'react';
import Web3 from 'web3';

class CrimePlatform extends Component {

  constructor(props) {
    super(props)
    this.state = {
      record_count: 0,
      records: []
    };
    this.handleClick = this.handleClick.bind(this);

  }

  componentDidMount() {
    if (this.props.web3) {
      this.getRecordCount();
      this.getRecords();
    }
  }

  getRecordCount = async () => {
    const { contract } = this.props
    const response = await contract.methods.getCrimeCount().call();
    console.log(response)
    this.setState({ 'record_count': response })
  }

  getRecords = async () => {
    const { contract } = this.props
    const response = await contract.methods.getAllCrimeDetails().call()
    console.log(response)
    this.setState({ 'records': response })
  }


  handleClick(e) {
    e.target.style.backgroundColor = "green"
    e.target.style.border = "green"
    e.target.disabled = true
    this.sendReward();
  }

  sendReward = async () => {
    const { accounts, contract, web3 } = this.props

    let rewardReceiver = '0x0309C3750bE43B16AcF7Acb481bD142beff073bD'
    let rewardAmount = 3

    const response = await web3.eth.sendTransaction({
      from: accounts[0],
      to: rewardReceiver,
      value: Web3.utils.toWei(rewardAmount.toString(), 'ether')
    })
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
                </li>
                {this.state.records.map((record, index) => (
                  <li className="list-group-item" key={index} >
                    {record.description}
                    <button type="button" className="btn btn-primary" style={{ float: 'right' }} onClick={this.handleClick}>$</button>
                  </li>
                ))}
              </ul>

            </div>
          </div>
        </div>

      </React.Fragment>
    )
  }
}

export default CrimePlatform
