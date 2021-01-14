import React, { Component } from 'react';
import Ipfs from 'ipfs-core';
import uint8ArrayConcat from 'uint8arrays/concat';

let ipfs = null

class ImageIpfsUploader extends Component {

  // constructor(props){
  //   super(props)
  //   this.state = {
  //     image: null
  //   }
  // }

  componentDidMount() {
    const initIpfs = async () => {
      ipfs = await Ipfs.create()
    }
    if (!ipfs) {
      initIpfs()
      console.log('Init Ipfs')
    }
  }

  uploadImage = async () => {
    console.log(ipfs)

    const imageFile = document.getElementsByClassName('input-image')[0].files[0]
    console.log(imageFile)
    const { path } = await ipfs.add(imageFile)
    console.log('result', path)

    let content = []
    for await (const chunk of ipfs.cat(path)) {
      content.push(chunk)
    }
    
    const imageRaw = uint8ArrayConcat(content)
    const buffer = new Blob([imageRaw.buffer])
    const newurl = URL.createObjectURL(buffer)
    // console.log(newurl)
    this.props.setImageURL(newurl)
  }

  render() {
    return (
      <div>
        { this.props.image_url ? (
            <div className='col-4' style={{float: 'right', padding: '10px'}} >
              <img src={this.props.image_url} className="rounded w-100" />
            </div>
          ) : (
            null
          )
        }

        <label className="form-label" htmlFor="image">Image: </label>
        <div className="input-group mb-3">
            <input type="file" className="input-image form-control" id="image" onChange={this.uploadImage.bind(this)}/>
        </div>
      </div>
    );
  }
}

export default ImageIpfsUploader;
