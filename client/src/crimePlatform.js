import React, { Component } from 'react';
import Web3 from 'web3';

import './style.css'

import testImg from './logo.svg'

const OFFENSE_TYPE = ['All', 'Homicide', 'Forcible rape', 'Robbery', 'Assault', 'Burglary', 'Arson', 'Other']

class CrimePlatform extends Component {

  constructor(props) {
    super(props)
    this.state = {
      records: [],
      offenseType: '',
    };

  }

  componentDidMount() {
    if (this.props.web3) {
      this.getRecords();
    }
  }

  getRecords = async () => {
    const { contract } = this.props
    const response = await contract.methods.getAllCrimeDetails().call()
    console.log('resp', response)
    this.setState({ 'records': response })
  }

  sendReward = async (crimeId, account) => {
    const { accounts, contract, web3 } = this.props

    // let rewardReceiver = '0x0309C3750bE43B16AcF7Acb481bD142beff073bD'
    let rewardReceiver = account
    let rewardAmount = 3

    console.log('from', account[0])
    console.log('to', account)

    const response = await web3.eth.sendTransaction({
      from: accounts[0],
      to: rewardReceiver,
      value: Web3.utils.toWei(rewardAmount.toString(), 'ether')
    })

    await contract.methods.setRewardState(crimeId).send({ from: this.props.accounts[0] })

  }

  onSelectOption = (e) => {
    console.log(e.target.value)
    this.setState({offenseType: e.target.value})
  }

  filteredRecord = () => {
    const { offenseType, records } = this.state

    if (offenseType === '' || offenseType.toLowerCase() === 'all'){
      return records
    }
    else {
      return records.filter( record => record.offenseCode.toLowerCase() === offenseType.toLowerCase() )
    }
  }

  render() {
    if (!this.props.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }

    return (
      <React.Fragment>
        <div className="container">
          <div className="row">

            <div className="col-3 filter-option">
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

            <div className="col-7">
              <div>
                Record Counts: {this.filteredRecord().length}
              </div>
              { this.filteredRecord().map((record, index) => (
                <div className="card crime-card" key={index} >
                  <div className="card-header d-flex justify-content-between align-items-center">
                    <p className="m-0">{record.name}</p>
                    { record.rewardState === "1" ? (
                        <button type="button" className="btn btn-primary reward-btn" disabled>
                          $
                        </button>
                      ) : (
                        <button type="button" className="btn btn-primary" onClick={ () => this.sendReward(record.crimeId, record.account)}>
                          $
                        </button>
                      )
                    }
                  </div>
                  <div className="card-body container">
                    <div className="row">
                      <div className="col-8">
                        <h5>Crime ID: {record.crimeId}</h5>
                        <p>Description: {record.description}</p>
                      </div>
                      <div className="col-4">
                        <img src={testImg} className="rounded w-100" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}

            </div>
          </div>
        </div>

      </React.Fragment>
    )
  }
}

export default CrimePlatform