export const createCanvas = (): [
  HTMLCanvasElement,
  CanvasRenderingContext2D
] => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Context not found');
  return [canvas, ctx];
};
