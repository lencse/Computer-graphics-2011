/* 
 *  Document   : engine.js
 *  Created on : 2011.09.23. 15:31
 *  Author     : Lencse
 */

var engine =  {

	canvasContext : $("#canv")[0].getContext("2d"),
	
	maxX : function() {
		return this.canvasContext.canvas.width - 1;
	},
	
	maxY : function() {
		return this.canvasContext.canvas.height - 1;
	},
	
	onWindowResize : function() {
		var w = $("#canv-cont")[0].clientWidth - 30;
		var h = $("#canv-cont")[0].clientHeight - 30;
		this.canvasContext.canvas.width = w;
		this.canvasContext.canvas.height = h;
		app.onWindowResize(w, h);
	}

};

$(function() {
	app.init();
	engine.onWindowResize();
	setInterval(
		function() {
			engine.canvasContext.clearRect(0, 0, engine.maxX(), engine.maxY());			
			app.updateData();
			app.drawAll();
		},
		app.settings.refreshInterval
	);
});

$(window).resize(function() {
	engine.onWindowResize();
});
