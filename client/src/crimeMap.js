import React, { Component } from 'react'
import GoogleMap from 'google-map-react'

import './style.css'

const OFFENSE_TYPE = ['All', 'Homicide', 'Forcible rape', 'Robbery', 'Assault', 'Burglary', 'Arson', 'Other']
const NTULibrary = {lat: 25.0174, lng: 121.5405}

class CrimeMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      records: [],
      offenseType: '',
      mapCenter: NTULibrary
    }
  }

  componentDidMount() {
    this.getRecords();
  }

  getRecords = async () => {
    const { contract } = this.props
    const response = await contract.methods.getAllCrimeDetails().call()
    console.log('mapresp', response)
    this.setState({ 'records': response})
  }

  getInfoWindowString = (record) => `
  <div class="crime-map__info-window">
    <p>${record.name}</p>
    <p>${record.offenseCode}</p>
    <img src=${record.imageURL} alt="">
  </div>`;
  
  renderGoogleApi = (map, maps, records) => {  // map is the map instance, maps is the maps API object
    const markers = [];
    const infowindows = [];
    console.log('render ', records)

    records.forEach(record => {
      const strLocation = JSON.parse(record.location)
      const location = {
        lat: parseFloat(strLocation.lat),
        lng: parseFloat(strLocation.lng)
      }
      
      markers.push(new maps.Marker({
        position: location,
        map,
      }))
      infowindows.push(new maps.InfoWindow({
        content: this.getInfoWindowString(record),
      }))
    })
    
    markers.forEach((marker, i) => {
      marker.addListener('click', () => {
        infowindows[i].open(map, marker);
      })
    })
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

  render () {
    return (

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

          <div className="col-8">
            <div className="crime-map__container">
              <div className="crime-map" key={this.state.records.length+this.state.offenseType}>
                <GoogleMap
                  bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_KEY }}
                  defaultCenter={this.state.mapCenter}
                  defaultZoom={12}
                  yesIWantToUseGoogleMapApiInternals
                  onGoogleApiLoaded={({map, maps}) => this.renderGoogleApi(map, maps, this.filteredRecord())}
                >
                </GoogleMap>
              </div>
            </div>
          </div>

        </div>
      </div>

    )
  }
    
}

export default CrimeMap
