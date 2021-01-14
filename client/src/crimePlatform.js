import React, { Component } from 'react';
import Web3 from 'web3';
import uint8ArrayConcat from 'uint8arrays/concat';

import './style.css'

import testImg from './logo.svg'

const OFFENSE_TYPE = ['All', 'Homicide', 'Forcible rape', 'Robbery', 'Assault', 'Burglary', 'Arson', 'Other']

class CrimePlatform extends Component {

  constructor(props) {
    super(props)
    this.state = {
      records: [],
      imageURL: {},
      offenseType: '',
    };
  }

  componentDidMount() {
    this.getRecords();
  }

  getRecords = async () => {
    const { contract } = this.props
    const records = await contract.methods.getAllCrimeDetails().call()
    console.log('resp', records)

    let imageURL = {}
    for (const record of records){
      const url = await this.getImage(record.imageCID)
      imageURL[record.crimeId] = url
    }

    this.setState({
      'records': records,
      'imageURL': imageURL
    })
  }

  getImage = async (cid) => {
    let content = []
    for await (const chunk of this.props.ipfs.cat(cid)) {
      content.push(chunk)
    }
    const imageRaw = uint8ArrayConcat(content)
    const buffer = new Blob([imageRaw.buffer])
    const imageURL = URL.createObjectURL(buffer)
    // console.log(imageURL)
    return imageURL
  }

  sendReward = async (e, crimeId, account) => {
    const { accounts, contract, web3 } = this.props
    e.target.disabled = true;

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
                        <button type="button" className="btn btn-primary reward-btn" onClick={ (e) => this.sendReward(e, record.crimeId, record.account)}>
                          $
                        </button>
                      )
                    }
                  </div>
                  <div className="card-body container">
                    <div className="row">
                      <div className="col-8">
                        <h5>Crime ID: {record.crimeId}</h5>
                        <p>Offence Type: {record.offenseCode}</p>
                        <p>Description: {record.description}</p>
                      </div>
                      <div className="col-4">
                        <img src={this.state.imageURL[record.crimeId]} className="rounded w-100" />
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
