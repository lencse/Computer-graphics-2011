/* 
 *  Document   : ui.js
 *  Created on : 2011.10.04. 22:42
 *  Author     : Lencse
 */

var ui = {
	
	addControlPointAnchor : function(x, y) {
		var np = $("<div class=\"cpoint\"></div>");
		$(np).css("position", "absolute").
				css("left", x + 12 - 4 + "px").
				css("top", y + 12 - 4 + "px");
		//TODO: remove hardcode
		$(np).draggable({
			containment : "#canv",
			scroll : false,
			stack : ".cpoint",
			start : function(e, ui) {
				$(e.target).addClass("cpoint-dragging")
			},
			stop : function(e, ui) {
				$(e.target).removeClass("cpoint-dragging")
			},
		});
		var num = app.data.controlPointAnchors.length;
		$("#canv-cont").append($(np));
		var c = $("\
			<div id=\"p" + num + "\">\
				<h3>p" + num + ":</h3>\
				<p>w: <label class=\"weight-label\"></label></p>\
				<div class=\"weight-slider\"></div>\
				<p>u: <label class=\"knot-label\"></label></p>\
				<div class=\"knot-slider\"></div>\
			</div>\
		");
		$("#cpanel").append($(c));
		var self = this;
		$("#p" + num + " .weight-slider").slider({
			min : 0,
			max : 6,
			step : 0.1,
			slide : function(e, ui) {
				app.data.weights[$(e.target).attr("point")] = 
					$(e.target).slider("option", "value");
				self.updateSliders();
			}
		}).attr("point", num);
		$("#p" + num + " .knot-slider").slider({
			step : 0.1,
			slide : function(e, ui) {
				app.data.knots[$(e.target).attr("point")] = 
					$(e.target).slider("option", "value");
				self.updateSliders();
			}
		}).attr("point", num);
		return np;
	},
	
	updateSliders : function() {
		with (app.data) {
			var i;
			for (i = 0; i < weights.length; ++i) {
				$("#p" + i + " .weight-label").html(weights[i]);
				$("#p" + i + " .weight-slider").slider("option", "value", weights[i]);
			}
			$("#p" + 0 + " .knot-label").html(knots[0]);
			$("#p" + 0 + " .knot-slider").slider("option", "disabled", true);
			$("#p" + (knots.length - 1) + " .knot-label").html(knots[knots.length - 1]);
			$("#p" + (knots.length - 1) + " .knot-slider").slider("option", "disabled", true);
			for (i = 1; i < knots.length - 1; ++i) {
				$("#p" + i + " .knot-label").html(knots[i]);
				$("#p" + i + " .knot-slider").slider("option", "min", knots[i - 1]).
														slider("option", "max", knots[i + 1]).
														slider("option", "value", knots[i]).
														slider("option", "disabled", false);
			}
		}
	}
	
};

$(function() {
	$("#cpanel").dialog({
		title : "Control Panel",
		position : [500, 20],
		autoOpen : true,
		width : 350
	});
	$("#opencp-butt").button({
		icons : {primary : "ui-icon-wrench"},
		text : false,
		width : 16
	});
});

$("#opencp-butt").click(function(e, ui) {
	$("#cpanel").dialog($("#cpanel").dialog("isOpen") ? "close" : "open");
});

$("#canv").click(function(e, ui) {
	if (e.shiftKey) {
		app.addControlPoint(e.clientX, e.clientY);
	}
});