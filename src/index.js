

//Dependencies Webpack  and threeJS, npm install webpack webpack-cli, npm install threeJS
// npm run-script build to compile, work on this file.
// dont change package.json
 

//Llamada de la librerias
const THREE = require('three');
// CommonJS:
const dat = require('dat.gui');
const Stats = require('stats.js');
import CameraControls from 'camera-controls';
import { random } from 'lodash';
CameraControls.install({THREE : THREE});

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import { info } from '../src/needed/csvjson.js';
//Model loaders
const cameraM = new THREE.PerspectiveCamera(40, window.innerWidth/window.innerHeight, 0.1, 1000);
cameraM.position.set(5000, 5000, 5000);
//variable for camera change (future implementation)
let activeCamera = cameraM


//movement speed variable
let speedMovement = 300;
let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;


// CameraControls.install( { THREE: THREE } );
const canvas = document.getElementById('canvas');
const clock = new THREE.Clock();
 // Optional: Pre-fetch Draco WASM/JS module.
// dracoLoader.preload();
//Scene and render
var renderer, scene, bgScene, camera;
renderer = new THREE.WebGLRenderer({ canvas , antialias: true});
const cameraControls = new CameraControls( activeCamera, renderer.domElement );
cameraControls.setLookAt( 200000, 200000, 200000, 0.0001, 2, 0, false );
cameraControls.maxDistance = 0.0001;
cameraControls.minDistance = 0;
cameraControls.truckSpeed = 2.0;

var bgMesh;
var engine;
var controls;
var mixer, mixer2,mixerCap;
//Lights
var spotLight, light, hemisLight;
var spotLightHelper;
//Skybox
var materiall;
var Skybox;
var video=[];
//Interface
var gui;
var obj;
var stats;
var childd;
var childdd;
//Info-sphere
var sphere_cant_compound = [];// cantidad de spheres
var sphere_cant_exchange = [];// cantidad de spheres
var sphere_number=0;// sphere que llevo
var Date_number=0;//cantidad de fechas
var Date_cant = 0;//cantidad de fechas que llevo
var Compound= false;// si voy por Compound
var exchange= false;//si voy por exchange
var Spheres_Date=[];//spheres por Date
var planets = [];
//var info_bars= [[]];
//group=new THREE.Object3D();
var mouse = new THREE.Vector2(1, 1);
var intersects = [];
var INTERSECTED = null;
var raycaster = new THREE.Raycaster();
var radii;
var timestamp;timestamp=0;
var timestamp2;timestamp2=0;
var scaleVector = new THREE.Vector3();
var planet_x;
var planet_y;
var planet_z;
var bars_x;
var bars_z;

var orbit=[];
var colors_array_1=[];
var info_bars= [[]];
var colors_array_2=[];
var sprite= [];
var sprite_2= [];
var camera_position_x;
var camera_position_y;
var camera_position_z;
var Sumarry; 
var mat= [];
var action= false;
var x;var y;
function init() 
{
	
	//DAT GUI
	gui = new dat.gui.GUI();
	obj = {
		explode: function () {
		alert('Bang!');
		},
	
		//spotlight
		posX: 0, 
		posY: 2000, 
		posZ: 2000,
		colorL: "#ffffff", // RGB array
		penunmbra: 5,
		helpSpot:true,
		intSpot:0,
		
		intAmbien:0,
		color0: "#443333", 
		intHemis:0,
		colorg: "#111122", 
	};
	
	
	scene = new THREE.Scene();
    // scene.fog = new THREE.Fog( 0x443333, 1, 4 );
 
       var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
	var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 2, FAR = 200000;
	camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
    
	
	
	//Lights
	//spotLight = new THREE.SpotLight( 0xffff00 );
	light = new THREE.AmbientLight( obj.color0 ); // soft white light
	hemisLight = new THREE.HemisphereLight( obj.color0, obj.colorg,0.1);
	

	stats = new Stats();
}

function addLights() 
{
	
	
	scene.add( hemisLight );
	spotLight = new THREE.SpotLight();
    spotLight.angle = Math.PI / 16;
    spotLight.penumbra = 5;
    spotLight.castShadow = true;
    spotLight.position.set( obj.posX, obj.posY, obj.posZ );
	scene.add( spotLight );
	spotLightHelper = new THREE.SpotLightHelper( spotLight );
	//scene.add( spotLightHelper );
	//fireworklight
	var light = new THREE.PointLight(0xffffff,1);
	light.position.set(0,2000,2000);
	scene.add(light);
}

