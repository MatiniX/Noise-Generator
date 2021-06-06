import {
  lerp,
  smooth,
  Vector2,
  dot,
  trainglesToSquares,
  squaresToTriangles,
  random2,
  fract,
} from "./mathUtils";

type NoiseFunction = (p: Vector2, f: number) => number;

class Noise {
  private static valueFunctions = [Noise.value1d, Noise.value2d];
  private static perlinFunctions = [Noise.perlin1d, Noise.perlin2d];
  private static simplexFunctions = [Noise.simplexValue1d, Noise.simplexValue2d];
  // TODO: Should be a better method of getting the noise type
  public static noiseFunctions = [
    Noise.valueFunctions,
    Noise.perlinFunctions,
    Noise.simplexFunctions,
    [Noise.worleyNoise],
  ];

  // same hashTable as Ken Perlin uses in his refernece
  // array size is double the hashMask to avoid unescescary masking
  private static hashTable = [
    151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140, 36, 103, 30, 69,
    142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148, 247, 120, 234, 75, 0, 26, 197, 62, 94, 252, 219,
    203, 117, 35, 11, 32, 57, 177, 33, 88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175,
    74, 165, 71, 134, 139, 48, 27, 166, 77, 146, 158, 231, 83, 111, 229, 122, 60, 211, 133, 230,
    220, 105, 92, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65, 25, 63, 161, 1, 216, 80, 73, 209, 76,
    132, 187, 208, 89, 18, 169, 200, 196, 135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186,
    3, 64, 52, 217, 226, 250, 124, 123, 5, 202, 38, 147, 118, 126, 255, 82, 85, 212, 207, 206, 59,
    227, 47, 16, 58, 17, 182, 189, 28, 42, 223, 183, 170, 213, 119, 248, 152, 2, 44, 154, 163, 70,
    221, 153, 101, 155, 167, 43, 172, 9, 129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178,
    185, 112, 104, 218, 246, 97, 228, 251, 34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241, 81,
    51, 145, 235, 249, 14, 239, 107, 49, 192, 214, 31, 181, 199, 106, 157, 184, 84, 204, 176, 115,
    121, 50, 45, 127, 4, 150, 254, 138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243, 141, 128, 195,
    78, 66, 215, 61, 156, 180,

    151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140, 36, 103, 30, 69,
    142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148, 247, 120, 234, 75, 0, 26, 197, 62, 94, 252, 219,
    203, 117, 35, 11, 32, 57, 177, 33, 88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175,
    74, 165, 71, 134, 139, 48, 27, 166, 77, 146, 158, 231, 83, 111, 229, 122, 60, 211, 133, 230,
    220, 105, 92, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65, 25, 63, 161, 1, 216, 80, 73, 209, 76,
    132, 187, 208, 89, 18, 169, 200, 196, 135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186,
    3, 64, 52, 217, 226, 250, 124, 123, 5, 202, 38, 147, 118, 126, 255, 82, 85, 212, 207, 206, 59,
    227, 47, 16, 58, 17, 182, 189, 28, 42, 223, 183, 170, 213, 119, 248, 152, 2, 44, 154, 163, 70,
    221, 153, 101, 155, 167, 43, 172, 9, 129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178,
    185, 112, 104, 218, 246, 97, 228, 251, 34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241, 81,
    51, 145, 235, 249, 14, 239, 107, 49, 192, 214, 31, 181, 199, 106, 157, 184, 84, 204, 176, 115,
    121, 50, 45, 127, 4, 150, 254, 138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243, 141, 128, 195,
    78, 66, 215, 61, 156, 180,
  ];

  private static gradients1D = [-1, 1];
  private static gradientsMask1D = 1;

  private static gradients2D = [
    new Vector2(1, 0),
    new Vector2(-1, 0),
    new Vector2(0, 1),
    new Vector2(0, -1),
    new Vector2(1, 1).normalized,
    new Vector2(-1, 1).normalized,
    new Vector2(1, -1).normalized,
    new Vector2(-1, -1).normalized,
  ];
  private static gradientsMask2D = 7;

