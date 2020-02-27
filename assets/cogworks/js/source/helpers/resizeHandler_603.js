define([],function(){
	return [function(require,module,exports){"use strict";var typeToCursor={n:"ns",e:"ew",s:"ns",w:"ew",nw:"nwse",ne:"nesw",se:"nwse",sw:"nesw"};module.exports=function resizeHandler(_ref){var type=_ref.type;var dimensions=_ref.dimensions;var onResize=_ref.onResize;var onResizeEnd=_ref.onResizeEnd;var panelsWereResized=false;var bodyClasses="";var startX=app.mousePosition.x;var startY=app.mousePosition.y;var reverseX=false;var reverseY=false;if(type.match("w")){reverseX=true}if(type.match("n")){reverseY=true}var scaleX=dimensions.scaleX||1;var scaleY=dimensions.scaleY||1;var initialWidth=dimensions.width;var initialHeight=dimensions.height;var minWidth=dimensions.minWidth||100;var minHeight=dimensions.minHeight||100;var maxWidth=dimensions.maxWidth||Infinity;var maxHeight=dimensions.maxHeight||Infinity;var newWidth=0;var newHeight=0;bodyClasses="resizing resizing-"+typeToCursor[type];bod.addClass(bodyClasses);app.on("mousemove.panel-resize",function(){var deltaX=scaleX*(app.mousePosition.x-startX);var deltaY=scaleY*(app.mousePosition.y-startY);newWidth=initialWidth+(reverseX?-deltaX:deltaX);newHeight=initialHeight+(reverseY?-deltaY:deltaY);if(onResize){var newSizes={};if(type.match(/e|w/)){if(newWidth>maxWidth){newWidth=maxWidth}else if(newWidth<minWidth){newWidth=minWidth}if(newWidth!==initialWidth){panelsWereResized=true;newSizes.width=newWidth}}if(type.match(/n|s/)){if(newHeight>maxHeight){newHeight=maxHeight}else if(newHeight<minHeight){newHeight=minHeight}if(newHeight!==initialHeight){panelsWereResized=true;newSizes.height=newHeight}}if(panelsWereResized){onResize(newSizes)}}});app.on("mouseup.panel-resize",stopResize);function stopResize(){bod.removeClass(bodyClasses);app.off(".panel-resize");onResizeEnd&&onResizeEnd(panelsWereResized);panelsWereResized=false}return{stopResize:stopResize}}},{}]
});