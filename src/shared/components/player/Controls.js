import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBackward,
  faForward,
  faPlay,
  faPause
} from '@fortawesome/free-solid-svg-icons';

import './style/Controls.css';

export class Controls extends Component {
  render() {
    const playPauseContent = this.props.info.playing ? (
      <FontAwesomeIcon icon={faPause} size="lg" />
    ) : (
      <FontAwesomeIcon icon={faPlay} size="lg" />
    );

    return (
      <div className="Controls">
        <div>
          <div className="control">
            <div className="button" onClick={this.props.backwardClicked}>
              <FontAwesomeIcon icon={faBackward} size="lg" />
            </div>
          </div>
          <div className="control">
            <div className="button" onClick={this.props.playPauseClicked}>
              {playPauseContent}
            </div>
          </div>
          <div className="control">
            <div className="button" onClick={this.props.forwardClicked}>
              <FontAwesomeIcon icon={faForward} size="lg" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Controls;
