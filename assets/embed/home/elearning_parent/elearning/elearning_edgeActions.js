/***********************
* Adobe Edge Composition Actions
*
* Edit this file with caution, being careful to preserve 
* function signatures and comments starting with 'Edge' to maintain the 
* ability to interact with these actions from within Adobe Edge
*
***********************/
(function($, Edge, compId){
var Composition = Edge.Composition, Symbol = Edge.Symbol; // aliases for commonly used Edge classes

   //Edge symbol: 'stage'
   (function(symbolName) {

      

      

      

      Symbol.bindSymbolAction(compId, symbolName, "creationComplete", function(sym, e) {
         // set animation param
         this.CENTER = 2500;
         this.LEFT = this.UP = 1;
         this.RIGHT = this.DOWN = 5000;
         
         this.H_LEFT_MAX = 175;
         this.H_RIGHT_MAX = 375;
         this.H_VALUE = this.H_RIGHT_MAX-this.H_LEFT_MAX;
         
         this.V_UP_MAX = 100;
         this.V_DOWN_MAX = 360;
         this.V_VALUE = this.V_DOWN_MAX - this.V_UP_MAX;
         
         this.vFrame = this.hFrame = this.targetvFrame = this.targethFrame = this.CENTER;
         
         this.isCalc = true;
         
         this.circleCount =0;
         this.MAX_CIRCLE = 20;
         
         // if firefox, don't show ball animation(that's heavy ;p)
         if(jQuery.browser.mozilla){
         	this.MAX_CIRCLE = -1;
         }
         
         // calc mouse pos and set right&left frame
         this.setFrame = function(e){
             var hPos = e.clientX | 0;
             var vPos = e.clientY | 0;
         
             hPos = (hPos<this.H_LEFT_MAX) ? this.H_LEFT_MAX : (hPos>this.H_RIGHT_MAX) ? this.H_RIGHT_MAX : hPos;
             vPos = (vPos<this.V_UP_MAX) ? this.V_UP_MAX : (vPos>this.V_DOWN_MAX) ? this.V_DOWN_MAX : vPos;
         
             hPos -= this.H_LEFT_MAX;
             vPos -= this.V_UP_MAX;
         
             this.targethFrame = ((this.RIGHT) * (hPos/this.H_VALUE)) | 0;
             this.targetvFrame = ((this.DOWN) * (vPos/this.V_VALUE)) | 0;
         
             this.vFrame = sym.getSymbol("kimonoGirl_v").getPosition();
             this.hFrame = sym.getSymbol("kimonoGirl_h").getPosition();
         
             sym.getSymbol("kimonoGirl_h").stop(((this.hFrame + this.targethFrame)/2)|0);
             sym.getSymbol("kimonoGirl_v").stop(((this.vFrame + this.targetvFrame)/2)|0);
         };
         
         // set center pos from right&left matrix
         var names =[
             "bangs","comb","hair",
             "leftCheek","leftEar","leftHairPin","leftEye",
             "mouth","nose","tail",
             "rightHairPin","rightEye","face","rightCheek","rightEar"
         ];
         this.setPosition = function(){
             var vGirl = sym.getSymbol("kimonoGirl_v");
             var hGirl = sym.getSymbol("kimonoGirl_h");
             var cGirl = sym.getSymbol("kimonoGirl");
         
             for(var i=0;i<names.length;i++){
         	var hElm = hGirl.$(names[i]);
         	var vElm = vGirl.$(names[i]);
         	var hTrans = hElm.getTrans();
         	var vTrans = vElm.getTrans();
         
          	hTrans = hTrans.split(",");
          	vTrans = vTrans.split(",");
         	hTrans[5]= vTrans[5];
         	cGirl.$(names[i]).setTrans(hTrans.join(","));
             }
         };
         var v = setInterval(this.setPosition,1000/60);
         
         // create ball animation
         var list = ["ball1","ball2","ball3","ball4","ball5"];
         this.createCircle = function(e){
         	if(this.circleCount<=this.MAX_CIRCLE){
         	  this.circleCount++;
                   var n = (Math.random()*5)|0;
                   var ball = sym.createChildSymbol(list[n],"Stage").getSymbolElement();
                   ball.css({top:e.clientY+ "px",left:e.clientX+"px",position:"absolute"});
                   ball.animate({"top":"+="+(Math.random()*80-40) + "px","left":"+=" + (Math.random()*80-40)+"px","opacity": 0}, 500);
         	}
         };
         
         // create syntax sugar for get/set matrix
         jQuery.fn.getTrans = function(){
         	var el = jQuery(this);
         	return el.css("-webkit-transform") || el.css("-moz-transform") || el.css("-ms-transform") || el.css("-o-transform");
         };
         jQuery.fn.setTrans = function(trans){
         	jQuery(this).css({
         		"-webkit-transform":trans,
         		"-moz-transform":trans,
         		"-ms-transform":trans,
         		"-o-transform":trans
         		});
         };
         

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${Stage}", "mousedown", function(sym, e) {
         
         this.isCalc = true;
         this.setFrame(e);
         this.createCircle(e);
         

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${Stage}", "mousemove", function(sym, e) {
         if(this.isCalc === true){
               this.setFrame(e);    
               this.createCircle(e);
         }
             
             

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${Stage}", "mouseup", function(sym, e) {
         this.isCalc = false;
         
         // faced to forward(this.CENTER == 2500ms frame)
         this.vFrame = this.CENTER;
         this.hFrame = this.CENTER;
         
         var hGirl = sym.getSymbol("kimonoGirl_h");
         var vGirl = sym.getSymbol("kimonoGirl_v");
         
         var posH = hGirl.getPosition();
         if(posH>this.CENTER){
         	hGirl.playReverse(posH);
         }else if(posH<this.CENTER){
         	hGirl.play(posH);
         }
         
         var posV = vGirl.getPosition();
         if(posV>this.CENTER){
         	vGirl.playReverse(posV);
         }else if(posV<this.CENTER){
         	vGirl.play(posV);
         }
         
         this.setPosition();
         

      });
      //Edge binding end

      

   })("stage");
   //Edge symbol end:'stage'

//=========================================================
   //Edge symbol: 'eye'
   (function(symbolName) {

      

      

      

      Symbol.bindTimelineAction(compId, symbolName, "Default Timeline", "complete", function(sym, e) {
         sym.play(0);

      });
      //Edge binding end

   })("eye");
   //Edge symbol end:'eye'

//=========================================================
   //Edge symbol: 'kimonoGirl'
   (function(symbolName) {

      

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 2500, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

   })("kimonoGirl_h");
   //Edge symbol end:'kimonoGirl_h'

//=========================================================
   (function(symbolName) {

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 2500, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      

      

   })("kimonoGirl_v");
   //Edge symbol end:'kimonoGirl_v'

//=========================================================
   //Edge symbol: 'maru'
   (function(symbolName) {

   })("maru");
   //Edge symbol end:'maru'

//=========================================================
   //Edge symbol: 'ball'
   (function(symbolName) {

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 500, function(sym, e) {
         sym.getParentSymbol().circleCount--;
         sym.deleteSymbol();

      });
      //Edge binding end

   })("ball1");
   //Edge symbol end:'ball1'

//=========================================================
   //Edge symbol: 'ball'
   (function(symbolName) {

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 500, function(sym, e) {
         sym.getParentSymbol().circleCount--;
         sym.deleteSymbol();

      });
      //Edge binding end

   })("ball2");
   //Edge symbol end:'ball2'

//=========================================================
   //Edge symbol: 'ball'
   (function(symbolName) {

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 500, function(sym, e) {
         sym.getParentSymbol().circleCount--;
         sym.deleteSymbol();

      });
      //Edge binding end

   })("ball3");
   //Edge symbol end:'ball3'

//=========================================================
   //Edge symbol: 'ball'
   (function(symbolName) {

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 500, function(sym, e) {
         sym.getParentSymbol().circleCount--;
         sym.deleteSymbol();

      });
      //Edge binding end

   })("ball4");
   //Edge symbol end:'ball4'

//=========================================================
   //Edge symbol: 'ball'
   (function(symbolName) {

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 500, function(sym, e) {
         sym.getParentSymbol().circleCount--;
         sym.deleteSymbol();

      });
      //Edge binding end

   })("ball5");
   //Edge symbol end:'ball5'

//=========================================================
   (function(symbolName) {

      

      

      

   })("kimonoGirl");
   //Edge symbol end:'kimonoGirl'

})(window.jQuery || AdobeEdge.$, AdobeEdge, "EDGE-2192733");