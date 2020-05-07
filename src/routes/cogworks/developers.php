<?php

use Slim\App;
use Slim\Http\Request;
use Slim\Http\Response;

return function (App $app) {
    $container = $app->getContainer();

    $app->post('/cogworks/developers/retrieve/active', function ($request, $response, $args) use ($container) {
        $loggedUser = identifyLoggedUser($container);
        $userID = $loggedUser['id'];
        $userPosition = $loggedUser['position_id'];
        $userOrg = $loggedUser['organization_id'];
        $page = $request->getParam('page');

        if($page == 'manage') {
            // be aware that i used alias for status_id into status
            $developers = $container->projectcog->query("
                select users.id, users.user, users.firstname, users.lastname, users.middlename, users.position_id, users.status_id, positions.position, users.image, users.organization_id from users, positions 
                where users.position_id = positions.id and (users.id <> 1 and users.id <> 2) and users.organization_id <> 1
                order by users.user asc
            ")->fetchAll(PDO::FETCH_ASSOC);
        } else {
            $developers = $container->projectcog->query("
                select users.id, users.user, positions.position, users.image, users.organization_id from users, positions 
                where users.status_id = '1' and users.position_id = positions.id  and (users.id <> 1 and users.id <> 2) and users.organization_id = '$userOrg' 
                order by users.user asc
            ")->fetchAll(PDO::FETCH_ASSOC);
        }
        foreach($developers as &$developer)
        {
            $imgAry = getCogDeveloperThumbnail($developer['organization_id'], $developer['id'], $developer['image'], $container);
            $developer['imageValue'] = $imgAry['imageValue'];
            $developer['image'] = $imgAry['path'];
            if($developer['status_id'] == 2) {
                $developer['status'] = 'inactive';
            } else if($developer['status_id'] == 5) {
                $developer['status'] = 'inactive-org';
            } else {
                $developer['status'] = 'active';
            }
            
        }
        return json_encode($developers);
    });
    $app->post('/cogworks/developers/retrieve/org/active', function ($request, $response, $args) use ($container) {
        $orgID = $request->getParam('org');
        $developers = $container->projectcog->query("
            select users.id, users.user, positions.position, users.image, users.organization_id from users, positions 
            where users.status_id = '1' and users.position_id = positions.id  and (users.id <> 1 and users.id <> 2) and users.organization_id = '$orgID' 
            order by users.user asc
        ")->fetchAll(PDO::FETCH_ASSOC);
        foreach($developers as &$developer)
        {
            $imgAry = getCogDeveloperThumbnail($developer['organization_id'], $developer['id'], $developer['image'], $container);
            $developer['imageValue'] = $imgAry['imageValue'];
            $developer['image'] = $imgAry['path'];
            if($developer['status_id'] == 2) {
                $developer['status'] = 'inactive';
            } else if($developer['status_id'] == 5) {
                $developer['status'] = 'inactive-org';
            } else {
                $developer['status'] = 'active';
            }
            
        }
        return json_encode($developers);
    });
    $app->post('/cogworks/developers/add', function ($request, $response, $args) use ($container) {
        $loggedUser = identifyLoggedUser($container);
        $id = $request->getParam('id');
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
    $app->post('/cogworks/developers/update', function ($request, $response, $args) use ($container) {
        $loggedUser = identifyLoggedUser($container);
        $id = $request->getParam('id');
        $name = $request->getParam('name');
        $firstname = $request->getParam('firstname');
        $middlename = $request->getParam('middlename');
        $lastname = $request->getParam('lastname');
        $org = $request->getParam('org');
        $acctID = $request->getParam('account');
        $email = $request->getParam('email');
        $password = $request->getParam('password');
        $position = $request->getParam('position');
        $address = addslashes($request->getParam('address'));
        $country = addslashes($request->getParam('country'));
        $file = $request->getUploadedFiles();
        $dateDateTime = getCurrentDate();
        $imageName = '';
        $path = '';
        $result = null;
        $imageName = null;

        if($loggedUser['organization_id'] != 1) {
            $acctID = $loggedUser['account_id'];
            $org = $loggedUser['organization_id'];
        }

        if(!empty($file) && strlen(trim($password)) > 0) {
            $imageName = $file['file']->getClientFilename();
            $password = md5($password);
            $prepare = $container->projectcog->prepare("
                update users
                set
                user = '$name',
                firstname = '$firstname',
                lastname = '$lastname',
                middlename = '$middlename',
                email = '$email',
                username = '$email',
                password = '$password',
                image = '$imageName',
                address = '$address',
                country = '$country',
                position_id = '$position',
                account_id = '$acctID',
                organization_id = '$org',
                updated = '$dateDateTime'
                where id = '$id'
            ");
            $uploadedFile = $file['file'];
            $imageAry = getCogDeveloperThumbnail($org, $id, $imageName, $container);
            $imagePath = $imageAry['path'];
            $uploadedFile->moveTo($imagePath);
            chmod($imagePath . $imageName,0777);
        } else if(!empty($file) && strlen(trim($password)) <= 0) {
            // this statement is for updating an image but it doesn't need to change password value
            $imageName = $file['file']->getClientFilename();
            $prepare = $container->projectcog->prepare("
                update users
                set
                user = '$name',
                firstname = '$firstname',
                lastname = '$lastname',
                middlename = '$middlename',
                email = '$email',
                username = '$email',
                image = '$imageName',
                address = '$address',
                country = '$country',
                position_id = '$position',
                account_id = '$acctID',
                organization_id = '$org',
                updated = '$dateDateTime'
                where id = '$id'
            ");
            $uploadedFile = $file['file'];
            $imageAry = getCogDeveloperThumbnail($org, $id, $imageName, $container);
            $imagePath = $imageAry['path'];
            $uploadedFile->moveTo($imagePath);
            chmod($imagePath . $imageName,0777);
        } else if(strlen(trim($password)) <= 0) {
            // this statement doesn't need to change image and password value
            $prepare = $container->projectcog->prepare("
                update users
                set
                user = '$name',
                firstname = '$firstname',
                lastname = '$lastname',
                middlename = '$middlename',
                email = '$email',
                username = '$email',
                address = '$address',
                country = '$country',
                position_id = '$position',
                account_id = '$acctID',
                organization_id = '$org',
                updated = '$dateDateTime'
                where id = '$id'
            ");
        } else {
            // this statement doesn't need to change image value, but updating it's password
            $password = md5($password);
            $prepare = $container->projectcog->prepare("
                update users
                set
                user = '$name',
                firstname = '$firstname',
                lastname = '$lastname',
                middlename = '$middlename',
                email = '$email',
                username = '$email',
                password = '$password',
                address = '$address',
                country = '$country',
                position_id = '$position',
                account_id = '$acctID',
                organization_id = '$org',
                updated = '$dateDateTime'
                where id = '$id'
            ");
        }
        $result = $prepare->execute();
        if($org == 1) {
            $newUserPath = setCogworksDirectoryPath($org) . 'users/' . $id;
        } else if($org == 2) {
            $newUserPath = setCogworksDirectoryPath($org) . $id;
        } else {
            $newUserPath = setCogworksDirectoryPath($org) . $org . '/users/' . $id;
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
        $dateDateTime = getCurrentDate();
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
    $app->post('/cogworks/developers/get-positions', function ($request, $response, $args) use ($container) {
        $loggedUser = identifyLoggedUser($container);
        $result = null;

        if($loggedUser['position_id)']){
            $result = $container->projectcog->query("
                select * from positions
                order by id desc limit 1
            ")->fetchAll(PDO::FETCH_ASSOC);
        } else {
            $result = $container->projectcog->query("
                select * from positions
                where id <> 1 and id <> 2
                order by id desc limit 1
            ")->fetchAll(PDO::FETCH_ASSOC);
        }

        return json_encode($result);
    });
    $app->post('/cogworks/developers/activate', function ($request, $response, $args) use ($container) {
        $id = $request->getParam('id');
        $dateDateTime = getCurrentDate();
        $result = null;

        $prepare = $container->projectcog->prepare("
            update users
            set
            status_id = '1',
            updated = '$dateDateTime'
            where id = '$id'
        ");

        $result = $prepare->execute();

        return json_encode($result);
    });
};