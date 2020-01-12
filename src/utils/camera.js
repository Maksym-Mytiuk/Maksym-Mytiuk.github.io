const businessCardRatio = 50 / 90;
const vw = window.innerWidth;
const vh = window.innerHeight;
const cameraHeight = Math.floor(vw * 0.75);
const borderPaddingLeft = 15;
const borderWidth = vw - borderPaddingLeft * 2;
const borderHeight = Math.floor(borderWidth * businessCardRatio);
const borderPaddingTop = Math.floor(cameraHeight - borderHeight)  / 2;
const controlsHeight = vh - cameraHeight;

export const sizes = {
  width: vw,
  height: cameraHeight,
  borderWidth,
  borderHeight,
  borderPaddingLeft,
  borderPaddingTop,
  controlsHeight
};
