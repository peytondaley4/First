export default function sketch(p) {
  let myShader;

  // Our vertex shader source as a string
  let vert = `
  precision highp float;

  attribute vec3 aPosition;

  // The transform of the object being drawn
  uniform mat4 uModelViewMatrix;

  // Transforms 3D coordinates to 2D screen coordinates
  uniform mat4 uProjectionMatrix;

  // A custom uniform with the time in milliseconds
  uniform float time;

  void main() {
    // Apply the camera transform
    vec4 viewModelPosition = uModelViewMatrix * vec4(aPosition, 1.0);

    // Tell WebGL where the vertex goes
    gl_Position = uProjectionMatrix * viewModelPosition;  
  }
  `;

  let frag = `
  #ifdef GL_ES
  precision highp float;
  #endif

  void main() {
    vec4 myColor = vec4(1.0, 0.0, 0.0, 1.0);
    gl_FragColor = myColor;
  }
  `;

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
    myShader = p.createShader(vert, frag);
  }

  p.draw = () => {
    p.background(255);
    p.noStroke();
    
    // Use our custom shader
    p.shader(myShader);

    // Draw a shape using the shader
    p.plane(p.windowWidth, p.windowHeight);
  }
}