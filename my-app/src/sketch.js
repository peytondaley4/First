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

    // Use the time to adjust the position of the vertices
    viewModelPosition.x += 10.0 * sin(time * 0.01 + viewModelPosition.y * 0.1);

    // Tell WebGL where the vertex goes
    gl_Position = uProjectionMatrix * viewModelPosition;  
  }
  `;

  let frag = `
  precision highp float;

  void main() {
    vec4 myColor = vec4(1.0, 0.0, 0.0, 1.0);
    gl_FragColor = myColor;
  }
  `

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
    myShader = p.createShader(vert, frag);
  }

  p.draw = () => {
    p.background(255);
    p.noStroke();
    
    // Use our custom shader
    p.shader(myShader);
    
    // Create a color using the mouse's x position as red and
    // its y position as blue, and pass it into the shader
    myShader.setUniform('time', p.millis());
    
    // Draw a shape using the shader
    p.circle(0, 0, 100);
  }
}