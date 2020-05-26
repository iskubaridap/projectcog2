<?php

use Slim\App;
use Slim\Http\Request;
use Slim\Http\Response;

return function (App $app) {
    $container = $app->getContainer();
    $app->post('/accounts/test-function', function ($request, $response, $args) use ($container) {
        test();
    });
    $app->post('/accounts/retrieve/types-allowed-users', function ($request, $response, $args) use ($container) {
        $result = array();

        $result['accountType'] = $container->projectcog->query("
            select id, account_type from account_types
        ")->fetchAll(PDO::FETCH_ASSOC);
        $result['allowedUsers'] = $container->projectcog->query("
            select id, allowed_user from allowed_users
        ")->fetchAll(PDO::FETCH_ASSOC);

        return json_encode($result);
    });
    $app->post('/accounts/retrieve/user', function ($request, $response, $args) use ($container) {
        $result = array();

        $orgID = $request->getParam('id');
        $acctID = 0;
        $result = array();

        $orgObj = $container->projectcog->query("
            select * from organizations where id = '$orgID'
        ")->fetch(PDO::FETCH_ASSOC);

        $acctID = $orgObj['account_id'];

        $result['account'] = $container->projectcog->query("
            select * from accounts where id = '$acctID'
        ")->fetch(PDO::FETCH_ASSOC);
        $result['accountType'] = $container->projectcog->query("
            select id, account_type from account_types
        ")->fetchAll(PDO::FETCH_ASSOC);
        $result['allowedUsers'] = $container->projectcog->query("
            select id, allowed_user from allowed_users
        ")->fetchAll(PDO::FETCH_ASSOC);

        return json_encode($result);

        return json_encode($result);
    });
    $app->post('/accounts/retrieve/org', function ($request, $response, $args) use ($container) {
        $orgID = $request->getParam('id');
        $acctID = 0;
        $result = array();

        $orgObj = $container->projectcog->query("
            select * from organizations where id = '$orgID'
        ")->fetch(PDO::FETCH_ASSOC);

        $acctID = $orgObj['account_id'];

        $result['account'] = $container->projectcog->query("
            select * from accounts where id = '$acctID'
        ")->fetch(PDO::FETCH_ASSOC);
        $result['accountType'] = $container->projectcog->query("
            select id, account_type from account_types
        ")->fetchAll(PDO::FETCH_ASSOC);
        $result['allowedUsers'] = $container->projectcog->query("
            select id, allowed_user from allowed_users
        ")->fetchAll(PDO::FETCH_ASSOC);

        return json_encode($result);
    });
};