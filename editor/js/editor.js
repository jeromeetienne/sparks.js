/**
 * init a color picker
 * @param {jQuery} the jQuery of the container
*/
var initColorPicker	= function(container){
	var setColor	= function(value){
		jQuery('input', container).val(value);
		jQuery('.sample', container).css('background-color', "#"+value);
	}
	// set default color
	setColor( "FFFFFF" );

	//// click anywhere on the container will trigger the picker
	//jQuery(container).click(function(){
	//	jQuery('input', container).ColorPickerShow();
	//});
	// init color picker itself
	jQuery('input', container).ColorPicker({
		onChange: function(hsb, hex, rgb){
			setColor( hex );
		},
		onSubmit: function(hsb, hex, rgb, el){
			setColor( hex );
			jQuery(el).ColorPickerHide();
		},
		onBeforeShow: function() {
			jQuery(this).ColorPickerSetColor(this.value);
		}
	});
}

var createItem	= function(previousEl){
	var itemEl	= jQuery( "#tmplItem" ).tmpl();
	if( previousEl ){
		previousEl.after( itemEl );				
	}else{
		itemEl.appendTo( "#osdLayer .stack" );		
	}

	jQuery( "#tmplItemHeader" ).tmpl().appendTo( itemEl );
}

jQuery(function(){
	createItem();
})

jQuery( ".itemBody .colorpickerHolder").live('click', function(){
	jQuery('input', this).ColorPickerShow();
	console.log("clock colorpicker")
});

jQuery( ".itemHeader select").live('change', function(){
	var stackItemEl	= jQuery(this).parents('.stackItem');
	var type	= this.value;
	console.log("change type", this.value)
	if( type === 'LifeTime' ){
		jQuery( "#tmplItemInitLifeTime" ).tmpl().appendTo( stackItemEl );
		initColorPicker( jQuery('.colorpickerHolder', stackItemEl) );		
	}else if( type === 'none' ){
		jQuery( ".itemBody", stackItemEl ).remove();		
	}else{
		console.assert(false);
	}
});	

jQuery( ".itemHeader .up").live('click', function(){
	var stackItemEl	= jQuery(this).parents('.stackItem');
	var stackEl	= jQuery(this).parents('.stack');

	var position	= jQuery('.stackItem', stackEl).index(stackItemEl);
	if( position === 0 )	return;
	
	stackItemEl.remove();

	var previousEl	= jQuery('.stackItem', stackEl).eq(position-1);
	previousEl.before(stackItemEl)
});
jQuery( ".itemHeader .down").live('click', function(){
	var stackItemEl	= jQuery(this).parents('.stackItem');
	var stackEl	= jQuery(this).parents('.stack');

	var position	= jQuery('.stackItem', stackEl).index(stackItemEl);
	if( position === jQuery('.stackItem', stackEl).length-1 )	return;
	
	stackItemEl.remove();

	var previousEl	= jQuery('.stackItem', stackEl).eq(position);
	previousEl.after(stackItemEl)
});
jQuery( ".itemHeader .insert").live('click', function(){
	var stackItemEl	= jQuery(this).parents('.stackItem');
	createItem(stackItemEl);
});	
jQuery( ".itemHeader .delete").live('click', function(){
	var stackEl	= jQuery(this).parents('.stack');
	var nbItem	= jQuery(".stackItem", stackEl).length
	if( nbItem < 2 )	return;
	
	var stackItemEl	= jQuery(this).parents('.stackItem');
	stackItemEl.remove();
});

