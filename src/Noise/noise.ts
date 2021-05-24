// same hashTable as Ken Perlin uses in his refernece
const hashTable = [
  151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140,
  36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148, 247, 120, 234,
  75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33, 88, 237,
  149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165, 71, 134, 139, 48,
  27, 166, 77, 146, 158, 231, 83, 111, 229, 122, 60, 211, 133, 230, 220, 105,
  92, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65, 25, 63, 161, 1, 216, 80, 73,
  209, 76, 132, 187, 208, 89, 18, 169, 200, 196, 135, 130, 116, 188, 159, 86,
  164, 100, 109, 198, 173, 186, 3, 64, 52, 217, 226, 250, 124, 123, 5, 202, 38,
  147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227, 47, 16, 58, 17, 182, 189,
  28, 42, 223, 183, 170, 213, 119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101,
  155, 167, 43, 172, 9, 129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232,
  178, 185, 112, 104, 218, 246, 97, 228, 251, 34, 242, 193, 238, 210, 144, 12,
  191, 179, 162, 241, 81, 51, 145, 235, 249, 14, 239, 107, 49, 192, 214, 31,
  181, 199, 106, 157, 184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254,
  138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215,
  61, 156, 180,
];
const hashMask = 255;

// simple linear interpolation function
const lerp = (a: number, b: number, t: number) => {
  return a + (b - a) * t;
};

// smooth function with second derivative equal to zero at both ends
const smooth = (t: number) => {
  return t * t * t * (t * (t * 6 - 15) + 10);
};

// 1. make simple noise genration
const simpleNoise2D = (width: number, height: number) => {
  const imageData = new ImageData(width, height);
  const stepSize = 1 / width;

  for (let y = 0; y < imageData.height; y++) {
    for (let x = 0; x < imageData.width; x++) {
      const idx = (y * imageData.width + x) * 4; // calculate pixel index
      const xCoord = (x + 0.5) * stepSize;
      const yCoord = (y + 0.5) * stepSize;

      const val = value1d(xCoord, 8);

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

const value1d = (x: number, frequency: number) => {
  x *= frequency;
  let i0 = Math.floor(x);
  let t = x - i0;
  i0 &= hashMask;
  let i1 = i0 + 1;

  let h0 = hashTable[i0];
  let h1 = hashTable[i1];

  t = smooth(t);

  return lerp(h0, h1, t) * (1 / hashMask);
};
const value2d = (x: number, y: number, frequency: number) => {
  x *= frequency;
  y *= frequency;
  let ix = Math.floor(x);
  let iy = Math.floor(y);
  ix %= hashMask;
  iy %= hashMask;

  return hashTable[(hashTable[ix] + iy) & hashMask] * (1 / hashMask);
};

// 2. make simple noise generation using hash table

export { simpleNoise2D };
