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
};

CanvasRenderingContext2D.prototype.spotPt = function(p, r) {
	this.spot(p.x, p.y, r);
};

var graph = {
	
	point2d : function(x, y) {
		var self = this;
		return {
			x : x,
			y : y,
			windowToViewport : function(window, viewport) {
				var wwith = window.p1.x - window.p0.x;
				var wheight = window.p1.y - window.p0.y;
				var vwith = viewport.p1.x - viewport.p0.x;
				var vheight = viewport.p1.y - viewport.p0.y;
				return self.point2d(
					(this.x - window.p0.x) * vwith / wwith + viewport.p0.x,
					viewport.p1.y - (this.y - window.p0.y) * vheight / wheight
				);
			}
		};
	},

	point3d : function(x, y, z) {
		var self = this;
		return {
			
			x : x,
			y : y,
			z : z,
	
			centralProject : function(s) {
				return self.point2d(this.x * s  / (s - this.z), this.y * s / (s - this.z));
			},
			
			rotate : function(alpha, beta, gamma) {
				var p = self.point3d(
					this.x,
					this.y * Math.cos(alpha) - this.z * Math.sin(alpha),
					this.y * Math.sin(alpha) + this.z * Math.cos(alpha)
				);
				p = self.point3d(
					 p.x * Math.cos(beta) + p.z * Math.sin(beta),
					 p.y,
					-p.x * Math.sin(beta) + p.z * Math.cos(beta)
				);
				return self.point3d(
					p.x * Math.cos(gamma) - p.y * Math.sin(gamma),
					p.x * Math.sin(gamma) + p.y * Math.cos(gamma),
					p.z
				);
			}

		};
	},
	
	box : function(x0, y0, x1, y1) {
		return {p0 : this.point2d(x0, y0), p1 : this.point2d(x1, y1)};
	},
	
	boxPt : function(p0, p1) {
		return {p0 : p0, p1 : p1};
	},
	
	
	
};