function NEAR() 
{camera.position.x = 200;
	camera.position.y = 200;
	camera.position.z = 200;
	}
function FAR() 
{camera.position.x = 3000;
	camera.position.y = 3000;
	camera.position.z = 3000;
	}
function RESET() 
{controls.reset();}
function addGUI() 
{
	stats.showPanel( 0 ); 
	document.body.appendChild( stats.dom );


	
	var gui_camera=gui.addFolder('Camera');
	
	var parameters = 
					{
							Near:function() { NEAR(); },
							Far:function() { FAR(  ); },
							Reset:   function() { RESET(  ); },
					};
					gui_camera.add( parameters, 'Near'   ).name("Near");
					gui_camera.add( parameters, 'Far'   ).name("Far");
					gui_camera.add( parameters, 'Reset'   ).name("Reset");
}

function main() {

	
	
	renderer.setClearColor(0x222222);
	renderer.autoClearColor = false;
    renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.outputEncoding = THREE.sRGBEncoding;
	
    renderer.gammaFactor = 2.2;
  
	
	//Camera
	camera.position.x = 3000;
	camera.position.y = 3000;
	camera.position.z = 3000;
	
	
    controls = new OrbitControls( camera, renderer.domElement );

	addLights();
	
		var colors=[];
		colors[1]="red";
		colors[2]="blue";
		colors[3]="yellow";
		colors[4]="green";
		colors[5]="purple";
		colors[6]="yellowgreen";
		colors[7]="orangered";
		colors[8]="orange";
		colors[9]="brown";
		colors[10]="silver";
		colors[11]="turquoise";

	for (let index = 1; index < 12; index++) {
		colors_array_1[index]=  Math.random() * "0xFFFFFF";
		colors_array_2[index]= colors[index];
		
	}
	 
	 //create video
	
	 
	 
        var floorTexture = new THREE.TextureLoader().load( '../client/js/images/checkerboard.jpg' )
	floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping; 
	floorTexture.repeat.set( 10, 10 );
	
	var plane = new THREE.Mesh(
        new THREE.PlaneBufferGeometry( 6000, 6000 ),
		new THREE.MeshPhongMaterial( { color: 0x999999, specular: 0x101010, map: floorTexture, side: THREE.DoubleSide} )
		);

    plane.rotation.x = - Math.PI / 2;
	plane.receiveShadow = true;
	plane.position.set(0,-60,0)
	scene.add( plane );




	
	

	addGUI();

     

const rotationSpace = new THREE.Object3D();


	addGUIChooseDate ();
	document.addEventListener( 'keydown', onKeyDown, false );
	document.addEventListener( 'keyup', onKeyUp, false );
}

function addGUIChooseDate (){
	sphere_cant_exchange[0]=0;
	

	var guiALLF4= gui.addFolder('Date');
	var parameters=[] ;
	var Date_elected=[];
	var counter=0;
	
		for (let index = 0; index < info.length; index++) {
			
			if(info[index][0]=="Date:"){
				
					Date_number++;
					Date_elected[index]=Date_number;
					sphere_cant_exchange[Date_number]=1;
					
					counter++;//contamos la cantidad de fechas que hay

					
					sphere_cant_compound[Date_number]=counter;
					parameters[index] = 
					{

							Sphere:   function() { Start_Sphere( index, Date_elected[index] ); },
					};
					guiALLF4.add( parameters[index], 'Sphere'   ).name("Date:"+info[index][1]);
			}
			sphere_cant_exchange[Date_number]++;
		}
	
	
  
  
   
}


//receive object that need to detects colisions in the x, z coordinates

