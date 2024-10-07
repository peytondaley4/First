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