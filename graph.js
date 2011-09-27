/* 
 *  Document   : graph.js
 *  Created on : 2011.09.26. 21:57
 *  Author     : Lencse
 */

CanvasRenderingContext2D.prototype.line = function(x0, y0, x1, y1) {
	this.moveTo(x0, y0);
	this.lineTo(x1, y1);
	this.stroke();
};

CanvasRenderingContext2D.prototype.linePt = function(p0, p1) {
	this.line(p0.x, p0.y, p1.x, p1.y);
};

CanvasRenderingContext2D.prototype.moveToPt = function(p) {
	this.moveTo(p.x, p.y);
};
	
CanvasRenderingContext2D.prototype.lineToPt = function(p) {
	this.lineTo(p.x, p.y);
};

CanvasRenderingContext2D.prototype.spot = function(x, y, r) {
	if (typeof(r) == "undefined") r = 5;
	this.beginPath();
	this.arc(x, y, r, 0, Math.PI*2, false);
	this.closePath();
	this.fill();
}

CanvasRenderingContext2D.prototype.spotPt = function(p, r) {
	this.spot(p.x, p.y, r);
}

var graph = {
	
	point2d : function(x, y) {
		return {x : x, y : y};
	},

	point3d : function(x, y, z) {
		return {x : x, y : y, z : z};
	},
	
	box : function(x0, y0, x1, y1) {
		return {p0 : this.point2d(x0, y0), p1 : this.point2d(x1, y1)};
	},
	
	boxPt : function(p0, p1) {
		return {p0 : p0, p1 : p1};
	},
	
	windowToViewport : function(window, viewport, p) {
		var wwith = window.p1.x - window.p0.x;
		var wheight = window.p1.y - window.p0.y;
		var vwith = viewport.p1.x - viewport.p0.x;
		var vheight = viewport.p1.y - viewport.p0.y;
		return this.point2d(
			(p.x - window.p0.x) * vwith / wwith + viewport.p0.x,
			viewport.p1.y - (p.y - window.p0.y) * vheight / wheight
		);
	},
	
	centralProject : function(s, p) {
		return this.point2d(p.x * s  / (s - p.z), p.y * s / (s - p.z));
	},
	
	rotate : function(alpha, beta, gamma, p) {
		var p1 = this.point3d(
			p.x,
			p.y * Math.cos(alpha) - p.z * Math.sin(alpha),
			p.y * Math.sin(alpha) + p.z * Math.cos(alpha)
		);
		var p2 = this.point3d(
			 p1.x * Math.cos(beta) + p1.z * Math.sin(beta),
			 p1.y,
			-p1.x * Math.sin(beta) + p1.z * Math.cos(beta)
		);
		return this.point3d(
			p2.x * Math.cos(gamma) - p2.y * Math.sin(gamma),
			p2.x * Math.sin(gamma) + p2.y * Math.cos(gamma),
			p2.z
		);
	}
	
	
};