let onKeyDown = function ( event ) {
	switch ( event.keyCode ) {
		case 38: // up
		case 87: // w
			moveForward = true;
			movement(moveForward, speedMovement);
			break;
		case 37: // left
		case 65: // a
			moveLeft = true;
			movement(moveLeft, speedMovement);
			break;
		case 40: // down
		case 83: // s
			moveBackward = true;
			movement(moveBackward, speedMovement);
			break;
		case 39: // right
		case 68: // d
			moveRight = true;
			movement(moveRight, speedMovement);
			break;


			
		}

};
//event function that works when a key is released
let onKeyUp = function ( event ) {
	switch ( event.keyCode ) {
		case 38: // up
		case 87: // w
			moveForward = false;
			break;
		case 37: // left
		case 65: // a
			moveLeft = false;
			break;
		case 40: // down
		case 83: // s
			moveBackward = false;
			break;
		case 39: // right
		case 68: // d
			moveRight = false;
			break;
		case 67:
			blueSphere.getObjectByName('audio').setVolume(0);
			break;
		}
};
//the delta factor will divide the movement speed by 100 but will make it feel smoother to the controler
function movement(direction, speed){
	let delta = clock.getDelta()
	let moveZ = Number(moveForward) -Number(moveBackward);
  	let moveX = Number(moveRight) - Number(moveLeft);
  	
  	if (moveForward || moveBackward) {
  		cameraControls.forward(speed*delta*moveZ,true);
  	}
  	if (moveLeft || moveRight) {
	  	cameraControls.truck(speed*delta*moveX,0,true);
  	}
  	
}/*
function makeTextSprite( message, parameters )
{
	if ( parameters === undefined ) parameters = {};
	
	var fontface = parameters.hasOwnProperty("fontface") ? 
		parameters["fontface"] : "Arial";
	
	var fontsize = parameters.hasOwnProperty("fontsize") ? 
		parameters["fontsize"] : 18;
	
	var borderThickness = parameters.hasOwnProperty("borderThickness") ? 
		parameters["borderThickness"] : 4;
	
	var borderColor = parameters.hasOwnProperty("borderColor") ?
		parameters["borderColor"] : { r:0, g:0, b:0, a:1.0 };
	
	var backgroundColor = parameters.hasOwnProperty("backgroundColor") ?
		parameters["backgroundColor"] : { r:255, g:255, b:255, a:1.0 };

//	var spriteAlignment = THREE.SpriteAlignment.topLeft;
		
	var canvas = document.createElement('canvas');
	var context = canvas.getContext('2d');
	context.font = "Bold " + fontsize + "px " + fontface;
    
	// get size data (height depends only on font size)
	var metrics = context.measureText( message );
	var textWidth = metrics.width;
	
	// background color
	context.fillStyle   = "rgba(" + backgroundColor.r + "," + backgroundColor.g + ","
								  + backgroundColor.b + "," + backgroundColor.a + ")";
	// border color
	context.strokeStyle = "rgba(" + borderColor.r + "," + borderColor.g + ","
								  + borderColor.b + "," + borderColor.a + ")";

	context.lineWidth = borderThickness;
	context.moveTo( 128, 44);
	roundRect(context, borderThickness/2, borderThickness/2, textWidth + borderThickness, fontsize * 1.4 + borderThickness, 6);
	// 1.4 is extra height factor for text below baseline: g,j,p,q.
	
	// text color
	context.fillStyle = "rgba(0, 0, 0, 1.0)";

	context.fillText( message, borderThickness, fontsize + borderThickness);
	context.textAlign = "rigth";
	// canvas contents will be used for a texture
	var texture = new THREE.Texture(canvas) 
	texture.needsUpdate = true;

	var spriteMaterial = new THREE.SpriteMaterial( 
		{ map: texture } );
		//spriteMaterial.sizeAttenuation = false;
		//material.transparent = true;
		spriteMaterial.map.minFilter = THREE.NearestFilter;
	  
	var sprite = new THREE.Sprite( spriteMaterial );
	sprite.scale.set(100,50,1);
	
	return sprite;	
}*/
function makeTextSprite( message, parameters )
{
	if ( parameters === undefined ) parameters = {};
	
	var fontface = parameters.hasOwnProperty("fontface") ? 
		parameters["fontface"] : "Arial";
	
	var fontsize = parameters.hasOwnProperty("fontsize") ? 
		parameters["fontsize"] : 18;
	
	var borderThickness = parameters.hasOwnProperty("borderThickness") ? 
		parameters["borderThickness"] : 4;
	
	var borderColor = parameters.hasOwnProperty("borderColor") ?
		parameters["borderColor"] : { r:0, g:0, b:0, a:1.0 };
	
	var backgroundColor = parameters.hasOwnProperty("backgroundColor") ?
		parameters["backgroundColor"] : { r:255, g:255, b:255, a:1.0 };

//	var spriteAlignment = THREE.SpriteAlignment.topLeft;
		
	var canvas = document.createElement('canvas');
	var context = canvas.getContext('2d');
	context.font = "Bold " + fontsize + "px " + fontface;
    
	// get size data (height depends only on font size)
	var metrics = context.measureText( message );
	//canvas.width = 256;
	//canvas.height = 256;
	var textWidth = metrics.width;
	// background color
	context.fillStyle   = "rgba(" + backgroundColor.r + "," + backgroundColor.g + ","
								  + backgroundColor.b + "," + backgroundColor.a + ")";
	// border color
	context.strokeStyle = "rgba(" + borderColor.r + "," + borderColor.g + ","
								  + borderColor.b + "," + borderColor.a + ")";

	context.lineWidth = borderThickness;
	//context.moveTo( 128, 44);
	roundRect(context, 128/2,44/2, textWidth + borderThickness, fontsize * 1.4 + borderThickness, 2);
	// 1.4 is extra height factor for text below baseline: g,j,p,q.
	/*
	var canvas = document.createElement('canvas');
	canvas.width = 256;
	canvas.height = 256;
	var ctx = canvas.getContext("2d");
	
	
	ctx.font = "38pt Arial";
	
	ctx.textAlign = "center";
	ctx.fillText( sphere_price, 128, 44);*/
	// text color
	context.fillStyle = "rgba(0, 0, 0, 1.0)";

	context.fillText( message, 64, 44);
	//context.moveTo(0, 0);
	context.textAlign = "right";
	// canvas contents will be used for a texture
	var texture = new THREE.Texture(canvas) 
	texture.needsUpdate = true;

	var spriteMaterial = new THREE.SpriteMaterial( 
		{ map: texture } );
		//spriteMaterial.sizeAttenuation = false;
		//material.transparent = true;
		spriteMaterial.map.minFilter = THREE.NearestFilter;
	  
	var sprite = new THREE.Sprite( spriteMaterial );
	//sprite.scale.set(100,50,1);
	
	return sprite;	
}

