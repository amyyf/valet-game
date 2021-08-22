import { logger } from './logger.js';
import { createCanvas } from './utils.js';

logger('we are scripting', 'in style');

const drawLot = (ctx: CanvasRenderingContext2D) => {
  ctx.fillStyle = 'gray';
  ctx.fillRect(0, 0, 300, 500);
};

const drawCar = (ctx: CanvasRenderingContext2D) => {
  ctx.fillStyle = 'red';
  ctx.rotate((carPosition.orientation * Math.PI) / 180);
  ctx.fillRect(carPosition.x, carPosition.y, 75, 30);
  ctx.setTransform(1, 0, 0, 1, 0, 0);
};

const render = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
  drawLot(ctx);
  drawCar(ctx);
  canvas.style.height = '300px';
  canvas.style.width = '500px';
  document.body.append(canvas);
};

const carPosition = {
  x: 10,
  y: 20,
  orientation: 0,
};

type CarPosition = typeof carPosition;

const carState = {
  movingForward: false,
  movingBackward: false,
  movingLeft: false,
  movingRight: false,
};

type CarState = typeof carState;

const carDirection = {
  up: true,
  down: false,
  left: false,
  right: false,
};

type DirectionKey = 'ArrowLeft' | 'ArrowUp' | 'ArrowRight' | 'ArrowDown';

const setCarState = (key: DirectionKey, pressed: boolean) => {
  switch (key) {
    case 'ArrowLeft':
      carState.movingLeft = pressed;
      carDirection.left = pressed;
      break;
    case 'ArrowUp':
      carState.movingForward = pressed;
      carDirection.up = pressed;
      break;
    case 'ArrowRight':
      carState.movingRight = pressed;
      carDirection.right = pressed;
      break;
    case 'ArrowDown':
      carState.movingBackward = pressed;
      carDirection.down = pressed;
      break;
  }
};

const moveCar = (
  key: DirectionKey,
  carPosition: CarPosition,
  carState: CarState
) => {
  setCarState(key, true);
  if (carState.movingForward) {
    carPosition.y--;
  }
  if (carState.movingBackward) {
    carPosition.y++;
  }
  if (carState.movingBackward || carState.movingForward) {
    if (carState.movingLeft) {
      carPosition.x--;
      carPosition.orientation -= 5;
    } else if (carState.movingRight) {
      carPosition.x++;
      carPosition.orientation += 5;
    }
  }
  console.log(carPosition);
};

const isDirectionKey = (key: string): key is DirectionKey => {
  switch (key) {
    case 'ArrowLeft':
    case 'ArrowUp':
    case 'ArrowRight':
    case 'ArrowDown':
      return true;
    default:
      return false;
  }
};

window.addEventListener('load', () => {
  const [canvas, ctx] = createCanvas();
  render(canvas, ctx);
  window.addEventListener('keydown', (e) => {
    if (isDirectionKey(e.key)) {
      moveCar(e.key, carPosition, carState);
      render(canvas, ctx);
    }
  });
  window.addEventListener('keyup', (e) => {
    if (isDirectionKey(e.key)) {
      setCarState(e.key, false);
    }
  });
});
