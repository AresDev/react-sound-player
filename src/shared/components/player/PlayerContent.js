import React, { Component } from 'react';
import './style/PlayerContent.css';
import PropTypes from 'prop-types';
import { EMPTY_STRING } from '../../constants/constants';

export class PlayerContent extends Component {
  render() {
    const { info } = this.props;
    const activeClass = info.playing ? ' active' : EMPTY_STRING;
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
            <div id="s-hover" style={{ width: info.seekT }} />
            <div id="seek-bar" style={{ width: info.playProgress }} />
          </div>
        </div>
      </div>
    );
  }
}

PlayerContent.propTypes = {
  info: PropTypes.object.isRequired,
  seekBarMouseOut: PropTypes.func.isRequired,
  seekBarMouseMove: PropTypes.func.isRequired,
  seekBarClicked: PropTypes.func.isRequired
};

export default PlayerContent;
