import React, { Component } from 'react';
import Controls from './Controls';
import PlayerContent from './PlayerContent';
import Art from './Art';
import './style/Player.css';
import payload from '../../mocks/payload.json';

export class Player extends Component {
  audio = undefined;
  currIndex = -1;
  playlist = [];
  seekT = null;
  seekLoc = null;
  seekBarPos = null;
  cM = null;
  ctMinutes = null;
  ctSeconds = null;
  curMinutes = null;
  curSeconds = null;
  durMinutes = null;
  durSeconds = null;
  playProgress = null;
  bTime = null;
  nTime = 0;
  buffInterval = null;
  tFlag = false;

  constructor(props) {
    super(props);

    this.state = {
      hoverTimeText: '00:00',
      totalTime: '00:00',
      currentTime: '00:00',
      playProgress: '0%',
      playing: false,
      buffering: false,
      seekT: '0%',
      currArtwork:
        'https://www.stickpng.com/assets/images/5856b3da4f6ae202fedf2794.png',
      mute: false
    };
  }

  async componentDidMount() {
    await this.loadData();
    this.initPlayer();
  }

  async loadData() {
    this.setState({ isLoading: true });
    try {
      console.log(payload);
      let response = await fetch('https://app.fakejson.com/q', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      let data = await response.json();
      if (data) {
        this.playlist = data.playlist;
      }
    } catch (error) {
      console.log(error);
    }
  }

  initPlayer() {
    this.audio = new Audio();
    this.selectTrack(0);
    this.audio.loop = false;
    this.audio.addEventListener('timeupdate', this.updateCurrTime.bind(this));
  }

  playPause() {
    setTimeout(() => {
      if (this.audio.paused) {
        this.checkBuffering();
        this.audio.play();
        this.setState({ playing: true });
      } else {
        clearInterval(this.buffInterval);
        this.audio.pause();
        this.setState({ playing: false, buffering: false });
      }
    }, 300);
  }

  selectTrack(flag) {
    if (flag === 0 || flag === 1) {
      ++this.currIndex;
    } else {
      --this.currIndex;
    }

    if (this.currIndex > -1 && this.currIndex < this.playlist.length) {
      if (flag === 0) this.setState({ playing: false });
      else this.setState({ playing: true, buffering: true });

      this.nTime = 0;
      this.bTime = new Date().getTime();

      this.setState({
        currAlbum: this.playlist[this.currIndex].album,
        currTrackName: this.playlist[this.currIndex].name,
        currArtwork: this.playlist[this.currIndex].artWork,
        currentProgress: 0,
        totalTime: '00:00',
        currentTime: '00:00'
      });

      this.audio.src = this.playlist[this.currIndex].trackUrl;

      if (flag !== 0) {
        this.audio.play();
        clearInterval(this.buffInterval);
        this.checkBuffering();
      }
    } else {
      if (flag === 0 || flag === 1) {
        --this.currIndex;
      } else {
        ++this.currIndex;
      }
    }
  }

  render() {
    return (
      <div className="Player">
        <Controls
          info={this.state}
          muteClicked={() => this.toggleMute()}
          backwardClicked={() => this.selectTrack(-1)}
          playPauseClicked={() => this.playPause()}
          forwardClicked={() => this.selectTrack(1)}
        />
        <PlayerContent
          info={this.state}
          seekBarClicked={() => {
            this.playFromClickedPos();
          }}
          seekBarMouseOut={() => this.hideHover()}
          seekBarMouseMove={(event, sAreaRef) =>
            this.showHover(event, sAreaRef)
          }
        />
        <Art info={this.state} />
      </div>
    );
  }

  toggleMute() {
    const mute = this.state.mute;
    this.audio.muted = !this.audio.muted;
    this.setState({ mute: !mute });
  }

  getElementOffset(el) {
    let top = 0;
    let left = 0;
    let element = el;

    // Loop through the DOM tree
    // and add it's parent's offset to get page offset
    do {
      top += element.offsetTop || 0;
      left += element.offsetLeft || 0;
      element = element.offsetParent;
    } while (element);

    return {
      top,
      left
    };
  }

  showHover(event, sAreaRef) {
    const sAreaOffset = this.getElementOffset(sAreaRef);
    this.seekT = event.clientX - sAreaOffset.left;
    this.seekLoc = this.audio.duration * (this.seekT / sAreaRef.offsetWidth);
    this.cM = this.seekLoc / 60;
    this.ctMinutes = Math.floor(this.cM);
    this.ctSeconds = Math.floor(this.seekLoc - this.ctMinutes * 60);
    if (this.ctMinutes < 0 || this.ctSeconds < 0) return;
    if (this.ctMinutes < 0 || this.ctSeconds < 0) return;
    if (this.ctMinutes < 10) this.ctMinutes = '0' + this.ctMinutes;
    if (this.ctSeconds < 10) this.ctSeconds = '0' + this.ctSeconds;
    if (isNaN(this.ctMinutes) || isNaN(this.ctSeconds))
      this.setState({ hoverTimeText: '--:--' });
    else
      this.setState({
        hoverTimeText: this.ctMinutes + ':' + this.ctSeconds,
        seekT: this.seekT
      });
  }

  hideHover() {
    this.setState({ seekT: 0 });
  }

  playFromClickedPos() {
    this.audio.currentTime = this.seekLoc;
    this.setState({ seekT: this.seekT });
    this.hideHover();
  }

  updateCurrTime() {
    this.nTime = new Date();
    this.nTime = this.nTime.getTime();

    if (!this.tFlag) {
      this.tFlag = true;
    }

    this.curMinutes = Math.floor(this.audio.currentTime / 60);
    this.curSeconds = Math.floor(this.audio.currentTime - this.curMinutes * 60);

    this.durMinutes = Math.floor(this.audio.duration / 60);
    this.durSeconds = Math.floor(this.audio.duration - this.durMinutes * 60);

    this.playProgress = (this.audio.currentTime / this.audio.duration) * 100;

    if (this.curMinutes < 10) this.curMinutes = '0' + this.curMinutes;
    if (this.curSeconds < 10) this.curSeconds = '0' + this.curSeconds;

    if (this.durMinutes < 10) this.durMinutes = '0' + this.durMinutes;
    if (this.durSeconds < 10) this.durSeconds = '0' + this.durSeconds;

    if (isNaN(this.curMinutes) || isNaN(this.curSeconds))
      this.setState({ currentTime: '00:00' });
    else
      this.setState({ currentTime: `${this.curMinutes}:${this.curSeconds}` });

    if (isNaN(this.durMinutes) || isNaN(this.durSeconds))
      this.setState({ totalTime: '00:00' });
    else this.setState({ totalTime: `${this.durMinutes}:${this.durSeconds}` });

    // if( isNaN(this.curMinutes) || isNaN(this.curSeconds) || isNaN(this.durMinutes) || isNaN(this.durSeconds) )
    //     trackTime.removeClass('active');
    // else
    //     trackTime.addClass('active');

    this.setState({ playProgress: `${this.playProgress}%` });

    if (this.playProgress === 100) {
      this.setState({
        playing: false,
        playProgress: '0%',
        currentTime: '00:00',
        buffering: false,
        totalTime: '00:00'
      });

      clearInterval(this.buffInterval);
    }
  }

  checkBuffering() {
    clearInterval(this.buffInterval);
    this.buffInterval = setInterval(() => {
      if (this.nTime === 0 || this.bTime - this.nTime > 1000)
        this.setState({ buffering: true });
      else this.setState({ buffering: false });

      this.bTime = new Date();
      this.bTime = this.bTime.getTime();
    }, 100);
  }
}

export default Player;
