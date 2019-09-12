import React, { Component } from 'react';
import './style/PlayerContent.css';

export class PlayerContent extends Component {
  render() {
    const { info } = this.props;
    const activeClass = info.playing ? ' active' : '';
    const hoverTimeText =
      info.seekT > 0 ? (
        <div
          id="ins-time"
          style={{
            left: info.seekT
          }}
        >
          {info.hoverTimeText}
        </div>
      ) : null;

    return (
      <div id="player-content" className={activeClass}>
        <div id="player-track">
          <div id="album-name">{info.currAlbum}</div>
          <div id="track-name">{info.currTrackName}</div>
          <div id="track-time" className={activeClass}>
            <div id="current-time">{info.currentTime}</div>
            <div id="track-length">{info.totalTime}</div>
          </div>
          <div
            id="s-area"
            ref={ref => (this.sAreaRef = ref)}
            onMouseOut={this.props.seekBarMouseOut}
            onMouseMove={event =>
              this.props.seekBarMouseMove(event, this.sAreaRef)
            }
            onClick={this.props.seekBarClicked}
          >
            {hoverTimeText}
            <div
              id="s-hover"
              onMouseMove={event => event.preventDefault}
              style={{ width: info.seekT }}
            ></div>
            <div
              id="seek-bar"
              onMouseMove={event => event.preventDefault}
              style={{ width: info.playProgress }}
            ></div>
          </div>
        </div>
      </div>
    );
  }
}

export default PlayerContent;
