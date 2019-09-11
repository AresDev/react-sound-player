import React, { Component } from 'react';
import './style/Art.css';
export class Art extends Component {
  render() {
    const activeClass = this.props.info.playing ? 'active' : '';
    return (
      <div id="album-art" className={activeClass}>
        <img
          src={this.props.info.currArtwork}
          className="active"
          alt="currentImage"
        ></img>
      </div>
    );
  }
}
export default Art;
