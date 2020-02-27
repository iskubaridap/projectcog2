define([],function(){
	return [function(require,module,exports){"use strict";exports.forbiddenProperties=["direction"];var propertyWeights={"align-content":57,"align-items":129,"align-self":55,animation:175,"animation-delay":114,"animation-direction":113,"animation-duration":137,"animation-fill-mode":132,"animation-iteration-count":124,"animation-name":139,"animation-play-state":104,"animation-timing-function":141,"backface-visibility":123,background:260,"background-attachment":119,"background-clip":165,"background-color":259,"background-image":246,"background-origin":107,"background-position":237,"background-position-x":108,"background-position-y":93,"background-repeat":234,"background-size":203,border:263,"border-bottom":233,"border-bottom-color":190,"border-bottom-left-radius":186,"border-bottom-right-radius":185,"border-bottom-style":150,"border-bottom-width":179,"border-collapse":209,"border-color":226,"border-image":89,"border-image-outset":50,"border-image-repeat":49,"border-image-slice":58,"border-image-source":32,"border-image-width":52,"border-left":221,"border-left-color":174,"border-left-style":142,"border-left-width":172,"border-radius":224,"border-right":223,"border-right-color":182,"border-right-style":130,"border-right-width":178,"border-spacing":198,"border-style":206,"border-top":231,"border-top-color":192,"border-top-left-radius":187,"border-top-right-radius":189,"border-top-style":152,"border-top-width":180,"border-width":214,bottom:227,"box-shadow":213,"box-sizing":216,"caption-side":96,clear:229,clip:173,"clip-rule":5,color:256,content:219,"counter-increment":111,"counter-reset":110,cursor:250,direction:176,display:262,"empty-cells":99,fill:140,"fill-opacity":82,"fill-rule":22,filter:160,flex:133,"flex-basis":66,"flex-direction":85,"flex-flow":94,"flex-grow":112,"flex-shrink":61,"flex-wrap":68,float:252,font:211,"font-family":254,"font-kerning":18,"font-size":264,"font-stretch":77,"font-style":220,"font-variant":161,"font-weight":257,height:266,"image-rendering":90,"justify-content":127,left:248,"letter-spacing":188,"line-height":244,"list-style":215,"list-style-image":145,"list-style-position":149,"list-style-type":199,margin:267,"margin-bottom":241,"margin-left":243,"margin-right":238,"margin-top":253,mask:20,"max-height":205,"max-width":225,"min-height":217,"min-width":218,"object-fit":33,opacity:251,order:117,orphans:146,outline:222,"outline-color":153,"outline-offset":147,"outline-style":151,"outline-width":148,overflow:255,"overflow-wrap":105,"overflow-x":184,"overflow-y":196,padding:265,"padding-bottom":230,"padding-left":235,"padding-right":232,"padding-top":240,page:8,"page-break-after":120,"page-break-before":69,"page-break-inside":121,perspective:92,"perspective-origin":103,"pointer-events":183,position:261,quotes:158,resize:168,right:245,"shape-rendering":38,size:64,speak:118,src:170,"stop-color":42,"stop-opacity":31,stroke:98,"stroke-dasharray":36,"stroke-dashoffset":3,"stroke-linecap":30,"stroke-linejoin":21,"stroke-miterlimit":12,"stroke-opacity":34,"stroke-width":87,"table-layout":171,"tab-size":46,"text-align":260,"text-anchor":35,"text-decoration":247,"text-indent":207,"text-overflow":204,"text-rendering":155,"text-shadow":208,"text-transform":202,top:258,"touch-action":80,transform:181,"transform-origin":162,"transform-style":86,transition:193,"transition-delay":134,"transition-duration":135,"transition-property":131,"transition-timing-function":122,"unicode-bidi":156,"unicode-range":136,"vertical-align":236,visibility:242,"white-space":228,widows:115,width:268,"will-change":74,"word-break":166,"word-spacing":157,"word-wrap":197,"writing-mode":41,"z-index":239,zoom:200};exports.validProperties=["align-content","align-items","align-self","animation","animation-delay","animation-direction","animation-duration","animation-fill-mode","animation-iteration-count","animation-name","animation-play-state","animation-timing-function","backface-visibility","background","background-attachment","background-blend-mode","background-clip","background-color","background-image","background-origin","background-position","background-repeat","background-size","border","border-bottom","border-bottom-color","border-bottom-left-radius","border-bottom-right-radius","border-bottom-style","border-bottom-width","border-collapse","border-color","border-image","border-image-outset","border-image-repeat","border-image-slice","border-image-source","border-image-width","border-left","border-left-color","border-left-style","border-left-width","border-radius","border-right","border-right-color","border-right-style","border-right-width","border-spacing","border-style","border-top","border-top-color","border-top-left-radius","border-top-right-radius","border-top-style","border-top-width","border-width","bottom","box-shadow","box-sizing","caption-side","clear","clip","color","column-count","column-fill","column-gap","column-rule","column-rule-color","column-rule-style","column-rule-width","column-span","column-width","columns","content","counter-increment","counter-reset","cursor","direction","display","empty-cells","filter","flex","flex-basis","flex-direction","flex-flow","flex-grow","flex-shrink","flex-wrap","float","font","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-variant-caps","font-variant-numeric","font-weight","hanging-punctuation","height","hyphens","icon","justify-content","left","letter-spacing","line-height","list-style","list-style-image","list-style-position","list-style-type","margin","margin-bottom","margin-left","margin-right","margin-top","max-height","max-width","min-height","min-width","mix-blend-mode","nav-down","nav-index","nav-left","nav-right","nav-up","object-fit","opacity","order","orphans","outline","outline-color","outline-offset","outline-style","outline-width","overflow","overflow-x","overflow-y","padding","padding-bottom","padding-left","padding-right","padding-top","page-break-after","page-break-before","page-break-inside","perspective","perspective-origin","position","quotes","resize","right","tab-size","table-layout","text-align","text-align-last","text-decoration","text-decoration-color","text-decoration-line","text-decoration-style","text-indent","text-justify","text-overflow","text-shadow","text-size-adjust","text-transform","top","transform","transform-origin","transform-style","transition","transition-delay","transition-duration","transition-property","transition-timing-function","unicode-bidi","vertical-align","visibility","white-space","widows","width","word-break","word-spacing","word-wrap","writing-mode","z-index","grid","grid-template-columns","grid-template-rows","grid-template-areas","grid-template","grid-column-gap","grid-row-gap","grid-gap","grid-auto-columns","grid-auto-rows","grid-auto-flow","grid-column-start","grid-column-end","grid-row-start","grid-row-end","grid-column","grid-row","grid-area","tap-highlight-color","user-select","contain","caret-color","line-break","pointer-events","clip-path"].sort(function(a,b){return(propertyWeights[b]||0)-(propertyWeights[a]||0)});exports.propertyValues={"align-content":["center","start","end","flex-start","flex-end","space-around","space-between","space-evenly","stretch","baseline","safe","unsafe","normal"],"align-items":["center","start","flex-start","flex-end","self-start","self-end","baseline","end","stretch","safe","unsafe","normal"],"align-self":["center","start","end","flex-start","flex-end","self-start","self-end","stretch","baseline","auto","safe","unsafe","normal"],"alignment-baseline":["after-edge","alphabetic","auto","baseline","before-edge","central","hanging","ideographic","mathematical","middle","text-after-edge","text-before-edge"],"animation-direction":["alternate","alternate-reverse","normal","reverse"],"animation-fill-mode":["backwards","both","forwards","none"],"animation-play-state":["paused","running"],"animation-timing-function":["cubic-bezier","ease","ease-in","ease-in-out","ease-out","linear","step-end","step-start","steps"],"background-clip":["border-box","content-box","padding-box"],"background-blend-mode":["color","color-burn","color-dodge","darken","difference","exclusion","hard-light","hue","lighten","luminosity","multiply","normal","overlay","saturation","screen","soft-light"],"background-origin":["border-box","content-box","padding-box"],"background-repeat":["no-repeat","repeat","repeat-x","repeat-y","round","space"],"background-size":["contain","cover"],"baseline-shift":["baseline","sub","super"],border:["dashed","dotted","double","groove","hidden","inset","none","outset","ridge","solid"],"border-bottom-style":["dashed","dotted","double","groove","hidden","inset","none","outset","ridge","solid"],"border-bottom-width":["medium","thick","thin"],"border-collapse":["collapse","separate"],"border-image":["repeat","stretch"],"border-left-style":["dashed","dotted","double","groove","hidden","inset","none","outset","ridge","solid"],"border-left-width":["medium","thick","thin"],"border-right-style":["dashed","dotted","double","groove","hidden","inset","none","outset","ridge","solid"],"border-right-width":["medium","thick","thin"],"border-style":["dashed","dotted","double","groove","hidden","inset","none","outset","ridge","solid"],"border-top-style":["dashed","dotted","double","groove","hidden","inset","none","outset","ridge","solid"],"border-top-width":["medium","thick","thin"],"border-width":["medium","thick","thin"],"box-align":["baseline","center","end","start","stretch"],"box-direction":["normal","reverse"],"box-lines":["multiple","single"],"box-orient":["block-axis","horizontal","inline-axis","vertical"],"box-reflect":["above","below","left","right"],"box-shadow":["inset","none"],"box-sizing":["border-box","content-box"],"caption-side":["bottom","top"],clear:["both","left","none","right"],"clip-path":["none","unset"],"clip-rule":["evenodd","nonzero"],"color-interpolation":["linearrgb"],"color-rendering":["auto","optimizeQuality","optimizeSpeed"],"column-fill":["auto","balance"],content:["close-quote","list-item","no-close-quote","no-open-quote","open-quote"],cursor:["alias","all-scroll","auto","cell","col-resize","context-menu","copy","crosshair","default","e-resize","ew-resize","help","move","n-resize","ne-resize","nesw-resize","no-drop","none","not-allowed","ns-resize","nw-resize","nwse-resize","pointer","progress","row-resize","s-resize","se-resize","sw-resize","text","vertical-text","w-resize","wait"],direction:["ltr","rtl"],display:["block","flex","flow","flow-root","grid","inline","inline-block","inline-flex","inline-grid","inline-table","list-item","none","run-in","subgrid","table","table-caption","table-cell","table-column","table-column-group","table-footer-group","table-header-group","table-row","table-row-group"],"dominant-baseline":["alphabetic","auto","central","hanging","ideographic","mathematical","middle","no-change","reset-size","text-after-edge","text-before-edge","use-script"],"empty-cells":["hide","show"],"enable-background":["accumulate","new"],filter:["blur","brightness","contrast","drop-shadow","grayscale","hue-rotate","invert","opacity","saturate","sepia"],"flex-basis":["auto","fill","max-content","min-content","fit-content","content"],"flex-direction":["column","column-reverse","row","row-reverse"],"flex-flow":["row","row-reverse","column","column-reverse","nowrap","wrap","wrap-reverse"],"flex-wrap":["nowrap","wrap","wrap-reverse"],float:["left","none","right"],"font-family":["cursive","fantasy","monospace","sans-serif","serif"],"font-size":["large","larger","medium","small","smaller","x-large","x-small","xx-large","xx-small"],"font-stretch":["condensed","expanded","extra-condensed","extra-expanded","narrower","normal","semi-condensed","semi-expanded","ultra-condensed","ultra-expanded","wider"],"font-style":["italic","normal","oblique"],"font-variant":["normal","small-caps"],"font-variant-caps":["normal","small-caps","all-small-caps","petite-caps","all-petite-caps","unicase","titling-caps"],"font-variant-numeric":["normal","ordinal","slashed-zero","lining-nums","oldstyle-nums","proportional-nums","tabular-nums","diagonal-fractions","stacked-fractions","oldstyle-nums","stacked-fractions"],"font-weight":["100","200","300","400","500","600","700","800","900","bold","bolder","lighter","normal"],"grid-auto-flow":["row","column","row dense","column dense"],hyphens:["auto","none","manual"],"image-rendering":["auto","optimizeQuality","optimizeSpeed","pixelated"],"image-resolution":["from-image","snap"],"justify-content":["center","start","end","flex-start","flex-end","left","right","baseline","space-between","space-around","space-evenly","stretch","safe","unsafe","normal"],"justify-self":["center","start","end","flex-start","flex-end","self-start","self-end","left","right","stretch","auto","normal"],"letter-spacing":["normal"],"line-height":["normal"],"list-style-image":["none"],"list-style-position":["hanging","inside","outside"],
"list-style-type":["afar","amharic","amharic-abegede","arabic-indic","armenian","asterisks","bengali","binary","cambodian","circle","cjk-earthly-branch","cjk-heavenly-stem","cjk-ideographic","decimal","decimal-leading-zero","devanagari","disc","ethiopic","ethiopic-abegede","ethiopic-abegede-am-et","ethiopic-abegede-gez","ethiopic-abegede-ti-er","ethiopic-abegede-ti-et","ethiopic-halehame-aa-er","ethiopic-halehame-aa-et","ethiopic-halehame-am-et","ethiopic-halehame-gez","ethiopic-halehame-om-et","ethiopic-halehame-sid-et","ethiopic-halehame-so-et","ethiopic-halehame-ti-er","ethiopic-halehame-ti-et","ethiopic-halehame-tig","footnotes","georgian","gujarati","gurmukhi","hangul","hangul-consonant","hebrew","hiragana","hiragana-iroha","inline","kannada","katakana","katakana-iroha","khmer","lao","lower-alpha","lower-armenian","lower-greek","lower-hexadecimal","lower-latin","lower-norwegian","lower-roman","malayalam","mongolian","myanmar","none","octal","oriya","oromo","persian","sidama","somali","square","telugu","thai","tibetan","tigre","tigrinya-er","tigrinya-er-abegede","tigrinya-et","tigrinya-et-abegede","upper-alpha","upper-armenian","upper-greek","upper-hexadecimal","upper-latin","upper-norwegian","upper-roman","urdu"],margin:["auto"],"margin-after-collapse":["collapse","discard","separate"],"margin-before-collapse":["collapse","discard","separate"],"margin-bottom":["auto"],"margin-bottom-collapse":["collapse","discard","separate"],"margin-left":["auto"],"margin-right":["auto"],"margin-top":["auto"],"margin-top-collapse":["collapse","discard","separate"],"max-height":["none"],"max-width":["none"],"mix-blend-mode":["color","color-burn","color-dodge","darken","difference","exclusion","hard-light","hue","lighten","luminosity","multiply","normal","overlay","saturation","screen","soft-light"],"object-fit":["fill","contain","cover","none","scale-down"],outline:["dashed","dotted","double","groove","hidden","inset","none","outset","ridge","solid"],"outline-color":["invert"],"outline-style":["dashed","dotted","double","groove","hidden","inset","none","outset","ridge","solid"],"outline-width":["medium","thick","thin"],overflow:["auto","hidden","overlay","scroll","visible"],"overflow-wrap":["break-word","normal"],"overflow-x":["auto","hidden","overlay","scroll","visible"],"overflow-y":["auto","hidden","overlay","scroll","visible"],"page-break-after":["always","auto","avoid","left","right"],"page-break-before":["always","auto","avoid","left","right"],"page-break-inside":["auto","avoid"],perspective:["none"],"perspective-origin":["bottom","center","left","right","top"],"pointer-events":["all","auto","bounding-box","fill","none","painted","stroke","visible","visiblefill","visiblepainted","visiblestroke"],position:["absolute","fixed","relative","static","sticky"],resize:["both","horizontal","none","vertical"],size:["a3","a4","a5","b4","b5","landscape","ledger","legal","letter","portrait"],speak:["digits","literal-punctuation","no-punctuation","none","normal","spell-out"],"stroke-linejoin":["bevel","miter","round"],"table-layout":["auto","fixed"],"text-align":["center","end","justify","left","right","start"],"text-align-last":["auto","center","end","justify","left","right","start"],"text-decoration":["blink","line-through","overline","underline"],"text-overflow":["clip","ellipsis"],"text-overflow-mode":["clip","ellipsis"],"text-rendering":["auto","geometricPrecision","optimizeLegibility","optimizeSpeed"],"text-transform":["capitalize","lowercase","none","uppercase"],transform:["matrix","matrix3d","perspective","rotate","rotate3d","rotateX","rotateY","rotateZ","scale","scale3d","scaleX","scaleY","skew","skewX","skewY","translate","translate3d","translateX","translateY","translateZ"],"transform-origin":["bottom","center","left","right","top"],"transform-style":["flat","preserve-3d"],"transition-timing-function":["cubic-bezier","ease","ease-in","ease-in-out","ease-out","linear","step-end","step-start","steps"],"unicode-bidi":["bidi-override","embed","isolate","isolate-override","normal","plaintext"],"vertical-align":["baseline","bottom","middle","sub","super","text-bottom","text-top","top"],visibility:["collapse","hidden","visible"],"white-space":["normal","nowrap","pre","pre-line","pre-wrap"],"word-break":["break-all","break-word","normal"],"word-spacing":["normal"],"word-wrap":["break-word","normal"],zoom:["normal"]};exports.longToShorthand={"animation-direction":"animation","animation-delay":"animation","animation-duration":"animation","animation-name":"animation","animation-fill-mode":"animation","animation-play-state":"animation","animation-timing-function":"animation","animation-iteration-count":"animation","background-attachment":"background","background-clip":"background","background-origin":"background","background-repeat":"background","background-size":"background","background-position":"background","background-image":"background","background-color":"background","border-bottom-style":["border-bottom","border","border-style"],"border-bottom-width":["border-bottom","border","border-width"],"border-bottom-color":["border-bottom","border","border-color"],"border-collapse":"border","border-image":"border","border-left-style":["border-left","border","border-style"],"border-left-width":["border-left","border","border-width"],"border-left-color":["border-left","border","border-color"],"border-right-style":["border-right","border","border-style"],"border-right-width":["border-right","border","border-width"],"border-right-color":["border-right","border","border-color"],"border-style":"border","border-top-style":["border-top","border","border-style"],"border-top-width":["border-top","border","border-width"],"border-top-color":["border-top","border","border-color"],"border-width":"border","border-color":"border","border-top-left-radius":"border-radius","border-top-right-radius":"border-radius","border-bottom-left-radius":"border-radius","border-bottom-right-radius":"border-radius","flex-grow":"flex","flex-shrink":"flex","flex-basis":"flex","font-family":"font","font-size":"font","font-stretch":"font","font-style":"font","font-variant":"font","font-weight":"font","line-height":"font","list-style-image":"list-style","list-style-position":"list-style","list-style-type":"list-style","margin-bottom":"margin","margin-left":"margin","margin-right":"margin","margin-top":"margin","outline-color":"outline","outline-style":"outline","outline-offset":"outline","outline-width":"outline","overflow-x":"overflow","overflow-y":"overflow","padding-bottom":"padding","padding-left":"padding","padding-right":"padding","padding-top":"padding","perspective-origin":"perspective","transform-origin":"transform","transform-box":"transform","transform-style":"transform","transition-delay":"transition","transition-duration":"transition","transition-property":"transition","transition-timing-function":"transition","writing-mode":["horizontal-tb","vertical-rl","vertical-lr"]};var multivalue=new Set(["filter"]);for(var tmp in exports.longToShorthand){var val=exports.longToShorthand[tmp];if(Array.isArray(val)){var _iteratorNormalCompletion=true;var _didIteratorError=false;var _iteratorError=undefined;try{for(var _iterator=val[Symbol.iterator](),_step;!(_iteratorNormalCompletion=(_step=_iterator.next()).done);_iteratorNormalCompletion=true){var item=_step.value;multivalue.add(item)}}catch(err){_didIteratorError=true;_iteratorError=err}finally{try{if(!_iteratorNormalCompletion&&_iterator["return"]){_iterator["return"]()}}finally{if(_didIteratorError){throw _iteratorError}}}}else{multivalue.add(val)}}exports.singleValueProperties=exports.validProperties.filter(function(i){return!multivalue.has(i)});exports.inheritableProperties=new Set(["border-collapse","border-spacing","caption-side","color","cursor","direction","empty-cells","font-family","font-size","font-style","font-variant","font-weight","font","letter-spacing","line-height","list-style-image","list-style-position","list-style-type","list-style","orphans","quotes","text-align","text-indent","text-transform","visibility","white-space","widows","word-spacing"]);exports.colorProperties=new Set(["background-color","background-image","background","border","border-bottom","border-bottom-color","border-color","border-left","border-left-color","border-right","border-right-color","border-top","border-top-color","box-shadow","color","column-rule","column-rule-color","outline","outline-color","text-decoration","text-decoration-color","text-shadow","tap-highlight-color"]);exports.animationProperties=new Set(["animation","animation-delay","animation-direction","animation-duration","animation-fill-mode","animation-iteration-count","animation-name","animation-play-state","animation-timing-function"]);module.exports.imageProperties=new Set(["background","background-image","border-image","border-image-source","list-style-image","cursor","mask-image","shape-outside","mask-border-source"])},{}]
});