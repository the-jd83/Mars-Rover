var _a, _b, _c;
// Enum for Directions (North, East, South, West)
var Direction;
(function (Direction) {
    Direction["N"] = "N";
    Direction["E"] = "E";
    Direction["S"] = "S";
    Direction["W"] = "W";
})(Direction || (Direction = {}));
// Grid class to represent the grid and obstacles
var Grid = /** @class */ (function () {
    function Grid(width, height, obstacles) {
        this.width = width;
        this.height = height;
        this.obstacles = obstacles;
    }
    // Checks if the next position is inside the grid and not blocked by an obstacle
    Grid.prototype.isValidMove = function (position) {
        var isWithinBounds = position.x >= 0 && position.x < this.width && position.y >= 0 && position.y < this.height;
        var isObstacleFree = !this.obstacles.some(function (obstacle) { return obstacle.x === position.x && obstacle.y === position.y; });
        return isWithinBounds && isObstacleFree;
    };
    return Grid;
}());
// Rover class to represent the rover
var Rover = /** @class */ (function () {
    function Rover(position, direction, grid) {
        this.position = position;
        this.direction = direction;
        this.grid = grid;
    }
    // Method to move the rover forward
    Rover.prototype.move = function () {
        var nextPosition = this.calculateNextPosition();
        if (this.grid.isValidMove(nextPosition)) {
            this.position = nextPosition;
            this.updateStatus();
        }
        else {
            alert("Obstacle detected or out of bounds, can't move.");
        }
    };
    // Method to turn the rover left (anticlockwise)
    Rover.prototype.turnLeft = function () {
        var leftTurns = { N: Direction.W, W: Direction.S, S: Direction.E, E: Direction.N };
        this.direction = leftTurns[this.direction];
        this.updateStatus();
    };
    // Method to turn the rover right (clockwise)
    Rover.prototype.turnRight = function () {
        var rightTurns = { N: Direction.E, E: Direction.S, S: Direction.W, W: Direction.N };
        this.direction = rightTurns[this.direction];
        this.updateStatus();
    };
    // Helper method to calculate the next position based on the direction
    Rover.prototype.calculateNextPosition = function () {
        var moveMap = { N: { x: 0, y: 1 }, E: { x: 1, y: 0 }, S: { x: 0, y: -1 }, W: { x: -1, y: 0 } };
        var move = moveMap[this.direction];
        return { x: this.position.x + move.x, y: this.position.y + move.y };
    };
    // Method to update rover's status on the webpage
    Rover.prototype.updateStatus = function () {
        var statusElement = document.getElementById("roverStatus");
        if (statusElement) {
            statusElement.innerHTML = "Rover is at (".concat(this.position.x, ", ").concat(this.position.y, ") facing ").concat(this.direction, ".");
        }
    };
    return Rover;
}());
// Grid initialization (10x10) with obstacles at (2,2) and (3,5)
var grid = new Grid(10, 10, [{ x: 2, y: 2 }, { x: 3, y: 5 }]);
// Create the rover starting at (0, 0) facing North
var rover = new Rover({ x: 0, y: 0 }, Direction.N, grid);
// Connect the buttons to the rover's movement
(_a = document.getElementById("moveButton")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () { return rover.move(); });
(_b = document.getElementById("turnLeftButton")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", function () { return rover.turnLeft(); });
(_c = document.getElementById("turnRightButton")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", function () { return rover.turnRight(); });
// Initialize the status display
rover.updateStatus();