// function for drawing rounded rectangles
function roundRect(ctx, x, y, w, h, r) 
{
    ctx.beginPath();
    ctx.moveTo(x+r, y);
    ctx.lineTo(x+w-r, y);
    ctx.quadraticCurveTo(x+w, y, x+w, y+r);
    ctx.lineTo(x+w, y+h-r);
    ctx.quadraticCurveTo(x+w, y+h, x+w-r, y+h);
    ctx.lineTo(x+r, y+h);
    ctx.quadraticCurveTo(x, y+h, x, y+h-r);
    ctx.lineTo(x, y+r);
    ctx.quadraticCurveTo(x, y, x+r, y);
    ctx.closePath();
    ctx.fill();
	ctx.stroke();   
}/*
function makeTextSprite( message)
{	
	var canvas = document.createElement('canvas');
	canvas.width = 256;
	canvas.height = 256;
	var ctx = canvas.getContext("2d");

	
	ctx.font = "18pt Arial";
	ctx.fillStyle = "yellow";
	ctx.textAlign = "center";
	ctx.fillText( message, 128, 44);
	
	var tex = new THREE.Texture(canvas);
	tex.needsUpdate = true;
	var spriteMat = new THREE.SpriteMaterial({
	map: tex,//sizeAttenuation: false,
	});
	var sprite = new THREE.Sprite(spriteMat);
	sprite.visible=true;
	return sprite;	
}*/

