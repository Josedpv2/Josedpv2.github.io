

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
cameraM.position.set(0, 0, 0,);
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
cameraControls.setLookAt( 0, 2, 0, 0.0001, 2, 0, false );
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
		intSpot:1,
		
		intAmbien:1,
		color0: "#443333", 
		intHemis:1,
		colorg: "#111122", 
	};
	
	
	scene = new THREE.Scene();
    // scene.fog = new THREE.Fog( 0x443333, 1, 4 );
 
       var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
	var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 2, FAR = 10000;
	camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
    
		
	camera.position
	camera.
	
	//Lights
	// spotLight = new THREE.SpotLight( 0xffff00 );
	light = new THREE.AmbientLight( obj.color0 ); // soft white light
	hemisLight = new THREE.HemisphereLight( obj.color0, obj.colorg, 1 );
	

	stats = new Stats();
}

function addLights() 
{
	
	//Hemisphere light
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
	var light = new THREE.PointLight(0xffffff);
	light.position.set(0,250,0);
	scene.add(light);
}

function addGUI() 
{
	stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
	document.body.appendChild( stats.dom );
	var guiALL= gui.addFolder('Light');
	var guiSL = guiALL.addFolder('SpotLight');
	guiSL.add(obj, 'helpSpot').onChange(function (val) {
		spotLightHelper.visible = val;
	});
	guiSL.add(obj, 'posX').onChange(function (val) {
		spotLight.position.x = val;
		spotLightHelper.update();
	});
	guiSL.add(obj, 'posY').onChange(function (val) {
		spotLight.position.y = val;
		spotLightHelper.update();

	});
	guiSL.add(obj, 'posZ').onChange(function (val) {
		spotLight.position.z = val;
		spotLightHelper.update();

	});
	//Ambient Light
	var guiAL = guiALL.addFolder('AmbientLight');
	guiAL.addColor(obj, 'color0').onChange(function (val) {
		light.color.set(val);
		hemisLight.color.set(val);
	});
	guiAL.add(obj, 'intAmbien').min(0).max(1).step(0.1).onChange(function (val) {
		light.intensity = val;
	}).name('Intensity');

	//Hemisphere Light
	var guiHL = guiALL.addFolder('HemisphereLight');
	guiHL.addColor(obj, 'colorg').onChange(function (val) {
		hemisLight.groundColor.set(val);
	});
	guiHL.add(obj, 'intHemis').min(0).max(1).step(0.1).onChange(function (val) {
		hemisLight.intensity = val;
	}).name('Intensity');
	

	
}

