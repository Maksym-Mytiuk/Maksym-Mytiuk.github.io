import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { sizes as camera } from './../../utils/camera';
import { ROUTING, STORAGE, constraints } from './../../constants';
import Button from './../../components/button';

import './Camera.scss';

class Camera extends Component {
  constructor(props) {
    super(props);
    this.video = React.createRef();
    this.canvas = React.createRef();
    this.state = {
      tempPhotos: []
    };
  }

  async componentDidMount() {
    if (!localStorage.getItem(STORAGE.CARD_HOLDERS)) {
      localStorage.setItem(STORAGE.CARD_HOLDERS, JSON.stringify({ photos: [] }));
    }
    this.playVideo();
  }

  componentDidUpdate(_prevProps, prevState) {
    if (this.state !== prevState && this.state.tempPhotos.length === 2) {
      const { photos } = JSON.parse(localStorage.getItem(STORAGE.CARD_HOLDERS));
      const { tempPhotos } = this.state;

      photos.push(tempPhotos);
      localStorage.setItem(STORAGE.CARD_HOLDERS, JSON.stringify({ photos }));

      this.goHome();
    }
  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this.animationVideo);
    this.video.current = null;
  }

  playVideo = async () => {
    const video = this.video.current;
    video.srcObject = await navigator.mediaDevices.getUserMedia(constraints);
    video.play();
    this.animationVideo = window.requestAnimationFrame(() => this.paintVideoToCanvas());
  };

  paintVideoToCanvas() {
    const video = this.video.current;
    const canvas = this.canvas.current;
    const ctx = canvas.getContext('2d');
    const width = camera.width;
    const height = camera.height;

    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(video, 0, 0, width, height);
    this.paintPhotoBorder(ctx);

    this.animationVideo = window.requestAnimationFrame(() => this.paintVideoToCanvas());
  }

  paintPhotoBorder = ctx => {
    const { borderPaddingLeft, borderPaddingTop, borderWidth, borderHeight } = camera;

    ctx.strokeStyle = 'red';
    ctx.lineWidth = 2;
    ctx.setLineDash([10, 3]);
    ctx.strokeRect(borderPaddingLeft, borderPaddingTop, borderWidth, borderHeight);
  };

  goHome = () => {
    this.props.history.push(ROUTING.HOME);
  };

  doScreenshot = () => {
    const canvas = this.canvas.current;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(
      this.video.current,
      camera.borderPaddingLeft,
      camera.borderPaddingTop,
      camera.borderWidth,
      camera.borderHeight,
      0,
      0,
      camera.width,
      camera.height
    );

    this.saveScreenshot();
  };

  saveScreenshot = () => {
    const canvas = this.canvas.current;
    this.setState({
      tempPhotos: [...this.state.tempPhotos, canvas.toDataURL('image/jpeg', 1)]
    });
  };

  render() {
    return (
      <div className="camera">
        <video ref={this.video} muted></video>
        <canvas ref={this.canvas}></canvas>
        <hr className="line" />
        <div className="controls" style={{ height: camera.controlsHeight }}>
          <Button className="btn-photo" onClick={this.doScreenshot} float={true} text={'📷'} />
        </div>
        {this.state.tempPhotos.length === 1 && (
          <div style={{position: "absolute", top: 0, left: 0, color: '#000'}}>
            <p>camera.height: {camera.height}</p>
            <p>camera.width: {camera.width}</p>
            <p>this.canvas.current.height: {this.canvas.current.height}</p>
            <p>this.canvas.current.width: {this.canvas.current.width}</p>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Camera);
