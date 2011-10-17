/* 
 *  Document   : app.js
 *  Created on : 2011.10.04. 22:41
 *  Author     : Lencse
 */

var app = {
	
	settings : {
		refreshInterval : 1, // millisecs
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
				if (i < degree) {
					return i - degree;
				}
				if (i >= degree && i <= m() + degree - 1) {
					return data.knots[i - degree];
				}
				if (i > m() + degree - 1) {
					return i - degree;
				}
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
					return data.weights[i - degree];
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
		controlPointAnchors : [],
		knots : [],
		weights : []
	
	},
	
	init : function() {
		this.model.data = this.data;
		/*this.addControlPoint(100, 100);
		this.addControlPoint(300, 100);
		this.addControlPoint(300, 300);
		this.addControlPoint(100, 300);*/
		
		this.addControlPoint(100, 80);
		this.addControlPoint(700, 225);
		this.addControlPoint(335, 300);
		this.addControlPoint(650, 450);

		/*this.addControlPoint(400, 250);
		this.addControlPoint(400, 400);
		this.addControlPoint(250, 400);
		this.addControlPoint(100, 400);
		this.addControlPoint(100, 250);
		this.addControlPoint(100, 100);
		this.addControlPoint(250, 100);
		this.addControlPoint(400, 100);
		this.addControlPoint(400, 250);
		
		this.data.weights[1] = Math.sqrt(2) / 2;
		this.data.weights[3] = Math.sqrt(2) / 2;
		this.data.weights[5] = Math.sqrt(2) / 2;
		this.data.weights[7] = Math.sqrt(2) / 2;*/
		
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
			cont.moveToPt(s(u(0)));
			var t;
			var d = (u(n() - 1) - u(0)) / 100;
			for (t = u(0); t <= u(n() - 1); t += d) {
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
		with (this) with(data) {
			var i;
			knots.push(knots.length);
			weights.push(1);
			controlPointAnchors.push(ui.addControlPointAnchor(x, y));
			ui.updateSliders();
		}
	}

};
