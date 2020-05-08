$(document).ready(function () {
    
    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 80
    });

    // Page scrolling feature
    $('a.page-scroll').bind('click', function(event) {
        var link = $(this);
        $('html, body').stop().animate({
            scrollTop: $(link.attr('href')).offset().top - 50
        }, 500);
        event.preventDefault();
    });
    
    // Reseting the #hotspotter iframe src
    
    $("#toolsPluginModal .close").click(function(){
        $("#hotspotter").attr("src","./assets/embed/home/salesdemo_cogworksModal/container/index.html");
    });
    
    // Process Email
    $("#submitFeedback").click(function(){
        
        if($("#userEmail").val() != "" && $("#userMessage").val() != "")
        {
            $.ajax({
                url: "./extra/email",
                type:'POST',
                data:{
                    userEmail: $("#userEmail").val(), userMessage: $("#userMessage").val()
                },success: function(msg){
                }               
            });
        }
    });


    // This is for manual responsive layout
    var winWidth = 0;
    var winHeight = 0;
    var newWidth = 0;
    var newHeight = 0;
    var headerAnimationWidth = 0;
    var headerAnimation = 0;
    var spaceInvadersIframe = 0;
    var eLearningRobot = 0;
    var vendingMachine = 0;
    var cogworkssales = 0;
    var hotspotter = 0;
    
    $("#headerAnimation").on('load', function()
    {
        var mydiv = $(this).contents().find("body");
        headerAnimationWidth = mydiv.width();
    });
    $("#headerAnimation").on('load', function() { var mydiv = $(this).contents().find("body"); headerAnimation = mydiv.height();});;
    $("#spaceInvadersIframe").on('load', function() { var mydiv = $(this).contents().find("body");spaceInvadersIframe = mydiv.height();});
    $("#eLearningRobot").on('load', function() { var mydiv = $(this).contents().find("body");eLearningRobot = mydiv.height();});
    $("#vendingMachine").on('load', function() { var mydiv = $(this).contents().find("body");vendingMachine = mydiv.height();});
    $("#cogworkssales").on('load', function()
    {
        var mydiv = $(this).contents().find("body");
        cogworkssales = mydiv.height();
        $("#eLearningModal2 .loadingNotification").fadeOut();
    });
    $("#hotspotter").on('load', function()
    {
        var mydiv = $(this).contents().find("body");
        hotspotter = mydiv.height();
        $("#toolsPluginModal .loadingNotification").fadeOut();
    });
    
    function getWidthHeight()
    {
        winWidth = $(window).width();
        winHeight = $(window).height();
    }

    function manualResponsive()
    {
        headerAnimation = $('#headerAnimation').contents().find("body").height();
        spaceInvadersIframe = $('#spaceInvadersIframe').contents().find("body").height();
        eLearningRobot = $('#eLearningRobot').contents().find("body").height();
        vendingMachine = $('#vendingMachine').contents().find("body").height();
        cogworkssales = $('#cogworkssales').contents().find("body").height();
        hotspotter = $('#hotspotter').contents().find("body").height();
        
        getWidthHeight();
        
        if(winWidth > 992) // Desktop
        {
            $("#headerAnimation").height((winWidth * 0.37));

            $("#spaceInvadersIframe").width(550);
            $("#spaceInvadersIframe").height(400);
            
            $("#eLearningRobot").width(500);
            $("#eLearningRobot").height(471);
            
            $("#vendingMachine").width(550);
            $("#vendingMachine").height(550);
            
            $("#cogworkssales").width(((winWidth * 0.9) - 2));
            $("#cogworkssales").height(winHeight - 200);
            
            $("#hotspotter").width(((winWidth * 0.9) - 2));
            $("#hotspotter").height(winHeight - 200);
        }

        else if(winWidth <= 992 && winWidth > 767) // Tablet
        {
            $("#headerAnimation").height((winWidth * 0.37));
            
            $("#spaceInvadersIframe").width(550);
            $("#spaceInvadersIframe").height(400);
            
            $("#eLearningRobot").width(500);
            $("#eLearningRobot").height(471);
            
            $("#vendingMachine").width(550);
            $("#vendingMachine").height(550);
            
            $("#cogworkssales").width(((winWidth * 0.9) - 2));
            $("#cogworkssales").height(winHeight - 200);
            
            $("#hotspotter").width(((winWidth * 0.9) - 2));
            $("#hotspotter").height(winHeight - 200);
        }
        else if(winWidth <= 766 && winWidth >= 480)
        {
            
            $("#spaceInvadersIframe").width((winWidth - 200));
            $("#spaceInvadersIframe").height(spaceInvadersIframe);

            $("#eLearningRobot").width((winWidth - 200));
            $("#eLearningRobot").height((eLearningRobot));
            
            $("#vendingMachine").width((winWidth - 200));
            $("#vendingMachine").height((winWidth - 200));
            
            $("#cogworkssales").width((winWidth - 22));
            $("#cogworkssales").height(winHeight - 160);
            
            $("#hotspotter").width((winWidth - 22));
            $("#hotspotter").height(winHeight - 160);
        }
        else
        {
            $("#spaceInvadersIframe").width((winWidth - 100));
            $("#spaceInvadersIframe").height(spaceInvadersIframe);

            $("#eLearningRobot").width((winWidth - 100));
            $("#eLearningRobot").height((eLearningRobot));
            
            $("#vendingMachine").width((winWidth - 100));
            $("#vendingMachine").height((winWidth - 100));
            
            $("#cogworkssales").width((winWidth - 22));
            //$("#cogworkssales").height(cogworkssales);
            $("#cogworkssales").height(winHeight - 160);
            
            $("#hotspotter").width((winWidth - 22));
            $("#hotspotter").height(winHeight - 160);
        }
        
        $("#headerAnimation").width(winWidth);
        $("#headerAnimation").height(headerAnimation);
    }

    getWidthHeight();
    
    
    if(winWidth > 992) // Desktop
    {
        $("#headerAnimation").height((winWidth * 0.37));
        
        $("#spaceInvadersIframe").width(550);
        $("#spaceInvadersIframe").height(400);
        
        $("#eLearningRobot").width(500);
        $("#eLearningRobot").height(471);
        
        $("#vendingMachine").width(550);
        $("#vendingMachine").height(550);
        
        $("#cogworkssales").width(((winWidth * 0.9) - 2));
        $("#cogworkssales").height(winHeight - 200);
        
        $("#hotspotter").width(((winWidth * 0.9) - 2));
        $("#hotspotter").height(winHeight - 200);
    }

    else if(winWidth <= 992 && winWidth > 767) // Tablet
    {
        manualResponsive();
        
        $("#headerAnimation").height((winWidth * 0.37));
        
        $("#spaceInvadersIframe").width(550);
        $("#spaceInvadersIframe").height(400);
        
        $("#eLearningRobot").width(500);
        $("#eLearningRobot").height(471);
        
        $("#vendingMachine").width(550);
        $("#vendingMachine").height(550);
        
        $("#cogworkssales").width(((winWidth * 0.9) - 2));
        $("#cogworkssales").height(winHeight - 200);
        
        $("#hotspotter").width(((winWidth * 0.9) - 2));
        $("#hotspotter").height(winHeight - 200);
    }
    else
    {
        manualResponsive();
        
        $("#spaceInvadersIframe").width((winWidth - 100));
        $("#spaceInvadersIframe").height((winWidth - 180));
        
        $("#eLearningRobot").width((winWidth - 100));
        $("#eLearningRobot").height((winWidth - 61));
        
        $("#vendingMachine").width((winWidth - 100));
        $("#vendingMachine").height((winWidth - 100));
        
        $("#cogworkssales").width((winWidth - 22));
        $("#cogworkssales").height(winHeight - 160);
        
        $("#hotspotter").width((winWidth - 22));
        $("#hotspotter").height(winHeight - 160);
    }
    
    function loadIframe(button,idName,source)
    {
        $(button).unbind().bind("click",function(){
            if($(idName).attr("src") == "")
            {
                $(idName).attr("src",source);
                manualResponsive();
            }
        });
    }
    
    $(".loadingNotification").width(((winWidth * 0.9) - 2));
    $(".loadingNotification").height(winHeight - 200);
    
    
    loadIframe("#spaceInvaders","#spaceInvadersGame","SpaceInvaders/index.html");
    loadIframe("#eLearningModal2Btn","#cogworkssales","./assets/embed/home/salesdemo_cogworksModal/container/cogworkssales.html");
    loadIframe("#hotspotterBtn","#hotspotter","./assets/embed/home/salesdemo_cogworksModal/container/index.html");
    
    $(".featurebtn").click(function(){
        manualResponsive();
    });
    
    
    //manualResponsive();

    $(window).resize(function(){
        manualResponsive();
    });
    
    // This is for the Modal sections

    $(".thumbnailsInfoViewer").hide();
    $(".thumbnailsInfoViewer").html("");

    $('#parallaxFooter').parallax({imageSrc: './assets/img/background/pipebackground_colorbg.png'});

    $(".thumnailsImagesWrapper").each(function(){
        var numOfThumbnails = $(this).find(".thumnailsImages").length;
        $(this).width((numOfThumbnails * 172));
    });

    $(".modal-header button, .modal-footer button").click(function(){
        $("#thumbnailsInfoViewer").html("");
    });
    $(".thumnailsImages").each(function(){
        $(this).click(function(){
            var parent = $(this).parent().parent().parent(); // Three step up reach the parent
            var txt = $(this).find(".thumbnailsInfo").html();
            
            $(".thumbnailsInfoViewer").hide();
            $(".thumbnailsInfoViewer").html("");
            parent.find(".thumbnailsInfoViewer").fadeIn().html(txt);
        });
    });
    $(".dksort").each(function(){
        $(this).click(function(){
            
            var txt = $(this).find(".thumbnailsInfo").html();
            
            $("#thumbnailsInfoWrapper").fadeIn(function(){
                $("#thumbnailsInfoViewer").html("");
                $("#thumbnailsInfoViewer").html(txt);
                
                $("#thumbnailsInfoViewer .responsiveslides").responsiveSlides({
                    auto: false,
                    pager: false,
                    nav: true,
                    speed: 500,
                    namespace: "callbacks"
                });
                
                manualResponsive();
                
                $(".modal.in .modal-dialog").animate({opacity: 0});

                $("#thumbnailsInfoWrapper .close").click(function(){
                    $("#thumbnailsInfoWrapper").fadeOut(function(){
                        $("#thumbnailsInfoViewer").html("");
                        
                        $(".modal.in .modal-dialog").animate({opacity: 1});
                    });
                });
            });
        });
    });
    $(".arrowLeft").each(function(){
        $(this).click(function(){
            var parent = $(this).parent().parent();
            var left = parent.scrollLeft();
            var move = (left > 50) ? left - 50 : 0;
            parent.scrollLeft(move);
        });
    });
    $(".arrowRight").each(function(){
        $(this).click(function(){
            var parent = $(this).parent().parent();
            var right = parent.scrollLeft();
            var move = right + 50;
            parent.scrollLeft(move);
        });
    });
});

