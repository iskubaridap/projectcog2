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
      
      
      Symbol.bindSymbolAction(compId, symbolName, "creationComplete", function(sym, e) {
         // insert code to be run when the symbol is created here
         var pg1 = EC.loadComposition("elearning/elearning.html", sym.$("page"));
         pg1.done(function(comp)
         {
         	var stage = comp.getStage();
         
         	stage.gotoNextPage = function()
         	{
         		nextPage();
         	}
         });

      });
      //Edge binding end

   })("stage");
   //Edge symbol end:'stage'

   //=========================================================
   
   //Edge symbol: 'page'
   (function(symbolName) {   
   
   })("page");
   //Edge symbol end:'page'

})(window.jQuery || AdobeEdge.$, AdobeEdge, "EDGE-17054883");