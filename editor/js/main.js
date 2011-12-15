
var clock = new THREE.Clock();
var container, stats;
var camera, scene, renderer, mesh;
var mouseX = 0, mouseY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

init();
animate();
function init(){
	if( true ){
		renderer = new THREE.WebGLRenderer({
			antialias		: true,
			preserveDrawingBuffer	: true
		});				
	}else{
		renderer	= renderer = new THREE.CanvasRenderer();
	}
	renderer.setSize( window.innerWidth, window.innerHeight );

	document.getElementById('container').appendChild(renderer.domElement);
	
	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 10000 );
	camera.position.set(0, 0, 100); 
	camera.lookAt(scene.position);
	scene.add(camera);
	
	controls = new THREE.TrackballControls( camera, renderer.domElement );
	controls.rotateSpeed		= 0.1;
	controls.staticMoving		= false;
	controls.dynamicDampingFactor	= 0.3;
	

	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
	document.addEventListener( 'touchmove', onDocumentTouchMove, false );

	var mesh	= new THREE.Mesh( new THREE.CubeGeometry( 10, 20, 10 ), new THREE.MeshNormalMaterial() );
	mesh.position.y	= -5;
	scene.add( mesh );


	threexSparks	= new THREEx.Sparks({
		maxParticles	: 1000,
		counter		: new SPARKS.SteadyCounter(200)
	});

	scene.add(threexSparks.container());

	// setup the emitter
	var emitter	= threexSparks.emitter();

	var hue	= 0;
	var initColorSize	= function() {};
	initColorSize.prototype.initialize = function( emitter, particle ){
		hue		+= 0.001;
		if( hue > 1 )	hue	-= 1;
		particle.target.color().setHSV(hue, 0.9, 0.4);

		particle.target.size(150);
	};


	emitter.addInitializer(new initColorSize());
	emitter.addInitializer(new SPARKS.Position( new SPARKS.PointZone( new THREE.Vector3(0,0,0) ) ) );
	emitter.addInitializer(new SPARKS.Lifetime(0,2));
	emitter.addInitializer(new SPARKS.Velocity(new SPARKS.PointZone(new THREE.Vector3(0,150,00))));

	emitter.addAction(new SPARKS.Age());
	emitter.addAction(new SPARKS.Move()); 
	emitter.addAction(new SPARKS.RandomDrift(1000,0,1000));
	//emitter.addAction(new SPARKS.Accelerate(0,-100,0));

	emitter.start();
}
function onDocumentMouseMove(event) {

	mouseX = event.clientX - windowHalfX;
	mouseY = event.clientY - windowHalfY;

}
function onDocumentTouchMove( event ) {
	if ( event.touches.length == 1 ) {
		event.preventDefault();
		mouseX = event.touches[ 0 ].pageX - windowHalfX;
		mouseY = event.touches[ 0 ].pageY - windowHalfY;
	}
}

function animate() {

	requestAnimationFrame( animate );

	render();
	//stats.update();

}

function render() {

	//camera.position.x += ( +mouseX/40 - camera.position.x ) * .2;
	//camera.position.y += ( -mouseY/40 - camera.position.y ) * .2;
	//camera.lookAt( scene.position );

	controls.update( clock.getDelta() );
	
	threexSparks.update();

	// FIXME this should be INSIDE webgl renderer... bug
	renderer.context.depthMask( true );

	renderer.render( scene, camera );
}