  private static hashMask = 255;

  /** VALUE NOISE */

  public static value1d(p: Vector2, frequency: number) {
    let point = new Vector2(p.x, p.y); // create copy because it is passed as reference
    point.x *= frequency;
    let i0 = Math.floor(point.x);
    let t = point.x - i0;
    i0 &= Noise.hashMask;
    let i1 = i0 + 1;

    let h0 = Noise.hashTable[i0];
    let h1 = Noise.hashTable[i1];

    t = smooth(t);

    return lerp(h0, h1, t) * (2 / Noise.hashMask) - 1;
  }
  public static value2d(p: Vector2, frequency: number) {
    let point = new Vector2(p.x, p.y); // create copy because it is passed as reference
    point.x *= frequency;
    point.y *= frequency;

    let ix0 = Math.floor(point.x);
    let iy0 = Math.floor(point.y);
    let tx = point.x - ix0;
    let ty = point.y - iy0;
    ix0 &= Noise.hashMask;
    iy0 &= Noise.hashMask;

    let ix1 = ix0 + 1;
    let iy1 = iy0 + 1;

    let h0 = Noise.hashTable[ix0];
    let h1 = Noise.hashTable[ix1];
    let h00 = Noise.hashTable[h0 + iy0];
    let h10 = Noise.hashTable[h1 + iy0];
    let h01 = Noise.hashTable[h0 + iy1];
    let h11 = Noise.hashTable[h1 + iy1];

    tx = smooth(tx);
    ty = smooth(ty);

    return lerp(lerp(h00, h10, tx), lerp(h01, h11, tx), ty) * (2 / Noise.hashMask) - 1;
  }

  /** PERLIN NOISE */

  public static perlin1d(p: Vector2, frequency: number) {
    let point = new Vector2(p.x, p.y); // create copy because it is passed as reference
    point.x *= frequency;
    let i0 = Math.floor(point.x);
    let t0 = point.x - i0;
    let t1 = t0 - 1;
    i0 &= Noise.hashMask;
    let i1 = i0 + 1;

    let g0 = Noise.gradients1D[Noise.hashTable[i0] & Noise.gradientsMask1D];
    let g1 = Noise.gradients1D[Noise.hashTable[i1] & Noise.gradientsMask1D];

    let v0 = g0 * t0;
    let v1 = g1 * t1;

    let t = smooth(t0);

    return lerp(v0, v1, t) * 2;
  }
  public static perlin2d(p: Vector2, frequency: number) {
    let point = new Vector2(p.x, p.y); // create copy because it is passed as reference
    point.x *= frequency;
    point.y *= frequency;

    let ix0 = Math.floor(point.x);
    let iy0 = Math.floor(point.y);
    let tx0 = point.x - ix0;
    let ty0 = point.y - iy0;
    let tx1 = tx0 - 1;
    let ty1 = ty0 - 1;

    ix0 &= Noise.hashMask;
    iy0 &= Noise.hashMask;

    let ix1 = ix0 + 1;
    let iy1 = iy0 + 1;

    let h0 = Noise.hashTable[ix0];
    let h1 = Noise.hashTable[ix1];
    let g00 = Noise.gradients2D[Noise.hashTable[h0 + iy0] & Noise.gradientsMask2D];
    let g10 = Noise.gradients2D[Noise.hashTable[h1 + iy0] & Noise.gradientsMask2D];
    let g01 = Noise.gradients2D[Noise.hashTable[h0 + iy1] & Noise.gradientsMask2D];
    let g11 = Noise.gradients2D[Noise.hashTable[h1 + iy1] & Noise.gradientsMask2D];

    let v00 = dot(g00, tx0, ty0);
    let v10 = dot(g10, tx1, ty0);
    let v01 = dot(g01, tx0, ty1);
    let v11 = dot(g11, tx1, ty1);

    let tx = smooth(tx0);
    let ty = smooth(ty0);

    return lerp(lerp(v00, v10, tx), lerp(v01, v11, tx), ty) * Math.SQRT2;
  }