function createwrittensphere(sphere_price, sphere_size,sphere_cant, colors,index){
	/*

		var geom = new THREE.SphereGeometry(sphere_size, 34, 24);
		var mat = new THREE.MeshPhongMaterial({
			color:colors, 
		  emissive:colors,
		  specular:0x101010, shininess: 0, opacity:0.9,
		 // roughness: 0, metalness: 1,
		  emissiveIntensity:0.5,

		  
		});
		var planet = new THREE.Mesh(geom, mat);
		var orbit = 1500;
		planet.position.y=200;
		planet.position.x = Math.cos(60*timestamp ) * orbit;
		planet.position.z = Math.sin(60*timestamp ) * orbit;
		planet_z=planet.position.z;
		planet_y=sphere_size;
		planet_x=planet.position.x;
		timestamp++;
		planet.userData.orbit = orbit;
		planet.userData.speed = sphere_size;
	
*/
var geometry = new THREE.SphereGeometry(sphere_size, 34, 24);
var material = new THREE.MeshStandardMaterial({
	color:colors, 
  //emissive:colors,
  specular:0x101010, shininess: 0, opacity:0.7,
 roughness: 0.5, metalness: 0.7,
  emissiveIntensity:1,

  
});
var image = document.createElement('img');
var envMap = new THREE.Texture(image);
image.onload = function()  {
	envMap.needsUpdate = true;
};
image.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAIAAADTED8xAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDozMTc1M2NlNy1iZGRlLTY4NGEtODY1Mi0yZDc0MGJmODNiMjYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MDI0MzgwNDJCNTU0MTFFNkJGMkNBMDkxMUNCMUMwRjMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MDI0MzgwNDFCNTU0MTFFNkJGMkNBMDkxMUNCMUMwRjMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MzE3NTNjZTctYmRkZS02ODRhLTg2NTItMmQ3NDBiZjgzYjI2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjMxNzUzY2U3LWJkZGUtNjg0YS04NjUyLTJkNzQwYmY4M2IyNiIv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';
envMap.mapping = THREE.SphericalReflectionMapping;
material.envMap = envMap;

// roughnessMap
var image = document.createElement('img');
var roughnessMap = new THREE.Texture(image);
image.onload = function()  {
	roughnessMap.needsUpdate = true;
};
image.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjYzNjk1NjkxQjY0MjExRTY4QTg3RDcxOTNDQkE1RkRGIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjYzNjk1NjkyQjY0MjExRTY4QTg3RDcxOTNDQkE1RkRGIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NjM2OTU2OEZCNjQyMTFFNjhBODdENzE5M0NCQTVGREYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NjM2OTU2OTBCNjQyMTFFNjhBODdENzE5M0NCQTVGREYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5WU2ohAAAAH0lEQVR42mJgoDVg/P//P0kamBgGHRj1w0jxA0CAAQBKrgwBw+YutwAAAABJRU5ErkJggg==';

roughnessMap.magFilter = THREE.NearestFilter;
material.roughnessMap = roughnessMap;

//var mesh = new THREE.Mesh(geometry, material);


var planet = new THREE.Mesh(geometry, material);
var orbit = 1500;
planet.position.y=200;
planet.position.x = Math.cos(60*timestamp ) ;
planet.position.z = Math.sin(60*timestamp );
bars_z=planet.position.z;
planet_y=sphere_size;
bars_x=planet.position.x;

planet.position.x = planet.position.x  * orbit;
planet.position.z = planet.position.z * orbit;
planet_z=planet.position.z;
planet_y=sphere_size;
planet_x=planet.position.x;
planet.userData.orbit = orbit;
planet.userData.speed = sphere_size;


		/*var canvas = document.createElement('canvas');
		canvas.width = 256;
		canvas.height = 256;
		var ctx = canvas.getContext("2d");
		
		
		ctx.font = "38pt Arial";
		ctx.fillStyle = "white";
		ctx.textAlign = "center";
		ctx.fillText( sphere_price, 128, 44);
		
		var tex = new THREE.Texture(canvas);
		tex.needsUpdate = true;
		var spriteMat = new THREE.SpriteMaterial({
		  map: tex
		});*/
		sprite_2[index] =makeTextSprite(  sphere_price, { fontsize: 24});// new THREE.Sprite(spriteMat);
		//sprite_2[index].position.x =planet.position.x;
		//sprite_2[index].position.z = planet.position.z;
		var scaleFactor = 9;
		var scale = scaleVector.subVectors(planet.position, camera.position).length() / scaleFactor;
		sprite_2[index].scale.set(scale, scale, 1);
		sprite_2[index].position.y= 200;
		planet.add(sprite_2[index]);



		info_bars[index] = makeTextSprite(  sphere_cant , { fontsize: 16});
		info_bars[index].position.x = bars_x ;
		info_bars[index].position.z = bars_z;
	
	//******************************************************************************** */
	//planet.add(spritee);
		planet.name=sphere_cant;
		planet.esfera=false;
		info_bars[index] [0]= makeTextSprite(  sphere_cant );
		info_bars[index][0].visible=false;
		info_bars[index][0].position.x = bars_x * 800;
		info_bars[index][0].position.y = 300;
		info_bars[index][0].position.z = bars_z*800;
		info_bars[index][0].name=sphere_cant;
		
		//alert(info_bars[index][jndex]);
		scene.add(info_bars[index][0]);
		planets.push(planet);
		scene.add(planet);
		timestamp++;
}
 
