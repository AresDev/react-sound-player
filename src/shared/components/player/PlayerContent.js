import React, { Component } from 'react';
import './style/PlayerContent.css';

export class PlayerContent extends Component {
  render() {
    const activeClass = this.props.info.playing ? ' active' : '';
    return (
      <div id="player-content" className={activeClass}>
        <div id="player-track">
          <div id="album-name">{this.props.info.currAlbum}</div>
          <div id="track-name">{this.props.info.currTrackName}</div>
          <div id="track-time">
            <div id="current-time"></div>
            <div id="track-length"></div>
          </div>
          <div id="s-area">
            <div id="ins-time"></div>
            <div id="s-hover"></div>
            <div id="seek-bar"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default PlayerContent;
