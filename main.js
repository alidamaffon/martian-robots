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

class Robot {
  constructor(grid, x, y, orientation) {
    this.grid = grid;
    this.x = x;
    this.y = y;
    this.orientation = 'NESW'.indexOf(orientation) % 4;
  }

  turnLeft() {
    this.orientation = (this.orientation + 3) % 4;
  }

  turnRight() {
    this.orientation = (this.orientation + 1) % 4;
  }

  moveForward() {
    // Direction vectors are: N=[0,1], E=[1,0], S=[0,-1], W=[-1,0]
    const directions = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
    ];
    // Deltas
    const [dx, dy] = directions[this.orientation];

    if (this.grid.isOutOfBounds(this.x + dx, this.y + dy)) {
      if (!this.grid.isScented(this.x, this.y)) {
        this.grid.leaveScent(this.x, this.y);
        return false; // Because robot is lost
      }
    } else {
      this.x += dx;
      this.y += dy;
    }
  }

  applyInstructions(instruction) {
    switch (instruction) {
      case 'R':
        this.turnRight();
        break;
      case 'L':
        this.turnLeft();
        break;
      case 'F':
        return this.moveForward();
    }

    return true;
  }

  processInstructions(instructions) {
    for (let i = 0; i < instructions.length; i++) {
      //Robot is lost
      if (!this.applyInstructions(instructions.charAt(i))) return false;
    }
    return true;
  }

  toString() {
    const orientations = ['N', 'E', 'S', 'W'];
    return `${this.x} ${this.y} ${orientations[this.orientation]}`;
  }
}

// Use both classes to build UI for the robot simulation

