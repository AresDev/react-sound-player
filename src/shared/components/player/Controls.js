import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBackward,
  faForward,
  faPlay
} from '@fortawesome/free-solid-svg-icons';

import './style/Controls.css';

export class Controls extends Component {
  render() {
    return (
      <div className="Controls">
        <button onClick={this.props.backwardClicked}>
          <FontAwesomeIcon icon={faBackward} size="lg" />
        </button>

        <button onClick={this.props.playPauseClicked}>
          <FontAwesomeIcon icon={faPlay} size="lg" />
        </button>

        <button onClick={this.props.forwardClicked}>
          <FontAwesomeIcon icon={faForward} size="lg" />
        </button>
      </div>
    );
  }
}

export default Controls;
