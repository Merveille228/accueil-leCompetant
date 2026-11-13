import{n as e,r as t,t as n}from"./index-CShWehsS.js";var r=t(e(),1),i=n(),a=2,o=48,s=.012,c=`
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`,l=`
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform vec2  uRes;
uniform float uTime;
uniform vec2  uMouse;
uniform float uHover;
uniform vec3  uBg;
uniform vec3  uBase;
uniform vec3  uAccent;
uniform vec3  uHigh;
uniform float uCount;
uniform float uBend;
uniform float uSpread;
uniform float uWStart;
uniform float uWEnd;
uniform float uAxis;
uniform float uDir;
uniform float uPosX;
uniform float uPosY;
uniform float uThick;
uniform float uFlow;
uniform float uPulses;
uniform float uGrab;
uniform float uGrain;

float sat(float x) { return clamp(x, 0.0, 1.0); }

float h21(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 34.56);
    return fract(p.x * p.y);
}

float vnoise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = h21(i), b = h21(i + vec2(1.0, 0.0));
    float c = h21(i + vec2(0.0, 1.0)), d = h21(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm5(vec2 p) {
    float s = 0.0, a = 0.5;
    for (int i = 0; i < 5; i++) { s += a * vnoise(p); p = p * 2.03 + vec2(1.7, 9.2); a *= 0.5; }
    return s;
}

float fbm3(vec2 p) {
    float s = 0.0, a = 0.5;
    for (int i = 0; i < 3; i++) { s += a * vnoise(p); p = p * 2.07 + vec2(4.1, 2.3); a *= 0.5; }
    return s;
}

void main() {
    float ar = uRes.x / max(uRes.y, 1.0);
    vec2 uv = gl_FragCoord.xy / uRes;
    vec2 p = (uv - 0.5) * vec2(ar, 1.0);
    float t = uTime;

    vec2 pAdj = p - vec2(uPosX * ar, uPosY) * 0.5;

    vec3 col = uBg;
    vec2 sm = p - vec2(-0.05, -0.28);
    col += uBase * exp(-pow(length(sm * vec2(0.75, 1.9)) / 0.42, 1.7)) * 0.50
         * (0.6 + 0.6 * fbm3(p * 2.4 + vec2(t * 0.05, 0.0)));

    float extent = mix(ar, 1.0, uAxis);
    float along = mix(pAdj.x, pAdj.y, uAxis) * uDir;
    float across = mix(pAdj.y, pAdj.x, uAxis);

    // Travel coordinate: 0 at the entry edge, 1 at the far edge.
    float s01 = sat((along + extent * 0.5) / max(extent, 0.001));
    vec2 ptrRaw = (uMouse - 0.5) * vec2(ar, 1.0);
    float ptrAlong = mix(ptrRaw.x, ptrRaw.y, uAxis) * uDir;
    float ptrAcross = mix(ptrRaw.y, ptrRaw.x, uAxis);

    float kAlong = -0.18;
    float kAcross = 0.10;
    vec3 acc = vec3(0.0);
    float surge = 0.0;

    for (int i = 0; i < 48; i++) {
        if (float(i) >= uCount) break;
        float fi = float(i) / max(uCount - 1.0, 1.0);
        float o = fi - 0.5;
        float rnd = h21(vec2(fi * 7.31, 2.0));

        float kAlongi = kAlong + o * 0.10 + (rnd - 0.5) * 0.03;
        float bi = uBend * (0.88 + 0.24 * rnd);
        float spread = uSpread * mix(uWStart, uWEnd, s01) * (0.090 + 0.34 * sat((along - kAlong) * 0.85 + 0.25));
        float bendAlong = sqrt((along - kAlongi) * (along - kAlongi) + 0.0035);
        float yy = kAcross + o * spread - bi * bendAlong + 0.008 * sin(along * 3.0 + fi * 19.0);

        float gx = exp(-pow((along - ptrAlong) / max(uGrab * 0.30, 0.02), 2.0));
        yy = mix(yy, ptrAcross + o * spread * 0.55, gx * 0.60 * uHover);

        float dd = (across - yy) / (uThick * 0.0038);
        float core = 1.0 / (1.0 + dd * dd * 9.0);
        float sheath = 1.0 / (1.0 + dd * dd * 0.6);

        float ph = s01 * uPulses - t * uFlow * 0.55 - rnd * 0.22;
        float f = fract(ph);
        float pulse = exp(-pow((f - 0.55) / 0.15, 2.0));
        float w = (0.22 + 1.60 * pulse) * (0.55 + 0.45 * rnd);

        acc += (uHigh * core * 1.45 + uAccent * sheath * 0.20) * w;
        surge += core * gx;
    }

    float feed = smoothstep(0.0, 0.09, s01) * smoothstep(1.02, 0.30, s01);
    col += acc * feed * 0.20;
    col += uHigh * surge * 0.05 * uHover;
    col += (h21(gl_FragCoord.xy + fract(uTime) * 71.0) - 0.5) * uGrain;

    gl_FragColor = vec4(max(col, 0.0), 1.0);
}
`;function u(e,t){if(!e)return t;let n=String(e).trim();if(n.charAt(0)===`#`){let e=n.slice(1);if((e.length===3||e.length===4)&&(e=e[0]+e[0]+e[1]+e[1]+e[2]+e[2]),e.length>=6){let t=parseInt(e.slice(0,2),16),n=parseInt(e.slice(2,4),16),r=parseInt(e.slice(4,6),16);if(!isNaN(t)&&!isNaN(n)&&!isNaN(r))return[t/255,n/255,r/255]}return t}let r=n.match(/[\d.]+/g);return r&&r.length>=3?[Math.min(255,parseFloat(r[0]))/255,Math.min(255,parseFloat(r[1]))/255,Math.min(255,parseFloat(r[2]))/255]:t}function d(e,t){return typeof e==`number`&&isFinite(e)?e:t}function f(e,t,n){return e<t?t:e>n?n:e}function p(e,t,n){let r=e.createShader(t);return r?(e.shaderSource(r,n),e.compileShader(r),e.getShaderParameter(r,e.COMPILE_STATUS)?r:(console.error(`LightCables shader:`,e.getShaderInfoLog(r)),e.deleteShader(r),null)):null}var m={count:34,bend:46,spread:100,thickness:100,widthStart:100,widthEnd:100},h={flow:100,pulses:3};function g(e){let{style:t,background:n=`#000000`,baseColor:g=`#000000`,accentColor:_=`#FF7500`,highlight:v=`#FFD900`,speed:y=34,hover:b=114,grab:x=100,direction:S=`ttb`,positionX:C=-13,positionY:w=-21,bundle:T,flow:E,width:D,height:O}=e,k={...m,...T||{}},A={...h,...E||{}},j=(0,r.useRef)(null),M=(0,r.useRef)({w:0,h:0});M.current={w:d(D,0),h:d(O,0)};let N=(0,r.useRef)({});N.current={bg:n,base:g,accent:_,high:v,speed:f(d(y,50),0,100)/50,hover:f(d(b,100),0,200)/100,count:Math.round(f(d(k.count,34),4,o)),bend:f(d(k.bend,46),0,150)/100,spread:f(d(k.spread,100),10,300)/100,thickness:f(d(k.thickness,100),20,400)/100,wStart:f(d(k.widthStart,100),0,300)/100,wEnd:f(d(k.widthEnd,100),0,300)/100,flow:f(d(A.flow,100),0,300)/100,pulses:f(d(A.pulses,3),1,12),grab:f(d(x,100),10,300)/100,axis:+(S===`ttb`||S===`btt`),dir:S===`rtl`||S===`ttb`?-1:1,posX:f(d(C,0),-100,100)/100,posY:f(d(w,0),-100,100)/100};let P=(0,r.useRef)({x:.5,y:.5,tx:.5,ty:.5,on:0,onTarget:0});return(0,r.useEffect)(()=>{let e=j.current;if(!e)return;let t=e.getContext(`webgl`,{antialias:!1,alpha:!1,depth:!1});if(!t){console.error(`LightCables: WebGL unavailable`);return}let n=p(t,t.VERTEX_SHADER,c),r=p(t,t.FRAGMENT_SHADER,l);if(!n||!r)return;let i=t.createProgram();if(!i)return;if(t.attachShader(i,n),t.attachShader(i,r),t.linkProgram(i),!t.getProgramParameter(i,t.LINK_STATUS)){console.error(`LightCables link:`,t.getProgramInfoLog(i));return}t.useProgram(i);let o=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,o),t.bufferData(t.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),t.STATIC_DRAW);let d=t.getAttribLocation(i,`a_pos`);t.enableVertexAttribArray(d),t.vertexAttribPointer(d,2,t.FLOAT,!1,0,0);let m={},h=e=>(e in m||(m[e]=t.getUniformLocation(i,e)),m[e]),g=0,_=performance.now(),v=0,y=n=>{let r=Math.min(.05,(n-_)/1e3);_=n;let i=N.current;v=(v+r*i.speed)%3600;let o=P.current,c=1-Math.exp(-6*r);o.on+=(o.onTarget-o.on)*c,o.x+=((o.onTarget>0?o.tx:.5)-o.x)*c,o.y+=((o.onTarget>0?o.ty:.5)-o.y)*c;let l=Math.min(window.devicePixelRatio||1,a),d=M.current.w||e.clientWidth||1200,f=M.current.h||e.clientHeight||800,p=Math.max(1,Math.round(d*l)),m=Math.max(1,Math.round(f*l));(e.width!==p||e.height!==m)&&(e.width=p,e.height=m),t.viewport(0,0,p,m),t.uniform2f(h(`uRes`),p,m),t.uniform1f(h(`uTime`),v),t.uniform2f(h(`uMouse`),o.x,1-o.y),t.uniform1f(h(`uHover`),Math.min(1,o.on)*i.hover);let b=u(i.bg,[.008,.024,.039]),x=u(i.base,[.184,.659,.549]),S=u(i.accent,[.373,.784,.863]),C=u(i.high,[.918,.984,1]);t.uniform3f(h(`uBg`),b[0],b[1],b[2]),t.uniform3f(h(`uBase`),x[0],x[1],x[2]),t.uniform3f(h(`uAccent`),S[0],S[1],S[2]),t.uniform3f(h(`uHigh`),C[0],C[1],C[2]),t.uniform1f(h(`uCount`),i.count),t.uniform1f(h(`uBend`),i.bend),t.uniform1f(h(`uSpread`),i.spread),t.uniform1f(h(`uWStart`),i.wStart),t.uniform1f(h(`uWEnd`),i.wEnd),t.uniform1f(h(`uAxis`),i.axis),t.uniform1f(h(`uDir`),i.dir),t.uniform1f(h(`uPosX`),i.posX),t.uniform1f(h(`uPosY`),i.posY),t.uniform1f(h(`uThick`),i.thickness),t.uniform1f(h(`uFlow`),i.flow),t.uniform1f(h(`uPulses`),i.pulses),t.uniform1f(h(`uGrab`),i.grab),t.uniform1f(h(`uGrain`),s),t.drawArrays(t.TRIANGLES,0,3),g=requestAnimationFrame(y)},b=t=>{let n=e.getBoundingClientRect();n.width<=0||n.height<=0||(P.current.tx=f((t.clientX-n.left)/n.width,0,1),P.current.ty=f((t.clientY-n.top)/n.height,0,1),P.current.onTarget=1)},x=()=>{P.current.onTarget=0};return e.addEventListener(`pointermove`,b),e.addEventListener(`pointerenter`,b),e.addEventListener(`pointerleave`,x),g=requestAnimationFrame(y),()=>{cancelAnimationFrame(g),e.removeEventListener(`pointermove`,b),e.removeEventListener(`pointerenter`,b),e.removeEventListener(`pointerleave`,x)}},[]),(0,i.jsx)(`div`,{style:{position:`relative`,overflow:`hidden`,background:n,minWidth:1200,minHeight:800,width:typeof D==`number`&&D>0?D:`100%`,height:typeof O==`number`&&O>0?O:`100%`,...t},children:(0,i.jsx)(`canvas`,{ref:j,style:{position:`absolute`,inset:0,width:`100%`,height:`100%`,display:`block`}})})}var _={bundle:{bend:0,count:48,spread:89,widthEnd:300,thickness:220,widthStart:0},flow:{flow:300,pulses:1}};function v(e){return(0,i.jsx)(g,{..._,...e})}export{v as default};