/* 
 *  Document   : engine.js
 *  Created on : 2011.09.23. 15:31
 *  Author     : Lencse
 */

/*Object.prototype.clone = function() {
var that = this instanceof Array ? [] : {};
	for (i in this) {
		if (i == "clone") continue;
		if (this[i] && typeof this[i] == "object") {
			that[i] = this[i].clone();
		} else {
			that[i] = this[i];
		}
	}
	return that;
};*/

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
		var wwidth = app.view.window.p1.x - app.view.window.p0.x;
		var wheight = app.view.window.p1.y - app.view.window.p0.y;
		var x0, y0, x1, y1;
		if (wwidth / wheight > w / h) {
			x0 = 0;
			y0 = (h - wheight * w / wwidth) / 2;
			x1 = w - 1;
			y1 = (h + wheight * w / wwidth) / 2;
		} else {
			x0 = (w - wwidth * h / wheight) / 2;
			y0 = 0;
			x1 = (w + wwidth * h / wheight) / 2;
			y1 = h - 1;
		}
		app.setViewport(x0, y0, x1, y1);
	}

};

$(document).ready(function() {
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
