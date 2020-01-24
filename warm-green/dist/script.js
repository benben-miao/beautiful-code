THREE.OrbitControls = function (e, t) {function n() {return 2 * Math.PI / 60 / 60 * k.autoRotateSpeed;}function o() {return Math.pow(.95, k.zoomSpeed);}function a(e) {z.theta -= e;}function i(e) {z.phi -= e;}function r(e) {k.object instanceof THREE.PerspectiveCamera ? F /= e : k.object instanceof THREE.OrthographicCamera ? (k.object.zoom = Math.max(k.minZoom, Math.min(k.maxZoom, k.object.zoom * e)), k.object.updateProjectionMatrix(), X = !0) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), k.enableZoom = !1);}function s(e) {k.object instanceof THREE.PerspectiveCamera ? F *= e : k.object instanceof THREE.OrthographicCamera ? (k.object.zoom = Math.max(k.minZoom, Math.min(k.maxZoom, k.object.zoom / e)), k.object.updateProjectionMatrix(), X = !0) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), k.enableZoom = !1);}function c(e) {K.set(e.clientX, e.clientY);}function u(e) {Q.set(e.clientX, e.clientY);}function m(e) {G.set(e.clientX, e.clientY);}function d(e) {_.set(e.clientX, e.clientY), B.subVectors(_, K);var t = k.domElement === document ? k.domElement.body : k.domElement;a(2 * Math.PI * B.x / t.clientWidth * k.rotateSpeed), i(2 * Math.PI * B.y / t.clientHeight * k.rotateSpeed), K.copy(_), k.update();}function l(e) {J.set(e.clientX, e.clientY), $.subVectors(J, Q), $.y > 0 ? r(o()) : $.y < 0 && s(o()), Q.copy(J), k.update();}function E(e) {W.set(e.clientX, e.clientY), q.subVectors(W, G), ne(q.x, q.y), G.copy(W), k.update();}function h(e) {}function p(e) {e.deltaY < 0 ? s(o()) : e.deltaY > 0 && r(o()), k.update();}function b(e) {switch (e.keyCode) {case k.keys.UP:ne(0, k.keyPanSpeed), k.update();break;case k.keys.BOTTOM:ne(0, -k.keyPanSpeed), k.update();break;case k.keys.LEFT:ne(k.keyPanSpeed, 0), k.update();break;case k.keys.RIGHT:ne(-k.keyPanSpeed, 0), k.update();}}function f(e) {K.set(e.touches[0].pageX, e.touches[0].pageY);}function T(e) {var t = e.touches[0].pageX - e.touches[1].pageX,n = e.touches[0].pageY - e.touches[1].pageY,o = Math.sqrt(t * t + n * n);Q.set(0, o);}function g(e) {G.set(e.touches[0].pageX, e.touches[0].pageY);}function R(e) {_.set(e.touches[0].pageX, e.touches[0].pageY), B.subVectors(_, K);var t = k.domElement === document ? k.domElement.body : k.domElement;a(2 * Math.PI * B.x / t.clientWidth * k.rotateSpeed), i(2 * Math.PI * B.y / t.clientHeight * k.rotateSpeed), K.copy(_), k.update();}function v(e) {var t = e.touches[0].pageX - e.touches[1].pageX,n = e.touches[0].pageY - e.touches[1].pageY,a = Math.sqrt(t * t + n * n);J.set(0, a), $.subVectors(J, Q), $.y > 0 ? s(o()) : $.y < 0 && r(o()), Q.copy(J), k.update();}function O(e) {W.set(e.touches[0].pageX, e.touches[0].pageY), q.subVectors(W, G), ne(q.x, q.y), G.copy(W), k.update();}function y(e) {}function H(e) {if (!1 !== k.enabled) {switch (e.preventDefault(), e.button) {case k.mouseButtons.ORBIT:if (!1 === k.enableRotate) return;c(e), V = S.ROTATE;break;case k.mouseButtons.ZOOM:if (!1 === k.enableZoom) return;u(e), V = S.DOLLY;break;case k.mouseButtons.PAN:if (!1 === k.enablePan) return;m(e), V = S.PAN;}V !== S.NONE && (document.addEventListener("mousemove", w, !1), document.addEventListener("mouseup", P, !1), k.dispatchEvent(D));}}function w(e) {if (!1 !== k.enabled) switch (e.preventDefault(), V) {case S.ROTATE:if (!1 === k.enableRotate) return;d(e);break;case S.DOLLY:if (!1 === k.enableZoom) return;l(e);break;case S.PAN:if (!1 === k.enablePan) return;E(e);}}function P(e) {!1 !== k.enabled && (h(e), document.removeEventListener("mousemove", w, !1), document.removeEventListener("mouseup", P, !1), k.dispatchEvent(U), V = S.NONE);}function j(e) {!1 === k.enabled || !1 === k.enableZoom || V !== S.NONE && V !== S.ROTATE || (e.preventDefault(), e.stopPropagation(), p(e), k.dispatchEvent(D), k.dispatchEvent(U));}function C(e) {!1 !== k.enabled && !1 !== k.enableKeys && !1 !== k.enablePan && b(e);}function M(e) {if (!1 !== k.enabled) {switch (e.touches.length) {case 1:if (!1 === k.enableRotate) return;f(e), V = S.TOUCH_ROTATE;break;case 2:if (!1 === k.enableZoom) return;T(e), V = S.TOUCH_DOLLY;break;case 3:if (!1 === k.enablePan) return;g(e), V = S.TOUCH_PAN;break;default:V = S.NONE;}V !== S.NONE && k.dispatchEvent(D);}}function L(e) {if (!1 !== k.enabled) switch (e.preventDefault(), e.stopPropagation(), e.touches.length) {case 1:if (!1 === k.enableRotate) return;if (V !== S.TOUCH_ROTATE) return;R(e);break;case 2:if (!1 === k.enableZoom) return;if (V !== S.TOUCH_DOLLY) return;v(e);break;case 3:if (!1 === k.enablePan) return;if (V !== S.TOUCH_PAN) return;O(e);break;default:V = S.NONE;}}function N(e) {!1 !== k.enabled && (y(e), k.dispatchEvent(U), V = S.NONE);}function A(e) {!1 !== k.enabled && e.preventDefault();}this.object = e, this.domElement = void 0 !== t ? t : document, this.enabled = !0, this.target = new THREE.Vector3(), this.minDistance = 0, this.maxDistance = 1 / 0, this.minZoom = 0, this.maxZoom = 1 / 0, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -1 / 0, this.maxAzimuthAngle = 1 / 0, this.enableDamping = !1, this.dampingFactor = .25, this.enableZoom = !0, this.zoomSpeed = 1, this.enableRotate = !0, this.rotateSpeed = 1, this.enablePan = !0, this.keyPanSpeed = 7, this.autoRotate = !1, this.autoRotateSpeed = 2, this.enableKeys = !0, this.keys = { LEFT: 37, UP: 38, RIGHT: 39, BOTTOM: 40 }, this.mouseButtons = { ORBIT: THREE.MOUSE.LEFT, ZOOM: THREE.MOUSE.MIDDLE, PAN: THREE.MOUSE.RIGHT }, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this.getPolarAngle = function () {return Y.phi;}, this.getAzimuthalAngle = function () {return Y.theta;}, this.saveState = function () {k.target0.copy(k.target), k.position0.copy(k.object.position), k.zoom0 = k.object.zoom;}, this.reset = function () {k.target.copy(k.target0), k.object.position.copy(k.position0), k.object.zoom = k.zoom0, k.object.updateProjectionMatrix(), k.dispatchEvent(x), k.update(), V = S.NONE;}, this.update = function () {var t = new THREE.Vector3(),o = new THREE.Quaternion().setFromUnitVectors(e.up, new THREE.Vector3(0, 1, 0)),i = o.clone().inverse(),r = new THREE.Vector3(),s = new THREE.Quaternion();return function () {var e = k.object.position;return t.copy(e).sub(k.target), t.applyQuaternion(o), Y.setFromVector3(t), k.autoRotate && V === S.NONE && a(n()), Y.theta += z.theta, Y.phi += z.phi, Y.theta = Math.max(k.minAzimuthAngle, Math.min(k.maxAzimuthAngle, Y.theta)), Y.phi = Math.max(k.minPolarAngle, Math.min(k.maxPolarAngle, Y.phi)), Y.makeSafe(), Y.radius *= F, Y.radius = Math.max(k.minDistance, Math.min(k.maxDistance, Y.radius)), k.target.add(I), t.setFromSpherical(Y), t.applyQuaternion(i), e.copy(k.target).add(t), k.object.lookAt(k.target), !0 === k.enableDamping ? (z.theta *= 1 - k.dampingFactor, z.phi *= 1 - k.dampingFactor) : z.set(0, 0, 0), F = 1, I.set(0, 0, 0), !!(X || r.distanceToSquared(k.object.position) > Z || 8 * (1 - s.dot(k.object.quaternion)) > Z) && (k.dispatchEvent(x), r.copy(k.object.position), s.copy(k.object.quaternion), X = !1, !0);};}(), this.dispose = function () {k.domElement.removeEventListener("contextmenu", A, !1), k.domElement.removeEventListener("mousedown", H, !1), k.domElement.removeEventListener("wheel", j, !1), k.domElement.removeEventListener("touchstart", M, !1), k.domElement.removeEventListener("touchend", N, !1), k.domElement.removeEventListener("touchmove", L, !1), document.removeEventListener("mousemove", w, !1), document.removeEventListener("mouseup", P, !1), window.removeEventListener("keydown", C, !1);};var k = this,x = { type: "change" },D = { type: "start" },U = { type: "end" },S = { NONE: -1, ROTATE: 0, DOLLY: 1, PAN: 2, TOUCH_ROTATE: 3, TOUCH_DOLLY: 4, TOUCH_PAN: 5 },V = S.NONE,Z = 1e-6,Y = new THREE.Spherical(),z = new THREE.Spherical(),F = 1,I = new THREE.Vector3(),X = !1,K = new THREE.Vector2(),_ = new THREE.Vector2(),B = new THREE.Vector2(),G = new THREE.Vector2(),W = new THREE.Vector2(),q = new THREE.Vector2(),Q = new THREE.Vector2(),J = new THREE.Vector2(),$ = new THREE.Vector2(),ee = function () {var e = new THREE.Vector3();return function (t, n) {e.setFromMatrixColumn(n, 0), e.multiplyScalar(-t), I.add(e);};}(),te = function () {var e = new THREE.Vector3();return function (t, n) {e.setFromMatrixColumn(n, 1), e.multiplyScalar(t), I.add(e);};}(),ne = function () {var e = new THREE.Vector3();return function (t, n) {var o = k.domElement === document ? k.domElement.body : k.domElement;if (k.object instanceof THREE.PerspectiveCamera) {var a = k.object.position;e.copy(a).sub(k.target);var i = e.length();i *= Math.tan(k.object.fov / 2 * Math.PI / 180), ee(2 * t * i / o.clientHeight, k.object.matrix), te(2 * n * i / o.clientHeight, k.object.matrix);} else k.object instanceof THREE.OrthographicCamera ? (ee(t * (k.object.right - k.object.left) / k.object.zoom / o.clientWidth, k.object.matrix), te(n * (k.object.top - k.object.bottom) / k.object.zoom / o.clientHeight, k.object.matrix)) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."), k.enablePan = !1);};}();k.domElement.addEventListener("contextmenu", A, !1), k.domElement.addEventListener("mousedown", H, !1), k.domElement.addEventListener("wheel", j, !1), k.domElement.addEventListener("touchstart", M, !1), k.domElement.addEventListener("touchend", N, !1), k.domElement.addEventListener("touchmove", L, !1), window.addEventListener("keydown", C, !1), this.update();}, THREE.OrbitControls.prototype = Object.create(THREE.EventDispatcher.prototype), THREE.OrbitControls.prototype.constructor = THREE.OrbitControls, Object.defineProperties(THREE.OrbitControls.prototype, { center: { get: function () {return console.warn("THREE.OrbitControls: .center has been renamed to .target"), this.target;} }, noZoom: { get: function () {return console.warn("THREE.OrbitControls: .noZoom has been deprecated. Use .enableZoom instead."), !this.enableZoom;}, set: function (e) {console.warn("THREE.OrbitControls: .noZoom has been deprecated. Use .enableZoom instead."), this.enableZoom = !e;} }, noRotate: { get: function () {return console.warn("THREE.OrbitControls: .noRotate has been deprecated. Use .enableRotate instead."), !this.enableRotate;}, set: function (e) {console.warn("THREE.OrbitControls: .noRotate has been deprecated. Use .enableRotate instead."), this.enableRotate = !e;} }, noPan: { get: function () {return console.warn("THREE.OrbitControls: .noPan has been deprecated. Use .enablePan instead."), !this.enablePan;}, set: function (e) {console.warn("THREE.OrbitControls: .noPan has been deprecated. Use .enablePan instead."), this.enablePan = !e;} }, noKeys: { get: function () {return console.warn("THREE.OrbitControls: .noKeys has been deprecated. Use .enableKeys instead."), !this.enableKeys;}, set: function (e) {console.warn("THREE.OrbitControls: .noKeys has been deprecated. Use .enableKeys instead."), this.enableKeys = !e;} }, staticMoving: { get: function () {return console.warn("THREE.OrbitControls: .staticMoving has been deprecated. Use .enableDamping instead."), !this.enableDamping;}, set: function (e) {console.warn("THREE.OrbitControls: .staticMoving has been deprecated. Use .enableDamping instead."), this.enableDamping = !e;} }, dynamicDampingFactor: { get: function () {return console.warn("THREE.OrbitControls: .dynamicDampingFactor has been renamed. Use .dampingFactor instead."), this.dampingFactor;}, set: function (e) {console.warn("THREE.OrbitControls: .dynamicDampingFactor has been renamed. Use .dampingFactor instead."), this.dampingFactor = e;} } });

function calculateCentroid(vecticies = []) {
  const centroid = new THREE.Vector3(0, 0, 0);
  const numPoints = vecticies.length;

  for (const point of vecticies) {
    centroid.x += point.x;
    centroid.y += point.y;
    centroid.z += point.z;
  }

  centroid.x /= numPoints;
  centroid.y /= numPoints;
  centroid.z /= numPoints;

  return centroid;
}

function explodeModifier(geometry) {
  const vertices = [];
  const faces = [];
  const uv = [];
  const g = geometry;

  for (let i = 0, il = geometry.faces.length; i < il; i++) {
    const n = vertices.length;
    const face = g.faces[i];
    const { a, b, c } = face;

    const va = g.vertices[a];
    const vb = g.vertices[b];
    const vc = g.vertices[c];
    const vd = calculateCentroid([va, vb, vc]);

    vertices.push(va.clone(), vb.clone(), vc.clone(), vd);

    face.a = n;
    face.b = n + 1;
    face.c = n + 2;

    // add other faces connect them to our newly created vector
    const face1 = new THREE.Face3().copy(face);
    face1.a = n + 3;
    const face2 = new THREE.Face3().copy(face);
    face2.b = n + 3;
    const face3 = new THREE.Face3().copy(face);
    face3.c = n + 3;

    faces.push(face1, face2, face3);

    // adds uvs to avoid uv error
    const vuv = [];
    vuv.push(
    g.faceVertexUvs[0][i][0],
    g.faceVertexUvs[0][i][1],
    g.faceVertexUvs[0][i][2]);

    // extra uvs per extra face
    uv.push(vuv, vuv, vuv);
  }

  g.vertices = vertices;
  g.vertices[vertices.length - 1] = new THREE.Vector3(0, 0, 0);
  g.faces = faces;
  g.faceVertexUvs[0] = uv;
  return g;
}

class SpikeBall {
  constructor(gui) {
    this.config = {
      speed: 800,
      radius: 400,
      detail: 4,
      min: 350,
      max: 300 };


    const geometry = new THREE.IcosahedronGeometry(
    this.config.radius,
    this.config.detail);

    this.geometry = explodeModifier(geometry);

    const material = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      specular: 0xffffff,
      shininess: 1,
      shading: THREE.SmoothShading
      // shading: THREE.FlatShading,
      // side: THREE.DoubleSide,
      // wireframe: true,
    });

    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position.set(0, 0, 0);
    this.initGui(gui);
  }

  initGui(gui) {
    const folder = gui.addFolder('Sphere');
    folder.add(this.config, 'min', 0, 400);
    folder.add(this.config, 'max', 0, 800);
    folder.add(this.config, 'speed', 1, 1000);
  }

  getArcLength(fromVec, toVec) {
    const angle = Math.atan2(toVec.y - fromVec.y, toVec.x - fromVec.x);
    return this.config.radius * angle;
  }

  update(timeStamp) {
    const { speed, min, max } = this.config;
    const vertices = this.mesh.geometry.vertices;

    for (let i = 0; i < vertices.length; i += 4) {
      const wave = min + Math.abs(Math.sin(i + timeStamp / speed) * max);
      const D = vertices[i + 3];
      D.normalize().multiplyScalar(wave);
    }

    this.mesh.rotation.y += 0.001;
    this.mesh.rotation.x += 0.003;
    this.mesh.rotation.z += 0.002;

    this.mesh.geometry.verticesNeedUpdate = true;
  }}


