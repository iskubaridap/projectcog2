<?php

use Slim\App;
use Slim\Http\Request;
use Slim\Http\Response;

return function (App $app) {
    $container = $app->getContainer();

    $app->post('/cogworks/developers/retrieve/active', function ($request, $response, $args) use ($container) {
        // @session_start();
        // $result = null;
        // $userID = $_SESSION['id'];
        $userPosition = 1;
        $userOrg = 1;
        $index = 0;

        if($userPosition == 1)
        {
            $developers = $container->projectcog->query("
                select users.id, users.user, users.firstname, users.lastname, users.middlename, users.position_id, positions.position, users.image from users, positions 
                where users.status_id = '1' and users.position_id = positions.id and organization_id <> 1
                order by users.user asc
            ")->fetchAll(PDO::FETCH_ASSOC);
            /* $developers = $container->projectcog->query("
                select id, name, image, role, organization_id from users 
                where active = '1' and organization_id <> 1
                order by name asc
            ")->fetchAll(PDO::FETCH_ASSOC); */
        }
        else
        {
            $developers = $container->projectcog->query("
                select users.id, users.user, positions.position, users.image from users, positions 
                where users.status_id = '1' and users.position_id = positions.id and organization_id = '$userOrg' 
                order by users.user asc
            ")->fetchAll(PDO::FETCH_ASSOC);
        }
        // Disable for now
        // if(is_array($developers))
        // {
            foreach($developers as &$developer)
            {
                // if($developer['image'] == null)
                // {
                    $developer['image'] = 'assets/img/thumbnail/thumbnail-profile-pic.png';
                // }
            }
        // }
        return json_encode($developers);
    });
    $app->post('/cogworks/developers/deactivate', function ($request, $response, $args) use ($container) {
        $id = $request->getParam('id');
        $date = new DateTime('NOW');
        $dateDateTime = $date->format('Y-m-d H:i:s');
        $result = null;

        $prepare = $container->projectcog->prepare("
            update users
            set
            status_id = '2',
            updated = '$dateDateTime'
            where id = '$id'
        ");

        $result = $prepare->execute();

        return json_encode($result);
    });
};