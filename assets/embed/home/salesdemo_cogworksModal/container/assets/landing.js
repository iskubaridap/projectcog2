$(function(){

	var isChrome = window.navigator.vendor == "Google Inc.";
    
    if(self==top)
    {
        $('#openCogworksTool').unbind().bind("click",function(e){

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
        
    }
    
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

		demo = $('<div style="background-color: rgba(0,0,0,0.6);z-index: 100;position: fixed;top: 0;left: 0;width: 100%;height: 100%;" class="demo-overlay">\
			<div style="width:96%;height:96%; position:absolute;top:2%;left:2%;">\
				<div class="close-demo" style="border-radius: 50%;background-color: #CC1A1A;color: #fff;font-size: 24px;position: absolute;top: -10px;right: -10px;width: 30px;height: 30px;z-index: 10;box-shadow: 0 4px 4px rgba(0,0,0,0.1);opacity: 1;text-align: center;cursor: pointer;line-height: 30px;">×</div>\
				<div class="bar" style="height:36px; position:relative;background:#F3F7FA;padding: 5px 10px;">\
					<span style="margin-right: 2px;width:14px;height:14px;background-color:#F86365;display:inline-block;vertical-align:middle;border-radius: 50%;"></span>\
					<span style="margin-right: 2px;width:14px;height:14px;background-color:#EBCC1C;display:inline-block;vertical-align:middle;border-radius: 50%;"></span>\
					<span style="margin-right: 2px;width:14px;height:14px;background-color:#81D46C;display:inline-block;vertical-align:middle;border-radius: 50%;"></span>\
				</div>\
				<iframe src="http://projectcog.com/cogworks_betav2_latest/index.html" frameborder="0" style="position: absolute;top: 36px;bottom: 0;width: 100%;height: calc( 100% - 36px);"></iframe>\
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