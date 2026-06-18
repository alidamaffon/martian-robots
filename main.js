class Grid {
  constructor(width, height) {
    if (width > 50) width = 50;
    if (height > 50) height = 50;
    this.width = width;
    this.height = height;
    this.scents = new Set();
  }

  leaveScent(x, y) {
    this.scents.add(y * this.width + x);
  }

  isScented(x, y) {
    return this.scents.has(y * this.width + x);
  }

  isOutOfBounds(x, y) {
    return x < 0 || y < 0 || x > this.width || y > this.height;
  }
}
