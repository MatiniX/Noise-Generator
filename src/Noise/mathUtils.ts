// simple linear interpolation function
const lerp = (a: number, b: number, t: number) => {
  return a + (b - a) * t;
};

// smooth function with second derivative equal to zero at both ends
const smooth = (t: number) => {
  return t * t * t * (t * (t * 6 - 15) + 10);
};

const dot = (g: Vector2, x: number, y: number) => {
  return g.x * x + g.y * y;
};

// simple vector2 class for holding x,y coordinates
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
    return new Vector2(this.x / this.lenght, this.x / this.lenght);
  }
}

export { lerp, smooth, dot, Vector2 };
