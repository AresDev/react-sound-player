import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBackward,
  faForward,
  faPlay,
  faPause
} from '@fortawesome/free-solid-svg-icons';

import './style/Controls.css';

const Controls = props => {
  const { info } = props;
  const playPauseContent = info.playing ? (
    <FontAwesomeIcon icon={faPause} size="lg" />
  ) : (
    <FontAwesomeIcon icon={faPlay} size="lg" />
  );

  return (
    <div className="Controls">
      <div>
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

export default Controls;
