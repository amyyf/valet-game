const drawLot = () => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = 'gray';
  ctx.fillRect(0, 0, 300, 500);
  canvas.style.height = '300px';
  canvas.style.width = '500px';
  document.body.append(canvas);
  return ctx;
};

const getRotation = () => {
  console.log(carDirection);
  if (carDirection.up) {
    if (carDirection.left) {
      return (-45 * Math.PI) / 180;
    } else if (carDirection.right) {
      return (45 * Math.PI) / 180;
    } else {
      return 0;
    }
  }
  if (carDirection.down) {
    if (carDirection.left) {
      return (225 * Math.PI) / 180;
    } else if (carDirection.right) {
      return (135 * Math.PI) / 180;
    } else {
      return 180;
    }
  }
  if (carDirection.right) {
    return 180;
  }
  if (carDirection.left) {
    return 270;
  }
};

const drawCar = () => {
  const car = document.createElement('canvas');
  const ctx = car.getContext('2d');
  const rotationAngle = getRotation();
  ctx.rotate(rotationAngle);
  ctx.fillStyle = 'red';
  ctx.fillRect(0, 0, 30, 75);
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  return ctx.getImageData(0, 0, 30, 75);
};

const renderCar = (lot, car) => {
  lot.fillRect(0, 0, 300, 500);
  lot.putImageData(car, carPosition.x, carPosition.y);
};

const carPosition = {
  x: 10,
  y: 20,
};

const carState = {
  movingUp: false,
  movingDown: false,
  movingLeft: false,
  movingRight: false,
};

const carDirection = {
  up: true,
  down: false,
  left: false,
  right: false,
};

const setCarState = (key) => {
  switch (key) {
    case 37: // left
      carState.movingLeft = true;
      carDirection.left = true;
      break;
    case 38: // up
      carState.movingUp = true;
      carDirection.up = true;
      break;
    case 39: // right
      carState.movingRight = true;
      carDirection.right = true;
      break;
    case 40: // down
      carState.movingDown = true;
      carDirection.down = true;
      break;
  }
};

const clearCarState = (key) => {
  switch (key) {
    case 37:
      carState.movingLeft = false;
      carDirection.left = false;
      break;
    case 38:
      carState.movingUp = false;
      carDirection.up = false;
      break;
    case 39:
      carState.movingRight = false;
      carDirection.right = false;
      break;
    case 40:
      carState.movingDown = false;
      carDirection.down = false;
      break;
  }
};

const moveCar = (key, lot, car) => {
  setCarState(key);
  if (carState.movingUp) {
    if (carState.movingLeft) {
      carPosition.x--;
      carPosition.y--;
    } else if (carState.movingRight) {
      carPosition.x++;
      carPosition.y--;
    } else {
      carPosition.y--;
    }
  }
  if (carState.movingDown) {
    if (carState.movingLeft) {
      carPosition.x--;
      carPosition.y++;
    } else if (carState.movingRight) {
      carPosition.x++;
      carPosition.y++;
    } else {
      carPosition.y++;
    }
  }
  renderCar(lot, car);
};

window.addEventListener('load', () => {
  const lotCtx = drawLot();
  const carImage = drawCar();
  renderCar(lotCtx, carImage);
  window.addEventListener('keydown', (e) => {
    moveCar(e.which, lotCtx, carImage);
  });
  window.addEventListener('keyup', (e) => {
    clearCarState(e.which);
  });
});
