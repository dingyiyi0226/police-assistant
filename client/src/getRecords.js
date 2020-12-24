import React, { Component } from 'react';
import Web3 from 'web3';

class GetRecords extends Component {

  constructor(props) {
    super(props)
    this.state = {
      record_count: 0,
      records: [],
      show_money_input: false
    };
    this.handleClick = this.handleClick.bind(this);

  }

  componentDidMount(){
    if(this.props.web3){
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


  handleClick() {
    this.setState({ "show_money_input": true })
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
                  Send Reward:
                  <button type="button" className="btn btn-primary" style={{ float: 'right' }} onClick={() => this.sendReward()}>Send Reward</button>
                </li>
              </ul>

              <ul className="list-group">
                <li className="list-group-item">
                  Record Counts: {this.state.record_count}
                </li>
                { this.state.records.map( (record, index) => (
                  <li className="list-group-item" key={index} >
                    {record.description}
                    <button type="button" className="btn btn-primary" style={{ float: 'right' }} onClick={this.handleClick}>$</button>
                    <input type="text" style={{ display: (this.state.show_money_input) ? "block" : "none" }}></input>
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

export default GetRecords