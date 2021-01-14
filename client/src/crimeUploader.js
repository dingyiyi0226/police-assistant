import React, { Component } from 'react';

const OFFENSE_TYPE = ['Homicide', 'Forcible rape', 'Robbery', 'Assault', 'Burglary', 'Arson', 'Other']
const NTULibrary = {lat: 25.0174, lng: 121.5405}

class CrimeUploader extends Component {

  constructor(props) {
    super(props)
    this.state = {
      offense_type: "",
      userName: "",
      description: "",
      latitude: "",
      longitude: "",

      imagePreviewURL: "",
    };
  }

  handleSubmit = async () => {
    console.log(this.state.latitude)
    console.log(this.state.latitude || NTULibrary.lat)
    let timestamp = 'test'

    let location = {
      lat: this.state.latitude || NTULibrary.lat,
      lng: this.state.longitude || NTULibrary.lng,
    }

    /* Upload image to IPFS */
    const imageFile = await fetch(this.state.imagePreviewURL).then(r => r.blob())

    const { path } = await this.props.ipfs.add(imageFile)
    console.log('Result CID', path)

    this.props.contract.methods.addCrimeReport(
      this.state.userName,
      this.props.accounts[0],
      this.state.offense_type,
      this.state.description,
      timestamp,
      path,
      JSON.stringify(location)
    ).send({ from: this.props.accounts[0] });
  }

  setFormOptions = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value });
  }

  uploadImage = async (e) => {
    const imageFile = e.target.files[0]
    const imagePreviewURL = URL.createObjectURL(imageFile)
    this.setState({ imagePreviewURL: imagePreviewURL});
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
                <label className="form-label" htmlFor="userName">User Name</label>
                <input className="form-control" type="text" id="userName" name="userName" placeholder="dingyiyi" onChange={this.setFormOptions} />
              </div>
              { OFFENSE_TYPE.map( (type, index) => (
                  <div className="form-check form-check-inline" key={index}>
                    <input className="form-check-input" type="radio" name="offense_type" id={type} value={type}
                           checked={this.state.offense_type === type} onChange={this.setFormOptions} />
                    <label className="form-check-label" htmlFor={type}>{type}</label>
                  </div>
                ))
              }
              <div className="mb-3">
                <label className="form-label" htmlFor="description">Description: </label>
                <input className="form-control" type="text" id="description" name="description" placeholder="Enter here..." onChange={this.setFormOptions} />
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="latitude">Latitude: </label>
                <input className="form-control" type="text" id="latitude" name="latitude" placeholder={NTULibrary.lat} onChange={this.setFormOptions} />
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="longitude">Longitude: </label>
                <input className="form-control" type="text" id="longitude" name="longitude" placeholder={NTULibrary.lng} onChange={this.setFormOptions} />
              </div>

              { this.state.imagePreviewURL ? (
                  <div className='col-4' style={{float: 'right', padding: '10px'}} >
                    <img src={this.state.imagePreviewURL} className="rounded w-100" />
                  </div>
                ) : (
                  null
                )
              }
              <label className="form-label" htmlFor="image">Image: </label>
              <div className="input-group mb-3">
                <input type="file" className="input-image form-control" id="image" onChange={this.uploadImage}/>
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