function createwrittensphere2( sphere_price, sphere_size, orbit, material,sphere_name,indice,index,jndex){
	


	 

		var geometry =  new THREE.BoxGeometry(32,sphere_size ,24);
		
var image = document.createElement('img');
var envMap = new THREE.Texture(image);
image.onload = function()  {
	envMap.needsUpdate = true;
};
image.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAIAAADTED8xAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDozMTc1M2NlNy1iZGRlLTY4NGEtODY1Mi0yZDc0MGJmODNiMjYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MDI0MzgwNDJCNTU0MTFFNkJGMkNBMDkxMUNCMUMwRjMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MDI0MzgwNDFCNTU0MTFFNkJGMkNBMDkxMUNCMUMwRjMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MzE3NTNjZTctYmRkZS02ODRhLTg2NTItMmQ3NDBiZjgzYjI2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjMxNzUzY2U3LWJkZGUtNjg0YS04NjUyLTJkNzQwYmY4M2IyNiIv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';
envMap.mapping = THREE.SphericalReflectionMapping;
material.envMap = envMap;

// roughnessMap
var image = document.createElement('img');
var roughnessMap = new THREE.Texture(image);
image.onload = function()  {
	roughnessMap.needsUpdate = true;
};
image.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjYzNjk1NjkxQjY0MjExRTY4QTg3RDcxOTNDQkE1RkRGIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjYzNjk1NjkyQjY0MjExRTY4QTg3RDcxOTNDQkE1RkRGIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NjM2OTU2OEZCNjQyMTFFNjhBODdENzE5M0NCQTVGREYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NjM2OTU2OTBCNjQyMTFFNjhBODdENzE5M0NCQTVGREYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5WU2ohAAAAH0lEQVR42mJgoDVg/P//P0kamBgGHRj1w0jxA0CAAQBKrgwBw+YutwAAAABJRU5ErkJggg==';

roughnessMap.magFilter = THREE.NearestFilter;
material.roughnessMap = roughnessMap;

//var mesh = new THREE.Mesh(geometry, material);


var planet = new THREE.Mesh(geometry, material);
		 
		
		
		
		planet.position.y=sphere_size/2;
		
		planet.position.x = planet_x +(Math.cos(timestamp2 * 20) * orbit);
		planet.position.z = planet_z +( Math.sin(timestamp2 * 20) * orbit);
	
		planet.userData.orbit = orbit;
		planet.userData.speed = sphere_size;
	
		/*var canvas = document.createElement('canvas');
		canvas.width = 256;
		canvas.height = 256;
		var ctx = canvas.getContext("2d");
		
		
		ctx.font = "18pt Arial";
		ctx.fillStyle = "white";
		ctx.textAlign = "center";
		ctx.fillText(sphere_name, 128, 44);
		
		var tex = new THREE.Texture(canvas);
		tex.needsUpdate = true;
		var spriteMat = new THREE.SpriteMaterial({
		  map: tex
		});*/
		
		sprite[indice] = makeTextSprite(  sphere_name , { fontsize: 18}); //new THREE.Sprite(spriteMat);
		sprite[indice].visible=true;
		//sprite[indice].position.x =planet.position.x;
		//sprite[indice].position.z = planet.position.z;
		sprite[indice].position.x =-50;
		sprite[indice].position.z = 100;
		sprite[indice].position.y = -sphere_size/3;
		var scaleFactor = 9;
		var scale = scaleVector.subVectors(planet.position, camera.position).length() / scaleFactor;
		sprite[indice].scale.set(scale, scale, 1);
		planet.add(sprite[indice]);
		//planet.add(sprite);
		orbit= 800;

		info_bars[index][jndex]= makeTextSprite( sphere_price, { fontsize: 16} );
		info_bars[index][jndex].position.y=300;
		info_bars[index][jndex].visible=false;//******************************************************************************** */
		info_bars[index][jndex].position.x = bars_x * orbit;//planet.position.x +(Math.cos(timestamp2 * 20) * orbit);//;
		info_bars[index][jndex].position.z =bars_z*orbit;// planet.position.z+( Math.sin(timestamp2 * 20) * orbit); //+( Math.sin(timestamp2 * 20) * orbit);
		//planet.add(spritee);
		planet.name=indice;
		planet.esfera=true;
		
		//info_bars[index][jndex]=spritee;
		info_bars[index][jndex].name=indice;
		
		//alert(info_bars[index][jndex]);
		scene.add(info_bars[index][jndex]);
		planets.push(planet);
		scene.add(planet);
	
		timestamp2++;
	  
}
var INTERSECTED=null;
function raycast() {
      
	raycaster.setFromCamera( mouse, camera );
	
  var intersects = raycaster.intersectObjects(planets );
  var esfera=true;
  
  //alert(x);
		  if ( intersects.length > 0 ) {
		
        
			  if(INTERSECTED != intersects[ 0 ].object){
				/*info_bars.forEach( function(planet){
    
					
				
				
				if(planet==intersects[ 0 ].object)
					esfera=true;
					
				  });*/
				
					if(INTERSECTED){
						/*for (let index = 0; index < total; index++) {
							planets.forEach( function(planet){
    
								//if(planet.name==info_bars[x][index].name){
									planet.children[0].visible=false;
									planet.scale.set(1,1, 1);//}
							
								
								
								
							  });
							
						}*/
						info_bars[x][y].visible=false;
						INTERSECTED.scale.set(1,1, 1);
						
					}
				INTERSECTED = intersects[ 0 ].object;
				
				/*for (let index = 0; index < info_bars.length; index++) {
					
					
					
					  total= info[0].length-1;
					//alert(total);
					for (let jndex = 0; jndex <total; jndex++) {
					//	alert(index);alert(jndex);
						//alert(info_bars[index][jndex].name);alert(INTERSECTED.name);
						if(info_bars[index][jndex].name==INTERSECTED.name){
							x=index;
							if(info_bars[index][jndex].esfera==false){esfera=false;}
						}

					
					
					}
					
				}
				if(esfera==false){
					for (let index =0 ; index < total; index++) {
						
						planets.forEach( function(planet){
		
							if(planet.name==info_bars[x][index].name){
								//alert(index);
								planet.children[0].visible=true;
								planet.scale.set(1.1, 1.1, 1.1);}
								planet.shininess=100;
								planet.skinning=true;
							
							
						});
					}
					
				}*/
			
				//INTERSECTED.children[0].position.set(camera.position.x- 400, camera.position.y-400,camera.position.z-INTERSECTED.children[0].position.z-400);
				for(let kndex=0 ; kndex < info_bars.length; kndex++)
				{
					for(let index=0 ; index < info[0].length-1; index++)
					{
						if(INTERSECTED.name==info_bars[kndex][index].name)
						{INTERSECTED.scale.set(1.1, 1.1, 1.1);
							info_bars[kndex][index].visible=true;
							x=kndex;y=index;
						}
							
						
							
					}
						
						
					
				}
				
				
				
			  }
			  
	
		  } else {
			
			if(INTERSECTED){
				/*for (let index = 0; index < info_bars.length; index++) {
					planets.forEach( function(planet){
    
						//if(planet.name==info_bars[x][index].name){
							planet.children[0].visible=false;
							planet.scale.set(1,1, 1);//}
					
						
							
						
					  });
					 // alert(index);alert(x);
				//}*/
				info_bars[x][y].visible=false;
				INTERSECTED.scale.set(1,1, 1);
			}
			INTERSECTED=null;
			
		  }
		  
	

}
function onMouseMove( event ) {
      
	event.preventDefault();
  
		  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
		  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

}

