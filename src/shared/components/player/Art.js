import React, { Component } from 'react';
import './style/Art.css';
export class Art extends Component {
    currentImage = 'https://upload.wikimedia.org/wikipedia/en/thumb/2/2e/Amanecer_album_cover.jpg/220px-Amanecer_album_cover.jpg';
    render() {
        return (
                <div id='album-art'>
                    <img src={this.currentImage} className='active' alt='currentImage'></img>
                </div>
        );
    }
}
export default Art;
