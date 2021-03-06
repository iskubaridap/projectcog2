<?php

use Slim\App;
use Slim\Http\Request;
use Slim\Http\Response;

return function (App $app) {
    $container = $app->getContainer();
    $app->post('/users/test-function', function ($request, $response, $args) use ($container) {
        test();
    });
    $app->post('/users/logged-user', function ($request, $response, $args) use ($container) {
        return json_encode(identifyLoggedUser($container));
    });
    $app->post('/users/retrieve/positions', function ($request, $response, $args) use ($container) {
        $user = identifyLoggedUser($container);
        $result = null;

        if($user['position_id'] == 1) {
            $result = $container->projectcog->query("
                select * from positions
            ")->fetchAll(PDO::FETCH_ASSOC);
        } else {
            $result = $container->projectcog->query("
                select * from positions
                where id <> 1 and id <> 2
            ")->fetchAll(PDO::FETCH_ASSOC);
        }
        return json_encode($result);
    });
    $app->post('/users/retrieve/single', function ($request, $response, $args) use ($container) {
        $userID = $request->getParam('id');
        $user = getUserInfo($userID, $container);
        $imgAry = getCogDeveloperThumbnail($user['organization_id'], $user['id'], $user['image'], $container);
        $user['imageValue'] = $imgAry['imageValue'];
        $user['image'] = $imgAry['path'];

        return json_encode($user);
    });
    $app->post('/users/retrieve/organization-users', function ($request, $response, $args) use ($container) {
        $loggedUser = identifyLoggedUser($container);
        $userID = $loggedUser['id'];
        $orgUserID = $loggedUser['organization_id'];
        $result = array();

        $users = $container->projectcog->query("
            select * from users where organization_id = '$orgUserID' and id <> '$userID' and status_id = 1
        ")->fetchAll(PDO::FETCH_ASSOC);

        foreach($users as $user)
        {
            $ary = array();
            $ary['id'] = $user['id'];
            $ary['user'] = $user['user'];
            $ary['firstname'] = $user['firstname'];
            $ary['lastname'] = $user['lastname'];
            array_push($result, $ary);
        }

        // select * from users where organization_id = 5 and id <> 6
        return json_encode($result);
    });
};