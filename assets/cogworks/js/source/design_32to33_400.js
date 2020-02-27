define([],function(){
	return [function(require,module,exports){"use strict";var clone=require("clone");var assets={clean:{css:[{name:"https://cdnjs.cloudflare.com/ajax/libs/baguettebox.js/1.10.0/baguetteBox.min.css",properties:{},priority:0,url:"https://cdnjs.cloudflare.com/ajax/libs/baguettebox.js/1.10.0/baguetteBox.min.css"},{name:"smoothproducts.css",properties:{},priority:0,blocks:[{selector:"html, body",mediaQuery:false,system:false,rules:[{property:"height",value:"100%",enabled:true,system:false},{property:"width",value:"100%",enabled:true,system:false}]},{selector:".sp-loading",mediaQuery:false,system:false,rules:[{property:"text-align",value:"center",enabled:true,system:false},{property:"max-width",value:"270px",enabled:true,system:false},{property:"padding",value:"15px",enabled:true,system:false},{property:"border",value:"5px solid #eee",enabled:true,system:false},{property:"border-radius",value:"3px",enabled:true,system:false},{property:"font-size",value:"12px",enabled:true,system:false},{property:"color",value:"#888",enabled:true,system:false}]},{selector:".sp-wrap",mediaQuery:false,system:false,rules:[{property:"display",value:"none",enabled:true,system:false},{property:"line-height",value:"0",enabled:true,system:false},{property:"font-size",value:"0",enabled:true,system:false},{property:"background",value:"#eee",enabled:true,system:false},{property:"border",value:"5px solid #eee",enabled:true,system:false},{property:"border-radius",value:"3px",enabled:true,system:false},{property:"position",value:"relative",enabled:true,system:false},{property:"margin",value:"0 25px 15px 0",enabled:true,system:false},{property:"float",value:"left",enabled:true,system:false},{property:"max-width",value:"300px",enabled:true,system:false}]},{selector:".sp-thumbs",mediaQuery:false,system:false,rules:[{property:"text-align",value:"left",enabled:true,system:false},{property:"display",value:"inline-block",enabled:true,system:false}]},{selector:".sp-thumbs img",mediaQuery:false,system:false,rules:[{property:"min-height",value:"50px",enabled:true,system:false},{property:"min-width",value:"50px",enabled:true,system:false},{property:"max-width",value:"50px",enabled:true,system:false}]},{selector:".sp-thumbs a:link, .sp-thumbs a:visited",mediaQuery:false,system:false,rules:[{property:"width",value:"50px",enabled:true,system:false},{property:"height",value:"50px",enabled:true,system:false},{property:"overflow",value:"hidden",enabled:true,system:false},{property:"opacity",value:".3",enabled:true,system:false},{property:"display",value:"inline-block",enabled:true,system:false},{property:"background-size",value:"cover",enabled:true,system:false},{property:"background-position",value:"center",enabled:true,system:false},{property:"-webkit-transition",value:"all .2s ease-out",enabled:true,system:false},{property:"-moz-transition",value:"all .2s ease-out",enabled:true,system:false},{property:"-ms-transition",value:"all .2s ease-out",enabled:true,system:false},{property:"-o-transition",value:"all .2s ease-out",enabled:true,system:false},{property:"transition",value:"all .2s ease-out",enabled:true,system:false}]},{selector:".sp-thumbs a:hover",mediaQuery:false,system:false,rules:[{property:"opacity",value:"1",enabled:true,system:false}]},{selector:".sp-thumbs a:active, .sp-current",mediaQuery:false,system:false,rules:[{property:"opacity",value:"1!important",enabled:true,system:false},{property:"position",value:"relative",enabled:true,system:false}]},{selector:".sp-large",mediaQuery:false,system:false,rules:[{property:"position",value:"relative",enabled:true,system:false},{property:"overflow",value:"hidden",enabled:true,system:false},{property:"top",value:"0",enabled:true,system:false},{property:"left",value:"0",enabled:true,system:false}]},{selector:".sp-large a img",mediaQuery:false,system:false,rules:[{property:"max-width",value:"100%",enabled:true,system:false},{property:"height",value:"auto",enabled:true,system:false}]},{selector:".sp-large a",mediaQuery:false,system:false,rules:[{property:"display",value:"block",enabled:true,system:false}]},{selector:".sp-zoom",mediaQuery:false,system:false,rules:[{property:"position",value:"absolute",enabled:true,system:false},{property:"left",value:"-50%",enabled:true,system:false},{property:"top",value:"-50%",enabled:true,system:false},{property:"cursor",value:"-webkit-zoom-in",enabled:true,system:false},{property:"cursor",value:"-moz-zoom-in",enabled:true,system:false},{property:"cursor",value:"zoom-in",enabled:true,system:false},{property:"display",value:"none",enabled:true,system:false}]},{selector:".sp-lightbox",mediaQuery:false,system:false,rules:[{property:"position",value:"fixed",enabled:true,system:false},{property:"top",value:"0",enabled:true,system:false},{property:"left",value:"0",enabled:true,system:false},{property:"height",value:"100%",enabled:true,system:false},{property:"width",value:"100%",enabled:true,system:false},{property:"background",value:"rgb(0, 0, 0)",enabled:true,system:false},{property:"background",value:"rgba(0, 0, 0, .9)",enabled:true,system:false},{property:"z-index",value:"1031",enabled:true,system:false},{property:"display",value:"none",enabled:true,system:false},{property:"cursor",value:"pointer",enabled:true,system:false}]},{selector:".sp-lightbox img",mediaQuery:false,system:false,rules:[{property:"position",value:"absolute",enabled:true,system:false},{property:"margin",value:"auto",enabled:true,system:false},{property:"top",value:"0",enabled:true,system:false},{property:"bottom",value:"0",enabled:true,system:false},{property:"left",value:"0",enabled:true,system:false},{property:"right",value:"0",enabled:true,system:false},{property:"max-width",value:"90%",enabled:true,system:false},{property:"max-height",value:"90%",enabled:true,system:false},{property:"border",value:"2px solid #fff",enabled:true,system:false}]},{selector:"#sp-prev, #sp-next",mediaQuery:false,system:false,rules:[{property:"position",value:"absolute",enabled:true,system:false},{property:"top",value:"50%",enabled:true,system:false},{property:"margin-top",value:"-25px",enabled:true,system:false},{property:"z-index",value:"501",enabled:true,system:false},{property:"color",value:"#fff",enabled:true,system:false},{property:"padding",value:"14px",enabled:true,system:false},{property:"text-decoration",value:"none",enabled:true,system:false},{property:"background",value:"#000",enabled:true,system:false},{property:"border-radius",value:"25px",enabled:true,system:false},{property:"border",value:"2px solid #fff",enabled:true,system:false},{property:"width",value:"50px",enabled:true,system:false},{
property:"height",value:"50px",enabled:true,system:false},{property:"box-sizing",value:"border-box",enabled:true,system:false},{property:"transition",value:".2s",enabled:true,system:false}]},{selector:"#sp-prev",mediaQuery:false,system:false,rules:[{property:"left",value:"10px",enabled:true,system:false}]},{selector:"#sp-prev:before",mediaQuery:false,system:false,rules:[{property:"content",value:"''",enabled:true,system:false},{property:"border",value:"7px solid transparent",enabled:true,system:false},{property:"border-right",value:"15px solid #fff",enabled:true,system:false},{property:"position",value:"absolute",enabled:true,system:false},{property:"top",value:"16px",enabled:true,system:false},{property:"left",value:"7px",enabled:true,system:false}]},{selector:"#sp-next",mediaQuery:false,system:false,rules:[{property:"right",value:"10px",enabled:true,system:false}]},{selector:"#sp-next:before",mediaQuery:false,system:false,rules:[{property:"content",value:"''",enabled:true,system:false},{property:"border",value:"7px solid transparent",enabled:true,system:false},{property:"border-left",value:"15px solid white",enabled:true,system:false},{property:"position",value:"absolute",enabled:true,system:false},{property:"top",value:"16px",enabled:true,system:false},{property:"left",value:"18px",enabled:true,system:false}]},{selector:"#sp-prev:hover, #sp-next:hover",mediaQuery:false,system:false,rules:[{property:"background",value:"#444",enabled:true,system:false}]},{selector:".sp-wrap",mediaQuery:"screen and (max-width: 400px)",system:false,rules:[{property:"margin",value:"0 0 15px 0",enabled:true,system:false}]},{selector:"#sp-prev, #sp-next",mediaQuery:"screen and (max-width: 400px)",system:false,rules:[{property:"top",value:"auto",enabled:true,system:false},{property:"margin-top",value:"0",enabled:true,system:false},{property:"bottom",value:"25px",enabled:true,system:false}]}]}],js:[{name:"https://cdnjs.cloudflare.com/ajax/libs/baguettebox.js/1.10.0/baguetteBox.min.js",priority:3,properties:{},url:"https://cdnjs.cloudflare.com/ajax/libs/baguettebox.js/1.10.0/baguetteBox.min.js"},{name:"smoothproducts.min.js",properties:{},priority:2,value:'!function(a){a.fn.extend({smoothproducts:function(){function b(){a(".sp-selected").removeClass("sp-selected"),a(".sp-lightbox").fadeOut(function(){a(this).remove()})}function c(a){return a.match(/url\\([\\"\\\']{0,1}(.+)[\\"\\\']{0,1}\\)+/i)[1]}a(".sp-loading").hide(),a(".sp-wrap").each(function(){a(this).addClass("sp-touch");var b=a("a",this).length;if(b>1){var c,d,e=a("a.sp-default",this)[0]?!0:!1;a(this).append(\'<div class="sp-large"></div><div class="sp-thumbs sp-tb-active"></div>\'),a("a",this).each(function(b){var f=a("img",this).attr("src"),g=a(this).attr("href"),h="";(0===b&&!e||a(this).hasClass("sp-default"))&&(h=\' class="sp-current"\',c=g,d=a("img",this)[0].src),a(this).parents(".sp-wrap").find(".sp-thumbs").append(\'<a href="\'+g+\'" style="background-image:url(\'+f+\')"\'+h+"></a>"),a(this).remove()}),a(".sp-large",this).append(\'<a href="\'+c+\'" class="sp-current-big"><img src="\'+d+\'" alt="" /></a>\'),a(".sp-wrap").css("display","inline-block")}else a(this).append(\'<div class="sp-large"></div>\'),a("a",this).appendTo(a(".sp-large",this)).addClass(".sp-current-big"),a(".sp-wrap").css("display","inline-block")}),a(document.body).on("click",".sp-thumbs",function(a){a.preventDefault()}),a(document.body).on("mouseover",function(b){a(".sp-wrap").removeClass("sp-touch").addClass("sp-non-touch"),b.preventDefault()}),a(document.body).on("touchstart",function(){a(".sp-wrap").removeClass("sp-non-touch").addClass("sp-touch")}),a(document.body).on("click",".sp-tb-active a",function(b){b.preventDefault(),a(this).parent().find(".sp-current").removeClass(),a(this).addClass("sp-current"),a(this).parents(".sp-wrap").find(".sp-thumbs").removeClass("sp-tb-active"),a(this).parents(".sp-wrap").find(".sp-zoom").remove();var d=a(this).parents(".sp-wrap").find(".sp-large").height(),e=a(this).parents(".sp-wrap").find(".sp-large").width();a(this).parents(".sp-wrap").find(".sp-large").css({overflow:"hidden",height:d+"px",width:e+"px"}),a(this).addClass("sp-current").parents(".sp-wrap").find(".sp-large a").remove();var f=a(this).parent().find(".sp-current").attr("href"),g=c(a(this).parent().find(".sp-current").css("backgroundImage"));a(this).parents(".sp-wrap").find(".sp-large").html(\'<a href="\'+f+\'" class="sp-current-big"><img src="\'+g+\'"/></a>\'),a(this).parents(".sp-wrap").find(".sp-large").hide().fadeIn(250,function(){var b=a(this).parents(".sp-wrap").find(".sp-large img").height();a(this).parents(".sp-wrap").find(".sp-large").animate({height:b},"fast",function(){a(".sp-large").css({height:"auto",width:"auto"})}),a(this).parents(".sp-wrap").find(".sp-thumbs").addClass("sp-tb-active")})}),a(document.body).on("mouseenter",".sp-non-touch .sp-large",function(b){var c=a("a",this).attr("href");a(this).append(\'<div class="sp-zoom"><img src="\'+c+\'"/></div>\'),a(this).find(".sp-zoom").fadeIn(250),b.preventDefault()}),a(document.body).on("mouseleave",".sp-non-touch .sp-large",function(b){a(this).find(".sp-zoom").fadeOut(250,function(){a(this).remove()}),b.preventDefault()}),a(document.body).on("click",".sp-non-touch .sp-zoom",function(b){var c=a(this).html(),d=a(this).parents(".sp-wrap").find(".sp-thumbs a").length,e=a(this).parents(".sp-wrap").find(".sp-thumbs .sp-current").index()+1;a(this).parents(".sp-wrap").addClass("sp-selected"),a("body").append("<div class=\'sp-lightbox\' data-currenteq=\'"+e+"\'>"+c+"</div>"),d>1&&(a(".sp-lightbox").append("<a href=\'#\' id=\'sp-prev\'></a><a href=\'#\' id=\'sp-next\'></a>"),1==e?a("#sp-prev").css("opacity",".1"):e==d&&a("#sp-next").css("opacity",".1")),a(".sp-lightbox").fadeIn(),b.preventDefault()}),a(document.body).on("click",".sp-large a",function(b){var c=a(this).attr("href"),d=a(this).parents(".sp-wrap").find(".sp-thumbs a").length,e=a(this).parents(".sp-wrap").find(".sp-thumbs .sp-current").index()+1;a(this).parents(".sp-wrap").addClass("sp-selected"),a("body").append(\'<div class="sp-lightbox" data-currenteq="\'+e+\'"><img src="\'+c+\'"/></div>\'),d>1&&(a(".sp-lightbox").append("<a href=\'#\' id=\'sp-prev\'></a><a href=\'#\' id=\'sp-next\'></a>"),1==e?a("#sp-prev").css("opacity",".1"):e==d&&a("#sp-next").css("opacity",".1")),a(".sp-lightbox").fadeIn(),b.preventDefault()}),a(document.body).on("click","#sp-next",function(b){b.stopPropagation();var d=a(".sp-lightbox").data("currenteq"),e=a(".sp-selected .sp-thumbs a").length;if(d>=e);else{var f=d+1,g=a(".sp-selected .sp-thumbs").find("a:eq("+d+")").attr("href"),h=c(a(".sp-selected .sp-thumbs").find("a:eq("+d+")").css("backgroundImage"));d==e-1&&a("#sp-next").css("opacity",".1"),a("#sp-prev").css("opacity","1"),a(".sp-selected .sp-current").removeClass(),a(".sp-selected .sp-thumbs a:eq("+d+")").addClass("sp-current"),a(".sp-selected .sp-large").empty().append("<a href="+g+\'><img src="\'+h+\'"/></a>\'),a(".sp-lightbox img").fadeOut(250,function(){a(this).remove(),a(".sp-lightbox").data("currenteq",f).append(\'<img src="\'+g+\'"/>\'),a(".sp-lightbox img").hide().fadeIn(250)})}b.preventDefault()}),a(document.body).on("click","#sp-prev",function(b){b.stopPropagation();var d=a(".sp-lightbox").data("currenteq"),d=d-1;if(0>=d);else{1==d&&a("#sp-prev").css("opacity",".1");var e=d-1,f=a(".sp-selected .sp-thumbs").find("a:eq("+e+")").attr("href"),g=c(a(".sp-selected .sp-thumbs").find("a:eq("+e+")").css("backgroundImage"));a("#sp-next").css("opacity","1"),a(".sp-selected .sp-current").removeClass(),a(".sp-selected .sp-thumbs a:eq("+e+")").addClass("sp-current"),a(".sp-selected .sp-large").empty().append("<a href="+f+\'><img src="\'+g+\'"/></a>\'),a(".sp-lightbox img").fadeOut(250,function(){a(this).remove(),a(".sp-lightbox").data("currenteq",d).append(\'<img src="\'+f+\'"/>\'),a(".sp-lightbox img").hide().fadeIn(250)})}b.preventDefault()}),a(document.body).on("click",".sp-lightbox",function(){b()}),a(document).keydown(function(a){return 27==a.keyCode?(b(),!1):void 0}),a(".sp-large").mousemove(function(b){var c=a(this).width(),d=a(this).height(),e=a(this).find(".sp-zoom").width(),f=a(this).find(".sp-zoom").height(),g=a(this).parent().offset(),h=b.pageX-g.left,i=b.pageY-g.top,j=Math.floor(h*(c-e)/c),k=Math.floor(i*(d-f)/d);a(this).find(".sp-zoom").css({left:j,top:k})})}})}(jQuery);'},{name:"theme.js",priority:1,properties:{},value:"// Custom theme code\n\nif ($('.clean-gallery').length > 0) {\n   baguetteBox.run('.clean-gallery', { animation: 'slideIn'});\n}\n\nif ($('.clean-product').length > 0) {\n    $(window).on(\"load\",function() {\n        $('.sp-wrap').smoothproducts();\n    });\n}\n\n"}]},"material-portfolio":{css:[{name:"https://cdnjs.cloudflare.com/ajax/libs/pikaday/1.6.1/css/pikaday.min.css",properties:{},priority:0,url:"https://cdnjs.cloudflare.com/ajax/libs/pikaday/1.6.1/css/pikaday.min.css"}],js:[{name:"https://cdnjs.cloudflare.com/ajax/libs/pikaday/1.6.1/pikaday.min.js",properties:{},priority:0,url:"https://cdnjs.cloudflare.com/ajax/libs/pikaday/1.6.1/pikaday.min.js"},{name:"theme.js",properties:{},priority:0,value:"$('.datepicker').each(function(){\n\tvar picker = new Pikaday({\n\t\tfield: this\n\t});\n});"}]}};module.exports=function convert(json){var theme=json.design.settings.theme;if(theme.type==="template"){var newAssets=clone(assets[theme.id]);addAssets(json,newAssets,"css");addAssets(json,newAssets,"js");if(theme.id==="clean"){theme.id="clean-sky"}}json.version=33;return json};function parseName(string,ext){var re=new RegExp("(?:.min)?."+ext+"$");var match=re.exec(string);var parsed={name:string,ext:""};if(match){parsed.ext=match[0];parsed.name=string.replace(match[0],"")}return parsed}function getUniqueName(fullName,ext,arr){var parsedName=parseName(fullName,ext);var newName;var i=1;do{newName=parsedName.name+"-"+i+++parsedName.ext}while(arr.find(function(el){return el.name===newName}));return newName}function addAssets(json,newAssets,type){var designAssets=json.design.assets[type].children;var _iteratorNormalCompletion=true;var _didIteratorError=false;var _iteratorError=undefined;try{for(var _iterator=newAssets[type][Symbol.iterator](),_step;!(_iteratorNormalCompletion=(_step=_iterator.next()).done);_iteratorNormalCompletion=true){var asset=_step.value;if(designAssets.find(function(el){return el.name===asset.name})){if(asset.url)continue;asset.name=getUniqueName(asset.name,type,designAssets)}designAssets.push(asset)}}catch(err){_didIteratorError=true;_iteratorError=err}finally{try{if(!_iteratorNormalCompletion&&_iterator["return"]){_iterator["return"]()}}finally{if(_didIteratorError){throw _iteratorError}}}}},{"clone":739}]
});