
<!DOCTYPE html>
<html>

    <head>

        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <title>Cogworks | Login</title>

        <link rel="icon" type="image/png" href="../assets/img/icon/favicon.png">

        <link href="../assets/css/bootstrap.min.css" rel="stylesheet">
        <link href="../assets/font-awesome/css/font-awesome.css" rel="stylesheet">

        <link href="../assets/css/animate.css" rel="stylesheet">
        <link href="../assets/css/style.css" rel="stylesheet">
        <link href="../assets/css/plugins/sweetalert/sweetalert.css" rel="stylesheet">
        

    </head>

    <body class="gray-bg">

        <div class="middle-box text-center loginscreen  animated fadeInDown">
            <div>
                <div>
                    <img id="login-logo" src="../assets/img/logo/projectcog/logo.svg">
                </div>
                <form class="m-t" role="form">
                    <div class="form-group">
                        <input id="email-input" type="email" class="form-control" placeholder="Email" required="">
                    </div>
                    <div class="form-group">
                        <input id="password-input" type="password" class="form-control" placeholder="Password" required="">
                    </div>
                    <button id="submit-btn" type="button" class="btn btn-primary block full-width m-b">Login</button>
                </form>
            </div>
        </div>

        <!-- Mainly scripts -->
        <script src="../assets/js/jquery/jquery-3.1.1.min.js"></script>
        <script src="../assets/js/bootstrap/bootstrap.min.js"></script>
        <script src="../assets/js/plugins/sweetalert/sweetalert.min.js"></script>
        <script>
            $(function(){
                $('#submit-btn').off().on('click', function(){
                    var emailInput = $('#email-input').val();
                    var passwordInput = $('#password-input').val();
                    $.post('../cogworks/login/validate', {email: emailInput, password: passwordInput})
                    .then(function (response) {
                        if(response == 'true'){
                            location.reload();
                        } else{
                            swal({
                                title: "Login Fail",
                                text: "Your Email or Password may be incorrect. Please provide your proper credentials and try it again."
                            }, function(isConfirm){
                                if(isConfirm){
                                    $('#password-input').val('');
                                }
                            });
                        }
                    }, function (response) {
                        swal({
                            title: "Login Fail",
                            text: "Something went wrong please try it again. If problem persist inform the Admin regarding the issue."
                        }, function(isConfirm){
                            if(isConfirm){
                                $('#password-input').val('');
                            }
                        });
                    });
                });
            });
        </script>

    </body>

</html>
