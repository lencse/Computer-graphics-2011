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
			/*drag : function(e, ui) {
				//console.log($(this).offset());
			}*/
		});
		$("#canv-cont").append($(np));
		return np;
	}
	
};

$(function() {
	$("#cpanel").dialog({
		title : "Control Panel",
		position : [0, 0],
		autoOpen : false,
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