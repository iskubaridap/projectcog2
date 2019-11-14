<?php

use Slim\App;
use Slim\Http\Request;
use Slim\Http\Response;
/*
    // This is prove that we can access more than one database in one app
    // Change "pdo" into the first database
    // Change "pdo2" into the second database

    $app->get('/extra/db-test', function ($request, $response, $args) use ($container) {
        $users = $container->pdo->query("
            select * from users;
        ")->fetchAll(PDO::FETCH_ASSOC);
        $users2 = $container->pdo2->query("
            select * from account_types;
        ")->fetchAll(PDO::FETCH_ASSOC);

        return json_encode($users) . '<br><br><br>' . json_encode($users2);
    }); 
*/

return function (App $app) {
    $container = $app->getContainer();

    $app->get('/extra/db-test', function ($request, $response, $args) use ($container) {
        $users = $container->projectcog->query("
            select * from users;
        ")->fetchAll(PDO::FETCH_ASSOC);

        $cogFiles = $container->cogworks->query("
            select * from cog_files;
        ")->fetchAll(PDO::FETCH_ASSOC);

        return json_encode($users) . '<br><br><br>' . json_encode($cogFiles);
    });
};
