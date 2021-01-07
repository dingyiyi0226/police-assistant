import React, { Component } from 'react';

const OFFENSE_TYPE = ['Homicide', 'Forcible rape', 'Robbery', 'Assault', 'Burglary', 'Arson', 'Other']

class CrimeUploader
 extends Component {

  constructor(props) {
    super(props)
    this.state = {
      offense_type: "",
      user_id: "",
      description: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.labelChange = this.labelChange.bind(this);
    this.IDChange = this.IDChange.bind(this);
    this.descriptionChange = this.descriptionChange.bind(this);
  }

  labelChange(event) {
    this.setState({ offense_type: event.target.value });
  }
  handleSubmit() {
    console.log(this.state);
    let timestamp = 'test'
    let image_url = 'image_url'
    console.log(this.props.accounts)
    this.props.contract.methods.addCrimeReport(
      this.state.user_id, timestamp, this.state.offense_type, this.state.description, image_url).send({ from: this.props.accounts[0] });
  }
  IDChange(event) {
    this.setState({ user_id: event.target.value });
  }
  descriptionChange(event) {
    this.setState({ description: event.target.value });
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
              <div className="mb-1">
                <label className="form-label" htmlFor="user_id">User ID</label>
                <input className="form-control" type="text" id="user_id" name="user_id" placeholder="dingyiyi" onChange={this.IDChange} />
              </div>
              { OFFENSE_TYPE.map( (type, index) => (
                  <div className="form-check form-check-inline" key={index}>
                    <input className="form-check-input" type="radio" name="offense_type" id={type} value={type}
                           checked={this.state.offense_type === type} onChange={this.labelChange} />
                    <label className="form-check-label" htmlFor={type}>{type}</label>
                  </div>
                ))
              }
              <div className="mb-3">
                <label className="form-label" htmlFor="description">Description: </label>
                <input className="form-control" type="text" id="description" name="description" placeholder="Enter here..." onChange={this.descriptionChange} />
              </div>

              <button className="btn btn-primary" onClick={() => this.handleSubmit()}>Submit</button>
            </div>
          </div>
        </div>
      </React.Fragment>
    )

  }
}

export default CrimeUploader
