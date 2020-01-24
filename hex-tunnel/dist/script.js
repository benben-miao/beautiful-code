"use strict";


window.addEventListener('resize', handleWindowResize, false);

var scene, camera, fieldOfView, aspectRatio, nearPlane, farPlane, HEIGHT, WIDTH, renderer, container;

var HEIGHT = window.innerHeight;
var WIDTH = window.innerWidth;
var scene = new THREE.Scene();

//scene.fog = new THREE.Fog (0x000000, 600, 1000); 

var aspectRatio = WIDTH / HEIGHT;
var fieldOfView = 70;
var nearPlane = 1;
var farPlane = 1000;

var camera = new THREE.PerspectiveCamera(
	fieldOfView,
	aspectRatio,
	nearPlane,
	farPlane
);
// Position the camera
camera.position.set (0, 0, 0);	

scene.add(camera);

var renderer = new THREE.WebGLRenderer({ 
	alpha: true, 
	antialias: true 
});
renderer.setSize(WIDTH, HEIGHT);
container = document.getElementById('container');
container.appendChild(renderer.domElement);



function handleWindowResize() {
	HEIGHT = window.innerHeight;
	WIDTH = window.innerWidth;
	renderer.setSize(WIDTH, HEIGHT);
	camera.aspect = WIDTH / HEIGHT;
	camera.updateProjectionMatrix();
}

var normalMaterial = new THREE.MeshNormalMaterial({});

function Torus(f){
  this.torus = new THREE.Mesh(new THREE.TorusBufferGeometry( 160, 75, 2, 10),normalMaterial);
  this.torus.position.x = 57*Math.cos(f);
  this.torus.position.y = 57*Math.sin(f);
  this.torus.position.z = f*1.25;
  this.torus.rotation.z = f*0.03;
}
		
var numTorus = 80;
var torusArray = [];
for(var i=0; i<numTorus; i++){
  torusArray.push(new Torus(-i*13));
  scene.add(torusArray[i].torus);
}



//SPHERE DEFORM
///////////////////
// this.sphere = new THREE.Mesh(new THREE.SphereGeometry(20,30,30),normalMaterial);

var sphereGeom = new THREE.SphereGeometry(20,15,15);

sphereGeom.mergeVertices();
var l = sphereGeom.vertices.length;
this.waves = [];
	for (var i=0; i<l; i++){
	var v = sphereGeom.vertices[i];
	this.waves.push({y:v.y,
	 x:v.x,
	 z:v.z,
	ang:Math.random()*Math.PI*2,
	amp:3,
	speed:0.016 + Math.random()*0.024
	});
};

this.sphere = new THREE.Mesh(sphereGeom, normalMaterial);
this.sphere.position.set(0, 0, -300);
scene.add(sphere);


//CUBE
///////////////////

// this.cube = new THREE.Mesh(new THREE.BoxGeometry(20,20,20),normalMaterial);
// this.cube.position.set(0, 0, -300);
// scene.add(cube);


var speed = 3;
//var rotation = 0;

// Update
function animate(){
  for(var i=0; i<numTorus; i++){
    torusArray[i].torus.position.z+=speed;
   	//torusArray[i].torus.rotation.z+=i*rotation/10000;
    if(torusArray[i].torus.position.z>0)
    {
      torusArray[i].torus.position.z=-1000;
    }
  }

//SPHERE ANIMATION
///////////////////

var verts = sphere.geometry.vertices;
var l = verts.length;

for (var i=0; i<l; i++){
	var v = verts[i];
	var vProperties = waves[i];

	// v.z = vProperties.z + Math.cos(vProperties.ang)*vProperties.amp;
	v.x = vProperties.x + Math.cos(vProperties.ang)*vProperties.amp;
	v.y = vProperties.y + Math.sin(vProperties.ang)*vProperties.amp;
	vProperties.ang += vProperties.speed;
}
sphere.geometry.verticesNeedUpdate=true;

// sphere.position.x = Math.sin(Date.now() * 0.0045) * 15;
// sphere.position.y = Math.cos(Date.now() * 0.0045) * 15;
//sphere.position.z -= Math.cos(Date.now() * 0.0001) * 1;
sphere.rotation.z += Math.PI/90;
sphere.rotation.y += Math.PI/180;
sphere.rotation.x += Math.PI/180;


//CAMERA ANIMATION
///////////////////  
  // camera.rotation.z += Math.PI/90;
   //camera.position.x += Math.cos(Date.now() * 0.004) * 20 ;

//CUBE ANIMATION
///////////////////
  // cube.position.x = Math.sin(Date.now() * 0.0035) * 5;
  // cube.position.y = Math.cos(Date.now() * 0.0035) * 5;
  // //cube.position.z += Math.sin(Date.now() * 0.05) * 50;
  // cube.rotation.z += Math.PI/90;
  // cube.rotation.y += Math.PI/90;
  // cube.rotation.x += Math.PI/90;
}	

function loop(){
	renderer.render(scene, camera);
	requestAnimationFrame(loop);
	animate();
}

loop();


//NCC-1701
console.log("                                                                \n  ___________________  *       _-_                   *          \n  \\\%c==============%c_%c=%c_/ ____.---'---`---.____   *        *     *  \n              \\\_ \\\    \\\----._________.----/                     \n         *      \\\ \\\   /  /    `-_-'              *            * \n  *         __,--`.`-'..'-_                            *        \n           /____          ||    *         *                     \n                `--.____,-'                                     \n                                                                ", "color: #ff0000;", "color: #000000;", "color: #0000ff;", "color: #000000;");