function exchange_sphere(where_to_start, register_number){
	 action= true;
	
//controls.reset();
	timestamp=0;
	radii=0;
	var number=0;
	var shape = new THREE.Shape();
		shape.moveTo(200, 0);
		shape.absarc(0, 0, 1500, 0, 2 * Math.PI, false);
		var spacedPoints = shape.createSpacedPointsGeometry(128);
		spacedPoints.rotateX(THREE.Math.degToRad(-90));
		 orbit [0]= new THREE.Line(spacedPoints, new THREE.LineBasicMaterial({
		  color: "yellow"
		}));
		scene.add(orbit [0]);
	var index = where_to_start+2;//indice
	var nombres= where_to_start+1;//nombres de las monedas
		var biggest=0;
		var actual=0;
		var biggest_hijo=0;
		var actual_hijo=0;
		
		for (let jndex=1 ; jndex < info[0].length-1; jndex++){
			mat[jndex] = new THREE.MeshStandardMaterial({
				color:colors_array_2[jndex], 
				/*emissive:  colors_array_2[jndex],specular:0x101010, shininess: 0, opacity:0.8,
				
				roughness: 0,metalness: 1,*/
		  emissiveIntensity:0.5,
		  specular:0x101010, shininess: 1, opacity:1,
		  roughness: 1, metalness: 0.7,
		   emissiveIntensity:1,
		 
			});
			
		}
	
	for (let indexx=0 ; indexx < sphere_cant_exchange[register_number]-4; indexx++) {
		
			var counter=0;
			var first;
				var regex=/,/gi;
			
				timestamp2=0;
						counter++;
						first= counter;
						var sphere_size= info[index][ info[0].length-1].replace(regex, '') ;
						var $='$';
						regex = $ ;
						sphere_size= sphere_size.replace(regex, '') ;
						
						for (let indexxx=1 ; indexxx < 12; indexxx++) {
		
							sphere_size=sphere_size/10;
							
							if (sphere_size<10){
							
								sphere_size=(indexxx-1)*20;
								indexxx=12;
							}
					
						}
					
						//info[index][sphere_cant_exchange[register_number]]
						
						createwrittensphere( info[index][0], sphere_size,  info[index][ info[0].length-1],colors_array_1[indexx],indexx);
					//contamos la cantidad de fechas que hay
					//orbit
					
		var shape = new THREE.Shape();
		shape.moveTo(planet_x, planet_y);
		
		shape.absarc(planet_x, planet_z, 400, 0, 2 * Math.PI, false);
		var spacedPoints = shape.createSpacedPointsGeometry(128);
		spacedPoints.rotateX(THREE.Math.degToRad(90));
		 orbit [indexx]= new THREE.Line(spacedPoints, new THREE.LineBasicMaterial({
		  color: "yellow"
		}));
		 scene.add(orbit[indexx]);
		  

		 

					for (let jndex=1 ; jndex < info[0].length-1; jndex++){
						var regex=/,/gi;
						timestamp2++;
						var sphere_size= info[index][jndex].replace(regex, '') ;
						var $='$';
						regex = $ ;
						sphere_size= sphere_size.replace(regex, '') ;
						//console.log(info[index][jndex]);
						
						createwrittensphere2( info[index][jndex], sphere_size/200000, 400,mat[jndex],info[nombres][jndex],number,indexx,jndex);
						
						number++;
							
					}
					

					index++;
	}/*
	camera.position.y = 2000;
	planets.forEach( function(planet){
    
		var scaleFactor = 9;
		var sprite = planet.children[0];
		
		var scale = scaleVector.subVectors(planet.position, camera.position).length() / scaleFactor;
		sprite.scale.set(scale*2, scale*2, 1);
		
		sprite.visible=false;
		
		
	  });*/
	camera.position.x = camera_position_x;
	camera.position.y = camera_position_y;
	camera.position.z = camera_position_z;
	
}

