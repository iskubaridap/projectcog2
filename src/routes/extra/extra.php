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

    $app->post('/extra/test-function', function ($request, $response, $args) use ($container) {
        $loggedUser = identifyLoggedUser($container);
        // $userID = $loggedUser['id'];
        // $userPosition = $loggedUser['position_id'];
        // $userOrg = $loggedUser['organization_id'];
        // return json_encode(getCogFileThumbnail($userOrg, $userID, '164', 'monitor-mail.svg', $container));
        return json_encode($loggedUser);
    });

    // reserve code
    $app->post('/extra/clean-root-folder', function ($request, $response, $args) use ($container) {
        $folder = $request->getParam('folder');
        $user = getUserInfo($userID, $container);
        
        rrmdir($_SERVER['DOCUMENT_ROOT'] . '/' . $folder . '/');

        echo 'complete';
    });

    // reserve code
    $app->post('/extra/clean-tmp-resources', function ($request, $response, $args) use ($container) {
        $userID = $request->getParam('userID');
        $user = getUserInfo($userID, $container);

        // audio
        rrmdir(getTmpResourcesDirectoryPath($user['organization_id'], $userID, 'audio'));
        generateDirectory(getTmpResourcesDirectoryPath($user['organization_id'], $userID, 'audio'));
        // extra
        rrmdir(getTmpResourcesDirectoryPath($user['organization_id'], $userID, 'extra'));
        generateDirectory(getTmpResourcesDirectoryPath($user['organization_id'], $userID, 'extra'));
        // pdf
        rrmdir(getTmpResourcesDirectoryPath($user['organization_id'], $userID, 'pdf'));
        generateDirectory(getTmpResourcesDirectoryPath($user['organization_id'], $userID, 'pdf'));
        // video
        rrmdir(getTmpResourcesDirectoryPath($user['organization_id'], $userID, 'video'));
        generateDirectory(getTmpResourcesDirectoryPath($user['organization_id'], $userID, 'video'));

        echo 'complete';
    });

    // reserve code
    $app->post('/extra/transfer-resources', function ($request, $response, $args) use ($container) {
        $userID = $request->getParam('userID');
        $cogID = $request->getParam('cogID');
        $designID = $request->getParam('designID');
        $resource = $request->getParam('resource');

        $user = getUserInfo($userID, $container);

        // $resourceFolder = (getCogResourcesPath($cogID, $container))[$resource];
        $resourceFolder = getCogResourcesPath($cogID, $container)[$resource];
        $tmpResourceFolder = getTmpResourcesDirectoryPath($user['organization_id'], $userID, $resource) . '/' . $designID;

        rrmdir($resourceFolder);
        copydir($tmpResourceFolder, $resourceFolder);

        echo 'complete';
    });
    $app->post('/extra/db-test', function ($request, $response, $args) use ($container) {
        $users = $container->cogworks_original->query("
            select * from users order by id;
        ")->fetchAll(PDO::FETCH_ASSOC);

        $cogFiles = $container->projectcog->query("
            select * from positions order by id;
        ")->fetchAll(PDO::FETCH_ASSOC);

        return json_encode($users) . '<br><br><br>' . json_encode($cogFiles);
    });

    // use this for replicating from the orginal cogworks to projectcog database
    $app->post('/extra/replicate/organizations', function ($request, $response, $args) use ($container) {
        // $date = new DateTime('NOW');
        // $dateDateTime = $date->format('Y-m-d H:i:s');

        /* $cogOrigs = $container->cogworks_original->query("
            select * from organizations where active = 1 order by id;
        ")->fetchAll(PDO::FETCH_ASSOC); */

        $cogOrigs = $container->cogworks_original->query("
            select * from organizations order by id;
        ")->fetchAll(PDO::FETCH_ASSOC);
        $lastOrgIDNumObj = $container->cogworks_original->query("
            select id from organizations order by id desc limit 1;
        ")->fetch(PDO::FETCH_ASSOC);

        $lastOrgIDNum = (int) $lastOrgIDNumObj['id'];
        $orgIndex = 0;
        $cogOrigID = 0;
        $cogOrigIndex = 0;
        for($index = 0; $index < $lastOrgIDNum; $index++)
        {
            $orgIndex++;
            $cogOrig = $cogOrigs[$cogOrigIndex];
            $cogOrigID = (int) $cogOrig['id'];
            if($orgIndex == $cogOrigID) {
                $cogOrigIndex++;
                $date = date_create($cogOrig['date_started']);
                $dateDateTime = date_format($date,"Y-m-d H:i:s");
                $orgName = $cogOrig['name'];
                $status = ($cogOrig['active'] == 1) ? 1 : 2;

                if($orgName == 'Admin')
                {
                    $adminInsert = $container->projectcog->exec("
                        insert into accounts
                        (account_type_id, allowed_users_id, started, created)
                        values('1', '1', '$dateDateTime', '$dateDateTime')
                    ");
                    $admin = $container->projectcog->exec("
                        insert into organizations
                        (organization, account_id, created)
                        values('$orgName', '1', '$dateDateTime')
                    ");
                }
                else
                {
                    $accountInsert = $container->projectcog->exec("
                        insert into accounts
                        (account_type_id, allowed_users_id, started, created)
                        values('2', '1', '$dateDateTime', '$dateDateTime')
                    ");
                    $accountRetrieve = $container->projectcog->query("
                        select * from accounts 
                        order by id desc limit 1;
                    ")->fetch(PDO::FETCH_ASSOC);
                    $accountID = $accountRetrieve['id'];
                    
                    $org = $container->projectcog->exec("
                        insert into organizations
                        (organization, account_id, status_id, created)
                        values('$orgName', '$accountID','$status', '$dateDateTime')
                    ");
                }
            } else {
                $adminInsert = $container->projectcog->exec("
                    insert into accounts
                    (account_type_id, allowed_users_id, program_id)
                    values('0', '0', '0')
                ");
                $accountRetrieve = $container->projectcog->query("
                    select * from accounts 
                    order by id desc limit 1;
                ")->fetch(PDO::FETCH_ASSOC);
                $accountID = $accountRetrieve['id'];
                $org = $container->projectcog->exec("
                    insert into organizations
                    (organization, account_id, status_id)
                    values('anonymous', '$accountID','2')
                ");
            }
            
        }

        return 'Process on replicating Organization is complete';
    });
    $app->post('/extra/replicate/users', function ($request, $response, $args) use ($container) {
        $name = 'anonymous';
        $userFirstName = '';
        $userLastName = '';
        $userMiddleName = '';
        $email = '';
        $username = '';
        $password = '';
        $image = null;
        $organizationID = 0;
        $organizationName = '';
        $positionID = 0;
        $positionName = '';
        $accountID = 0;
        $accountName = '';
        $accountTypeID = 0;
        $accountTypeName = '';
        $user = array();
        $userIndex = 0;
        $cogUsersIndex = 0;
        $monitorResult = array();

        /* $cogOrigUsers = $container->cogworks_original->query("
            select users.id, users.name, users.username, users.password, users.image, 
                users.organization_id, users.role, users.account_id, 
                users.date_registered, users.last_login, users.active 
            from users, organizations where users.organization_id = organizations.id and 
                organizations.active = 1 order by id;
        ")->fetchAll(PDO::FETCH_ASSOC); */

        $cogOrigUsers = $container->cogworks_original->query("
            select * from users order by id;
        ")->fetchAll(PDO::FETCH_ASSOC);
        $lastUserIDNumObj = $container->cogworks_original->query("
            select id from users order by id desc limit 1;
        ")->fetch(PDO::FETCH_ASSOC);

        $projCogPositions = $container->projectcog->query("
            select * from positions order by id;
        ")->fetchAll(PDO::FETCH_ASSOC);

        $projCogOrganizations = $container->projectcog->query("
            select * from organizations order by id;
        ")->fetchAll(PDO::FETCH_ASSOC);

        $projCogAccounts = $container->projectcog->query("
            select * from accounts order by id;
        ")->fetchAll(PDO::FETCH_ASSOC);

        $projCogAccountTypes = $container->projectcog->query("
            select * from account_types order by id;
        ")->fetchAll(PDO::FETCH_ASSOC);
        // select id from cog_files order by id desc limit 1;
        
        $lastUserIDNum = (int) $lastUserIDNumObj['id'];

        for($index = 0; $index < $lastUserIDNum; $index++)
        {
            $cogUser = $cogOrigUsers[$cogUsersIndex];
            $name = 'anonymous';
            $userFirstName = '';
            $userLastName = '';
            $userMiddleName = '';
            $email = '';
            $username = '';
            $password = '';
            $image = null;
            $organizationID = 0;
            $organizationName = '';
            $positionID = 0;
            $positionName = '';
            $accountID = 0;
            $accountName = '';
            $accountTypeID = 0;
            $accountTypeName = '';
            $status = 0;
            $userCogID = (int) $cogUser['id'];
            $userResult = array();
            $userIndex++;

            if($userIndex == $userCogID) {
                $cogUsersIndex++;
                $userNameAry = explode(" ",$cogUser['name']);

                $date = date_create($cogUser['date_registered']);
                $dateDateTime = date_format($date,"Y-m-d H:i:s");

                $status = ($cogUser['active'] == 1) ? 1 : 2;

                if(count($userNameAry) == 1)
                {
                    $name = $cogUser['name'];
                }
                else if(count($userNameAry) == 2)
                {
                    $name = $cogUser['name'];
                    $userFirstName = trim($userNameAry[0]);
                    $userLastName = trim($userNameAry[1]);
                }
                else if(count($userNameAry) == 3)
                {
                    $name = $cogUser['name'];
                    if(strlen(trim($userNameAry[1])) > 0 && strlen(trim($userNameAry[1])) <= 2 && strpos(trim($userNameAry[1])) !== false)
                    {
                        // This is getting any middle initials
                        $userMiddleName = trim($userNameAry[1]);
                        $userFirstName = trim($userNameAry[0]);
                        $userLastName = trim($userNameAry[2]);
                    }
                }
                else
                {
                    /*
                        Just incase the user input a long name
                        We cannot determine what is the exact name of the user at this point,
                        or to determine their first, middle and last name.
                    */
                    $name = $cogUser['name'];
                }
                $email = $cogUser['username'];
                $username = $cogUser['username'];
                $password = $cogUser['password'];
                $organizationID = $cogUser['organization_id'];
                $organizationName = '';

                foreach($projCogOrganizations as $item)
                {
                    if($item['id'] == $cogUser['organization_id'])
                    {
                        $organizationName = $item['organization'];
                        $accountID = $item['account_id'];
                        $accountTypeID = $item['account_type_id'];
                        break;
                    }
                }
                foreach($projCogPositions as $item)
                {
                    if(strtolower($item['position']) == strtolower($cogUser['role']))
                    {
                        $positionID = $item['id'];
                        $positionName = $item['position'];
                        break;
                    }
                }
                foreach($projCogAccounts as $item)
                {
                    if($accountID == $item['id'])
                    {
                        $accountTypeID = $item['account_type_id'];
                        break;
                    }
                }
                foreach($projCogAccountTypes as $item)
                {
                    if($accountTypeID == $item['id'])
                    {
                        $accountTypeName = $item['account_type'];
                        break;
                    }
                }
                if($cogUser['image'] != null)
                {
                    $image = $cogUser['image'];
                }
                
                if($organizationID == 1)
                {
                    $userProcess = $container->projectcog->exec("
                        insert into users
                        (user, firstname, lastname, middlename, email, username, password, image, address, country, position_id, account_id, organization_id, status_id, created)
                        values('$name', '$userFirstName', '$userLastName', '$userMiddleName', '$email', '$username', '$password', '$image', '', '', '1', '1', '$organizationID', '$status', '$dateDateTime')
                    ");
                }
                else
                {
                    $userProcess = $container->projectcog->exec("
                        insert into users
                        (user, firstname, lastname, middlename, email, username, password, image, address, country, position_id, account_id, organization_id, status_id, created)
                        values('$name', '$userFirstName', '$userLastName', '$userMiddleName', '$email', '$username', '$password', '$image', '', '', '$positionID', '$accountID', '$organizationID', '$status', '$dateDateTime')
                    ");
                }
            } else {
                $userProcess = $container->projectcog->exec("
                    insert into users
                    (user, firstname, lastname, middlename, email, username, password, image, address, country, position_id, account_id, organization_id, status_id, created)
                    values('anonymous', '', '', '', '', '', '', '', '', '', '0', '0', '0', '2', '$dateDateTime')
                ");
            }

            $userResult['name'] = $name;
            $userResult['id'] = $userCogID;
            $userResult['positionName'] = $positionName;
            $userResult['organizationName'] = $organizationName;
            $userResult['bool'] = $userIndex == $userCogID;
            array_push($monitorResult, $userResult);
        }
        return json_encode($monitorResult);
    });
    $app->post('/extra/replicate/projects', function ($request, $response, $args) use ($container) {
        $projects = $container->cogworks_original->query("
            select * from projects order by id;
        ")->fetchAll(PDO::FETCH_ASSOC);

        foreach($projects as $project)
        {
            $projName = $project['name'];
            $projOrg = $project['organization_id'];
            $date = date_create($project['date_started']);
            $dateDateTime = date_format($date,"Y-m-d H:i:s");
            $status = ($project['active'] == 1) ? 1 : 2;

            $projectProcess = $container->cogworks->exec("
                insert into projects
                (project, organization_id, status_id, created)
                values('$projName', '$projOrg', '$status', '$dateDateTime');
            ");

            echo  $projName . ' is processed...<br>';
        }
        echo '<br><br>';
        echo 'Process is complete!';
    });
    $app->post('/extra/replicate/cog-files', function ($request, $response, $args) use ($container) {
        $cogIndex = 0;
        $cogFilesTotal = 0;
        $cogworks = $container->cogworks_original->query("
            select * from cog_files order by id;
        ")->fetchAll(PDO::FETCH_ASSOC);
        $filesTotal = $container->cogworks_original->query("
            select id from cog_files order by id desc limit 1;
        ")->fetch(PDO::FETCH_ASSOC);
        $cogFilesTotal = (int) $filesTotal['id'];

        for($index = 0; $index < $cogFilesTotal; $index++)
        {
            if(($index + 1) == $cogworks[$cogIndex]['id'])
            {
                $cogName = $cogworks[$cogIndex]['name'];
                $cogImage = ($cogworks[$cogIndex]['image'] == null) ? null : $cogworks[$cogIndex]['image'];
                $userID = $cogworks[$cogIndex]['user_id'];
                $projectID = $cogworks[$cogIndex]['project_id'];
                $cogStatus = ($cogworks[$cogIndex]['active'] == 0) ? 2 : 1;
                $dateUpdated = date_create($cogworks[$cogIndex]['date_updated']);
                $dateDateTimeUpdated = date_format($dateUpdated,"Y-m-d H:i:s");
                $dateStarted = date_create($cogworks[$cogIndex]['date_started']);
                $dateDateTimeStarted = date_format($dateStarted,"Y-m-d H:i:s");
                
                if(strpos($cogworks['date_started'], '0000-00-00') >= 0)
                {
                    if($cogImage == null)
                    {
                        $cogProcess = $container->cogworks->exec("
                            insert into cog_files
                            (cog_file, user_id, project_id, status_id, updated, created)
                            values('$cogName', '$userID', '$projectID', '$cogStatus', '$dateDateTimeUpdated', '$dateDateTimeUpdated');
                        ");
                    }
                    else
                    {
                        $cogProcess = $container->cogworks->exec("
                            insert into cog_files
                            (cog_file, image, user_id, project_id, status_id, updated, created)
                            values('$cogName', '$cogImage', '$userID', '$projectID', '$cogStatus', '$dateDateTimeUpdated', '$dateDateTimeUpdated');
                        ");
                    }
                }
                else
                {
                    if($cogImage == null)
                    {
                        $cogProcess = $container->cogworks->exec("
                            insert into cog_files
                            (cog_file, user_id, project_id, status_id, updated, created)
                            values('$cogName', '$userID', '$projectID', '$cogStatus', '$dateDateTimeUpdated', '$dateDateTimeStarted');
                        ");
                    }
                    else
                    {
                        $cogProcess = $container->cogworks->exec("
                            insert into cog_files
                            (cog_file, image, user_id, project_id, status_id, updated, created)
                            values('$cogName', '$cogImage', '$userID', '$projectID', '$cogStatus', '$dateDateTimeUpdated', '$dateDateTimeStarted');
                        ");
                    }
                }
                $cogIndex++;
            }
            else
            {
                $cogName = null;
                $userID = 0;
                $projectID = 0;
                $cogStatus = 2;
                $dateStarted = new DateTime('NOW');
                $dateDateTimeStarted = $dateStarted->format('Y-m-d H:i:s');
                $dateUpdated = new DateTime('NOW');
                $dateDateTimeUpdated = $dateUpdated->format('Y-m-d H:i:s');

                $cogProcess = $container->cogworks->exec("
                    insert into cog_files
                    (cog_file, user_id, project_id, status_id, updated, created)
                    values('$cogName', '$userID', '$projectID', '$cogStatus', '$dateDateTimeUpdated', '$dateDateTimeStarted');
                ");
            }
        }
        echo 'Process is complete!';
    });
    $app->post('/extra/replicate/pods', function ($request, $response, $args) use ($container) {
        $pods = $container->cogworks_original->query("
            select * from pods order by id;
        ")->fetchAll(PDO::FETCH_ASSOC);

        foreach($pods as $pod)
        {
            $podContent = addslashes($pod['pods']);
            $orgID = $pod['organization_id'];
            $dateUpdated = date_create($pod['date_updated']);
            $dateDateTimeUpdated = date_format($dateUpdated,"Y-m-d H:i:s");
            $status = ($pod['active'] == 1) ? 1 : 2;

            $podProcess = $container->cogworks->exec("
                insert into pods
                (pod, organization_id, status_id, updated, created)
                values('$podContent', '$orgID', '$status', '$dateDateTimeUpdated', '$dateDateTimeUpdated');
            ");
        }
        echo 'Process is complete!';
    });
    $app->post('/extra/replicate/what_nots', function ($request, $response, $args) use ($container) {
        $whatNots = $container->cogworks_original->query("
            select * from what_nots order by id;
        ")->fetchAll(PDO::FETCH_ASSOC);

        foreach($whatNots as $whatNot)
        {
            $whatNotContent = addslashes($whatNot['what_nots']);
            $userID = $whatNot['user_id'];
            $dateUpdated = date_create($whatNot['date_updated']);
            $dateDateTimeUpdated = date_format($dateUpdated,"Y-m-d H:i:s");
            $status = ($whatNot['active'] == 1) ? 1 : 2;

            $whatNotProcess = $container->cogworks->exec("
                insert into what_nots
                (what_not, user_id, status_id, updated, created)
                values('$whatNotContent', '$userID', '$status', '$dateDateTimeUpdated', '$dateDateTimeUpdated');
            ");
        }
        echo 'Process is complete!';
        //echo json_encode($whatNotProcess);
    });
    $app->post('/extra/remove/users/folders', function ($request, $response, $args) use ($container) {
        // this is use to remove all major folders without any other processing after.
        header('Content-type: text/html; charset=utf-8');
        $root = $_SERVER['DOCUMENT_ROOT'];
        $cogworksFolder = $root . '/cogworks/';

        rrmdir($cogworksFolder . 'admin');
        rrmdir($cogworksFolder . 'developers');
        rrmdir($cogworksFolder . 'organizations');
        /* 
            29 - Sir_Jeffrey = 11
            - 568.cog
                - Objection Handling_copy.cog
                - 0 = 33 (user_id)
                - 11 (organization_id)
                - 29 (project_id)

            42 - Starter_Projects = 14
            - 675.cog
                - First Project.cog
                - 55 (user_id)
                - 14 (organization_id)
                - 42 (project_id)
         */
        echo 'Process is complete!';
    });
    $app->post('/extra/generate/users/folders', function ($request, $response, $args) use ($container) {
        header('Content-type: text/html; charset=utf-8');
        $root = $_SERVER['DOCUMENT_ROOT'];
        $userFiles = $root . '/user_files/';
        $cogworksFolder = $root . '/cogworks/';
        $orgs = $container->projectcog->query("
            select * from organizations order by id;
        ")->fetchAll(PDO::FETCH_ASSOC);

        $users = $container->projectcog->query("
            select * from users order by id;
        ")->fetchAll(PDO::FETCH_ASSOC);

        rrmdir($cogworksFolder . 'admin');
        rrmdir($cogworksFolder . 'developers');
        rrmdir($cogworksFolder . 'organizations');

        generateDirectory($cogworksFolder . 'admin');
        generateDirectory($cogworksFolder . 'admin/users');
        generateCogworksDefaultDirectories($cogworksFolder . 'admin');

        generateDirectory($cogworksFolder . 'developers');
        generateDirectory($cogworksFolder . 'organizations');

        foreach($orgs as $org)
        {
            if($org['id'] != 1 && $org['id'] != 2)
            {
                generateDirectory($cogworksFolder . 'organizations/' . $org['id']);
                generateDirectory($cogworksFolder . 'organizations/' . $org['id'] . '/users');
                generateCogworksDefaultDirectories($cogworksFolder . 'organizations/' . $org['id']);
            }
        }
        foreach($users as $user)
        {
            if($user['organization_id'] == 1)
            {
                generateDirectory($cogworksFolder . 'admin/users/' . $user['id']);
                generateCogworksUserDirectories($cogworksFolder . 'admin/users/' . $user['id']);
            }
            else if($user['organization_id'] == 2)
            {
                generateDirectory($cogworksFolder . 'developers/' . $user['id']);
                generateCogworksUserDirectories($cogworksFolder . 'developers/' . $user['id']);
            }
            else
            {
                generateDirectory($cogworksFolder . 'organizations/' . $user['organization_id'] . '/users/' . $user['id']);
                generateCogworksUserDirectories($cogworksFolder . 'organizations/' . $user['organization_id'] . '/users/' . $user['id']);
            }
        }
        echo 'Process is complete!';
    });
    $app->post('/extra/transfer-modify/cog-files', function ($request, $response, $args) use ($container) {
        header('Content-type: text/html; charset=utf-8');
        $fileExist = false;
        $userFilesPath = $_SERVER['DOCUMENT_ROOT'] . '/user_files/';
        $cogworksPath = $_SERVER['DOCUMENT_ROOT'] . '/cogworks/';
        $blankFilePath = $_SERVER['DOCUMENT_ROOT'] . '/assets/cogworks/templates/json/blank.json';
        $result = array();
        
        $orgs = $container->projectcog->query("
            select * from organizations order by id;
        ")->fetchAll(PDO::FETCH_ASSOC);

        $users = $container->projectcog->query("
            select * from users order by id;
        ")->fetchAll(PDO::FETCH_ASSOC);

        $cogFiles = $container->cogworks->query("
            select * from cog_files order by id;
        ")->fetchAll(PDO::FETCH_ASSOC);

        $projects = $container->cogworks->query("
            select * from projects order by id;
        ")->fetchAll(PDO::FETCH_ASSOC);

        foreach($cogFiles as $cog)
        {
            $cogAry = array();
            $cogID = $cog['id'];
            $cogName = $cog['cog_file'];
            $cogNewName = '';
            $userID = $cog['user_id'];
            $projectID = $cog['project_id'];
            $projectName = '';
            $userEmail = '';
            $userName = '';
            $userOrgID = '';
            $userOrgName = '';
            $cogPath = '';
            $fileExist = null;
            $fileCopied = null;
            $copied = null;
            $basePath = '';

            foreach($users as $user)
            {
                if($userID == $user['id'])
                {
                    $userName = $user['user'];
                    $userEmail = (str_replace('.com', '', $user['email'])); // i already removed the '.com' here
                    $userOrgID = $user['organization_id'];
                    break;
                }
            }
            foreach($orgs as $org)
            {
                if($userOrgID == $org['id'])
                {
                    $userOrgName = $org['organization'];
                    break;
                }
            }
            foreach($projects as $proj)
            {
                if($projectID == $proj['id'])
                {
                    $projectID = $proj['id'];
                    $projectName = $proj['project'];
                    break;
                }
            }

            if(strlen($cogName) > 0)
            {
                $cogNewName = $cogID . '.cog';
                if($projectID == 0)
                {
                    if($org['id'] == 1)
                    {
                        $basePath = setCogworksDirectoryPath($org['id']) . 'users/' . $userID . '/raw-files/';
                    }
                    else if($org['id'] == 2)
                    {
                        $basePath = setCogworksDirectoryPath($org['id']) . $userID . '/raw-files/';
                    }
                    else
                    {
                        $basePath = setCogworksDirectoryPath($org['id']) . $userOrgID . '/users/' . $userID . '/raw-files/';
                    }
                    $cogPath = $userFilesPath . $userOrgName . '/' . $userEmail . '/raw_files/' . $cogName;
                    $fileExist = file_exists($userFilesPath . $userOrgName . '/' . $userEmail . '/raw_files/' . $cogName);
                    if(!$fileExist)
                    {
                        $fileCopied = copy($blankFilePath, ($basePath . $cogNewName));
                        chmod(($basePath . $cogNewName), 0777);
                        if(!$fileCopied)
                        {
                            $cogPath = '';
                            $fileExist = false;
                        }
                    }
                    else
                    {
                        $copied = copy($cogPath, ($basePath . $cogNewName));
                        chmod(($basePath . $cogNewName), 0777);
                    }
                }
                else
                {
                    if($org['1'] == 1)
                    {
                        $basePath = setCogworksDirectoryPath($org['id']) . 'projects/' . $projectID . '/';
                    }
                    else if($org['id'] == 2)
                    {
                        $basePath = setCogworksDirectoryPath($org['id']) . $userID . '/projects/' . $projectID . '/';
                    }
                    else
                    {
                        $basePath = setCogworksDirectoryPath($org['id']) . $userOrgID . '/projects/' . $projectID . '/';
                        generateDirectory($cogworksPath . '/organizations/' . $userOrgID . '/projects/' . $projectID);
                    }
                    $cogPath = $userFilesPath . $userOrgName . '/' . $projectName . '/' . $cogName;
                    $fileExist = file_exists($userFilesPath . $userOrgName . '/' . $projectName . '/' . $cogName);
                    if(!$fileExist)
                    {
                        $fileCopied = copy($blankFilePath, ($basePath . $cogNewName));
                        chmod(($basePath . $cogNewName), 0777);
                        if(!$fileCopied)
                        {
                            $cogPath = '';
                            $fileExist = false;
                        }
                    }
                    else
                    {
                        $copied = copy($cogPath, ($basePath . $cogNewName));
                        chmod(($basePath . $cogNewName), 0777);
                    }
                }
            }
            
            $cogAry['id'] = $cogID;
            $cogAry['filename'] = $cogName;
            $cogAry['newFilename'] = $cogNewName;
            $cogAry['userID'] = $userID;
            $cogAry['userName'] = $userName;
            $cogAry['userEmail'] = $userEmail;
            $cogAry['orgID'] = $userOrgID;
            $cogAry['orgName'] = $userOrgName;
            $cogAry['projID'] = $projectID;
            $cogAry['projName'] = $projectName;
            $cogAry['exist'] = $fileExist;
            $cogAry['path'] = $cogPath;
            $cogAry['copied'] = $copied;
            
            echo '
            ';
            array_push($result, $cogAry);
        }
        return json_encode($result);
    });
    
    $app->post('/extra/transfer-modify/cog-files/check-file-exist', function ($request, $response, $args) use ($container) {
        $fileExist = false;
        $path = $_SERVER['DOCUMENT_ROOT'] . '/cogworks/';
        $result = array();
        
        $orgs = $container->projectcog->query("
            select * from organizations order by id;
        ")->fetchAll(PDO::FETCH_ASSOC);

        $users = $container->projectcog->query("
            select * from users order by id;
        ")->fetchAll(PDO::FETCH_ASSOC);

        $cogFiles = $container->cogworks->query("
            select * from cog_files order by id;
        ")->fetchAll(PDO::FETCH_ASSOC);

        $projects = $container->cogworks->query("
            select * from projects order by id;
        ")->fetchAll(PDO::FETCH_ASSOC);

        foreach($cogFiles as $cog)
        {
            $cogAry = array();
            $cogID = $cog['id'];
            $cogName = $cog['id'] . '.cog';
            $cogNewName = '';
            $userID = $cog['user_id'];
            $projectID = $cog['project_id'];
            $projectName = '';
            $userEmail = '';
            $userName = '';
            $userOrgID = '';
            $userOrgName = '';
            $cogPath = '';
            $fileExist = null;
            $basePath = '';

            foreach($users as $user)
            {
                if($userID == $user['id'])
                {
                    $userName = $user['user'];
                    $userEmail = (str_replace('.com', '', $user['email'])); // i already removed the '.com' here
                    $userOrgID = $user['organization_id'];
                    break;
                }
            }
            foreach($orgs as $org)
            {
                if($userOrgID == $org['id'])
                {
                    $userOrgName = $org['organization'];
                    break;
                }
            }
            foreach($projects as $proj)
            {
                if($projectID == $proj['id'])
                {
                    $projectID = $proj['id'];
                    $projectName = $proj['project'];
                    break;
                }
            }
            
            if(strlen((str_replace('.cog', '', $cogName))) > 0)
            {
                if($projectID == 0)
                {
                    if($org['id'] == 1)
                    {
                        $basePath = setCogworksDirectoryPath($org['id']) . 'users/' . $userID . '/raw-files/';
                    }
                    else if($org['id'] == 2)
                    {
                        $basePath = setCogworksDirectoryPath($org['id']) . $userID . '/raw-files/';
                    }
                    else
                    {
                        $basePath = setCogworksDirectoryPath($org['id']) . $userOrgID . '/users/' . $userID . '/raw-files/';
                    }
                    $fileExist = file_exists($basePath . $cogName);
                }
                else
                {
                    if($org['1'] == 1)
                    {
                        $basePath = setCogworksDirectoryPath($org['id']) . 'projects/' . $projectID . '/';
                    }
                    else if($org['id'] == 2)
                    {
                        $basePath = setCogworksDirectoryPath($org['id']) . $userID . '/projects/' . $projectID . '/';
                    }
                    else
                    {
                        $basePath = setCogworksDirectoryPath($org['id']) . $userOrgID . '/projects/' . $projectID . '/';
                    }
                    $fileExist = file_exists($basePath . $cogName);
                }
            }
            
            $cogAry['id'] = $cogID;
            $cogAry['filename'] = $cogName;
            $cogAry['newFilename'] = $cogNewName;
            $cogAry['userID'] = $userID;
            $cogAry['userName'] = $userName;
            $cogAry['userEmail'] = $userEmail;
            $cogAry['orgID'] = $userOrgID;
            $cogAry['orgName'] = $userOrgName;
            $cogAry['projID'] = $projectID;
            $cogAry['projName'] = $projectName;
            $cogAry['exist'] = $fileExist;
            $cogAry['path'] = $cogPath;
            
            echo '
            ';
            array_push($result, $cogAry);
        }
        return json_encode($result);
    });
    $app->post('/extra/email', function ($request, $response, $args) use ($container) {
        // $request->getParam('userID');
        $email = test_input($request->getParam("userEmail"));
        $message = test_input($request->getParam("userMessage"));

        mail("pcog@projectcog.com","Projectcog Site Feedback",$message,"From: " . $email);
    });
};