  /** SIMPLEX NOISE */

  static simplexValue1dPart(p: Vector2, ix: number) {
    const x = p.x - ix;
    const f = 1 - x * x;
    const f2 = f * f;
    const f3 = f * f2;
    const h = Noise.hashTable[ix & Noise.hashMask];

    return f3 * h;
  }
  public static simplexValue1d(p: Vector2, frequency: number) {
    let point = new Vector2(p.x, p.y);
    point.x *= frequency;

    const ix = Math.floor(point.x);
    let sample = Noise.simplexValue1dPart(point, ix);
    sample += Noise.simplexValue1dPart(point, ix + 1);

    return sample * (2 / Noise.hashMask) - 1;
  }

  static simplexValue2dPart(p: Vector2, ix: number, iy: number) {
    const unskew = (ix + iy) * squaresToTriangles;
    const x = p.x - ix + unskew;
    const y = p.y - iy + unskew;
    const f = 0.5 - x * x - y * y;
    let sample = 0;
    if (f > 0) {
      const f2 = f * f;
      const f3 = f * f2;
      sample = f3;
    }
    const h = Noise.hashTable[Noise.hashTable[ix & Noise.hashMask] + (iy & Noise.hashMask)];
    return h * sample;
  }
  public static simplexValue2d(p: Vector2, frequency: number) {
    let point = new Vector2(p.x, p.y);
    point.x *= frequency;
    point.y *= frequency;

    const skew = (point.x + point.y) * trainglesToSquares;
    const sx = point.x + skew;
    const sy = point.y + skew;

    const ix = Math.floor(sx);
    const iy = Math.floor(sy);

    let sample = Noise.simplexValue2dPart(point, ix, iy);
    sample += Noise.simplexValue2dPart(point, ix + 1, iy + 1);
    if (sx - ix >= sy - iy) {
      sample += Noise.simplexValue2dPart(point, ix + 1, iy);
    } else {
      sample += Noise.simplexValue2dPart(point, ix, iy + 1);
    }

    return sample * (8 * (2 / Noise.hashMask)) - 1;
  }

  /** WORLEY NOISE */

  public static worleyNoise(p: Vector2, scale: number) {
    // create copy and apply scale
    let point = new Vector2(p.x, p.y);
    point.x *= scale;
    point.y *= scale;

    // integer portion of point coordinates
    const ix = Math.floor(point.x);
    const iy = Math.floor(point.y);
    // fractional portion of point coordinates
    const fx = fract(point.x);
    const fy = fract(point.y);

    let minDst = 1;

    // loop to check neighbour cells
    for (let y = -1; y <= 1; y++) {
      for (let x = -1; x <= 1; x++) {
        const neighbor = new Vector2(x, y); // get neighbour
        const point = random2(new Vector2(neighbor.x + ix, neighbor.y + iy)); // get position of point in neighbour cell

        const diff = new Vector2(neighbor.x + point.x - fx, neighbor.y + point.y - fy); // calculate difference vector pixel and point

        const dist = diff.lenght; // distance to point
        minDst = Math.min(minDst, dist);
      }
    }

    return minDst * 2 - 1;
  }

  public static Sum(
    noiseFunction: NoiseFunction,
    point: Vector2,
    frequency: number,
    octaves: number,
    lacunarity: number,
    persistance: number
  ) {
    let sum = noiseFunction(point, frequency);
    let amplitude = 1;
    let range = 1;
    for (let o = 1; o < octaves; o++) {
      frequency *= lacunarity;
      amplitude *= persistance;
      range += amplitude;
      sum += noiseFunction(point, frequency) * amplitude;
    }
    return sum / range;
  }
}

export { Noise };
