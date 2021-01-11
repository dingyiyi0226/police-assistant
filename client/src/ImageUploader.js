import React, { Component } from 'react';

class ImageUploader extends Component {
  uploadImage = () => {
    const client_id = '70f3b49ea7ea247';
    const r = new XMLHttpRequest()
    const d = new FormData()
    const e = document.getElementsByClassName('input-image')[0].files[0]

    d.append('image', e)

    r.open('POST', 'https://api.imgur.com/3/image/')
    r.setRequestHeader('Authorization', `Client-ID ${client_id}`)
    r.onreadystatechange = () => {
      if(r.status === 200 && r.readyState === 4) {
        let res = JSON.parse(r.responseText);
        let url = `https://i.imgur.com/${res.data.id}.png`;
        this.props.setImageURL(url);
      }
    }
    r.send(d);
  }
  render() {
    return (
      <div>
        {(() => {
            if (this.props.image_url != null) {
                return (
                    <div className='col-4' style={{float: 'right', padding: '10px'}} >
                        <img src={this.props.image_url} className="rounded w-100" />
                    </div>
                );
            } else {
                return null;
            }
        })()}
        <label className="form-label" htmlFor="image">Image: </label>
        <div className="input-group mb-3">
            <input type="file" className="input-image form-control" id="image" onChange={this.uploadImage.bind(this)}/>
        </div>
      </div>
    );
  }
}

export default ImageUploader;
