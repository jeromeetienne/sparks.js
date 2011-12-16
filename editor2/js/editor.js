var value = ""+
"threexSparks	= new THREEx.Sparks({\n"+
"	maxParticles	: 400,\n"+
"	counter		: new SPARKS.SteadyCounter(300)\n"+
"});\n"+
"\n"+
"// setup the emitter\n"+
"var emitter	= threexSparks.emitter();\n"+
"\n"+
"var initColorSize	= function(){\n"+
"	this.initialize = function( emitter, particle ){\n"+
"		particle.target.color().setHSV(0.3, 0.9, 0.4);\n"+
"		particle.target.size(150);\n"+
"	};\n"+
"};\n"+
"\n"+
"\n"+
"emitter.addInitializer(new initColorSize());\n"+
"emitter.addInitializer(new SPARKS.Position( new SPARKS.PointZone( new THREE.Vector3(0,0,0) ) ) );\n"+
"emitter.addInitializer(new SPARKS.Lifetime(0,0.8));\n"+
"emitter.addInitializer(new SPARKS.Velocity(new SPARKS.PointZone(new THREE.Vector3(0,250,00))));\n"+
"\n"+
"emitter.addAction(new SPARKS.Age());\n"+
"emitter.addAction(new SPARKS.Move());\n"+
"emitter.addAction(new SPARKS.RandomDrift(1000,0,1000));\n"+
"emitter.addAction(new SPARKS.Accelerate(0,-200,0));\n"+
"\n";

var editor	= CodeMirror(document.getElementById('editor'), {
	value		: value,
	mode		: "javascript",
	theme		: 'night',

	indentUnit	: 8,
	tabSize		: 8,
	indentWithTabs	: true,
	
	onChange	: function(){
		
	}
});

jQuery("#osdLayer .button.editor").click(function(){	
	jQuery("#editor").toggle();
});

jQuery("#osdLayer .button.compile").click(function(){
	console.log("value", editor.getValue())
	var textValue	= editor.getValue();

	if( threexSparks ){
		scene.remove(threexSparks.container());
		threexSparks.destroy();
		threexSparks	= null;
	}
	
	eval(textValue);

	// restart it
	threexSparks.emitter().start();	
	scene.add(threexSparks.container());
});