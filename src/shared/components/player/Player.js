import React, { Component } from 'react';
import Controls from './Controls';
import PlayerContent from './PlayerContent';
import Art from './Art';

import './style/Player.css';
export class Player extends Component {
  audio = undefined;
  currIndex = -1;
  //playerTrack = $("#player-track"), bgArtwork = $('#bg-artwork'), bgArtworkUrl, albumName = $('#album-name'), trackName = $('#track-name'), albumArt = $('#album-art'), sArea = $('#s-area'), seekBar = $('#seek-bar'), trackTime = $('#track-time'), insTime = $('#ins-time'), sHover = $('#s-hover'), playPauseButton = $("#play-pause-button"),  i = playPauseButton.find('i'), tProgress = $('#current-time'), tTime = $('#track-length'), seekT, seekLoc, seekBarPos, cM, ctMinutes, ctSeconds, curMinutes, curSeconds, durMinutes, durSeconds, playProgress, bTime, nTime = 0, buffInterval = null, tFlag = false;
  albums = [
    'Amanecer',
    'Me & You',
    'Electro Boy',
    'Home',
    'Proxy (Original Mix)'
  ];
  trackNames = [
    'Bomba Estereo - To My Love',
    'Alex Skrindo - Me & You',
    'Kaaze - Electro Boy',
    'Jordan Schor - Home',
    'Martin Garrix - Proxy'
  ];
  albumArtworks = ['_1', '_2', '_3', '_4', '_5'];
  trackUrl = [
    'https://d2tml28x3t0b85.cloudfront.net/tracks/stream_files/000/696/722/original/Bomba%20Est%C3%A9reo%20-%20To%20My%20Love%20%28Moombahton%20Bootleg%29.mp3?1514668785',
    'https://k003.kiwi6.com/hotlink/2rc3rz4rnp/1.mp3',
    'https://k003.kiwi6.com/hotlink/2rc3rz4rnp/1.mp3',
    'http://k003.kiwi6.com/hotlink/gt2rduy0mo/3.mp3',
    'http://k003.kiwi6.com/hotlink/421ezo6l38/4.mp3',
    'http://k003.kiwi6.com/hotlink/3j1d3r8a4t/5.mp3'
  ];
  // playPreviousTrackButton = $('#play-previous'), playNextTrackButton = $('#play-next'), ;

  constructor(props) {
    super(props);
    this.state = {
      seekT: null,
      seekLoc: null,
      seekBarPos: null,
      cM: null,
      ctMinutes: null,
      ctSeconds: null,
      curMinutes: null,
      curSeconds: null,
      durMinutes: null,
      durSeconds: null,
      playProgress: null,
      bTime: null,
      nTime: 0,
      buffInterval: null,
      tFlag: false,
      playing: false
    };
  }

  componentDidMount() {
    this.initPlayer();
  }

  initPlayer() {
    this.audio = new Audio();

    this.selectTrack(0);

    this.audio.loop = false;

    //playPauseButton.on('click',playPause);

    // sArea.mousemove(function(event){ showHover(event); });

    // sArea.mouseout(hideHover);

    // sArea.on('click',playFromClickedPos);

    //TODO: Add event to timeupdate audio component
    ////$(this.audio).on('timeupdate',updateCurrTime);

    // playPreviousTrackButton.on('click',function(){ selectTrack(-1);} );
    // playNextTrackButton.on('click',function(){ selectTrack(1);});
  }

  playPause() {
    setTimeout(() => {
      if (this.audio.paused) {
        // playerTrack.addClass('active');
        // albumArt.addClass('active');
        // checkBuffering();
        // i.attr('class','fas fa-pause');
        this.audio.play();
        this.setState({ playing: true });
      } else {
        // playerTrack.removeClass('active');
        // albumArt.removeClass('active');
        // clearInterval(buffInterval);
        // albumArt.removeClass('buffering');
        // i.attr('class','fas fa-play');
        this.audio.pause();
        this.setState({ playing: false });
      }
    }, 300);
  }

  selectTrack(flag) {
    if (flag === 0 || flag === 1) {
      this.currIndex++;
    } else {
      this.currIndex--;
    }

    if (this.currIndex > -1 && this.currIndex < this.albumArtworks.length) {
      // if( flag == 0 )
      //     // i.attr('class','fa fa-play');
      // else
      // {
      //     albumArt.removeClass('buffering');
      //     i.attr('class','fa fa-pause');
      // }

      // seekBar.width(0);
      // trackTime.removeClass('active');
      // tProgress.text('00:00');
      // tTime.text('00:00');

      this.setState({
        currAlbum: this.albums[this.currIndex],
        currTrackName: this.trackNames[this.currIndex],
        currArtwork: this.albumArtworks[this.currIndex],
        nTime: 0,
        bTime: new Date().getTime()
      });

      this.audio.src = this.trackUrl[this.currIndex];

      if (flag !== 0) {
        this.audio.play();
        // playerTrack.addClass('active');
        // albumArt.addClass('active');

        // clearInterval(buffInterval);
        // checkBuffering();
      }

      // albumName.text(currAlbum);
      // trackName.text(currTrackName);
      // albumArt.find('img.active').removeClass('active');
      // $('#'+currArtwork).addClass('active');

      // bgArtworkUrl = $('#'+currArtwork).attr('src');
    } else {
      if (flag === 0 || flag !== 1) {
        this.currIndex--;
      } else {
        this.currIndex++;
      }
    }
  }

