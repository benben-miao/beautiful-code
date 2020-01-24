let gl = c.getContext("webgl"), 
    pid = gl.createProgram(),
    draw = t => {
        uniforms.time([t]);
        uniforms.center([0.4, 0.5]);
        uniforms.zoom([0.1]);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
        requestAnimationFrame(draw);
    },
    resize = (w, h) => {
        if (c.width === w && c.height===h)
            return
        let wh = [c.width=w,c.height=h];
        uniforms.resolution(wh)
        gl.viewport(0, 0, ...wh)
    },
    uniforms = {center: '2f', resolution: '2f', time: '1f', zoom: '1f'};

gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,3,-1,-1,3,-1]), gl.STATIC_DRAW);

[`  
attribute vec2 vertices;
void main(void) {
  gl_Position = vec4(vertices, 0., 1.);
}
 `,`precision highp float;
uniform vec2 resolution;
uniform vec2 center;
uniform float time; 
uniform float zoom;

vec2 mul(vec2 A, vec2 B) {
  return vec2(A.x * B.x - A.y * B.y, 2.0 * A.x * B.y);
}

  vec3 fractal(vec2 c) {
      vec2 z = c;

      vec3 t1 = vec3(center-0.1, 1e9);
      vec3 t2 = vec3(center+0.1, 1e9);
      vec3 t3 = vec3(center + 0.1*vec2(sin(time/1111.),cos(time/1367.)), 1e9);

      for (int i = 0; i < 256; i++) {

        if (dot(z, z) > 4.)
            break;

        z = mul(mul(abs(z), abs(z)), mul(abs(z), abs(z))) 
                + vec2(0.56) 
                + vec2(sin(time/4000.),cos(time/5000.))*0.015;

        t1.z = min(t1.z, abs(t1.xy-z).x + abs(t1.xy-z).y);
        t2.z = min(t2.z, length(t2.xy-z));
        t3.z = min(t3.z, abs(t3.xy-z).x + abs(t3.xy-z).y);
      }

      return clamp(vec3(t1.z,t2.z,t3.z)*15., .0, 1.);
  }

  void main(void) {
      vec2 c = gl_FragCoord.xy;
      c = -resolution + 2.0 * c;
      c *= zoom/resolution.y;
      c += center;
      gl_FragColor = vec4(fractal(c), 1.0);
  }`
].forEach((src, i) => {
    let id = gl.createShader(i?gl.FRAGMENT_SHADER:gl.VERTEX_SHADER);
    gl.shaderSource(id, src);
    gl.compileShader(id);
    var message = gl.getShaderInfoLog(id);
    gl.attachShader(pid, id);
    if (message.length > 0) {
      console.log(src.split("\n").map((str, i) => 
            (""+(1+i)).padStart(4, "0")+": "+str).join("\n"));
      throw message;
    }
});
gl.linkProgram(pid);
gl.useProgram(pid);

Object.keys(uniforms).forEach(uf => {
     let loc = gl.getUniformLocation(pid, uf), f = gl[`uniform${uniforms[uf]}`]
     uniforms[uf] = v => f.call(gl, loc, ...v) || v
});

let vertices = gl.getAttribLocation(pid, "vertices")
gl.vertexAttribPointer(vertices, 2, gl.FLOAT, 0, 0, 0);
gl.enableVertexAttribArray(vertices);

addEventListener("mousemove", e => {x=e.pageX; y=e.pageY});
addEventListener("resize", () => resize(innerWidth, innerHeight));

resize(innerWidth, innerHeight);
requestAnimationFrame(draw);