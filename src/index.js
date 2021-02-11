

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
cameraM.position.set(3000, 3000, 3000);
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
renderer = new THREE.WebGLRenderer({ canvas });
const cameraControls = new CameraControls( activeCamera, renderer.domElement );
cameraControls.setLookAt( 10000, 20000, 200000, 0.0001, 2, 0, false );
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
function init() 
{
	
	//DAT GUI
	gui = new dat.gui.GUI();
	obj = {
		explode: function () {
		alert('Bang!');
		},
	
		//spotlight
		posX: -25, 
		posY: 8, 
		posZ: 7,
		colorL: "#ffffff", // RGB array
		penunmbra: 0.2,
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
	var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 2, FAR = 10000;
	camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
    
	
	
	//Lights
	// spotLight = new THREE.SpotLight( 0xffff00 );
	light = new THREE.AmbientLight( obj.color0 ); // soft white light
	hemisLight = new THREE.HemisphereLight( obj.color0, obj.colorg,1);
	

	stats = new Stats();
}

function addLights() 
{
	
	
	scene.add( hemisLight );
	spotLight = new THREE.SpotLight();
    spotLight.angle = Math.PI / 16;
    spotLight.penumbra = 0.5;
    spotLight.castShadow = true;
    spotLight.position.set( obj.posX, obj.posY, obj.posZ );
	scene.add( spotLight );
	spotLightHelper = new THREE.SpotLightHelper( spotLight );
	//scene.add( spotLightHelper );
	//fireworklight
	
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
  	
}

function makeTextSprite( message)
{	
	var canvas = document.createElement('canvas');
	canvas.width = 256;
	canvas.height = 256;
	var ctx = canvas.getContext("2d");

	
	ctx.font = "24pt Arial";
	ctx.fillStyle = "white";
	ctx.textAlign = "center";
	ctx.fillText( message, 128, 44);
	
	var tex = new THREE.Texture(canvas);
	tex.needsUpdate = true;
	var spriteMat = new THREE.SpriteMaterial({
	map: tex
	});
	var sprite = new THREE.Sprite(spriteMat);
	sprite.visible=true;
	return sprite;	
}

function createwrittensphere(sphere_price, sphere_size,sphere_cant, colors,index){
	

		var geom = new THREE.SphereGeometry(sphere_size, 34, 24);
		var mat = new THREE.MeshPhongMaterial({
		  emissive:colors,
		  specular:0xFFFFFF, shininess: 100, opacity:0.9,
		  roughness: 0,
    	  metalness: 1,
		  emissiveIntensity:1,

		  
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
	

		
		var canvas = document.createElement('canvas');
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
		});
		sprite_2[index] = new THREE.Sprite(spriteMat);
		sprite_2[index].position.x =planet.position.x;
		sprite_2[index].position.z = planet.position.z;
		var scaleFactor = 9;
		var scale = scaleVector.subVectors(planet.position, camera.position).length() / scaleFactor;
		sprite_2[index].scale.set(scale, scale, 1);
		sprite_2[index].position.y= 400;
		scene.add(sprite_2[index]);



	var spritee = makeTextSprite(  sphere_cant);
	spritee.visible=false;
		planet.add(spritee);
		planets.push(planet);
		scene.add(planet);
	
}

function createwrittensphere2( sphere_price, sphere_size, orbit, mat,sphere_name,indice){
	


	 

		var geom =  new THREE.BoxGeometry(32,sphere_size ,24);
		
		 
		var planet = new THREE.Mesh(geom, mat);
		
		
		planet.position.y=sphere_size/2;
		
		planet.position.x = planet_x +(Math.cos(timestamp2 * 20) * orbit);
		planet.position.z = planet_z +( Math.sin(timestamp2 * 20) * orbit);
	timestamp2++;
		planet.userData.orbit = orbit;
		planet.userData.speed = sphere_size;
	
		var canvas = document.createElement('canvas');
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
		});
		
		sprite[indice] = new THREE.Sprite(spriteMat);
		sprite[indice].visible=true;
		sprite[indice].position.x =planet.position.x;
		sprite[indice].position.z = planet.position.z;
		
		var scaleFactor = 9;
		var scale = scaleVector.subVectors(planet.position, camera.position).length() / scaleFactor;
		sprite[indice].scale.set(scale, scale, 1);
		scene.add(sprite[indice]);
		//planet.add(sprite);
		var spritee = makeTextSprite( sphere_price );
		spritee.position.y=- sphere_size/2;
		spritee.visible=false;
		planet.add(spritee);
		planets.push(planet);
		scene.add(planet);
	
		
	  
}
var INTERSECTED=null;
function raycast() {
      
	raycaster.setFromCamera( mouse, camera );
	
  var intersects = raycaster.intersectObjects(planets );
  
  
		  if ( intersects.length > 0 ) {
			  if(INTERSECTED != intersects[ 0 ].object){
				if(INTERSECTED){
				  
					INTERSECTED.children[0].visible=false;
					
				}
				INTERSECTED = intersects[ 0 ].object;
					
				INTERSECTED.children[0].visible=true;
			  }
			  
	
		  } else {

			if(INTERSECTED){
				  
				INTERSECTED.children[0].visible=false;
				
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
;
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
			mat[jndex] = new THREE.MeshPhongMaterial({
				emissive:  colors_array_2[jndex],specular:0xFFFFFF, shininess: 100, opacity:0.8,
				
				roughness: 0,
    	  metalness: 1,
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
					
						
						
						createwrittensphere( info[index][0], sphere_size, info[index][sphere_cant_exchange[register_number]],colors_array_1[indexx],indexx);
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
		  

		 console.log(sphere_cant_exchange[register_number]);

					for (let jndex=1 ; jndex < info[0].length-1; jndex++){
						var regex=/,/gi;
						timestamp2++;
						var sphere_size= info[index][jndex].replace(regex, '') ;
						var $='$';
						regex = $ ;
						sphere_size= sphere_size.replace(regex, '') ;
				
						
						createwrittensphere2( info[index][jndex], sphere_size/200000, 400,mat[jndex],info[nombres][jndex],number);
						
						number++;
							
					}
					

					index++;
	}
	
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
	scene.remove(planet.children[0]) ;
	
		
		
		
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
  planets.forEach( function(planet){
    
	var scaleFactor = 9;
	var sprite = planet.children[0];
	
	var scale = scaleVector.subVectors(planet.position, camera.position).length() / scaleFactor;
	sprite.scale.set(scale*2, scale*2, 1);
	
	
	
	
  });
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
