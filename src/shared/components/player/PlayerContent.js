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
          <div id="track-time" className={activeClass}>
            <div id="current-time">{this.props.info.currentTime}</div>
            <div id="track-length">{this.props.info.totalTime}</div>
          </div>
          <div
            id="s-area"
            onMouseOut={this.props.seekBarMouseOut}
            onMouseMove={this.props.seekBarMouseMove}
            onClick={this.props.seekBarClicked}
          >
            <div id="ins-time"></div>
            <div id="s-hover"></div>
            <div
              id="seek-bar"
              style={{ width: this.props.info.playProgress }}
            ></div>
          </div>
        </div>
      </div>
    );
  }
}

export default PlayerContent;