function main() {

	
	//Renderer
	renderer.setClearColor(0x222222);
	renderer.autoClearColor = false;
    renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.outputEncoding = THREE.sRGBEncoding;
	//renderer.gammaOutput = true;
    renderer.gammaFactor = 2.2;
   // renderer.shadowMap.enabled = true;
//	renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
	
	//Camera
	camera.position.x = 2000;
	camera.position.y = 2000;
	camera.position.z = 2000;
	//camera.lookAt( 0, 3000, 0 );
	
    controls = new OrbitControls( camera, renderer.domElement );

	addLights();

	for (let index = 0; index < 20; index++) {
		colors_array_1[index]=  Math.random() * "0xFFFFFF";
		colors_array_2[index]= Math.random() *"0xFFFFFF";
		
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
	Sumarry= gui.addFolder('Index Currency');
	
     
//Glass sphere creator receive the radius of the sphere

//Audio function and proposal for audio manager

//space that rotate in sinusoidal wave
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
	//for (let indexx = 0; indexx < Date_number; indexx++) {}
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

function createGlassSphere(radius){
	const glassGeometry = new THREE.SphereGeometry(radius, 32, 32);
	const glassMaterial = new THREE.MeshPhongMaterial({color: 0x0, specular:0xFFFFFF, shininess: 100, opacity:0.3, transparent: true});
	const mesh = new THREE.Mesh(glassGeometry, glassMaterial);
	return mesh;
}

//Sphere creator receive the radius and the color of the sphere
function createColorSphere(radius, hexColor){
	const colorSphereGeometry = new THREE.SphereGeometry(radius, 32, 32);
	const sphereMaterial = new THREE.MeshLambertMaterial({color: hexColor});
	let mesh = new THREE.Mesh(colorSphereGeometry, sphereMaterial);
	return mesh;
}

//receive object that need to detects colisions in the x, z coordinates
function colisionDetector (controlElement, interactiveElement){
	let x = (cameraControls.getPosition().x >= interactiveElement.position.x - 20) && (cameraControls.getPosition().x < interactiveElement.position.x + 20)
	let z = (cameraControls.getPosition().z >= interactiveElement.position.z - 20) && (cameraControls.getPosition().z < interactiveElement.position.z + 20)
	return (x && z);
}let onKeyDown = function ( event ) {
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
}
function makeTextSprite( message)
{	
	var canvas = document.createElement('canvas');
	canvas.width = 256;
	canvas.height = 256;
	var ctx = canvas.getContext("2d");

	//ctx.translate(100,0);
	ctx.font = "24pt Arial";
	ctx.fillStyle = "white";
	ctx.textAlign = "center";
	ctx.fillText( message, 128, 44);
	//console.log(ctx);
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
	//Ground


	 

		var geom = new THREE.SphereGeometry(sphere_size, 34, 24);
		var mat = new THREE.MeshBasicMaterial({
		  color:colors,
		  //wireframe: true
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
		
		//ctx.translate(100,0);
		ctx.font = "38pt Arial";
		ctx.fillStyle = "white";
		ctx.textAlign = "center";
		ctx.fillText( sphere_price, 128, 44);
		//console.log(ctx);
		var tex = new THREE.Texture(canvas);
		tex.needsUpdate = true;
		var spriteMat = new THREE.SpriteMaterial({
		  map: tex
		});
		sprite_2[index] = new THREE.Sprite(spriteMat);
		sprite_2[index].position.x =planet.position.x;// planet_x +(Math.cos(timestamp2 * 20) * orbit);
		sprite_2[index].position.z = planet.position.z;//planet_z +( Math.sin(timestamp2 * 20) * orbit);
		var scaleFactor = 9;
		var scale = scaleVector.subVectors(planet.position, camera.position).length() / scaleFactor;
		sprite_2[index].scale.set(scale, scale, 1);
		sprite_2[index].position.y= 400;
		scene.add(sprite_2[index]);


	//var sprite = makeTextSprite( sphere_cant );
//	spritey.position.set(55,105,55);
	//scene.add( spritey );
	//planet.add(sprite);
	var spritee = makeTextSprite(  sphere_cant);
	spritee.visible=false;
		planet.add(spritee);
		planets.push(planet);
		scene.add(planet);
	
		//orbit
	
	  
	

	/*const lettersTilt = new THREE.Object3D();
	//scene.add(lettersTilt);
	//lettersTilt.rotation.set(THREE.Math.degToRad(-15),0,THREE.Math.degToRad(-15));
	const lettersBase = new THREE.Object3D();
	lettersTilt.add(lettersBase);
	/*{
	const letterMaterial = new THREE.MeshPhongMaterial({
		color: 'red',
	});  
	const loader = new THREE.FontLoader();
	loader.load('https://threejsfundamentals.org/threejs/resources/threejs/fonts/helvetiker_regular.typeface.json', (font) => {
		const spaceSize = 0.1;
		let totalWidth = 0;
		let maxHeight = 0;
		const letterGeometries = {
		' ': { width: spaceSize, height: 0 }, // prepopulate space ' '
		};
		const size = new THREE.Vector3();
		//crear switch con sphere_number para escoger que precio e info lleva sphere_number
			const str = sphere_price;//************************************************************************Informacion escrita********************************************* 

			const letterInfos = str.split('').map((letter, ndx) => {
		if (!letterGeometries[letter]) {
			const geometry = new THREE.TextBufferGeometry(letter, {
			font: font,
			size: 6,
			height: 0.4,
			curveSegments: 24,
			bevelEnabled: true,
			bevelThickness: 1,
			bevelSize: 0.6,
			bevelSegments: 10,
			});
			geometry.computeBoundingBox();
			geometry.boundingBox.getSize(size);
			letterGeometries[letter] = {
			geometry,
			width: size.x / 2, // no idea why size.x is double size
			height: size.y,
			};
		}
		const {geometry, width, height} = letterGeometries[letter];
		const mesh = geometry
			? new THREE.Mesh(geometry, letterMaterial)
			: null;
		totalWidth += width;
		maxHeight = Math.max(maxHeight, height);
		
		return {
			mesh,
			width,
		};
		});
		let t = 0;
		const radius = (sphere_size*4) / Math.PI;
		for (const {mesh, width} of letterInfos) {
		if (mesh) {
			const offset = new THREE.Object3D();
			lettersBase.add(offset);
			//mesh.position.set(sphere_x,sphere_y,sphere_z);
			
			var orbit = 200;
			offset.rotation.y = t / totalWidth * Math.PI * 2;
			mesh.position.z = radius;
			offset.add(mesh);
			mesh.position.y =-maxHeight / 2;
			offset.position.y =2.5;
			offset.position.x = Math.cos(timestamp * sphere_size) * orbit;
			offset.position.z = Math.sin(timestamp * sphere_size) * orbit;
		}
		t += width;
		}
		{
		
		
		//************************************************************************posicion de la bola********************************************* 

		
		var spritey = makeTextSprite( sphere_price , 
			{ fontsize: 32, fontface: "Georgia", borderColor: {r:0, g:0, b:255, a:1.0} } );
		//spritey.position.setY(0.5);
		
		spritey.visible=false;
		group.add(lettersTilt);
		
	
		
		}
	
		//camera.position.z = radius * 3;
	});
	}
		
	const geo = new THREE.SphereBufferGeometry(sphere_size, 32, 24);
	const mat = new THREE.MeshPhongMaterial({
	color: 'cyan',
	});
	//**********sphere_size**************************************************************tamano de la bola********************************************* 
	const mesh = new THREE.Mesh(geo, mat);
	var orbit = 200;
	
	mesh.position.x = Math.cos(timestamp * sphere_size) * orbit;
	mesh.position.z = Math.sin(timestamp * sphere_size) * orbit;
	timestamp++;


	var canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    var ctx = canvas.getContext("2d");
    ctx.font = "44pt Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText(sphere_price, 128, 44);
    //console.log(ctx);
    var tex = new THREE.Texture(canvas);
    tex.needsUpdate = true;
    var spriteMat = new THREE.SpriteMaterial({
      map: tex
    });
    var sprite = new THREE.Sprite(spriteMat);

	mesh.add(sprite);
	
		group.push( mesh );
	

		scene.add(group);*/
}

function createwrittensphere2( sphere_price, sphere_size, orbit, mat,sphere_name,indice){
	//Ground


	 

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
		
		//ctx.translate(100,0);
		ctx.font = "18pt Arial";
		ctx.fillStyle = "white";
		ctx.textAlign = "center";
		ctx.fillText(sphere_name, 128, 44);
		//console.log(ctx);
		var tex = new THREE.Texture(canvas);
		tex.needsUpdate = true;
		var spriteMat = new THREE.SpriteMaterial({
		  map: tex
		});
		
		sprite[indice] = new THREE.Sprite(spriteMat);
		sprite[indice].visible=true;
		sprite[indice].position.x =planet.position.x;// planet_x +(Math.cos(timestamp2 * 20) * orbit);
		sprite[indice].position.z = planet.position.z;//planet_z +( Math.sin(timestamp2 * 20) * orbit);
		
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
var spriteee=0;
function raycast() {
      
	raycaster.setFromCamera( mouse, camera );
	
  var intersects = raycaster.intersectObjects(planets );
  var INTERSECTED;
  
		  if ( intersects.length > 0 ) {
			INTERSECTED = intersects[ 0 ].object;
			//alert(INTERSECTED.children[0]);
			spriteee= INTERSECTED.children[0];
			spriteee.visible=true;
			//intersects.sprite.visible=true;
			/*INTERSECTED.forEach( function(planet){
				
				alert(planet);
				planet.sprite.visible=true;
				
				
				
			  });*/
  
			 // if ( INTERSECTED != intersects[ 0 ].object ) {
	
				 
			
				
			  
	
		  } else {

			
			//INTERSECTED = intersects[ 0 ].object;
			//INTERSECTED.spritey.visible=true;
			if (spriteee!=0) {
				spriteee.visible=false;
			}
		  }
		  
	

}
function onMouseMove( event ) {
      
	event.preventDefault();
  
		  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
		  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

}

function exchange_sphere(where_to_start, register_number){
	//alert(where_to_start);
	//alert(sphere_cant_exchange[register_number]);
	
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
		Sumarry= gui.addFolder('Index Currency');
		for (let jndex=1 ; jndex < info[0].length-1; jndex++){
			mat[jndex] = new THREE.MeshBasicMaterial({
				color:  colors_array_2[jndex],
				//wireframe: true
			});
			Sumarry.addColor( mat[jndex], 'color'  ).name(info[nombres][jndex]);
		}
	
	for (let indexx=0 ; indexx < sphere_cant_exchange[register_number]-4; indexx++) {
		//alert(info[index][sphere_cant_exchange[register_number]]);
		//alert(info[index][0]);
			var counter=0;
			var first;
				var regex=/,/gi;
				//console.log(info[index][0]);
				//console.log(info[index][sphere_cant_exchange[register_number]]);
				//alert(info[index][0]);
				//alert(info[index][sphere_cant_exchange[register_number]]);
				//info[index][0]
				//info[index][sphere_cant_exchange[register_number]]
				timestamp2=0;
						counter++;
						first= counter;
						var sphere_size= info[index][ info[0].length-1].replace(regex, '') ;
						var $='$';
						regex = $ ;
						sphere_size= sphere_size.replace(regex, '') ;
						//alert(sphere_size);
						for (let indexxx=1 ; indexxx < 12; indexxx++) {
		
							sphere_size=sphere_size/10;
							
							if (sphere_size<10){
							
								sphere_size=(indexxx-1)*20;
								indexxx=12;
							}
					
						}
					
						
						

					//alert(sphere_size);
						//info[index][0]=info[index][0]+'-------------------------';
						//alert(info[index][0]);
						//timestamp=sphere_size;
						//alert(sphere_size+info[index][0]);
						
						
						
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
					//	alert(sphere_size);
						/*for (let indexxx=1 ; indexxx < 12; indexxx++) {
		
							sphere_size=sphere_size/10;
							
							if (sphere_size<10){
							
								sphere_size=(indexxx-1)*20;
								//alert(sphere_size);
								indexxx=12;
							}
					
						}*/

						//alert(sphere_size);
						
						//console.log(info[nombres][jndex]);
						//console.log(info[index][jndex]);
						//alert(info[nombres][jndex]);
						//alert(info[index][jndex]);
						
						createwrittensphere2( info[index][jndex], sphere_size/200000, 400,mat[jndex],info[nombres][jndex],number);
						
						number++;
							
					}
					

					index++;
	}
	
	camera.position.x = camera_position_x;
	camera.position.y = camera_position_y;
	camera.position.z = camera_position_z;
	Sumarry.open();
	//camera.lookAt(300, 300, 0);
	camera.rotation.y=90;
}

function Start_Sphere(where_to_start, register_number)
{

	camera_position_x = camera.position.x ;
	camera_position_y = camera.position.y;
	camera_position_z = camera.position.z;
	camera.position.x = 0;
	camera.position.y = 2000;
	camera.position.z = 0;
	gui.removeFolder(Sumarry);
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
	 
	//alert(camera.position);
	//scene.remove( spritey);
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
// document.addEventListener( 'keydown', onKeyDown, false );
// document.addEventListener( 'keyup', onKeyUp, false );

function animate() 
{
	raycast();

  requestAnimationFrame(animate);
  planets.forEach( function(planet){
    
	var scaleFactor = 9;
	var sprite = planet.children[0];
	//alert(planet.posX);
	//sprite.position.set(sprite.posX, sprite.posY, sprite.posZ)
	var scale = scaleVector.subVectors(planet.position, camera.position).length() / scaleFactor;
	sprite.scale.set(scale*2, scale*2, 1);
	
	
	
	
  });
  render();
  renderer.render(scene, camera);
  controls.update();
  stats.update();
  var dt = clock.getDelta();
  	
  //controls.update();
}


function render() 
{
	renderer.domElement.addEventListener( 'mousemove', onMouseMove );

	const delta = clock.getDelta();
	//Para la animacion
	//Array.prototype.forEach.call(parent.children, child => 	console.log(child) });
	//const hasControlUpdated = cameraControls.update(delta);

	
}

init();
main();
animate();
