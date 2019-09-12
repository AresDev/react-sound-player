import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBackward,
  faForward,
  faPlay,
  faPause,
  faVolumeMute,
  faVolumeOff
} from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

import './style/Controls.css';

const Controls = props => {
  const { info } = props;

  const playPauseContent = info.playing ? (
    <FontAwesomeIcon icon={faPause} size="lg" />
  ) : (
    <FontAwesomeIcon icon={faPlay} size="lg" />
  );

  const muteContent = info.mute ? (
    <FontAwesomeIcon icon={faVolumeOff} size="lg" />
  ) : (
    <FontAwesomeIcon icon={faVolumeMute} size="lg" />
  );

  return (
    <div className="Controls">
      <div>
        <div
          className="control"
          style={{ display: info.playing ? 'block' : 'none' }}
        >
          <div className="button" onClick={props.muteClicked}>
            {muteContent}
          </div>
        </div>
        <div className="control">
          <div className="button" onClick={props.backwardClicked}>
            <FontAwesomeIcon icon={faBackward} size="lg" />
          </div>
        </div>
        <div className="control">
          <div className="button" onClick={props.playPauseClicked}>
            {playPauseContent}
          </div>
        </div>
        <div className="control">
          <div className="button" onClick={props.forwardClicked}>
            <FontAwesomeIcon icon={faForward} size="lg" />
          </div>
        </div>
      </div>
    </div>
  );
};

Controls.propTypes = {
  info: PropTypes.object.isRequired,
  muteClicked: PropTypes.func.isRequired,
  backwardClicked: PropTypes.func.isRequired,
  playPauseClicked: PropTypes.func.isRequired,
  forwardClicked: PropTypes.func.isRequired
};

export default Controls;
