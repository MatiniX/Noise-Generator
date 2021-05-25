import { Vector2 } from "./mathUtils";

// function that returns noise texture based on passed parameters
const getImageData = (
  noiseFunction: (v: Vector2, f: number) => number,
  width: number,
  height: number
) => {
  const imageData = new ImageData(width, height);
  const stepSize = 1 / width;

  for (let y = 0; y < imageData.height; y++) {
    for (let x = 0; x < imageData.width; x++) {
      const idx = (y * imageData.width + x) * 4; // calculate pixel index
      const xCoord = (x + 0.5) * stepSize; // remap because of positive y down
      const yCoord = (imageData.height - y + 0.5) * stepSize; // remap to positive y up
      const point = new Vector2(xCoord, yCoord);

      const val = noiseFunction(point, 32) * 0.5 + 0.5;

      // set color data for single pixel (rgba)
      // adding offset of 0.5 because so te pixel origin lies in midlle of top left corner
      imageData.data[idx] = 255 * val; // red
      imageData.data[idx + 1] = 255 * val; // green (remapping to positive y up)
      imageData.data[idx + 2] = 255 * val; // blue
      imageData.data[idx + 3] = 255; // force alpha to be always 100%
    }
  }
};

export {};
