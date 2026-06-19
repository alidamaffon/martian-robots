## How to Run

### Prerequisites
- Node.js installed on your system

### Running the Program
```bash
node main.js < sample.txt
```

## The Solution

**1. Implement Grid class**
This class was implemented to define and manage the grid boundaries as well as tracking "scent" positions where robots are lost. It includes scent tracking (we convert and save the last position of the lost robot to an integer as a unique identifier) and boundary tracking (we check if a position is outside the grid bounds so that if a robot attempts to move off-grid from a non-scented position, it leaves a scent before it is lost).

**2. Implement Robot class**
This class represents individual robots with the position, the orientation and the instructions processing logic. Each robot can turn left (left 90 degrees), turn right (right 90 degrees) and move forward. The robots are processed one at a time, to allow later robots to benefit from scents left by earlier lost robots.
I mapped the orientation against numeric value based on NESW convention(N=0, E=1, S=2, W=3) and converted the orientation to direction vectors based on the assumption that the X axis represents East-West (with East being positive) and the y axis represents North-South (with North being positive) to easily track movement.
- North : [0, 1]
- East: [1, 0]
- South: [0, -1]
- West: [-1, 0]

Note: [This link](https://stackoverflow.com/questions/1437790/how-to-snap-a-directional-2d-vector-to-a-compass-n-ne-e-se-s-sw-w-nw) help me shape this solution.

**3. Process input to generate output**
Read input from stdin and generate output based on instructions. The output is renderd in the terminal.


## The Problem
The surface of Mars can be modelled by a rectangular grid around which robots are able to move according to instructions provided from Earth. You are to write a program that determines each sequence of robot positions and reports the final position of the robot.

A robot position consists of a grid coordinate (a pair of integers: x-coordinate followed by
y-coordinate) and an orientation (N, S, E, W for north, south, east, and west).
A robot instruction is a string of the letters “L”, “R”, and “F” which represent, respectively, the instructions:
- Left : the robot turns left 90 degrees and remains on the current grid point.
- Right : the robot turns right 90 degrees and remains on the current grid point.
- Forward : the robot moves forward one grid point in the direction of the current orientation and maintains the same orientation.
The direction North corresponds to the direction from grid point (x, y) to grid point (x, y+1).

There is also a possibility that additional command types may be required in the future and
provision should be made for this.

Since the grid is rectangular and bounded (…yes Mars is a strange planet), a robot that
moves “off” an edge of the grid is lost forever. However, lost robots leave a robot “scent” that
prohibits future robots from dropping off the world at the same grid point. The scent is left at
the last grid position the robot occupied before disappearing over the edge. An instruction to
move “off” the world from a grid point from which a robot has been previously lost is simply
ignored by the current robot.

### The  Input

The first line of input is the upper-right coordinates of the rectangular world, the lower-left
coordinates are assumed to be 0, 0.

The remaining input consists of a sequence of robot positions and instructions (two lines per
robot). A position consists of two integers specifying the initial coordinates of the robot and
an orientation (N, S, E, W), all separated by whitespace on one line. A robot instruction is a
string of the letters “L”, “R”, and “F” on one line.

Each robot is processed sequentially, i.e., finishes executing the robot instructions before the
next robot begins execution.

The maximum value for any coordinate is 50.

All instruction strings will be less than 100 characters in length.

### The  Output
For each robot position/instruction in the input, the output should indicate the final grid
position and orientation of the robot. If a robot falls off the edge of the grid the word “LOST should be printed after the position and orientation.