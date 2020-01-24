<?php

use Slim\App;
use Slim\Http\Request;
use Slim\Http\Response;

return function (App $app) {
    $container = $app->getContainer();

    $app->post('/cogworks/developers/retrieve/active', function ($request, $response, $args) use ($container) {
        $loggedUser = identifyLoggedUser($container);
        $userPosition = $loggedUser['position_id'];
        $userOrg = $loggedUser['organization_id'];

        if($userPosition == 1)
        {
            $developers = $container->projectcog->query("
                select users.id, users.user, users.firstname, users.lastname, users.middlename, users.position_id, positions.position, users.image, users.organization_id from users, positions 
                where users.status_id = '1' and users.position_id = positions.id and users.organization_id <> 1
                order by users.user asc
            ")->fetchAll(PDO::FETCH_ASSOC);
        }
        else
        {
            $developers = $container->projectcog->query("
                select users.id, users.user, positions.position, users.image, users.organization_id from users, positions 
                where users.status_id = '1' and users.position_id = positions.id and users.organization_id = '$userOrg' 
                order by users.user asc
            ")->fetchAll(PDO::FETCH_ASSOC);
        }
        // Disable for now
        // if(is_array($developers))
        // {
            foreach($developers as &$developer)
            {
                $imgAry = getCogDeveloperThumbnail($developer['organization_id'], $developer['id'], $developer['image'], $container);
                $developer['imageValue'] = $imgAry['imageValue'];
                $developer['image'] = $imgAry['path'];
            }
        // }
        return json_encode($developers);
    });
    $app->post('/cogworks/developers/add', function ($request, $response, $args) use ($container) {
        $loggedUser = identifyLoggedUser($container);
        $name = $request->getParam('name');
        $firstname = $request->getParam('firstname');
        $middlename = $request->getParam('middlename');
        $lastname = $request->getParam('lastname');
        $org = $request->getParam('org');
        $acctID = $request->getParam('account');
        $email = $request->getParam('email');
        $password = md5($request->getParam('password'));
        $position = $request->getParam('position');
        $address = addslashes($request->getParam('address'));
        $country = addslashes($request->getParam('country'));
        $file = $request->getUploadedFiles();
        $imageName = '';
        $path = '';
        $result = null;
        $imageName = null;

        if($loggedUser['organization_id'] != 1) {
            $acctID = $loggedUser['account_id'];
            $org = $loggedUser['organization_id'];
        }

        if(!empty($file)) {
            $imageName = $file['file']->getClientFilename();
            $result = $container->projectcog->exec("
                insert into users
                (user, firstname, lastname, middlename, email, username, password, image, address, country, position_id, account_id, organization_id)
                values('$name', '$firstname', '$lastname', '$middlename', '$email', '$email', '$password', '$imageName', '$address', '$country', '$position', '$acctID', '$org')
            ");
            $newUser = $container->projectcog->query("
                select * from users
                order by id desc limit 1
            ")->fetch(PDO::FETCH_ASSOC);

            $uploadedFile = $file['file'];
            $imageAry = getCogDeveloperThumbnail($org, $newUser['id'], $imageName, $container);
            $imagePath = $imageAry['path'];
            $uploadedFile->moveTo($imagePath);
            chmod($imagePath . $imageName,0777);
        } else {
            $result = $container->projectcog->exec("
                insert into users
                (user, firstname, lastname, middlename, email, username, password, address, country, position_id, account_id, organization_id)
                values('$name', '$firstname', '$lastname', '$middlename', '$email', '$email', '$password', '$address', '$country', '$position', '$acctID', '$org')
            ");
            $newUser = $container->projectcog->query("
                select * from users
                order by id desc limit 1
            ")->fetch(PDO::FETCH_ASSOC);
        }
        if($org == 1) {
            $newUserPath = setCogworksDirectoryPath($org) . 'users/' . $newUser['id'];
        } else if($org == 2) {
            $newUserPath = setCogworksDirectoryPath($org) . $newUser['id'];
        } else {
            $newUserPath = setCogworksDirectoryPath($org) . $org . '/users/' . $newUser['id'];
        }
        generateDirectory($newUserPath);
        generateCogworksUserDirectories($newUserPath);
        return json_encode($result);
    });
    $app->post('/cogworks/developers/profile', function ($request, $response, $args) use ($container) {
        $userID = $request->getParam('id');
        $user = getUserInfo($userID, $container);
        $imgAry = getCogDeveloperThumbnail($user['organization_id'], $user['id'], $user['image'], $container);
        $user['imageValue'] = $imgAry['imageValue'];
        $user['image'] = $imgAry['path'];

        return json_encode($user);
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