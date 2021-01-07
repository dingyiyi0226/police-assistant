import React, { Component } from 'react';
import Web3 from 'web3';

import './style.css'

const OFFENSE_TYPE = ['Homicide', 'Forcible rape', 'Robbery', 'Assault', 'Burglary', 'Arson']

class CrimePlatform extends Component {

  constructor(props) {
    super(props)
    this.state = {
      recordCount: 0,
      records: [],
      offenseType: '',
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
    this.setState({ 'recordCount': response })
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

  onSelectOption = (e) => {
    console.log(e.target.value)
    this.setState({offenseType: e.target.value})
  }

  render() {
    if (!this.props.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }

    return (
      <React.Fragment>
        <div className="container">
          <div className="row">

            <div className="col-3 filterOption">
            { OFFENSE_TYPE.map( type => (
              <div className="form-check" key={type}>
                <input className="form-check-input" type="radio" name="offenseType" value={type} id={type}
                       onChange={this.onSelectOption} checked={this.state.offenseType===type}/>
                <label className="form-check-label" htmlFor={type}>
                  {type}
                </label>
              </div>
            ))}
            </div>

            <div className="col-8">
              <div className="card">
                <div className="card-body">
                  <div className="card-header">
                    Record Counts: {this.state.recordCount}
                  </div>
                  <ul className="list-group">
                    { this.state.records.map((record, index) => (
                      <li className="list-group-item" key={index} >
                        {record.description}
                        <button type="button" className="btn btn-primary" style={{ float: 'right' }} onClick={this.handleClick}>$</button>
                      </li>
                    ))}
                  </ul>

                </div>
              </div>
            </div>
          </div>
        </div>

      </React.Fragment>
    )
  }
}

export default CrimePlatform
