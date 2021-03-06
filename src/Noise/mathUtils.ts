const squaresToTriangles = (3 - Math.sqrt(3)) / 6;
const trainglesToSquares = (Math.sqrt(3) - 1) / 2;

// simple linear interpolation function
const lerp = (a: number, b: number, t: number) => {
  return a + (b - a) * t;
};

// smooth function with second derivative equal to zero at both ends
const smooth = (t: number) => {
  return t * t * t * (t * (t * 6 - 15) + 10);
};

// returns fractional part of n
const fract = (n: number) => {
  return n - Math.floor(n);
};

// simple pseudorandom function that generates random point
const random2 = (p: Vector2) => {
  const x = fract(Math.sin(dot(p, new Vector2(127.1, 311.7))) * 43758.5453);
  const y = fract(Math.sin(dot(p, new Vector2(269.5, 183.3))) * 43758.5453);
  return new Vector2(x, y);
};

// Ovreload for dot product
function dot(g: Vector2, x: number, y: number): number;
function dot(a: Vector2, b: Vector2): number;
function dot(v1: Vector2, v2: Vector2 | number, y?: number): number {
  if (typeof v2 === "number") {
    return v1.x * v2 + v1.y * y!;
  } else {
    return v1.x * v2.x + v1.y + v2.y;
  }
}

class Vector2 {
  x: number;
  y: number;
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
  get lenght() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  get normalized() {
    return new Vector2(this.x / this.lenght, this.y / this.lenght);
  }
  public static distance(p1: Vector2, p2: Vector2) {
    return Math.sqrt((p2.x - p1.x) * (p2.x - p1.x) + (p2.y - p1.y) * (p2.y - p1.y));
  }
}
class Color {
  r: number;
  g: number;
  b: number;
  a: number;
  constructor(color: string);
  constructor(r: number, g: number, b: number, a: number);
  constructor(r: number | string, g?: number, b?: number, a?: number) {
    if (typeof r === "string") {
      let values = r.replace("rgb", "").replace("(", "").replace(")", "").split(",");

      this.r = parseInt(values[0]);
      this.g = parseInt(values[1]);
      this.b = parseInt(values[2]);
      this.a = 1;
    } else {
      this.r = r;
      this.g = g!;
      this.b = b!;
      this.a = a!;
    }
  }

  public static lerp(c1: Color, c2: Color, t: number) {
    const interpolR = c1.r + (c2.r - c1.r) * t;
    const interpolG = c1.g + (c2.g - c1.g) * t;
    const interpolB = c1.b + (c2.b - c1.b) * t;

    return new Color(interpolR, interpolG, interpolB, 1);
  }
}

export {
  lerp,
  smooth,
  dot,
  random2,
  fract,
  Vector2,
  Color,
  squaresToTriangles,
  trainglesToSquares,
};