var cbpAnimatedHeader = (function() {
    var docElem = document.documentElement, header = document.querySelector( '.navbar-default' ), didScroll = false, changeHeaderOn = 200;

    function init() {
        window.addEventListener( 'scroll', function( event ) {
            if( !didScroll ) {
                didScroll = true;
                setTimeout( scrollPage, 250 );
            }
        }, false );
    }
    function scrollPage() {
        var sy = scrollY();
        if ( sy >= changeHeaderOn ) {
            $(header).addClass('navbar-scroll');
            $("#logoAnimate").fadeIn("fast");
            $("#logoTitleAnimate").fadeIn("fast");
        }
        else {
            $(header).removeClass('navbar-scroll');

            $("#logoAnimate").fadeOut("fast");
            $("#logoTitleAnimate").fadeOut("fast");
        }
        didScroll = false;
    }
    function scrollY() {
        return window.pageYOffset || docElem.scrollTop;
    }
    init();
})();

// Activate WOW.js plugin for animation on scrol
new WOW().init();

$(function () {

    var filterList = {

        init: function () {

            // MixItUp plugin
            // http://mixitup.io
            $('#addGameDev').mixitup({
                targetSelector: '.portfolio',
                filterSelector: '.addGameFilter',
                effects: ['fade'],
                easing: 'snap',
                // call the hover effect
                onMixEnd: filterList.hoverEffect()
            });				

            $('#eLearning').mixitup({
                targetSelector: '.portfolio',
                filterSelector: '.eLearningFilter',
                effects: ['fade'],
                easing: 'snap',
                // call the hover effect
                onMixEnd: filterList.hoverEffect()
            });
            
            $('#toolsPlugins').mixitup({
                targetSelector: '.portfolio',
                filterSelector: '.toolsPluginsFilter',
                effects: ['fade'],
                easing: 'snap',
                // call the hover effect
                onMixEnd: filterList.hoverEffect()
            });
        },

        hoverEffect: function () {

            // Simple parallax effect
            $('#addGameDev .portfolio').hover(
                function () {
                    $(this).find('.label').stop().animate({bottom: 0}, 200, 'easeOutQuad');
                    $(this).find('img').stop().animate({top: -30}, 500, 'easeOutQuad');				
                },
                function () {
                    $(this).find('.label').stop().animate({bottom: -40}, 200, 'easeInQuad');
                    $(this).find('img').stop().animate({top: 0}, 300, 'easeOutQuad');								
                }		
            );

            $('#eLearning .portfolio').hover(
                function () {
                    $(this).find('.label').stop().animate({bottom: 0}, 200, 'easeOutQuad');
                    $(this).find('img').stop().animate({top: -30}, 500, 'easeOutQuad');				
                },
                function () {
                    $(this).find('.label').stop().animate({bottom: -40}, 200, 'easeInQuad');
                    $(this).find('img').stop().animate({top: 0}, 300, 'easeOutQuad');								
                }		
            );
            
            $('#toolsPlugins .portfolio').hover(
                function () {
                    $(this).find('.label').stop().animate({bottom: 0}, 200, 'easeOutQuad');
                    $(this).find('img').stop().animate({top: -30}, 500, 'easeOutQuad');				
                },
                function () {
                    $(this).find('.label').stop().animate({bottom: -40}, 200, 'easeInQuad');
                    $(this).find('img').stop().animate({top: 0}, 300, 'easeOutQuad');								
                }		
            );
        }
    };

    // Run the show!
    filterList.init();
});

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-531949-20', 'auto');
ga('send', 'pageview');

