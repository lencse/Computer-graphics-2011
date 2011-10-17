/* 
 *  Document   : app.js
 *  Created on : 2011.10.04. 22:41
 *  Author     : Lencse
 */

var app = {
	
	settings : {
		refreshInterval : 10, // millisecs
	},

	view : {
	},
	
	model : {
		data : null,
		degree : 4,
		m : function() {
			return this.data.controlPointAnchors.length;
		},
		n : function() {
			return this.m() + 2 * this.degree;
		},
		u : function(i) {
			with (this) {
				return i / (n() - 1);
			}
		},
		p : function(i) {
			with (this) {
				var anch;
				if (i < degree) {
					anch = data.controlPointAnchors[0];
				}
				if (i >= degree && i <= m() + degree - 1) {
					anch = data.controlPointAnchors[i - degree];
				}
				if (i > m() + degree - 1) {
					anch = data.controlPointAnchors[m() -1];
				}
				return graph.point2d(anch[0].offsetLeft + 4 - 12, anch[0].offsetTop + 4 - 12);
				//TODO: remove hardcode
			}
		},
		w : function(i) {
			with (this) {
				if (i < degree) {
					return 0;
				}
				if (i >= degree && i <= m() + degree - 1) {
					return 1;
				}
				if (i > m() + degree - 1) {
					return 0;
				}
			}
		},
		N : function(j, k, t) {
			with (this) {
				if (k == 1) {
					return ((u(j) < t || Math.abs(u(j) - t) < 1e-20) && t < u(j + 1)) ? 1 : 0;
				}
				return (
					(t - u(j)) * N(j, k - 1, t) / (u(j + k -1) - u(j)) +
					(u(j + k) - t) * N(j + 1, k - 1, t) / (u(j + k) - u(j + 1))
				);
			}
		},
		s : function(t) {
			with (this) {
				var rx = 0;
				var ry = 0;
				var i
				var q = 0;
				for (i = 0; i < degree + m(); ++i) {
					q += w(i) * N(i, degree, t);
				}
				for (i = 0; i < degree + m(); ++i) {
					var B = w(i) * N(i, degree, t);
					rx += B * p(i).x;
					ry += B * p(i).y;
				}
				rx /= q;
				ry /= q;
				return graph.point2d(rx, ry)
			}
		}
	},
		
	data : {
		controlPointAnchors : []
	},
	
	init : function() {
		this.model.data = this.data;
		this.addControlPoint(100, 100);
		this.addControlPoint(300, 100);
		this.addControlPoint(300, 300);
		this.addControlPoint(100, 300);
		/*this.addControlPoint(100, 80);
		this.addControlPoint(700, 225);
		this.addControlPoint(335, 300);
		this.addControlPoint(650, 450);*/
		
		with (this) with(model) {
			/*for (i = 0; i < model.n(); ++i) {
				console.log(i, model.w(i), model.u(i), model.p(i).x, model.p(i).y);
			}*/
		}
	},
	
	drawAll : function() {
		with (this) with (model) {
			var cont = engine.canvasContext;
			cont.strokeStyle = "#444";
			cont.lineWidth = 1;
			cont.beginPath();
			cont.moveToPt(p(degree));
			var i;
			for (i = degree + 1; i < m() + degree; ++i) {
				cont.lineToPt(p(i));
			}
			cont.stroke();
			var t;
			cont.strokeStyle = "#fff";
			cont.lineWidth = 2;
			cont.beginPath();
			cont.moveToPt(s(0));
			var t;
			for (t = 0; t <= 1; t += 0.01) {
				cont.lineToPt(s(t));
			}
			cont.stroke();
		}
	},

	onWindowResize : function(width, height) {
	},
	
	updateData : function() {
	},
	
	addControlPoint : function(x, y) {
		this.data.controlPointAnchors.push(ui.addControlPointAnchor(x, y));
	}

};
