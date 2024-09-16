let max_iter = 1000

function setup() {
  createCanvas(600, 600);
  background(255);
  mandelbrot();
}

function draw() {

}

function colorize(iters) {
  loadPixels();
  console.log("here");
  let x = 0;
  for (const arr of iters) {
    let y = 0;
    for (const n of arr) {
      if (n == max_iter) {
        pixels[(x + y * width) * 4] = 0;
        pixels[(x + y * width) * 4 + 1] = 0;
        pixels[(x + y * width) * 4 + 2] = 0;
        pixels[(x + y * width) * 4 + 3] = 255;
      } else {
        pixels[(x + y * width) * 4] = 0;
        pixels[(x + y * width) * 4 + 1] = 0;
        pixels[(x + y * width) * 4 + 2] = 255 * sqrt(n / max_iter);
        pixels[(x + y * width) * 4 + 3] = 255;
      }
      y++;
    }
    x++;
  }
  updatePixels();
}

function mandelbrot() {
  let iterations = [];
  for (let x = 0; x < width; x++) {
    iterations[x] = [];
    for (let y = 0; y < height; y++) {
      let a0 = map(x, 0, width, -2, 2);
      let b0 = map(y, 0, height, -2, 2);
      let a2 = 0
      let b2 = 0
      let a = 0
      let b = 0
      let n = 0

      while (n < max_iter && a2 + b2 <= 4) {
        b = (a + a) * b + b0;
        a = a2 - b2 + a0;
        a2 = pow(a, 2);
        b2 = pow(b, 2);
        n++;
      }

      iterations[x][y] = n;
    }
  }
  colorize(iterations);
}