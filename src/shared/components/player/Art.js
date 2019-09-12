import React from 'react';
import PropTypes from 'prop-types';
import './style/Art.css';
import { EMPTY_STRING, SPACE_STRING } from '../../constants/constants';
const Art = props => {
  const { info } = props;
  const activeClass = info.playing ? 'active' : EMPTY_STRING;
  const bufferingClass = info.buffering ? 'buffering' : EMPTY_STRING;
  return (
    <div
      id="album-art"
      className={`${activeClass}${SPACE_STRING}${bufferingClass}`}
    >
      <img src={info.currArtwork} className="active" alt="currentImage" />
      <div id="buffer-box">Buffering ...</div>
    </div>
  );
};

Art.propTypes = {
  info: PropTypes.object.isRequired
};

export default Art;
