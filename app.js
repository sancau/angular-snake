
// main controller function
var rootCtrl = function($scope, $interval, $timeout) {

  // defining field array to render
  FIELD_DIMENSION = 30;
  $scope.field = [];
  for (var i = 0; i < FIELD_DIMENSION; i++) {
    $scope.field.push([]);
    for (var k = 0; k < FIELD_DIMENSION; k++) {
      $scope.field[i].push({
        occupied: false,
        x: k,
        y: i
      });
    }
  }

  // initial position
  var x = 0;
  var y = 0;

  // setup
  CURRENT_DIRECTION = 'right'  // initial direction
  LAST_CLICK = null;  // store last click coords here
  VELOCITY = 100;  // velocity of the snake
  LENGTH = 25;  // lenght of the snake

  // init snake
  PLAYER = [];
  for (var i = 0; i < LENGTH; i++) {
    $scope.field[0][i].occupied = true;
    PLAYER.push([0, i]);
  }

  function move(direction) {

    tail_x = PLAYER[0][0];
    tail_y = PLAYER[0][1];

    head_y = PLAYER[PLAYER.length - 1][0];
    head_x = PLAYER[PLAYER.length - 1][1];

    function remove_tail() {
      $scope.field[tail_x][tail_y].occupied = false; // update field
      PLAYER.shift(); // update snake
    }

    switch (direction) {
      case 'right': {
        try {
          $scope.field[head_y][head_x + 1].occupied = true;
          PLAYER.push([head_y, head_x + 1]);
          remove_tail();
        } catch(e) {
          return;
        }
        break;
      }
      case 'left': {
        try {
          $scope.field[head_y][head_x - 1].occupied = true;
          PLAYER.push([head_y, head_x - 1]);
          remove_tail();
        } catch(e) {
          return;
        }
        break;
      }
      case 'down': {
        try {
          $scope.field[head_y + 1][head_x].occupied = true;
          PLAYER.push([head_y + 1, head_x]);
          remove_tail();
        } catch(e) {
          return;
        }
        break;
      }
      case 'up': {
        try {
          $scope.field[head_y - 1][head_x].occupied = true;
          PLAYER.push([head_y - 1, head_x]);
          remove_tail();
        } catch(e) {
          return;
        }
        break;
      }
      default: return;
    }
  }

  /////////////////////////////////////////////////////////////////////////////
  // UI commands
  $scope.stop = function() {
    $interval.cancel(render);
    render = null;
  }

  var render = null;
  $scope.go = function() {
    console.log('go')
    if (render === null) {
      render = $interval(function() {
        move(CURRENT_DIRECTION);
      }, VELOCITY);
    }
  }

  $scope.cellClicked = function(cell) {
    console.log(cell);
  }

  /////////////////////////////////////////////////////////////////////////////
  // Keyboard controls
  upCode = 38
  leftCode = 37
  rightCode = 39
  downCode = 40
  pauseCode = 80  // P
  startCode = 8  // Space
  $scope.keyPressed = function(event) {
    switch (event.keyCode) {
      case upCode: {
        CURRENT_DIRECTION = 'up'
        break;
      }
      case leftCode: {
        CURRENT_DIRECTION = 'left'
        break;
      }
      case rightCode: {
        CURRENT_DIRECTION = 'right'
        break;
      }
      case downCode: {
        CURRENT_DIRECTION = 'down'
        break;
      }
      case pauseCode: {
        $scope.stop();
        break;
      }
      case startCode: {
        $scope.go();
        break;
      }
      default: return;
    }
  }
}

/////////////////////////////////////////////////////////////////////////////
// registring angular stuff
angular.module('app', []);
angular.module('app').controller('rootCtrl', [
  '$scope', '$interval', '$timeout', rootCtrl
]);
