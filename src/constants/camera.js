import { sizes as camera } from './../utils/camera';

export const constraints = {
  video: {
    facingMode: 'environment',
    width: camera.width,
    height: camera.height
  }
};