  render() {
    return (
      <div className="Player">
        <Controls
          info={this.state}
          backwardClicked={() => this.selectTrack(-1)}
          playPauseClicked={() => this.playPause()}
          forwardClicked={() => this.selectTrack(1)}
        />
        <PlayerContent info={this.state} />
        <Art info={this.state} />
      </div>
    );
  }

  // function showHover(event)
  // {
  // 	seekBarPos = sArea.offset();
  // 	seekT = event.clientX - seekBarPos.left;
  // 	seekLoc = audio.duration * (seekT / sArea.outerWidth());

  // 	sHover.width(seekT);

  // 	cM = seekLoc / 60;

  // 	ctMinutes = Math.floor(cM);
  // 	ctSeconds = Math.floor(seekLoc - ctMinutes * 60);

  // 	if( (ctMinutes < 0) || (ctSeconds < 0) )
  // 		return;

  //     if( (ctMinutes < 0) || (ctSeconds < 0) )
  // 		return;

  // 	if(ctMinutes < 10)
  // 		ctMinutes = '0'+ctMinutes;
  // 	if(ctSeconds < 10)
  // 		ctSeconds = '0'+ctSeconds;

  //     if( isNaN(ctMinutes) || isNaN(ctSeconds) )
  //         insTime.text('--:--');
  //     else
  // 	    insTime.text(ctMinutes+':'+ctSeconds);

  // 	insTime.css({'left':seekT,'margin-left':'-21px'}).fadeIn(0);

  // }

  // function hideHover()
  // {
  //     sHover.width(0);
  //     insTime.text('00:00').css({'left':'0px','margin-left':'0px'}).fadeOut(0);
  // }

  // function playFromClickedPos()
  // {
  //     audio.currentTime = seekLoc;
  // 	seekBar.width(seekT);
  // 	hideHover();
  // }

  // function updateCurrTime()
  // {
  //     nTime = new Date();
  //     nTime = nTime.getTime();

  //     if( !tFlag )
  //     {
  //         tFlag = true;
  //         trackTime.addClass('active');
  //     }

  // 	curMinutes = Math.floor(audio.currentTime / 60);
  // 	curSeconds = Math.floor(audio.currentTime - curMinutes * 60);

  // 	durMinutes = Math.floor(audio.duration / 60);
  // 	durSeconds = Math.floor(audio.duration - durMinutes * 60);

  // 	playProgress = (audio.currentTime / audio.duration) * 100;

  // 	if(curMinutes < 10)
  // 		curMinutes = '0'+curMinutes;
  // 	if(curSeconds < 10)
  // 		curSeconds = '0'+curSeconds;

  // 	if(durMinutes < 10)
  // 		durMinutes = '0'+durMinutes;
  // 	if(durSeconds < 10)
  // 		durSeconds = '0'+durSeconds;

  //     if( isNaN(curMinutes) || isNaN(curSeconds) )
  //         tProgress.text('00:00');
  //     else
  // 	    tProgress.text(curMinutes+':'+curSeconds);

  //     if( isNaN(durMinutes) || isNaN(durSeconds) )
  //         tTime.text('00:00');
  //     else
  // 	    tTime.text(durMinutes+':'+durSeconds);

  //     if( isNaN(curMinutes) || isNaN(curSeconds) || isNaN(durMinutes) || isNaN(durSeconds) )
  //         trackTime.removeClass('active');
  //     else
  //         trackTime.addClass('active');

  // 	seekBar.width(playProgress+'%');

  // 	if( playProgress == 100 )
  // 	{
  // 		i.attr('class','fa fa-play');
  // 		seekBar.width(0);
  //         tProgress.text('00:00');
  //         albumArt.removeClass('buffering').removeClass('active');
  //         clearInterval(buffInterval);
  // 	}
  // }

  // function checkBuffering()
  // {
  //     clearInterval(buffInterval);
  //     buffInterval = setInterval(function()
  //     {
  //         if( (nTime == 0) || (bTime - nTime) > 1000  )
  //             albumArt.addClass('buffering');
  //         else
  //             albumArt.removeClass('buffering');

  //         bTime = new Date();
  //         bTime = bTime.getTime();

  //     },100);
  // }

  // initPlayer();
  // }
}

export default Player;