const gui = new dat.GUI();

function initGui(main) {
  // Lights
  const folder = gui.addFolder('Light');
  folder.addColor(main.conf, 'hemisphereLightColor').
  onChange(c => main.hemisphereLight.color = new THREE.Color(c));
  folder.addColor(main.conf, 'hemisphereLightColor2').
  onChange(c => main.hemisphereLight.groundColor = new THREE.Color(c));
  folder.add(main.conf, 'hemisphereLightIntensity', 0, 10).
  onChange(c => main.hemisphereLight.intensity = c);
  folder.addColor(main.conf, 'directionalLightColor').
  onChange(c => main.directionalLight.groundColor = new THREE.Color(c));
  folder.add(main.conf, 'directionalLightIntensity', 0, 10).
  onChange(c => main.directionalLight.intensity = c);
}

class Main {
  constructor() {
    _.bindAll(this,
    'animate',
    'onResize');

    this.conf = {
      hemisphereLightColor: 0x00ffb3,
      hemisphereLightColor2: 0x4b2ecf,
      hemisphereLightIntensity: 1,
      directionalLightColor: 0xffffff,
      directionalLightIntensity: 0 };


    // Renderer
    this.renderer = new THREE.WebGLRenderer({ alpha: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    // this.renderer.setClearColor(0x17293a);

    // Container
    this.container = document.createElement('div');
    document.body.appendChild(this.container);
    this.container.appendChild(this.renderer.domElement);

    // Scene
    this.scene = new THREE.Scene();
    window.addEventListener('resize', this.onResize);

    // Camera
    this.camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    10000);
    this.camera.position.set(0, 0, 1500);
    this.camera.lookAt(0, 0, 0);

    // Controls
    this.controls = new THREE.OrbitControls(
    this.camera,
    this.renderer.domElement);
    this.controls.userPan = false;
    this.controls.userPanSpeed = 0.0;
    this.controls.minDistance = 600.0;
    this.controls.maxDistance = 5000.0;
    this.controls.target.set(0, 0, 0);

    // Light
    this.hemisphereLight = new THREE.HemisphereLight(
    this.conf.hemisphereLightColor,
    this.conf.hemisphereLightColor2,
    this.conf.hemisphereLightIntensity);
    this.hemisphereLight.position.set(-20, 20, 30);

    this.directionalLight = new THREE.DirectionalLight(
    this.conf.directionalLightColor,
    this.conf.directionalLightIntensity);
    this.directionalLight.position.set(-100, 20, 30);

    // Pièce de résistance
    this.spikeBall = new SpikeBall(gui);

    this.scene.add(
    this.directionalLight,
    this.hemisphereLight,
    this.spikeBall.mesh);
  }

  onResize() {
    const { innerWidth, innerHeight } = window;
    this.renderer.setSize(innerWidth, innerHeight);
    this.camera.aspect = innerWidth / innerHeight;
    this.camera.updateProjectionMatrix();
  }

  render(timeStamp) {
    if (timeStamp) this.spikeBall.update(timeStamp);
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  animate(timeStamp) {
    requestAnimationFrame(this.animate);
    this.render(timeStamp);
  }}


const main = new Main();
main.animate();
initGui(main);