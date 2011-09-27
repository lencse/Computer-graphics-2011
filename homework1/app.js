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
		
		// Actual (default) rotate angles:
		alpha : 0,
		beta : 0,
		gamma : 0,
		
		// Delta of rotate angles:
		dAlpha :	1 * Math.PI / 180 / 10,
		dBeta :	2 * Math.PI / 180 / 10,
		dGamma :	5 * Math.PI / 180 / 10,
		
		vertices : [
			graph.point3d( 0.5, -0.5,  0.5),
			graph.point3d( 0.5,  0.5,  0.5),
			graph.point3d(-0.5,  0.5,  0.5),
			graph.point3d(-0.5, -0.5,  0.5),
			graph.point3d( 0.5, -0.5, -0.5),
			graph.point3d( 0.5,  0.5, -0.5),
			graph.point3d(-0.5,  0.5, -0.5),
			graph.point3d(-0.5, -0.5, -0.5),
			graph.point3d(0, 0,  1.5),
			graph.point3d(0, 0, -1.5)
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
		],
		
		transformedVertices : []
		
	},
	
	init : function() {
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
				for (i in vertices) {
					transformedVertices[i] = graph.rotate(
						alpha, beta, gamma, vertices[i]
					);
				}
				for (alpha += dAlpha; alpha > 2 * Math.PI; alpha -= 2 * Math.PI);
				for (beta  += dBeta;  beta  > 2 * Math.PI; beta  -= 2 * Math.PI);
				for (gamma += dGamma; gamma > 2 * Math.PI; gamma -= 2 * Math.PI);
			}
		}
	},
	
	toScreen : function(p) {
		return graph.windowToViewport(
			this.view.window,
			this.view.viewport,
			graph.centralProject(this.view.projectionHeight, p)
		);
	},
	
	drawFacet : function(facet) {
		var cont = engine.canvasContext;
		with (this) {
			cont.strokeStyle = "#000";
			cont.fillStyle = facet.color;
			cont.beginPath();
			cont.moveToPt(toScreen(data.transformedVertices[facet.verticeIndexes[0]]));
			for (var i = 0; i < facet.verticeIndexes.length; ++i) {
				cont.lineToPt(toScreen(data.transformedVertices[facet.verticeIndexes[i]]));
			}
			cont.lineToPt(toScreen(data.transformedVertices[facet.verticeIndexes[0]]));
			cont.fill();
			cont.stroke();
		}
	},
	
	facetVisible : function(facet) {
		with (this) {
			var a = data.transformedVertices[facet.verticeIndexes[0]];
			var b = data.transformedVertices[facet.verticeIndexes[1]];
			var c = data.transformedVertices[facet.verticeIndexes[2]];
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
				n.z * (this.view.projectionHeight - b.z);
			return product > 0;
		}
	}

};
