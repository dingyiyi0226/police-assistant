import React, { Component } from 'react'
import GoogleMap from 'google-map-react'

import './style.css'

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
    <img src=${record.imageURL} alt="">
  </div>`;
  
  renderGoogleApi = (map, maps, records) => {  // map is the map instance, maps is the maps API object
    const markers = [];
    const infowindows = [];
    console.log('render ', records)

    records.filter(record => true)
           .forEach(record => {
      markers.push(new maps.Marker({
        position: {
          lat: NTULibrary.lat,
          lng: NTULibrary.lng,
        },
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

  render () {
    return (
      <div className="py-3 crime-map__container">
        <h2>CrimeMap</h2>
        <div className="crime-map" key={this.state.records.length}>
          <GoogleMap
            bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_KEY }}
            defaultCenter={this.state.mapCenter}
            defaultZoom={12}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({map, maps}) => this.renderGoogleApi(map, maps, this.state.records)}
          >
          </GoogleMap>
        </div>
      </div>
    )
  }
    
}

export default CrimeMap
