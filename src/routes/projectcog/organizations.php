<?php

use Slim\App;
use Slim\Http\Request;
use Slim\Http\Response;

return function (App $app) {
    $container = $app->getContainer();
    $app->post('/organizations/test-function', function ($request, $response, $args) use ($container) {
        test();
    });
    $app->post('/organizations/retrieve/cogworks/all', function ($request, $response, $args) use ($container) {
        $loggedUser = identifyLoggedUser($container);
        $result = null;
        $orgs = null;

        if($loggedUser['organization_id'] == 1 && $loggedUser['position_id'] == 1) {
            $orgs = $container->projectcog->query("
                select * from organizations
            ")->fetchAll(PDO::FETCH_ASSOC);
            foreach($orgs as &$org)
            {
                $imgAry = getCogOrganizationThumbnail($org['id'], $org['image'], $container);
                $org['imageValue'] = $imgAry['imageValue'];
                $org['image'] = $imgAry['path'];
            }
            $result = $orgs;
        } else {
            $result = 'user not allowed!';
        }

        return json_encode($result);
    });
    $app->post('/organizations/cogworks/add', function ($request, $response, $args) use ($container) {
        $orgID = $request->getParam('id');
        $name = $request->getParam('cogOrgName');
        $acctType = $request->getParam('acctType');
        $allowedUsers = $request->getParam('allowedUsers');
        $file = $request->getUploadedFiles();
        $dateDateTime = getCurrentDate();
        $cogworksFolder = $_SERVER['DOCUMENT_ROOT'] . '/cogworks/';
        $path = '';
        $result = null;
        $imageName = null;
        $acctID = 0;
 
        $newAccount = $container->projectcog->exec("
            insert into accounts
            (account_type_id, allowed_users_id, started)
            values('$acctType', '$allowedUsers', '$dateDateTime');
        ");

        if($newAccount){
            $newAccountObj = $container->projectcog->query("
                select * from accounts
                order by id desc limit 1
            ")->fetch(PDO::FETCH_ASSOC);

            $newAccountID = $newAccountObj['id'];

            if(!empty($file)) {
                $uploadedFile = $file['file'];
                $imageName = $file['file']->getClientFilename();
                
                $result = $container->projectcog->exec("
                    insert into organizations
                    (organization, image, account_id)
                    values('$name', '$imageName', '$newAccountID');
                ");

                $newOrgObj = $container->projectcog->query("
                    select * from organizations
                    order by id desc limit 1
                ")->fetch(PDO::FETCH_ASSOC);

                generateDirectory($cogworksFolder . 'organizations/' . $newOrgObj['id']);
                generateDirectory($cogworksFolder . 'organizations/' . $newOrgObj['id'] . '/users');
                generateCogworksDefaultDirectories($cogworksFolder . 'organizations/' . $newOrgObj['id']);

                $imagePathAry = getCogImageThumbnailDirectory('', $orgID, '', 'organizations');
                $imagePath = $imagePathAry['typePath'];
                $uploadedFile->moveTo($imagePath . '/' . $imageName);
                chmod($imagePath . '/' . $imageName,0777); 
            } else {
                $result = $container->projectcog->exec("
                    insert into organizations
                    (organization, account_id)
                    values('$name', '$newAccountID');
                ");

                $newOrgObj = $container->projectcog->query("
                    select * from organizations
                    order by id desc limit 1
                ")->fetch(PDO::FETCH_ASSOC);

                generateDirectory($cogworksFolder . 'organizations/' . $newOrgObj['id']);
                generateDirectory($cogworksFolder . 'organizations/' . $newOrgObj['id'] . '/users');
                generateCogworksDefaultDirectories($cogworksFolder . 'organizations/' . $newOrgObj['id']);
            }
        }
        
        return json_encode($result);
    });
    $app->post('/organizations/cogworks/update', function ($request, $response, $args) use ($container) {
       $orgID = $request->getParam('id');
       $name = $request->getParam('cogOrgName');
       $acctType = $request->getParam('acctType');
       $allowedUsers = $request->getParam('allowedUsers');
       $file = $request->getUploadedFiles();
       $dateDateTime = getCurrentDate();
       $path = '';
       $result = null;
       $imageName = null;
       $acctID = 0;

        $orgInfo = $container->projectcog->query("
            select * from organizations
            where id = '$orgID'
        ")->fetch(PDO::FETCH_ASSOC);

        $acctID = $orgInfo['account_id'];

        $prepareAcct = $container->projectcog->prepare("
            update accounts
            set
            account_type_id = '$acctType',
            allowed_users_id = '$allowedUsers',
            updated = '$dateDateTime'
            where id = '$acctID'
        ");
        $resultAcct = $prepareAcct->execute();
       if(!empty($file)) {
            $uploadedFile = $file['file'];
            $imageName = $file['file']->getClientFilename();
            $imagePathAry = getCogImageThumbnailDirectory('', $orgID, '', 'organizations');
            $imagePath = $imagePathAry['typePath'];
            $uploadedFile->moveTo($imagePath . '/' . $imageName);
            chmod($imagePath . '/' . $imageName,0777); 

            $prepare = $container->projectcog->prepare("
                update organizations
                set
                organization = '$name',
                image = '$imageName',
                updated = '$dateDateTime'
                where id = '$orgID'
            ");
       } else {
            $prepare = $container->projectcog->prepare("
                update organizations
                set
                organization = '$name',
                updated = '$dateDateTime'
                where id = '$orgID'
            ");
       }

       $result = $prepare->execute();
       return json_encode($result);
   });
    $app->post('/organizations/retrieve/cogworks/single', function ($request, $response, $args) use ($container) {
        $id = $request->getParam('id');
        $result = null;
        $tmpAry = array();
        $obj = $container->projectcog->query("
            select * from organizations
            where id = '$id'
        ")->fetch(PDO::FETCH_ASSOC);

        if(is_array($obj)) {
            $tmpAry = getCogOrganizationThumbnail($obj['id'], $obj['image'], $container);
            $obj['imageValue'] = $tmpAry['imageValue'];
            $obj['image'] = $tmpAry['path'];
            $result = $obj;
        }
        return json_encode($result);
    });
    $app->post('/organizations/info/cogworks', function ($request, $response, $args) use ($container) {
        $orgID = $request->getParam('id');
        $result = array();
        
        $result['info'] = array();
        $result['users'] = array();
        $result['projects'] = array();
        $result['cogfiles'] = array();

        $status = $container->projectcog->query("
            select status from statues;
        ")->fetchAll(PDO::FETCH_ASSOC);
        $acct = $container->projectcog->query("
            select accounts.id, accounts.account_type_id, account_types.account_type, accounts.allowed_users_id, allowed_users.allowed_user, accounts.program_id 
            from accounts, account_types, allowed_users 
            where accounts.account_type_id = account_types.id and accounts.allowed_users_id = allowed_users.id and accounts.id = '$orgID';
        ")->fetch(PDO::FETCH_ASSOC);
        $programs = $container->projectcog->query("
            select program from programs;
        ")->fetchAll(PDO::FETCH_ASSOC);
        $acct['programs'] = array();

        foreach((json_decode($acct['program_id'], false)) as $progID) {
            array_push($acct['programs'], $programs[($progID - 1)]['program']);
        }

        $projectNames = $container->cogworks->query("
            select project from projects
        ")->fetchAll(PDO::FETCH_ASSOC);

        $info = $container->projectcog->query("
            select * from organizations where id = '$orgID';
        ")->fetch(PDO::FETCH_ASSOC);
        $imgAry = getCogOrganizationThumbnail($info['id'], $info['image'], $container);
        $result['info']['id'] = $info['id'];
        $result['info']['organization'] = $info['organization'];
        $result['info']['image'] = $imgAry['path'];
        $result['info']['imageValue'] = $imgAry['imageValue'];
        $result['info']['accountID'] = $info['account_id'];
        $result['info']['statusID'] = $info['status_id'];
        $result['info']['status'] = $status[($info['status_id'] - 1)]['status'];
        $result['info']['updated'] = ($info['updated'] != null) ? (explode(" ", $info['updated']))[0] : '0000-00-00';
        $result['info']['created'] = (explode(" ", $info['created']))[0];

        $users = $container->projectcog->query("
            select users.id, users.user, users.status_id, users.position_id, statues.status, positions.position from users, positions, statues where users.status_id = statues.id and users.position_id = positions.id and users.organization_id = '$orgID' order by users.user
        ")->fetchAll(PDO::FETCH_ASSOC);

        foreach($users as $user) {
            $tmpObj = array();
            $uID = $user['id'];
            $tmpObj['id']  = $uID;
            $tmpObj['user'] = $user['user'];
            $tmpObj['status'] = $user['status'];
            $tmpObj['statusID'] = $user['status_id'];
            $tmpObj['position'] = $user['position'];
            $tmpObj['positionID'] = $user['position_id'];
            array_push($result['users'], $tmpObj);

            $cogfiles = $container->cogworks->query("
                select id, cog_file, status_id, project_id from cog_files where user_id = '$uID' order by cog_file
            ")->fetchAll(PDO::FETCH_ASSOC);

            if(is_array($cogfiles)) {
                foreach($cogfiles as $cogfile) {
                    $tmpObj2 = array();
                    $tmpObj2['id']  = $cogfile['id'];
                    $tmpObj2['cogfile'] = str_replace('.cog', '', $cogfile['cog_file']);
                    $tmpObj2['project'] = ($cogfile['project_id'] != 0) ? $projectNames[($cogfile['project_id'] - 1)]['project'] : '(Personal File)';
                    $tmpObj2['projectID'] = $cogfile['project_id'];
                    $tmpObj2['userID'] = $uID;
                    $tmpObj2['user'] = $user['user'];
                    $tmpObj2['statusID'] = $cogfile['status_id'];
                    $tmpObj2['status'] = $status[($cogfile['status_id'] - 1)]['status'];
                    array_push($result['cogfiles'], $tmpObj2);
                }
            }
        }

        $projects = $container->cogworks->query("
            select id, project, status_id from projects where organization_id = '$orgID' order by project
        ")->fetchAll(PDO::FETCH_ASSOC);
        
        foreach($projects as $project) {
            $tmpObj = array();
            $proID = $project['id'];
            $projCogCount = $container->cogworks->query("
                select count(id) from cog_files
                where project_id = '$proID'
            ")->fetch(PDO::FETCH_ASSOC);
            $tmpObj['id']  = $proID;
            $tmpObj['project']  = $project['project'];
            $tmpObj['status'] = $status[($project['status_id'] - 1)]['status'];
            $tmpObj['statusID'] = $project['status_id'];
            $tmpObj['cogfiles'] = $projCogCount['count(id)'];
            array_push($result['projects'], $tmpObj);
        }
        $result['account'] = $acct;
        $info['account'] = $acct;
        if(is_array($info)) {
            return json_encode($result);
        } else {
            return json_encode($info);
        }
    });
    $app->post('/organizations/info/cogworks/activate', function ($request, $response, $args) use ($container) {
        $id = $request->getParam('id');
        $resultOrg = null;
        $resultUsers = null;
        $dateDateTime = getCurrentDate();
        $prepareOrg = $container->projectcog->prepare("
            update organizations
            set
            status_id = '1',
            updated = '$dateDateTime'
            where id = '$id'
        ");
        $resultOrg = $prepareOrg->execute();
        if($resultOrg) {
            $prepareUsers = $container->projectcog->prepare("
                update users
                set
                status_id = '1',
                updated = '$dateDateTime'
                where organization_id = '$id'
            ");
            $resultUsers = $prepareUsers->execute();
        }

        return json_encode(($resultOrg));
    });
    $app->post('/organizations/info/cogworks/deactivate', function ($request, $response, $args) use ($container) {
        $id = $request->getParam('id');
        $result = false;
        $resultOrg = null;
        $resultUsers = null;
        $dateDateTime = getCurrentDate();
        $prepareOrg = $container->projectcog->prepare("
            update organizations
            set
            status_id = '2',
            updated = '$dateDateTime'
            where id = '$id'
        ");
        $resultOrg = $prepareOrg->execute();
        if($resultOrg) {
            $prepareUsers = $container->projectcog->prepare("
                update users
                set
                status_id = '5',
                updated = '$dateDateTime'
                where organization_id = '$id'
            ");
            $result = $prepareUsers->execute();

            $users = $container->projectcog->query("
                select * from users where organization_id = '$id';
            ")->fetchAll(PDO::FETCH_ASSOC);

            foreach($users as $item) {
                $userID = $item['id'];
                $prepareCogfiles = $container->cogworks->prepare("
                    update cog_files
                    set
                    status_id = '5',
                    updated = '$dateDateTime'
                    where user_id = '$userID'
                ");
                $result = $prepareCogfiles->execute();
            }
        }

        return json_encode(($resultOrg));
    });
    
};