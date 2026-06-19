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

    return true;
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
process.stdin.setEncoding('utf8');
process.stdin.on('data', (chunk) => {
  const lines = chunk.split('\n');
  let line = lines.shift();
  let params = line.split(' ');

  const grid = new Grid(parseInt(params[0]), parseInt(params[1]));
  let robot;

  while (lines.length > 0) {
    line = lines.shift();
    if (line.length > 1) {
      params = line.split(' ');

      robot = new Robot(
        grid,
        parseInt(params[0]),
        parseInt(params[1]),
        params[2].charAt(0),
      );

      line = lines.shift();

      // Validate command string length (per problem spec: max 100 characters)
      if (line && line.length > 100) {
        process.stderr.write(`Error: Command string exceeds 100 characters\n`);
        continue;
      }

      if (robot.processInstructions(line)) process.stdout.write(`${robot}\n`);
      else process.stdout.write(`${robot} LOST\n`);
    }
  }
});
