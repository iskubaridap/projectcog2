/***********************
* Adobe Edge Animate Composition Actions
*
* Edit this file with caution, being careful to preserve 
* function signatures and comments starting with 'Edge' to maintain the 
* ability to interact with these actions from within Adobe Edge Animate
*
***********************/
(function($, Edge, compId){
var Composition = Edge.Composition, Symbol = Edge.Symbol; // aliases for commonly used Edge classes

   //Edge symbol: 'stage'
   (function(symbolName) {
      
      
      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 7206, function(sym, e) {
         // insert code here
         sym.stop();
         sym.$("cover").hide();

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${wholeArm}", "click", function(sym, e) {
         // insert code for mouse click here
         sym.$("cover").show();
         
         sym.playReverse('end');
         
         sym.getSymbol("wholeArm").playReverse();
         sym.getSymbol("wholeArm").getSymbol("arm2").playReverse();
         
         setTimeout(function(){
         	sym.getSymbol("wholeArm").getSymbol("arm2").getSymbol("forArminner").playReverse();
         },450);
         
         setTimeout(function(){
         	sym.getSymbol("wholeArm").getSymbol("arm2").getSymbol("forArminner").getSymbol("frontArm").playReverse();
         },2800);
         
         setTimeout(function(){
         	sym.getSymbol("wholeArm").getSymbol("arm2").getSymbol("topArm2").playReverse();
         },3000);
         
         setTimeout(function(){
         	sym.getSymbol("wholeArm").getSymbol("arm2").getSymbol("forArminner").getSymbol("claw2").playReverse();
         },1600);
         
         setTimeout(function(){
         	sym.$("cover").hide();
         },7000);
         

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 2780, function(sym, e) {
         // insert code here
         

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${logo}", "click", function(sym, e) {
         // insert code for mouse click here
         sym.getSymbol("wholeArm").play(0);
         sym.getSymbol("wholeArm").getSymbol("arm2").play(0);
         sym.getSymbol("wholeArm").getSymbol("arm2").getSymbol("topArm2").play(0);
         sym.getSymbol("wholeArm").getSymbol("arm2").getSymbol("forArminner").play(0);
         sym.getSymbol("wholeArm").getSymbol("arm2").getSymbol("forArminner").getSymbol("claw2").play(0);
         sym.getSymbol("wholeArm").getSymbol("arm2").getSymbol("forArminner").getSymbol("frontArm").play(0);
         sym.getSymbol("wholeArm").getSymbol("arm2").getSymbol("topArm2").play(0);
         
         sym.play(0);
         
         sym.$("cover").show();
         
         setTimeout(function(){
         	sym.$("cover").hide();
         },7000);

      });
      //Edge binding end

   })("stage");
   //Edge symbol end:'stage'

   //=========================================================
   
   //Edge symbol: 'claw'
   (function(symbolName) {   
   
   })("claw");
   //Edge symbol end:'claw'

   //=========================================================
   
   //Edge symbol: 'frontArm'
   (function(symbolName) {   
   
   })("frontArm");
   //Edge symbol end:'frontArm'

   //=========================================================
   
   //Edge symbol: 'topArm'
   (function(symbolName) {   
   
   })("topArm");
   //Edge symbol end:'topArm'

   //=========================================================
   
   //Edge symbol: 'base'
   (function(symbolName) {   
   
   })("base");
   //Edge symbol end:'base'

   //=========================================================
   
   //Edge symbol: 'wholeArm'
   (function(symbolName) {   
   
   })("wholeArm");
   //Edge symbol end:'wholeArm'

   //=========================================================
   
   //Edge symbol: 'arm'
   (function(symbolName) {   
   
   })("arm");
   //Edge symbol end:'arm'

   //=========================================================
   
   //Edge symbol: 'forArminner'
   (function(symbolName) {   
   
   })("forArminner");
   //Edge symbol end:'forArminner'

})(window.jQuery || AdobeEdge.$, AdobeEdge, "EDGE-66857092");