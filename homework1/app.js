/* 
 *  Document   : app.js
 *  Created on : 2011.09.22. 23:53
 *  Author     : Lencse
 */

var app = {
	
	settings : {
		refreshInterval : 1 // millisecs
	},

	view : {
		window : graph.box(-2, -2, 2, 2),
		viewport : graph.box(null, null, null, null), // Set up when window is ready
		projectionHeight : 4
	},
		
	data : {
		
		// Rotate angles:
		alpha : {angle : 0, delta : 1 * Math.PI / 180 / 10},
		beta  : {angle : 0, delta : 2 * Math.PI / 180 / 10},
		gamma : {angle : 0, delta : 5 * Math.PI / 180 / 10},
		
		vertices : [
			{pt : graph.point3d( 0.5, -0.5,  0.5), transformed : null},
			{pt : graph.point3d( 0.5,  0.5,  0.5), transformed : null},
			{pt : graph.point3d(-0.5,  0.5,  0.5), transformed : null},
			{pt : graph.point3d(-0.5, -0.5,  0.5), transformed : null},
			{pt : graph.point3d( 0.5, -0.5, -0.5), transformed : null},
			{pt : graph.point3d( 0.5,  0.5, -0.5), transformed : null},
			{pt : graph.point3d(-0.5,  0.5, -0.5), transformed : null},
			{pt : graph.point3d(-0.5, -0.5, -0.5), transformed : null},
			{pt : graph.point3d(0, 0,  1.5),			transformed : null},
			{pt : graph.point3d(0, 0, -1.5),			transformed : null}
		],
		
		facets : [
			{verticeIndexes : [0, 4, 5, 1],	color: "#fff"},
			{verticeIndexes : [1, 5, 6, 2],	color: "#aaa"},
			{verticeIndexes : [2, 6, 7, 3],	color: "#555"},
			{verticeIndexes : [3, 7, 4, 0],	color: "#aaa"},
			{verticeIndexes : [0, 1, 8],		color: "#f00"},
			{verticeIndexes : [1, 2, 8],		color: "#a00"},
			{verticeIndexes : [2, 3, 8],		color: "#500"},
			{verticeIndexes : [3, 0, 8],		color: "#a00"},
			{verticeIndexes : [5, 4, 9],		color: "#0f0"},
			{verticeIndexes : [6, 5, 9],		color: "#0a0"},
			{verticeIndexes : [7, 6, 9],		color: "#050"},
			{verticeIndexes : [4, 7, 9],		color: "#0a0"}
		]
		
	},
	
	init : function() {
		with (this.data) {
			$.each(facets, function(i, facet) {
				var v = [];
				$.each(facet.verticeIndexes, function(j, vind) {
					v.push(vertices[vind]);
				});
				facet.vertices = v;
			});
		}
	},
	
	setViewport : function(x0, y0, x1, y1) {
		this.view.viewport.p0.x = x0;
		this.view.viewport.p0.y = y0;
		this.view.viewport.p1.x = x1;
		this.view.viewport.p1.y = y1;
	},

	drawAll : function() {
		with (this) {
			for (i in data.facets) {
				if (facetVisible(data.facets[i])) drawFacet(data.facets[i]);
			}
		}
	},
	
	updateData : function() {
		with (this) {
			with (data) {
				$.each(vertices, function(i, v) {
					v.transformed = v.pt.rotate(alpha.angle, beta.angle, gamma.angle);
				});
			}
		}
		var self = this;
		$.each(["alpha", "beta", "gamma"], function(i, name) {
			for (
				self.data[name].angle += self.data[name].delta;
				self.data[name].angle > 2 * Math.PI;
				self.data[name].angle -= 2 * Math.PI
			);
		});
	},
	
	toScreen : function(p) {
		return p.centralProject(this.view.projectionHeight).windowToViewport(
			this.view.window,
			this.view.viewport
		);
	},
	
	drawFacet : function(facet) {
		var cont = engine.canvasContext;
		with (this) with(data) {
			var f = facet;
			cont.strokeStyle = "#000";
			cont.fillStyle = f.color;
			cont.beginPath();
			cont.moveToPt(toScreen(f.vertices[f.vertices.length - 1].transformed));
			$.each(f.vertices, function(i, v) {
				cont.lineToPt(toScreen(v.transformed));
			});
			cont.fill();
			cont.stroke();
		}
	},
	
	facetVisible : function(facet) {
		with (this) with (data) {
			var a = facet.vertices[0].transformed;
			var b = facet.vertices[1].transformed;
			var c = facet.vertices[2].transformed;
			var ab = graph.point3d(b.x - a.x, b.y - a.y, b.z - a.z);
			var bc = graph.point3d(c.x - b.x, c.y - b.y,	c.z - b.z);
			var n = graph.point3d(
				 ab.y * bc.z - ab.z * bc.y,
				-ab.x * bc.z + ab.z * bc.x,
				 ab.x * bc.y - ab.y * bc.x
			);
			var product =
				n.x * (-b.x) +
				n.y * (-b.y) +
				n.z * (view.projectionHeight - b.z);
			return product > 0;
		}
	}

};
