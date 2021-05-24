// 1. make simple noise genration

const simpleNoise2D = (width: number, height: number) => {
  const imageData = new ImageData(width, height);

  for (let y = 0; y < imageData.height; y++) {
    for (let x = 0; x < imageData.width; x++) {
      let val = 0;

      if (Math.random() < 0.5) {
        val = 255;
      } else {
        val = 0;
      }

      const idx = (y * imageData.width + x) * 4; // calculate pixel index
      // set color data for single pixel (rgba)
      imageData.data[idx] = val; // red
      imageData.data[idx + 1] = val; // green
      imageData.data[idx + 2] = val; // blue
      imageData.data[idx + 3] = 255; // force alpha to be always 100%
    }
  }

  return imageData;
};

// 2. make simple noise generation using hash table

export { simpleNoise2D };
