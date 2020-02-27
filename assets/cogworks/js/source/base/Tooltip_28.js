define([],function(){
	return [function(require,module,exports){"use strict";var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}var pointInTriangle=require("point-in-triangle");var Tooltip=function(){function Tooltip(options){_classCallCheck(this,Tooltip);this.x=0;this.y=0;this.position="left";this.className=options["class"]||"";this.renderFunc=null;this.enabled=true;this.visible=false;this.interactive=false;this.showTimeout=null;this.hideTimeout=null;this.showDelayTime=options.showDelayTime||50;this.hideDelayTime=options.showDelayTime||200;this.target=null;this.coverTriangle=null;app.on("context-menu-show",this.disable.bind(this));app.on("drag-start",this.disable.bind(this));app.on("context-menu-hide",this.enable.bind(this));app.on("drag-end",this.enable.bind(this));app.on("resize",this.hide.bind(this));this.element=$('<div class="tooltip">').hide().appendTo("body");this.element.on("mouseenter",this.mouseenter.bind(this));this.element.on("mouseleave",this.mouseleave.bind(this));this.element.on("mousemove",".cover",this.coverMousemove.bind(this));this.element.on("mouseleave",".cover",this.coverMouseleave.bind(this))}_createClass(Tooltip,[{key:"getTarget",value:function getTarget(){return this.target}},{key:"coverMousemove",value:function coverMousemove(e){if(!this.interactive)return;if(this.position=="left"&&this.x+5>app.mousePosition.x)return;if(this.position=="right"&&this.x-5<app.mousePosition.x)return;if(!this.coverTriangle){var rect=e.target.getBoundingClientRect();if(this.position=="left"){this.coverTriangle=[app.mousePosition.add(2,0).toArray(),[rect.left,rect.top],[rect.left,rect.bottom]]}else{this.coverTriangle=[app.mousePosition.subtract(2,0).toArray(),[rect.right,rect.top],[rect.right,rect.bottom]]}return}if(!pointInTriangle(app.mousePosition.toArray(),this.coverTriangle)){this.hideCovers()}}},{key:"coverMouseleave",value:function coverMouseleave(){this.coverTriangle=null}},{key:"hideCovers",value:function hideCovers(){this.element.find(".cover").hide()}},{key:"mouseenter",value:function mouseenter(e){if(this.interactive){clearTimeout(this.showTimeout);clearTimeout(this.hideTimeout)}}},{key:"mouseleave",value:function mouseleave(e){if(this.interactive){this.hideDelay()}}},{key:"isVisible",value:function isVisible(){return this.visible}},{key:"show",value:function show(element,options){if(element==this.target){return}clearTimeout(this.showTimeout);clearTimeout(this.hideTimeout);if(!this.enabled)return;if(this.deactivateFunc){this.deactivateFunc()}this.x=options.x;this.y=options.y;this.renderFunc=options.render;this.activateFunc=options.activate||null;this.deactivateFunc=options.deactivate||null;this.coverTriangle=null;this.position=options.position||"left";this.target=element;this.visible=true;this.interactive=options.interactive||false;this.element.fadeIn("fast");this.update();if(this.activateFunc){this.activateFunc()}}},{key:"hide",value:function hide(){clearTimeout(this.showTimeout);clearTimeout(this.hideTimeout);this.element.hide();this.visible=false;this.target=null;this.renderFunc=null;if(this.deactivateFunc)this.deactivateFunc();this.activateFunc=null;this.deactivateFunc=null}},{key:"showDelay",value:function showDelay(element,options){clearTimeout(this.showTimeout);clearTimeout(this.hideTimeout);if(this.visible){this.show(element,options);return}this.showTimeout=setTimeout(this.show.bind(this,element,options),this.showDelayTime)}},{key:"hideDelay",value:function hideDelay(){clearTimeout(this.showTimeout);clearTimeout(this.hideTimeout);this.hideTimeout=setTimeout(this.hide.bind(this),this.hideDelayTime)}},{key:"enable",value:function enable(){this.enabled=true}},{key:"disable",value:function disable(){this.enabled=false;this.hide()}},{key:"update",value:function update(){if(!this.isVisible())return;this.element.removeClass("left right bottom top");this.element.css({left:this.x,top:this.y});this.element.addClass(this.className);this.element.addClass(this.position);this.element.html(this.renderFunc(this.target));var rect=this.element[0].getBoundingClientRect();var targetRect=this.target.getBoundingClientRect();if(this.position=="left"){this.element.css({marginLeft:-rect.width-4})}else{this.element.css({marginLeft:8})}if(window.innerHeight-rect.bottom<20){this.element.addClass("bottom")}else{var marginTop=-this.element.outerHeight()/2;if(this.y+marginTop<10){this.element.addClass("top")}else{this.element.css({marginTop:marginTop})}}rect=this.element[0].getBoundingClientRect();if(this.interactive){var topCover=$('<div class="cover top">');var bottomCover=$('<div class="cover bottom">');topCover.css({width:targetRect.width,left:-targetRect.width,height:targetRect.top-rect.top});bottomCover.css({width:targetRect.width,left:-targetRect.width,height:rect.bottom-targetRect.bottom});this.element.append(topCover).append(bottomCover)}}}]);return Tooltip}();module.exports=Tooltip},{"point-in-triangle":1089}]
});