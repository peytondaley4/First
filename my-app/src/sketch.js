export default function sketch(p) {
  let myShader;

  // Our vertex shader source as a string
  let vert = `
precision highp float;

attribute vec3 aPosition;

attribute vec2 aTexCoord;

attribute vec4 aVertexColor;

varying vec2 vTexCoord;

varying vec4 vVertexColor;

// The transform of the object being drawn
uniform mat4 uModelViewMatrix;

// Transforms 3D coordinates to 2D screen coordinates
uniform mat4 uProjectionMatrix;

void main() {
    // Apply the camera transform
    vec4 viewModelPosition = uModelViewMatrix * vec4(aPosition, 1.0);

    // Tell WebGL where the vertex goes
    gl_Position = uProjectionMatrix * viewModelPosition;  

    vTexCoord = aTexCoord;
    vVertexColor = aVertexColor;
}
  `;

  let frag = `
#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTexCoord;

uniform vec2 windowDim;

int get_iters() {
    float real = (vTexCoord.x / 700.0 - 0.5) * 4.0;
    float imag = (vTexCoord.y / 1271.0 - 0.7) * 4.0;

    int iters = -1;
    float const_real = real;
    float const_imag = imag;

    for (int i = 0; i < 1000; i++) {
        float tmp_real = real;
        real = (real * real - imag * imag) + const_real;
        imag = (2.0 * tmp_real * imag) + const_imag;

        float dist = real * real + imag * imag;

        if (dist > 4.0) { iters = i; break; }
    }

    if (iters == -1) { iters = 1000; }

    return iters;
}

vec4 return_color() {
    int iter = get_iters();
    if (iter == 1000) {
        return vec4(0.0, 0.0, 0.0, 1.0);
    }

    float iterations = float(iter) / 1000.0;
    return vec4(0.0, iterations, 0.0, 1.0);
}

void main() {
    gl_FragColor = return_color();
}
  `;

  p.setup = () => {
    console.log(p.windowWidth);
    p.createCanvas(p.windowWidth / 2, p.windowHeight, p.WEBGL);
    myShader = p.createShader(vert, frag);
    p.background(255);
    p.noStroke();
    p.shader(myShader);
    p.plane(p.width, p.height);
  }

  p.draw = () => {}
}