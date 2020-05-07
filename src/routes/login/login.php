<?php

use Slim\App;
use Slim\Http\Request;
use Slim\Http\Response;

return function (App $app) {
    $container = $app->getContainer();
    $app->post('/login/test-function', function ($request, $response, $args) use ($container) {
        test();
    });
    $app->post('/login/user/test', function ($request, $response, $args) use ($container) {
        return json_encode(identifyLoggedUser($container));
    });
    $app->post('/login/logged-user', function ($request, $response, $args) use ($container) {
        @session_start();
        return json_encode(isset($_SESSION["logged"]));
    });
    $app->get('/login', function ($request, $response, $args) use ($container) {
        // Making sure everything is fresh
        @session_start();
    
        unset($_SESSION['id']);
        unset($_SESSION['logged']);

        @session_destroy();
        
        custom_redirect('login');
    });
    
    $app->post('/login/validate', function ($request, $response, $args) use ($container) {
        @session_start();
        $result = 'false';
        $dateDateTime = getCurrentDate();
        
        // using email for now
        $email = $request->getParam('email');
        $pass = md5($request->getParam('password'));
        
        $user = $container->projectcog->query("
            select * from users
            where email = '$email' and password = '$pass'
        ")->fetch(PDO::FETCH_ASSOC);
        
        if(is_array($user) && count($user) > 0)
        {
            $id = $user['id'];
            $prepare = $container->projectcog->prepare("
                update users
                set last_login = '$dateDateTime'
                where id = '$id'
            ");

            $prepare->execute();
            $_SESSION['id'] = $id;
            $_SESSION['logged'] = true;
            $result = true;
        }
        else
        {
            $result = false;
        }
        return json_encode($result);
    });
    $app->get('/logout', function ($request, $response, $args) use ($container) {
        @session_start();
    
        unset($_SESSION['id']);
        unset($_SESSION['logged']);

        @session_destroy();

        // return 'true';
        // route to dashboard for now
        custom_redirect('login');
    });
};