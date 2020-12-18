import React, { Component } from 'react';

class Record extends Component {

  constructor(props) {
    super(props)
    this.state = {
      offense_type: "",
      user_id: "",
      discription: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.labelChange = this.labelChange.bind(this);
    this.IDChange = this.IDChange.bind(this);
    this.discriptionChange = this.discriptionChange.bind(this);
  }

  labelChange(event) {
    this.setState({ offense_type: event.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state);
  }
  IDChange(event) {
    this.setState({ user_id: event.target.value });
  }
  discriptionChange(event) {
    this.setState({ discription: event.target.value });
  }

  render() {
    if (!this.props.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="user_id">User ID: </label>
          <input type="text" id="user_id" name="user_id" placeholder="dingyiyi" onChange={this.IDChange} />
          <br></br>
          <input type="radio" name="offense_type" id="homicide" value="homicide" checked={this.state.offense_type === "homicide"} onChange={this.labelChange} />
          <label htmlFor="homicide">homicide</label>
          <br></br>
          <input type="radio" name="offense_type" id="forcible rape" value="forcible rape" checked={this.state.offense_type === "forcible rape"} onChange={this.labelChange} />
          <label htmlFor="female">forcible rape</label>
          <br></br>
          <input type="radio" name="offense_type" id="robbery" value="robbery" checked={this.state.offense_type === "robbery"} onChange={this.labelChange} />
          <label htmlFor="robbery">robbery</label>
          <br></br>
          <input type="radio" name="offense_type" id="assault" value="assault" checked={this.state.offense_type === "assault"} onChange={this.labelChange} />
          <label htmlFor="assault">assault</label>
          <br></br>
          <input type="radio" name="offense_type" id="burglary" value="burglary" checked={this.state.offense_type === "burglary"} onChange={this.labelChange} />
          <label htmlFor="female">burglary</label>
          <br></br>
          <input type="radio" name="offense_type" id="arson" value="arson" checked={this.state.offense_type === "arson"} onChange={this.labelChange} />
          <label htmlFor="female">arson</label>
          <br></br>
          <input type="radio" name="offense_type" id="other" value="other" checked={this.state.offense_type === "other"} onChange={this.labelChange} />
          <label htmlFor="other">other</label>
          <br></br>
          <label htmlFor="discription">Discription: </label>
          <input type="text" id="discription" name="discription" placeholder="Enter here..." onChange={this.discriptionChange} />
          <br></br>
          <input type="submit" value="Submit" />
        </form>
      </React.Fragment>

    )

  }
}



export default Record