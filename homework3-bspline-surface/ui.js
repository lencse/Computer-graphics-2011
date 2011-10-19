/* 
 *  Document   : ui.js
 *  Created on : 2011.10.19. 08:56
 *  Author     : Lencse
 */

var ui = {

};

$(function() {
	$("#cpanel").dialog({
		title : "Control Panel",
		position : [500, 20],
		autoOpen : false,
		width : 350
	});
	$("#opencp-butt").button({
		icons : {primary : "ui-icon-wrench"},
		text : false,
		width : 16
	});
});

