import React from 'react';
import './style/Art.css';
const Art = props => {
  const { info } = props;
  const activeClass = info.playing ? 'active' : '';
  const bufferingClass = info.buffering ? 'buffering' : '';
  return (
    <div id="album-art" className={activeClass + ' ' + bufferingClass}>
      <img src={info.currArtwork} className="active" alt="currentImage"></img>
      <div id="buffer-box">Buffering ...</div>
    </div>
  );
};
export default Art;
