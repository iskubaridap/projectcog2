<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="">
        <meta name="author" content="">
        <link rel="manifest" href="./assets/js/json/manifest.json">

        <title>Project Cog | Welcome</title>
        
        <link rel="icon" type="image/png" href="./assets/img/icon/landing-icon.png">
        <link href="./assets/css/bootstrap.min.css" rel="stylesheet">
        <link href="./assets/css/animate.css" rel="stylesheet">
        <link href="./assets/font-awesome/css/font-awesome.min.css" rel="stylesheet">

        <link href="./assets/css/home-style.css" rel="stylesheet">
        <link href="./assets/css/landing.css" rel="stylesheet">
        <link href="./assets/css/layout.css" rel="stylesheet">
        <link href="./assets/css/responsiveslides.css" rel="stylesheet">
        <link href="./assets/css/modal.css" rel="stylesheet">

        <script>new Image().src="./assets/css/iframe-styles.css"</script>
        <script src="https://cdn.onesignal.com/sdks/OneSignalSDK.js" async></script> 
        <script>
            var OneSignal = window.OneSignal || [];
            OneSignal.push(["init", {
                appId: "4e60382e-a50f-4c00-bc69-b5bd0873005d",
                autoRegister: false,
                persistNotification : true,
                notifyButton: {
                enable: true /* Set to false to hide */,
                    showCredit: false
                }
            }]);
        </script>
    </head>
    <body>
        <body id="page-top" class="landing-page">
            <div class="navbar-wrapper">
                <nav class="navbar navbar-default navbar-fixed-top" role="navigation">
                    <div class="container">
                        <a href="#">
                            <img id="logoAnimate" src="./assets/img/logo/projectcog/logo.svg" width="200" class="img-responsive"/>
                            <div id="logoTitleAnimate" class="grey">Project Cog</div>
                        </a>
                        <div class="navbar-header page-scroll">
                            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar"> <span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span> </button>
                        </div>
                        <div id="cogWorksBtn" class="hidden-xs">
                            <?php if ($logged) : ?>
                                <a class="navbar-brand" href="./dashboard#/cogworks/home/main">COGWORKS</a>
                            <?php else: ?>
                                <a class="navbar-brand" href="./dashboard#/login">LOGIN</a>
                            <?php endif; ?>
                        </div>
                        <div id="navbar" class="navbar-collapse collapse">
                            <ul class="nav navbar-nav navbar-right">
                                <li><a class="page-scroll" href="#page-top">Home</a></li>
                                <li><a class="page-scroll" href="#features">Features</a></li>
                                <li><a class="page-scroll" href="#skills">Skills</a></li>
                                <li><a class="page-scroll" href="#contact">Contact</a></li>
                                <?php if ($logged) : ?>
                                    <li class="visible-xs-block"><a class="page-scroll" href="./dashboard#/cogworks/home/main">COGWORKS</a></li>
                                <?php else: ?>
                                    <li class="visible-xs-block"><a class="page-scroll" href="./dashboard#/login">LOGIN</a></li>
                                <?php endif; ?>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div> <!-- .navbar-wrapper -->
            
            <div>
                <div id="headerImage" class="visible-xs">
                    <div class="container">
                        <div class="col-md-12">
                            <div id="logoWrapper">
                                <img id="logo" src="./assets/img/logo/projectcog/logo.svg" width="300" class="img-responsive"/>
                                <h1 class="logo">Project Cog</h1>
                                <p>Imagination, meet innovation. You two should get along just fine.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <iframe id="headerAnimation" class="visible-sm visible-md visible-lg" frameborder="0" scrolling="no" src="./assets/embed/home/header/pcheader.html" width="100%" height="550"></iframe>
            </div>
            <div id="parallaxHowdy">
                <div id="welcomeText" class="text-center">
                    <div class="navy-line"></div>
                    <h2>Whatever you need, our answer will always be, <span class="lineBreaker">"You betcha!"</span>
                    Check out what Project Cog can do for you...</h2>
                    <p id="arrayBtns"><a class="btn btn-lg btn-primary red page-scroll"  href="#features1" role="button">Apps &amp; Games</a> <a class="btn btn-lg btn-primary red page-scroll" href="#features2" role="button">E-Learning Solutions</a> <a class="btn btn-lg btn-primary red page-scroll" href="#features3" role="button">Widgets & What-nots</a></p>
                </div>
            </div>
            <section id="features" class="container services">
                <div class="col-lg-12 text-center">
                    <h1 class="grey titlePad">Oh yeah, we do that...</h1>
                    <p class="bigtext">We like to think of ourselves as well-rounded. Seriously, we've got all the angles covered. Try us. </p>
                </div>
                <div class="row features-block"> 
                <!-- Feature 1 -->
                    <div id="features1" class="col-md-12 features-text wow fadeInRight">
                        <div class="col-md-6 featureRight">
                            <div id="robotProf" class="wow fadeInRight featureRight">
                                <div class="featurebox">
                                    <div id="spaceInvaders" data-toggle="modal" data-target="#spaceInvadersModal">&nbsp;</div>
                                    <iframe id="spaceInvadersIframe" class="wow fadeInRight featureRight featureimg" width="100%" frameborder="0" scrolling="no" src="./assets/embed/home/robot1/robot1.html"></iframe>
                                </div>
                            </div>
                        </div>
                        <div class="writeUp col-md-6 featureLeft featureTxt">
                            <h2>App &amp; Game Development</h2>
                            <p>Maybe you&rsquo;re looking for something from our own line of in-house developed products. Or maybe you need your own custom app developed. No sweat. We can take you to the next level and give you the tools you need to succeed and look bodacious while you&rsquo;re at it.</p>
                            <a href="" data-toggle="modal" data-target="#addGameDevModal" class="btn btn-primary featurebtn">Learn more</a>
                        </div>
                    </div>

                    <!-- Feature 2 -->
                    <div id="features2" class="col-md-12 features-text wow fadeInLeft">
                        <div class="col-md-6 featureLeft">
                            <div class="wow fadeInLeft featureLeft">
                                <div class="featurebox"> 
                                    <iframe id="eLearningRobot" class="wow fadeInRight featureLeft featureimg" frameborder="0" scrolling="no" src="./assets/embed/home/elearning_parent/elearning_parent.html"></iframe>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 featureRight featureTxt">
                            <div>
                                <h2>e-Learning Solutions</h2>
                                <p>Serious (and sometimes not-so-serious) games, immersive interactions, engaging scenarios and more. When it comes to eLearning we&rsquo;ll bring you a truly awesome experience that will entertain and educate the pants off your audience. </p>
                                <a id="eLearningModal2Btn" href="" data-toggle="modal" data-target="#eLearningModal2" class="btn btn-primary featurebtn">Learn more</a>
                            </div>
                        </div>
                    </div>

                    <!-- Feature 3 -->
                    <div id="features3" class="col-md-12 features-text wow fadeInLeft">
                        <div class="col-md-6 featureRight">
                            <div class="wow fadeInRight featureRight">
                                <div class="featurebox">
                                    <iframe id="vendingMachine" class="wow fadeInRight featureRight" frameborder="0" scrolling="no" src="./assets/embed/home/vending/spinMachine.html"></iframe>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 featureLeft featureTxt" style="margin-top:20px; text-align: center;">
                            <h2>Widgets & What-nots</h2>
                            <p>Need a little something to make your life easier? We’ve got a wide variety of time-saving tools at your disposal - just make a selection. Don&rsquo;t see what you need? Let us know! We&rsquo;ll develop something to make the competition jealous. </p>
                            <a id="hotspotterBtn" href="" data-toggle="modal" data-target="#toolsPluginModal" class="btn btn-primary featurebtn">Learn more</a>
                            <a href="" data-toggle="modal" data-target="#emailModal" class="btn btn-primary featurebtn">Email us</a>
                        </div>
                    </div>
                </div>
            </section>
            <div id="parallaxSkills" data-parallax="scroll" data-image-src="./assets/img/warning.png">
                <section id="skills" class="container skills">
                    <div class="row">
                        <div class="col-lg-12 text-center">
                            <div class="navy-line"></div>
                            <h1 class="grey titlePad">We got game.</h1>
                            <p class="bigtext">Well of course we do custom development. It’s like renting your very own design & development team!</p>
                        </div>
                    </div>
                    <div class="row" style="margin-bottom: 0;">
                        <div class="col-md-3 text-center wow fadeInLeft">
                            <div>
                                <i class="fa fa-laptop features-icon"></i>
                                <h3>Front End Development </h3>
                                <p class="small">Your clients want gorgeous, sleek and intuitive web applications. You&rsquo;re in luck, we like shiny things.</p>
                            </div>
                            <div class="m-t-lg">
                                <i class="fa fa-graduation-cap features-icon"></i>
                                <h3>Instructional Design</h3>
                                <p class="small">We make e-Learning fun but effective by individually analyzing and meeting your educational needs.</p>
                            </div>
                            <div class="m-t-lg">
                                <i class="fa fa-film features-icon"></i>
                                <h3>Animation</h3>
                                <p class="small">One of the best ways to encourage interaction with your app or course is to bring it to life using our animators.</p>
                            </div>
                        </div>
                        <div class="col-md-6 text-center wow zoomIn visible-md visible-lg">
                            <img id="logoFeature" src="./assets/img/command.png" alt="dashboard" class="img-responsive">
                        </div>
                        <div class="col-md-3 text-center wow fadeInRight">
                            <div>
                                <i class="fa fa-code features-icon"></i>
                                <h3>Back End Development</h3>
                                <p class="small">Backend Development: Server-side coding and intelligent database design is our cake and, yes, it&rsquo;s delicious. Care for a slice?</p>
                            </div>
                            <div class="m-t-lg">
                                    <i class="fa fa-crop features-icon"></i>
                                    <h3>Graphic Design</h3>
                                    <p class="small">Need logos, custom graphics, or print-ready artwork? Our design team has you covered and lookin&rsquo; goood.</p>
                            </div>
                            <div class="m-t-lg">
                                    <i class="fa fa-bar-chart features-icon"></i>
                                    <h3>Project Management</h3>
                                    <p class="small">From planning to completion, your projects are in some seriously solid and experienced hands.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <section id="contact" class="contact">
                <div id="parallaxFooter" data-parallax="scroll" data-image-src="{{root|raw}}public/img/pipebackground_colorbg.png">
                    <div id="factoryBG">
                        <img src="./assets/img/background/website_layout_cutouttop_nopipes.png"/>
                    </div>
                </div>
                <div id="contactBG" class="container">
                    <div class="row text-center" style="margin-bottom: 0;">
                        <div class="col-lg-12 text-center">
                            <h1 class="grey">Contact Us</h1>
                            <p class="bigtext">Always here when you need us &#8211; only an email or phone call away. Pen pals? Sure, we can do that too.</p>
                        </div>
                        <div id="address">
                            <p><span style="font-weight: 400;">Project Cog, LLC.</span><br/>
                            <i class="fa fa-map-marker"></i> &nbsp;1408 Yellow Wood Dr, Mebane, NC 27302<br/>
                            <i class="fa fa-phone"></i> &nbsp;919-491-3110<br/>
                            <i class="fa fa-envelope"></i> &nbsp;hello@projectcog.com</p>
                        </div>
                        <div id="sendMail"> <a href="mailto:hello@projectcog.com" class="btn btn-primary">Send us an email!</a>
                            <p class="m-t-sm"> Or feel free to stalk us elsewhere... </p>
                            <ul class="list-inline social-icon">
                                <li><a href="https://www.facebook.com/ProjectCog"><i class="fa fa-facebook"></i></a> </li>
                                <li><a href="https://twitter.com/projectcog"><i class="fa fa-twitter"></i></a> </li>
                                <li><a href="https://plus.google.com/106274725946245012115"><i class="fa fa-google-plus"></i></a> </li>
                                <li><a href="https://www.linkedin.com/company/project-cog"><i class="fa fa-linkedin"></i></a> </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            <section id="footer">
                <p id="copyRight">Copyright &copy; <?= date("Y"); ?> Project Cog LLC. All rights reserved.</p>
            </section>

            <?php include './templates/home-modal/space_invaders.php' ;?>
            <?php include './templates/home-modal/app_game_dev.php' ;?>
            <?php include './templates/home-modal/e_learning.php' ;?>
            <?php include './templates/home-modal/e_learning2.php' ;?>
            <?php include './templates/home-modal/tools_plugin.php' ;?>
            <?php include './templates/home-modal/email_form.php' ;?>

        </body>

        <!-- Mainly scripts --> 
        <script src="./assets/js/jquery/jquery-2.1.1.js"></script>
        <script src="./assets/js/plugins/parallax/parallax.js"></script> 
        <script src="./assets/js/bootstrap/bootstrap.min.js"></script> 
        <script src="./assets/js/plugins/metisMenu/jquery.metisMenu.js"></script> 
        <script src="./assets/js/plugins/slimscroll/jquery.slimscroll.min.js"></script> 

        <!-- Custom and plugin javascript --> 
        <script src="./assets/js/plugins/pace/pace.min.js"></script> 
        <script src="./assets/js/plugins/wow/wow.min.js"></script>
        <script src="./assets/js/plugins/responsiveslides/responsiveslides.js"></script>	
        <script src="./assets/js/plugins/easing/jquery.easing.min.js"></script>	
        <script src="./assets/js/plugins/mixitup/jquery.mixitup.min.js"></script>
        <script src="./assets/js/plugins/image-slider/js-image-slider.js"></script>
        <script src="./assets/js/home/home.js"></script>
    </body>
</html>
