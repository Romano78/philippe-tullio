'use client';

import { useEffect, useRef } from 'react';

const VERT = `
  attribute vec2 a_position;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const FRAG = `
  precision mediump float;

  uniform vec2  u_resolution;
  uniform float u_time;
  uniform vec2  u_mouse;

  // Hash
  float hash(vec2 p) {
    p = fract(p * vec2(127.1, 311.7));
    p += dot(p, p + 17.5);
    return fract(p.x * p.y);
  }

  // Smooth noise
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i + vec2(0,0)), hash(i + vec2(1,0)), u.x),
      mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), u.x),
      u.y
    );
  }

  // FBM — 6 octaves
  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    vec2  s = vec2(1.0);
    for (int i = 0; i < 6; i++) {
      v += a * noise(p);
      p  = p * 2.1 + vec2(1.7, 9.2);
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;
    uv.y = 1.0 - uv.y;

    // Mouse — shift noise domain toward cursor position
    vec2 mouse = u_mouse / u_resolution;
    mouse.y = 1.0 - mouse.y;
    uv += (mouse - 0.5) * 0.25;

    // Domain warp — slow drift
    float t = u_time * 0.018;
    vec2 q = vec2(fbm(uv + t), fbm(uv + vec2(1.3, 5.7) + t));
    vec2 r = vec2(fbm(uv + 1.4 * q + vec2(1.7, 9.2) + t * 0.7),
                  fbm(uv + 1.4 * q + vec2(8.3, 2.8) + t * 0.5));
    float f = fbm(uv + 1.6 * r);

    // Dark palette — visible but not competing
    vec3 dark   = vec3(0.030, 0.030, 0.042);
    vec3 mid    = vec3(0.072, 0.072, 0.100);
    vec3 bright = vec3(0.120, 0.120, 0.160);

    vec3 col = mix(dark, mid,    smoothstep(0.35, 0.62, f));
    col      = mix(col,  bright, smoothstep(0.62, 0.78, f));

    // Vignette
    float vig = 1.0 - smoothstep(0.3, 1.1, length(uv - 0.5) * 1.5);
    col *= vig;

    gl_FragColor = vec4(col, 1.0);
  }
`;

export default function StormBackground() {
  const canvasRef = useRef(null);
  const mouseRef  = useRef({ x: 0, y: 0 });
  const rafRef    = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas.getContext('webgl');
    if (!gl) return;

    // Compile shaders
    const compile = (type, src) => {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };

    const prog = gl.createProgram();
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    // Full-screen quad
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'a_position');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    // Uniforms
    const uRes   = gl.getUniformLocation(prog, 'u_resolution');
    const uTime  = gl.getUniformLocation(prog, 'u_time');
    const uMouse = gl.getUniformLocation(prog, 'u_mouse');

    const resize = () => {
      // Half resolution for performance
      canvas.width  = Math.floor(window.innerWidth  / 2);
      canvas.height = Math.floor(window.innerHeight / 2);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener('resize', resize);

    const onMouse = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMouse);

    // Lerped mouse for smooth follow
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    const start = performance.now();

    const render = () => {
      const t = (performance.now() - start) / 1000;

      // Lerp mouse
      mx += (mouseRef.current.x - mx) * 0.04;
      my += (mouseRef.current.y - my) * 0.04;

      gl.uniform2f(uRes,   canvas.width, canvas.height);
      gl.uniform1f(uTime,  t);
      gl.uniform2f(uMouse, mx / 2, my / 2); // halved to match canvas resolution

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      rafRef.current = requestAnimationFrame(render);
    };
    rafRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className='fixed inset-0 w-full h-full'
      style={{ zIndex: 0, pointerEvents: 'none' }}
    />
  );
}
