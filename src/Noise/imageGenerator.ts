import { Color, smooth, Vector2 } from "./mathUtils";
import { Noise } from "./noise";

enum NoiseType {
  Value,
  Perlin,
  Simplex,
  Worley,
}

// function that returns noise texture based on passed parameters
const getImageData = (
  width: number,
  height: number,
  noiseType: NoiseType,
  dimension: number,
  frequency: number,
  offsetX: number,
  offsetY: number,
  octaves: number,
  lacunarity: number,
  persistance: number,
  gradient?: { offset: string; color: string }[]
) => {
  const imageData = new ImageData(width, height);
  const stepSize = 1 / width;

  for (let y = 0; y < imageData.height; y++) {
    for (let x = 0; x < imageData.width; x++) {
      const point = new Vector2((x + 0.5) * stepSize - 0.5, (y + 0.5) * stepSize - 0.5);
      point.x += offsetX;
      point.y += offsetY;

      const noiseFunction = Noise.noiseFunctions[noiseType][dimension - 1];
      let val = Noise.Sum(noiseFunction, point, frequency, octaves, lacunarity, persistance);

      val = val * 0.5 + 0.5;
      let c: Color | undefined;

      if (gradient) {
        // calculate the color
        c = evaluateGradient(gradient, val);
      }

      const idx = ((imageData.height - y - 1) * imageData.width + x) * 4; // calculate pixel index so that positive y is up
      // set color data for single pixel (rgba)
      // adding offset of 0.5 because so te pixel origin lies in midlle of top left corner
      imageData.data[idx] = c ? c.r : 255 * val; // red
      imageData.data[idx + 1] = c ? c.g : 255 * val; // green (remapping to positive y up)
      imageData.data[idx + 2] = c ? c.b : 255 * val; // blue
      imageData.data[idx + 3] = 255; // force alpha to be always 100%
    }
  }
  return imageData;
};
const getUVImageData = (width: number, height: number) => {
  const imageData = new ImageData(width, height);
  const stepSize = 1 / width;

  for (let y = 0; y < imageData.height; y++) {
    for (let x = 0; x < imageData.width; x++) {
      const point = new Vector2((x + 0.5) * stepSize, (y + 0.5) * stepSize);

      const idx = ((imageData.height - y - 1) * imageData.width + x) * 4; // calculate pixel index so that positive y is up
      // set color data for single pixel (rgba)
      // adding offset of 0.5 because so te pixel origin lies in midlle of top left corner
      imageData.data[idx] = 255 * point.x; // red
      imageData.data[idx + 1] = 255 * point.y; // green (remapping to positive y up)
      imageData.data[idx + 2] = 0; // blue
      imageData.data[idx + 3] = 255; // force alpha to be always 100%
    }
  }
  return imageData;
};
const getWorleyNoiseImageData = (width: number, height: number) => {
  const imageData = new ImageData(width, height);
  const stepSize = 1 / width;

  for (let y = 0; y < imageData.height; y++) {
    for (let x = 0; x < imageData.width; x++) {
      const point = new Vector2((x + 0.5) * stepSize - 0.5, (y + 0.5) * stepSize - 0.5);

      const val = Noise.worleyNoise(point, 4);

      const idx = ((imageData.height - y - 1) * imageData.width + x) * 4; // calculate pixel index so that positive y is up
      // set color data for single pixel (rgba)
      // adding offset of 0.5 because so te pixel origin lies in midlle of top left corner
      imageData.data[idx] = 255 * val; // red
      imageData.data[idx + 1] = 255 * val; // green (remapping to positive y up)
      imageData.data[idx + 2] = 255 * val; // blue
      imageData.data[idx + 3] = 255; // force alpha to be always 100%
    }
  }
  return imageData;
};

const evaluateGradient = (gradient: { offset: string; color: string }[], t: number) => {
  // loop through each color and find start color and  end color for gradient
  let startColor = "rgb(0, 0, 0)";
  let endColor = "rgb(255, 255, 255)";

  for (let i = 0; i < gradient.length - 1; i++) {
    const colorStop = gradient[i];
    if (t >= parseFloat(colorStop.offset)) {
      startColor = colorStop.color;
      endColor = gradient[i + 1].color;
    }
  }
  return Color.lerp(new Color(startColor), new Color(endColor), t);
};

export { getImageData, getUVImageData, getWorleyNoiseImageData, evaluateGradient, NoiseType };