$(function(){

	var isChrome = window.navigator.vendor == "Google Inc.";
	
	$("#cogworkssales").load(function(){
		
		setTimeout(function(){
			$("#cogworkssales").contents().find(".try-section, header .btn").click(function(e){
				e.preventDefault();

				if(!isChrome){
					alert('Sorry, our online demo only works in Google Chrome for now.');
					ga('send', 'event', 'Demo', 'fail');
					return;
				}

				ga('send', 'event', 'Demo', 'show');

				createDemo();
				showDemo();
			});
            $("#cogworkssales").contents().find("#homePageBtn").hide();
		},1500);
	
	});

	$('header .btn').click(function(){
		ga('send', 'event', 'Header Try Demo Button', 'click');
	});

	$('#buy').click(function(){
		ga('send', 'event', 'Buy Button', 'click');
	});

	function showDemo(){
		demo.fadeIn('fast');
	}

	function hideDemo(){
		if(demo) demo.fadeOut('fast');
	}

	$('body').on('wheel', '.demo-overlay', false);
	$('body').on('click', '.demo-demo, .demo-overlay', hideDemo);
	$('body').on('keydown', function(e){
		if(e.which == 27) hideDemo();
	});

	var demo = null;

	function createDemo(){

		if(demo) return;

		demo = $('<div style="background-color: rgba(0,0,0,0.6);z-index: 2060;position: fixed;top: 0;left: 0;width: 100%;height: 100%;" class="demo-overlay">\
			<div style="width:96%;height:96%; position:absolute;top:2%;left:2%;">\
				<div class="close-demo" style="border-radius: 50%;background-color: #CC1A1A;color: #fff;font-size: 24px;position: absolute;top: -10px;right: -10px;width: 30px;height: 30px;z-index: 10;box-shadow: 0 4px 4px rgba(0,0,0,0.1);opacity: 1;text-align: center;cursor: pointer;line-height: 30px;">×</div>\
				<div class="bar" style="height:36px; position:relative;background:#F3F7FA;padding: 5px 10px;">\
					<span style="margin-right: 2px;width:14px;height:14px;background-color:#F86365;display:inline-block;vertical-align:middle;border-radius: 50%;"></span>\
					<span style="margin-right: 2px;width:14px;height:14px;background-color:#EBCC1C;display:inline-block;vertical-align:middle;border-radius: 50%;"></span>\
					<span style="margin-right: 2px;width:14px;height:14px;background-color:#81D46C;display:inline-block;vertical-align:middle;border-radius: 50%;"></span>\
				</div>\
				<iframe src="http://cogworks.com/cogworks_betav2_latest/index.html" frameborder="0" style="position: absolute;top: 36px;bottom: 0;width: 100%;height: calc( 100% - 36px);"></iframe>\
			</div>\
		</div>');
		
		demo.appendTo('body');
	}


	var form = $('#newsletter-form');
	var messageHolder = $('.subscribe .status');
	var tmp = 'ne3"rl@!';

	var working = false;

	form.on('submit', function(e){
		e.preventDefault();

		if(working) return;
		working = true;

		$.post('/index-subscription-handler.php', {
			email: form.find('input').val(),
			rt: tmp+'№q4('
		}, function(msg){
			
			if(msg.match(/Thank/)){
				form[0].reset();
			}

			messageHolder.text(msg);

			working = false;
		});
	});
});