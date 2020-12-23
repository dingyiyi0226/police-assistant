import React, { Component } from 'react';

class Record extends Component {

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
    console.log(this.props.accounts)
    this.props.contract.methods.addCrimeReport(
      this.state.user_id, timestamp, this.state.offense_type, this.state.description).send({from: this.props.accounts[0]});

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

              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="offense_type" id="homicide" value="homicide" checked={this.state.offense_type === "homicide"} onChange={this.labelChange} />
                <label className="form-check-label" htmlFor="homicide">homicide</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="offense_type" id="forcible rape" value="forcible rape" checked={this.state.offense_type === "forcible rape"} onChange={this.labelChange} />
                <label className="form-check-label" htmlFor="female">forcible rape</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="offense_type" id="robbery" value="robbery" checked={this.state.offense_type === "robbery"} onChange={this.labelChange} />
                <label className="form-check-label" htmlFor="robbery">robbery</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="offense_type" id="assault" value="assault" checked={this.state.offense_type === "assault"} onChange={this.labelChange} />
                <label className="form-check-label" htmlFor="assault">assault</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="offense_type" id="burglary" value="burglary" checked={this.state.offense_type === "burglary"} onChange={this.labelChange} />
                <label className="form-check-label" htmlFor="female">burglary</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="offense_type" id="arson" value="arson" checked={this.state.offense_type === "arson"} onChange={this.labelChange} />
                <label className="form-check-label" htmlFor="female">arson</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="offense_type" id="other" value="other" checked={this.state.offense_type === "other"} onChange={this.labelChange} />
                <label className="form-check-label" htmlFor="other">other</label>
              </div>

              <div className="mb-3">
                <label className="form-label" htmlFor="description">Description: </label>
                <input className="form-control" type="text" id="description" name="description" placeholder="Exnter here..." onChange={this.descriptionChange} />
              </div>

              <button className="btn btn-primary" onClick={() => this.handleSubmit()}>Submit</button>
            </div>
          </div>
        </div>
      </React.Fragment>
    )

  }
}



export default Record