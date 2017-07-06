$(document).ready(function(){
	$('.widget-container-col').sortable({
        connectWith: '.widget-container-col',
		items:'> .widget-box',
		handle: ace.vars['touch'] ? '.widget-header' : false,
		cancel: '.fullscreen',
		opacity:0.8,
		revert:true,
		forceHelperSize:true,
		placeholder: 'widget-placeholder',
		forcePlaceholderSize:true,
		tolerance:'pointer',
		start: function(event, ui) {
			//when an element is moved, it's parent becomes empty with almost zero height.
			//we set a min-height for it to be large enough so that later we can easily drop elements back onto it
			ui.item.parent().css({'min-height':ui.item.height()})
			//ui.sender.css({'min-height':ui.item.height() , 'background-color' : '#F5F5F5'})
		},
		update: function(event, ui) {
			ui.item.parent({'min-height':''})
			//p.style.removeProperty('background-color');
		}
    });
})