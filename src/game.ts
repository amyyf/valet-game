import { logger } from './logger.js';
import { createCanvas } from './utils.js';

logger('we are scripting', 'in style');

const drawLot = () => {
  const [canvas, ctx] = createCanvas();
  ctx.fillStyle = 'gray';
  ctx.fillRect(0, 0, 300, 500);
  canvas.style.height = '300px';
  canvas.style.width = '500px';
  document.body.append(canvas);
  return ctx;
};

// TODO: this isn't working
const getRotation = () => {
  if (carDirection.up) {
    if (carDirection.left) {
      return (-45 * Math.PI) / 180;
    } else if (carDirection.right) {
      return (45 * Math.PI) / 180;
    } else {
      return 0;
    }
  } else if (carDirection.down) {
    if (carDirection.left) {
      return (225 * Math.PI) / 180;
    } else if (carDirection.right) {
      return (135 * Math.PI) / 180;
    } else {
      return 180;
    }
  } else if (carDirection.right) {
    return 180;
  } else {
    return 270;
  }
};

const drawCar = () => {
  const [, ctx] = createCanvas();
  const rotationAngle = getRotation();
  ctx.rotate(rotationAngle);
  ctx.fillStyle = 'red';
  ctx.fillRect(0, 0, 30, 75);
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  return ctx.getImageData(0, 0, 30, 75);
};

const renderCar = (lot: CanvasRenderingContext2D, car: ImageData) => {
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

const setCarState = (key: KeyboardEvent['key']) => {
  switch (key) {
    case 'ArrowLeft': // left
      carState.movingLeft = true;
      carDirection.left = true;
      break;
    case 'ArrowUp': // up
      carState.movingUp = true;
      carDirection.up = true;
      break;
    case 'ArrowRight': // right
      carState.movingRight = true;
      carDirection.right = true;
      break;
    case 'ArrowDown': // down
      carState.movingDown = true;
      carDirection.down = true;
      break;
  }
};

const clearCarState = (key: KeyboardEvent['key']) => {
  switch (key) {
    case 'ArrowLeft':
      carState.movingLeft = false;
      carDirection.left = false;
      break;
    case 'ArrowUp':
      carState.movingUp = false;
      carDirection.up = false;
      break;
    case 'ArrowRight':
      carState.movingRight = false;
      carDirection.right = false;
      break;
    case 'ArrowDown':
      carState.movingDown = false;
      carDirection.down = false;
      break;
  }
};

// TODO: pure left and right aren't working
const moveCar = (
  key: KeyboardEvent['key'],
  lot: CanvasRenderingContext2D,
  car: ImageData
) => {
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
    moveCar(e.key, lotCtx, carImage);
  });
  window.addEventListener('keyup', (e) => {
    clearCarState(e.key);
  });
});