function Start_Sphere(where_to_start, register_number)
{

	camera_position_x = camera.position.x ;
	camera_position_y = camera.position.y;
	camera_position_z = camera.position.z;
	camera.position.x = 0;
	camera.position.y = 5000;
	camera.position.z = 0;
	
	planets.forEach( function(planet){
    
		scene.remove( planet);
	//scene.remove(planet.children[0]) ;
	
		
		
		
	  });
	 
	  for(let kndex=0 ; kndex < orbit.length; kndex++)
	  {
		if( orbit!= []){ scene.remove( orbit[kndex]);}
	  }
	  for(let kndex=0 ; kndex < sprite.length; kndex++)
	  {
		if( sprite!= []){ scene.remove( sprite[kndex]);}
	  }
	  for(let kndex=0 ; kndex < sprite_2.length; kndex++)
	  {
		if( sprite_2!= []){ scene.remove( sprite_2[kndex]);}
	  }
	 
	 //info_bars= [[]];
	 planets = [];
	exchange_sphere(where_to_start, register_number);
 	
	
}



     

function displayWindowSize(){
	// Get width and height of the window excluding scrollbars
	var w = document.documentElement.clientWidth;
	var h = document.documentElement.clientHeight;
	
	// Display result inside a div element
	// console.log("Width: " + w + ", " + "Height: " + h);
	renderer.setSize(w, h);
	// camera.fov = Math.atan(window.innerHeight / 2 / camera.position.z) * 2 * THREE.Math.RAD2DEG;
	camera.aspect = w / h;
	camera.updateProjectionMatrix();
}

// Attaching the event listener function to window's resize event
window.addEventListener("resize", displayWindowSize);

function animate() 
{
	raycast();

  requestAnimationFrame(animate);
  if(action){
	for(let kndex=0 ; kndex < info_bars.length; kndex++)
	{
		for(let index=0 ; index < info[0].length-1; index++)
		{
		
		
			var scaleFactor = 9;
			//var sprite = planet.children[0];
			
			var scale = scaleVector.subVectors(info_bars[kndex][index].position, camera.position).length() / scaleFactor;
			info_bars[kndex][index].scale.set(scale*2, scale*2, 1);
			
		}
			
			
		
	}
  }
  render();
  renderer.render(scene, camera);
  controls.update();
  stats.update();
  var dt = clock.getDelta();
  
}


function render() 
{
	renderer.domElement.addEventListener( 'mousemove', onMouseMove );

	const delta = clock.getDelta();
	
	
}

init();
main();
animate();
