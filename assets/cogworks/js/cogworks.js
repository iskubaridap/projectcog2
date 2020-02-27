// JavaScript Document
var cogworks = new Object;

(function($){
	cogworks.testing = function(){
		console.log("it works");
	};
	
	// This is used for any loading or waiting screen needed
	cogworks.loadingScreen = function(type,text,animation){
        var str = "";
		
		switch(type)
		{
			case "dynamic":
				$("#loadingElem").empty().html("<img src='../assets/img/logo/projectcog/logo.gif'><br><br><p>" + text + "</p>");
				break;
			case "logo":
				$("#loadingElem").empty().html("<img src='../assets/img/logo/projectcog/logo.gif'>");
			case "reload":
                str = '';
                str += (text).length > 0 ? (text) : '';
                str += '<a class="loader-btn" href="#" id="loding-reload">Reload Page</a>';
				$("#loadingElem").empty().html("<img src='../assets/img/logo/projectcog/logo.gif'><br>" + str);
                $('#loding-reload').off().on('click', function(){
                    location.reload(true);
                });
				break;
			case "dashboard_reload":
                str = '';
                str += (text).length > 0 ? (text) : '';
                str += '<a class="loader-btn" href="' + (ROOT + '/dashboard') + '" id="loding-dashboard">Return to Dashboard</a><a class="loader-btn" href="#" id="loding-reload">Reload Page</a>';
				$("#loadingElem").empty().html("<img src='../assets/img/logo/projectcog/logo.gif'><br><br>" + str);
                $('#loding-reload').off().on('click', function(){
                    location.reload(true);
                });
				break;
            case "alert":
                str = '';
                str += (text).length > 0 ? (text) : '';
                str += '<a class="loader-btn" href="#" id="loding-cancel">Close</a>';
				$("#loadingElem").empty().html("<img src='../assets/img/logo/projectcog/logo.gif'><br>" + str);
                $('#loding-cancel').off().on('click', function(){
                    cogworks.loadingScreen("","","fadeOut");
                });
				break;
			default:
				$("#loadingElem").fadeOut("slow",function(){
					$(this).empty();
				});
		}
		switch(animation)
		{
            case "show":
				$("#loadingScreen").show();
				$("#loadingElem").show()
				break;
			case "fadeIn":
				$("#loadingScreen").fadeIn();
				$("#loadingElem").delay(500).fadeIn();
				break;
			case "hide":
				$("#loadingScreen").hide();
				break;
			case "fadeOut":
				$("#loadingScreen").delay(800).fadeOut("slow");
				break;
		}
	};
	
	// This is for the translator function
	cogworks.translate = function(){
		var langVal = "";
		var originalLang = "";
		
		function traverseReturn(iframeTranslator)
		{
			var iframeObj = iframeTranslator;
			var newTxt = ""
			$( iframeObj ).contents().each(function( index ){
				if($( this ).contents().length > 0){
					traverseReturn(this);
				}
				else
				{
					$(this).replaceWith("foo");
					
					var parent = $(this).parent();
					
					// This does not work for now. I don't know yet why.
					if(typeof $(this).text() == "string")
					{
						var txt = $(this).text();
						var newTxt = "";
						for(var i = 0; i < txt.length; i++)
						{
							if(txt[i] == " ")
							{
								newTxt = newTxt + '<inline-character class="space">' + txt[i] + '</inline-character>';
							}
							else
							{
								newTxt = newTxt + "<inline-character>" + txt[i] + "</inline-character>";
							}
						}
					}
					
				}
			}).promise().done(function () {
				$("#iframePage").contents().find("html").attr("lang",langVal);
				$("#iframePage").contents().find("body").html(iframeObj);
				//app.canvas.setHTML(iframeObj);
			});
		}
		
		window.finishTranslate = function(){
			var content = $("#translator").contents().find("#appender #pageContent").html();
			
			traverseReturn(content);
		}
	
		$("#mySel").change(function(){
			langVal = $(this).val();
			var iframeHead = $("#iframePage").contents().find("head").html();
			var iframeBody = $("#iframePage").contents().find("body").html();
			originalLang = ($("#iframePage").contents().find("html").attr("lang") == undefined) ? "en" : $("#iframePage").contents().find("html").attr("lang");
			
			
			$("#translator")[0].contentWindow.languageFrom = originalLang;
			
			// Clean text from inline-character tags
			$("#iframePage").contents().find("body").find("inline-character").each(function(){
				var parent = $(this).parent();
				
				parent.append($(this).text());
				$(this).remove();
			}).promise().done(function () {
				if($("#translator").contents().find("#appender #pageContent"))
				{
					$("#translator").contents().find("#appender").append("<div id='pageContent'></div>");
				}
				$("#translator").contents().find("#appender #pageContent").html($("#iframePage").contents().find("body").html());
				$("#translator").contents().find("#mySel").val(langVal);
				
				$("#translator")[0].contentWindow.htmlFile = true;
				$("#translator")[0].contentWindow.$("#mySel").trigger("change");
			});
		});
	};
	
	// This is for the Panels UI functions
	cogworks.UIpanels = function(){
		var optionsDesign = true;
		var cogsOverview = true;
		var dialogEditor = null;
		
		$("#optionsDesign").click(function(){
			if(optionsDesign)
			{
				$("#left-panel").css({position:"absolute"});
				$("#left-panel .handle").hide();
				
				$("#options-pane").hide();
				$("#design-pane").hide();
				$("#optionsDesingPaneHandle").hide();
			
				$("#advancePropertiesPane").hide();
				optionsDesign = false;
			}
			else
			{
				$("#left-panel").css({position:"relative"});
				$("#left-panel .handle").show();
				
				$("#options-pane").show();
				$("#design-pane").show();
				$("#optionsDesingPaneHandle").show();
			
				$("#advancePropertiesPane").hide();
				
				optionsDesign = true;
			}
		});
		$("#cogsOverview").click(function(){
			if(cogsOverview)
			{
				$("#right-panel").css({position:"absolute"});
				$("#right-panel .handle").hide();
				cogsOverview = false;
			}
			else
			{
				$("#right-panel").css({position:"relative"});
				$("#right-panel .handle").show();
				cogsOverview = true;
			}
		});
		
		dialogEditor = $("#dialogEditor").dialog({
			autoOpen: false,
			//height: 465,
			width: ($(window).width() - 200),
			resizable: false,
			position: { my: "center top+30", at: "center top", of: window }
		});
		
		$("#btnDialogEditor").click(function(){
			dialogEditor.dialog( "open" );
		});
	};
	
	// This is for our external tool Hotspotter
	cogworks.hotspotter = function(){
		var dialogWidth = ($(window).width() - 100);
		var dialogHeight = ($(window).height() - 200);
		
		$("#hotspotter").load(function(){
			// I just want to make sure this will work when it's on the server
			var foo = true;
			setTimeout(function(){
				$("#hotspotter").contents().find("#insertImage").click(function(){
					app.imagesDialogObj.selectedImageOnly = true;
					app.imagesDialogObj.open();
				});
				// this is to prevent error
				app.imagesDialogObj.selectedImageOnly = true;
				app.imagesDialogObj.onOK();
				
				app.imagesDialogObj.selectedImage = function(imgVal)
				{
					
					$("#hotspotter").contents().find("#input-image-url").val(app.context.transformImageResource(imgVal));
					document.getElementById('hotspotter').contentWindow.$("#input-image-url").trigger("change");
				}
			},3000)
		});
		
		$(".advance-tool, .advance-tool iframe").css({width: (dialogWidth + "px"), height: (dialogHeight + "px")});
		
		dialogHotspotter = $("#dialogHotspotter").dialog({
			autoOpen: false,
			width: dialogWidth,
			height: dialogHeight,
			resizable: false,
		});
		
		$("#btnUpdateHotspotter").click(function(){
			var settings = $("#hotspotter")[0].contentWindow.settings;
			var courseName = settings.general.name;
			var iframeElem = $("#iframePage").contents().find(".frame-animator iframe");
			courseName = courseName.replace(" ","_");
	
			document.getElementById('hotspotter').contentWindow.$("#button-save").trigger("click");
			
			//This gives enough time to for hotspotter process the save event
			setTimeout(function(){
				//app.editorPane.openForEditing(app.customCodeObj);
							
				// This makes the trick
				app.customCodeObj.setValue('<div>\n    <div class="advance-tool frame-animator" data-folder="" data-tool="frame-animator">\n        <iframe src="../courses/hotspotter/' +  courseName + '/index.html" frameborder="0"></iframe>\n    </div>\n</div>');
				app.customCodeObj.update();
				
				$(iframeElem).attr("src",("../courses/hotspotter/" + courseName + "/index.html"))
			},1500);
			
			dialogHotspotter.dialog( "close" );
		});
		
		$("#iframePage").hover(
			function(){
				var editBtn = '<div id="buttonWrapper" style="cursor:pointer; display:table; position: absolute; right: 3px; top: 3px; z-index: 5; background-color: #337ab7; border-color: #2e6da4; color: #fff; padding: 3px 5px; border-radius:5px;"><div>Edit</div></div>';
				var insertFileBtn = '<div id="buttonWrapper" style="cursor:pointer; display:table; position: absolute; right: 3px; top: 3px; z-index: 5; background-color: #337ab7; border-color: #2e6da4; color: #fff; padding: 3px 5px; border-radius:5px;"><div>Insert File</div></div>';
				$(this).contents().find(".frame-animator").unbind().bind("mouseenter",function(){
					if($(this).find("iframe").attr("src") == "")
					{
						var iframeElem = $(this).find("iframe");
						
						$(this).append(insertFileBtn);
						$(this).find("#buttonWrapper").click(function(){
							$("#hotspotter").contents().find("#button-saves-create-new").trigger("click");
							dialogHotspotter.dialog("open");
						});
					}
					else
					{
						var iframeElem = $(this).find("iframe");
						
						$(this).append(editBtn);
						$(this).find("#buttonWrapper").click(function(){
							var courseDir = $(iframeElem).attr("src");
							courseDir = courseDir.slice((courseDir.search("hotspotter") + 11),(courseDir.search("/index.html")));
							courseDir = courseDir.replace("_"," ");
							
							$("#hotspotter").contents().find("#saved-widgets-container .widget-load").each(function(index){
								
								if($(this).text() == courseDir)
								{
									document.getElementById('hotspotter').contentWindow.$("#saved-widgets-container .widget-load").eq(index).trigger("click");
									return false;
								}
							}).promise().done(function () {
								dialogHotspotter.dialog("open");
							});
						});
					}
				});
			},function(){
				var frameAnimatorDiv =  $(this).contents().find(".frame-animator");
				$(this).contents().find(".frame-animator #buttonWrapper").remove();
		});
	};
	
	// This is for the Advance Properties Pane functions
	cogworks.advanceProperties = function(){
		var elementClicked = null;
		var bgColor = "";
		var fontColor = "";
		
		$("#advancePropertiesPane").hide();
		$("#advancePropertiesBtn").click(function(){
			$("#options-pane").hide();
			$("#design-pane").hide();
			$("#optionsDesingPaneHandle").hide();
			
			$("#advancePropertiesPane").show();
		});
		
		$("#optionDesignPaneBtn").click(function(){
			$("#options-pane").show();
			$("#design-pane").show();
			$("#optionsDesingPaneHandle").show();
			
			$("#advancePropertiesPane").hide();
		});
		
		
		var elemObj = new function() {
			this.obj = null;
			this.element = null;
			this.getCSSproperty = function(property){
				if(this.element)
				{
					return $(this.element).css(property);
				}
				else
				{
					return "";
				}
			};
			this.setCSSproperty = function(property, value){
				if(this.element)
				{
					return $(this.element).css(property,value);
				}
				else
				{
					return "";
				}
			}
		}
		
		// This saves all the inline css the user made
		function updateInlineCSS()
		{
			if(elemObj.obj)
			{
				elemObj.obj.setOverride("/", "style", elemObj.element.attr("style"))
				elemObj.obj.update();
			}
		}
		
		$("#opacitySlider").slider({
			max: 100,
			min: 0,
			value: 100,
			change: function( event, ui ) {
				updateInlineCSS();
			},
			slide: function( event, ui ) {
				var cssVal = (ui.value / 100)
				$("#opacityInput").val(ui.value);
				
				elemObj.setCSSproperty("opacity",cssVal);
			}
		});
		
		function showElemProperty()
		{
			$("#margin input[type='text'], #padding input[type='text'],#width input[type='text'],#height input[type='text'], #opacity input[type='text'], #color input[type='text'], #backgroundColor input[type='text'], #radius input[type='text']").each(function(index){
				var elemProperty = $(this).attr("data-property");
				if(elemProperty == "opacity")
				{
					var opacityVal = (elemObj.getCSSproperty("opacity") * 100);
	
					$("#opacitySlider").slider("value",opacityVal);
					$(this).val(opacityVal);
				}
				else if(elemProperty == "color")
				{
					if((elemObj.getCSSproperty("color")).length > 1)
					{
						fontColor = elemObj.getCSSproperty("color");
					}
					else
					{
						fontColor = "rgb(255, 255, 255)";
					}
					
					$("#Fontcolorpicker").attr("data-color",fontColor);
					$("#Fontcolorpicker").val(fontColor);
				}
				else if(elemProperty == "backgroundColor")
				{
					if((elemObj.getCSSproperty("color")).length > 1)
					{
						bgColor = elemObj.getCSSproperty("color");
					}
					else
					{
						bgColor = "rgb(255, 255, 255)";
					}
					
					$("#BGcolorpicker").attr("data-color",bgColor);
					$("#BGcolorpicker").val(bgColor);
				}
				else
				{
					var elemVal = "";
					if((elemObj.getCSSproperty(elemProperty)).length > 1)
					{
						elemVal = elemObj.getCSSproperty(elemProperty);
					}
					else
					{
						elemVal = "0px"
					}
					
					elemVal = elemVal.replace("px","");
					$(this).val(elemVal);
				}
	
			});
		}
		showElemProperty();
		
		$("#FontcolorpickerBtn").click(function(e){
			var cpInput = $("#Fontcolorpicker");
			
			app.colorPicker.open({
				color: fontColor,
				point: app.mousePosition,
				onChange: function onChange(color) {
					elemObj.setCSSproperty("color",color);
				},
				onSelect: function onSelect(color) {
					elemObj.setCSSproperty("color",color);
					cpInput.attr("data-color",color);
					cpInput.val(color);
					
					updateInlineCSS();
					app.getGeneralProperties(elemObj.obj);
				},
				onCancel: function onCancel() {
					elemObj.setCSSproperty("color",cpInput.attr("data-color"));
				}
			});
		});
		
		$("#BGcolorpickerBtn").click(function(e){
			var cpInput = $("#BGcolorpicker");
			
			app.colorPicker.open({
				color: bgColor,
				point: app.mousePosition,
				onChange: function onChange(color) {
					elemObj.setCSSproperty("backgroundColor",color);
				},
				onSelect: function onSelect(color) {
					elemObj.setCSSproperty("backgroundColor",color);
					cpInput.attr("data-color",color);
					cpInput.val(color);
					
					updateInlineCSS();
					app.getGeneralProperties(elemObj.obj);
				},
				onCancel: function onCancel() {
					elemObj.setCSSproperty("backgroundColor",cpInput.attr("data-color"));
				}
			});
		});
		
		$("#opacityInput").unbind().bind("keyup",function(){
			var cssVal = ($(this).val() / 100)
			var opacityVal = $(this).val();
			$("#opacitySlider").slider("value",opacityVal)
			
			elemObj.setCSSproperty("opacity",cssVal);
			app.getGeneralProperties(elemObj.obj);
		});
		
		$("#margin input[type='text'], #padding input[type='text'], #radius input[type='text'],#width input[type='text'],#height input[type='text']").each(function(){
			$(this).unbind().bind("change keyup input",function(){
				elemObj.setCSSproperty($(this).attr("data-property"),($(this).val() + "px"));
				
				updateInlineCSS();
				
				if(!$(this)[0].id == "widthInput" || !$(this)[0].id == "heightInput")
				{
					app.getGeneralProperties(elemObj.obj);
				}
			});
		});
		
		$("#marginEqual input[type='checkbox'], #paddingEqual input[type='checkbox'], #radiusEqual input[type='checkbox']").unbind().bind("change",function(){
			var isCheck = $(this).is(':checked');
			var property = $(this).attr("data-property");
			if(isCheck)
			{
				$(("#" + property + " input[type='text']")).each(function(){
					$(this).unbind().bind("keyup",function(){
						$(("#" + property + " input[type='text']")).val($(this).val());
						
						if(property.search("radius") == 0)
						{
							elemObj.setCSSproperty("borderRadius",($(this).val() + "px"));
						}
						else
						{
							elemObj.setCSSproperty(property,($(this).val() + "px"));
						}
						
						updateInlineCSS();
					});
				});
			}
			else
			{
				$(("#" + property + " input[type='text']")).each(function(){
					$(this).unbind();
				});
				
				$("#margin input[type='text'], #padding input[type='text'], #radius input[type='text']").each(function(){
					$(this).unbind().bind("change keyup input",function(){
						elemObj.setCSSproperty($(this).attr("data-property"),($(this).val() + "px"));
						
						updateInlineCSS();
						app.getGeneralProperties(elemObj.obj);
					});
				});
			}
		});
		
		app.getGeneralProperties = function(obj)
		{
			var elem = obj;
			elementClicked = elem;
			elemObj.obj = elem;
			elemObj.element = elem.element;
			
			showElemProperty();
		}
		
		app.advanceProperties = function(obj)
		{
			var elem = obj;
			console.log(elem);
			elementClicked = elem;
			elemObj.obj = elem;
			elemObj.element = elem.element;
			
			app.componentPane.activeTab = "advance-properties";
			$(".tab.advance-properties").trigger("click");
			
			// Making sure the panel is close
			if($("#left-panel").css("position") != "relative")
			{
				$("#optionsDesign").trigger("click");
			}
			
			$("#options-pane").hide();
			$("#design-pane").hide();
			$("#optionsDesingPaneHandle").hide();
			
			$("#advancePropertiesPane").show();
			
			showElemProperty();
		}
	};
	/*
	cogworks.foo = function()
	{
		//console.log(app.componentWithInlineEditing("foo"));
		$("#foo").click(function(){
			console.log(app.htmlToInline($("#bar").val()));
			
		});
	}
	*/
	cogworks.processDragDropObj = function(){
		app.getDragDropObj = function(obj)
		{/*
			var dragObj = (obj.constructor.name).toLowerCase() == "div" && $(obj.element[0]).hasClass("drag");
			var dropObj = (obj.constructor.name).toLowerCase() == "div" && $(obj.element[0]).hasClass("drop");
			var dragElem = $(obj.element[0]);
			var dropElem = $(obj.element[0]);
			
			if(dragObj)
			{
				if(!dragElem.draggable("instance"))
				{
					dragElem.draggable({
						drag: function( event, ui ){
							dragElem.css({left: (ui.position.left + "px"),top: (ui.position.top + "px")});
							obj.setOverride("/", "style", obj.element.attr("style"));
							obj.update();
						},
					});
				}
			}
			else if(dropObj)
			{
				if(!dropElem.draggable("instance"))
				{
					dropElem.draggable({
						drag: function( event, ui ){
							dropElem.css({left: (ui.position.left + "px"),top: (ui.position.top + "px")});
							obj.setOverride("/", "style", obj.element.attr("style"));
							obj.update();
						},
					});
				}
			}*/
		};
	};
})(jQuery);