export default function sketch(p) { 
  let max_iter = 1000;

  p.setup = () => {
    p.createCanvas(600, 600);
    p.background(255);
    mandelbrot();
  }

  p.draw = () => {

  }

  function colorize(iters) {
    p.loadPixels();
    console.log("here");
    let x = 0;
    for (const arr of iters) {
      let y = 0;
      for (const n of arr) {
        if (n === max_iter - 1) {
          p.pixels[(x + y * p.width) * 4] = 0;
          p.pixels[(x + y * p.width) * 4 + 1] = 0;
          p.pixels[(x + y * p.width) * 4 + 2] = 0;
          p.pixels[(x + y * p.width) * 4 + 3] = 255;
        } else {
          p.pixels[(x + y * p.width) * 4] = 255 * p.sqrt(n / max_iter);
          p.pixels[(x + y * p.width) * 4 + 1] = 255 * p.sqrt(n / max_iter);
          p.pixels[(x + y * p.width) * 4 + 2] = 255 * p.sqrt(n / max_iter);
          p.pixels[(x + y * p.width) * 4 + 3] = 255;
        }
        y++;
      }
      x++;
    }
    p.updatePixels();
  }

  function mandelbrot() {
    let iterations = [];
    for (let x = 0; x < p.width; x++) {
      iterations[x] = [];
      for (let y = 0; y < p.height; y++) {
        let a0 = p.map(x, 0, p.width, -2, 2);
        let b0 = p.map(y, 0, p.height, -2, 2);
        let a2 = 0
        let b2 = 0
        let a = 0
        let b = 0
        let n = 0

        while (n < max_iter && a2 + b2 <= 4) {
          b = (a + a) * b + b0;
          a = a2 - b2 + a0;
          a2 = p.pow(a, 2);
          b2 = p.pow(b, 2);
          n++;
        }

        iterations[x][y] = n - 1;
      }
    }
    colorize(iterations);
  }
}