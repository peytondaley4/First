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