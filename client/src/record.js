import React, { Component } from 'react';

class Record extends Component {

  constructor(props){
    super(props)
    this.state = {
      offense_type: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.labelChange = this.labelChange.bind(this);
  }

  labelChange(event) {
    this.setState({
        offense_type: event.target.value
    });
    console.log(event.target);
}
  handleSubmit(e) {
      e.preventDefault();
      console.log(this.state.offense_type);
  }

  render (){
    if (!this.props.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>
          <input type="radio" name="offense_type" id="homicide" value="homicide" checked={this.state.offense_type === "homicide"} onChange={this.labelChange} />
          <label htmlFor="homicide">homicide</label>
          <input type="radio" name="offense_type" id="forcible rape" value="forcible rape" checked={this.state.offense_type === "forcible rape"} onChange={this.labelChange} />
          <label htmlFor="female">forcible rape</label>
          <input type="radio" name="offense_type" id="robbery" value="robbery" checked={this.state.offense_type === "robbery"} onChange={this.labelChange} />
          <label htmlFor="robbery">robbery</label>
          <input type="radio" name="offense_type" id="assault" value="assault" checked={this.state.offense_type === "assault"} onChange={this.labelChange} />
          <label htmlFor="assault">assault</label>
          <input type="radio" name="offense_type" id="burglary" value="burglary" checked={this.state.offense_type === "burglary"} onChange={this.labelChange} />
          <label htmlFor="female">burglary</label>
          <input type="radio" name="offense_type" id="arson" value="arson" checked={this.state.offense_type === "arson"} onChange={this.labelChange} />
          <label htmlFor="female">arson</label>
          <input type="radio" name="offense_type" id="other" value="other" checked={this.state.offense_type === "other"} onChange={this.labelChange} />
          <label htmlFor="other">other</label>
          <input type="submit" value="Submit" />
        </form>
      </React.Fragment>

    )

  }
}



export default Record