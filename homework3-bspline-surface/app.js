/* 
 *  Document   : app.js
 *  Created on : 2011.10.19. 08:56
 *  Author     : Lencse
 */

var app = {
	
	settings : {
		refreshInterval : 1, // millisecs
	},

	view : {
	},
	
	model : {
	},
		
	data : {
		controlPointAnchors : [],
		knots : [],
		weights : []
	
	},
	
	init : function() {
		this.model.data = this.data;
	},
	
	drawAll : function() {
		with (this) with (model) {
			var cont = engine.canvasContext; 
		}
	},

	onWindowResize : function(width, height) {
	},
	
	updateData : function() {
	},
	
};
