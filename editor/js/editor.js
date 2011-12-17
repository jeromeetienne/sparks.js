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



var updateText= function(){
	if( threexSparks ){
		scene.remove(threexSparks.container());
		threexSparks.destroy();
		threexSparks	= null;
	}
	
	var textValue	= editor.getValue();
	eval(textValue);

	// restart it 
	threexSparks.emitter().start();	
	scene.add(threexSparks.container());
	
	optionsSave();
}

var editor	= CodeMirror(document.getElementById('editor'), {
	value		: value,
	mode		: "javascript",
	theme		: 'night',

	indentUnit	: 8,
	tabSize		: 8,
	indentWithTabs	: true,
	
	onChange	: updateText
});

var optionsSave	= function(){
	var textValue	= editor.getValue();
	var options	= {
		textValue	: textValue
	};
	location.hash	= '#j/'+JSON.stringify(options);	
}
var optionsLoad	= function(){
	console.log("hash=", location.hash)
	if( !location.hash )	return;
	if( location.hash.substring(0,3) === "#j/" ){
		var optionsJSON	= location.hash.substring(3);
		var options	= JSON.parse(optionsJSON);
	}else{
		console.assert(false);
	}

	editor.setValue( options.textValue );
}

optionsLoad();
jQuery("#editor").hide();

jQuery("#osdLayer .button.editor").click(function(){	
	jQuery("#editor").toggle();
});

jQuery("#osdLayer .button.fullscreen").click(function(){
	if( THREEx.FullScreen.activated() ){
	    THREEx.FullScreen.cancel();
	}else{
	    THREEx.FullScreen.request();
	}	
});
if( !THREEx.FullScreen.available() ){
	jQuery("#osdLayer .button.fullscreen").hide();
}


jQuery("#osdLayer .button.export").click(function(){
	var isVisible	= jQuery('#osdLayer .shorturl').css('display') !== 'none';
	
	if( isVisible ){
		jQuery('#osdLayer .shorturl').hide();
		return;
	}

	jQuery('#osdLayer .shorturl').show();
	
	var long_url	= location.href;
	// from http://stackoverflow.com/questions/1771397/jquery-on-the-fly-url-shortener
	var login	= "jeromeetienne";
	var api_key	= "R_9176fb8fcaf3a6c0fe4459cb699f6c1d";
	jQuery.getJSON(	"http://api.bitly.com/v3/shorten?callback=?", { 
			"format": "json",
			"apiKey": api_key,
			"login": login,
			"longUrl": long_url
		},
		function(response){
			var value	= response.data.url;
			jQuery('#osdLayer .shorturl input').val(value);
			$("#osdLayer .shorturl input").select();
		}
	);
});

jQuery('body').bind('keypress', function(event){
	// alt-h == 203
	if( event.keyCode !== 203 )	return;
	event.preventDefault();  
	jQuery("#editor").toggle();
})
