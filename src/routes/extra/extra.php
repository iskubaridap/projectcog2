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
        // test();
        /* $template = $container->cogworks->query("
            select * from templates
            where id = '4';
        ")->fetch(PDO::FETCH_ASSOC);
        return getCogTemplateDirectory($template); */
        /* {
            "imageValue": "support-engineer.svg",
            "path": "cogworks/organizations/5/img/thumbnail/cog-files/107/support-engineer.svg",
            "folder": "cogworks/organizations/5/img/thumbnail/cog-files/107"
        } */
        $ary = array();
        $ary['path'] = 'cogworks/organizations/5/img/thumbnail/cog-files/107/support-engineer.svg';
        $ary['folder'] = 'cogworks/organizations/5/img/thumbnail/cog-files/107';
        return json_encode(generateDirectory($ary['folder']));
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

        $resourceFolder = (getCogResourcesPath($cogID, $container))[$resource];
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

        foreach($cogOrigs as $cogOrig)
        {
            $date = date_create($cogOrig['date_started']);
            $dateDateTime = date_format($date,"Y-m-d H:i:s");
            $orgName = $cogOrig['name'];

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
                    (organization, account_id, created)
                    values('$orgName', '$accountID', '$dateDateTime')
                ");
            }
        }

        return 'Process on replicating Organization is complete';
    });
    $app->post('/extra/replicate/users', function ($request, $response, $args) use ($container) {
        $name = '';
        $userFirstName = '';
        $userLastName = '';
        $userMiddleName = '';
        $email = '';
        $username = '';
        $password = '';
        $image = '';
        $organizationID = '';
        $organizationName = '';
        $positionID = '';
        $positionName = '';
        $accountID = '';
        $accountName = '';
        $accountTypeID = '';
        $accountTypeName = '';
        $user = array();

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

        $projCogPositions = $container->projectcog->query("
            select * from positions order by id;
        ")->fetchAll(PDO::FETCH_ASSOC);

        $projCogOrganizations = $container->projectcog->query("
            select * from organizations where active = 1 order by id;
        ")->fetchAll(PDO::FETCH_ASSOC);

        $projCogAccounts = $container->projectcog->query("
            select * from accounts order by id;
        ")->fetchAll(PDO::FETCH_ASSOC);

        $projCogAccountTypes = $container->projectcog->query("
            select * from account_types order by id;
        ")->fetchAll(PDO::FETCH_ASSOC);

        foreach($cogOrigUsers as $cogUser)
        {
            $name = '';
            $userFirstName = '';
            $userLastName = '';
            $userMiddleName = '';
            $email = '';
            $username = '';
            $password = '';
            $organizationID = '';
            $organizationName = '';
            $positionID = '';
            $positionName = '';
            $accountID = '';
            $accountName = '';
            $accountTypeID = '';
            $accountTypeName = '';

            $userNameAry = explode(" ",$cogUser['name']);

            $date = date_create($cogUser['date_registered']);
            $dateDateTime = date_format($date,"Y-m-d H:i:s");

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
                    (user, firstname, lastname, middlename, email, username, password, image, address, country, position_id, account_id, organization_id, created)
                    values('$name', '$userFirstName', '$userLastName', '$userMiddleName', '$email', '$username', '$password', '$image', '', '', '1', '1', '$organizationID', '$dateDateTime')
                ");
            }
            else
            {
                $userProcess = $container->projectcog->exec("
                    insert into users
                    (user, firstname, lastname, middlename, email, username, password, image, address, country, position_id, account_id, organization_id, created)
                    values('$name', '$userFirstName', '$userLastName', '$userMiddleName', '$email', '$username', '$password', '$image', '', '', '$positionID', '$accountID', '$organizationID', '$dateDateTime')
                ");
            }
            
            echo  $name . ' - is successfully processed.<br>';
            echo 'Name: ' . $name . '<br>';
            echo 'FirstName: ' . $userFirstName . '<br>';
            echo 'MiddleName: ' . $userMiddleName . '<br>';
            echo 'LastName: ' . $userLastName. '<br>';
            echo 'Email: ' . $email. '<br>';
            echo 'Username: ' . $username. '<br>';
            echo 'Password: ' . $password. '<br>';
            echo 'Image: ' . $image . '<br>';
            echo 'Org: ' . $organizationName. ' - ID: ' . $organizationID . '<br>';
            echo 'Position: ' . $positionName. ' - ID: ' . $positionID . '<br>';
            echo 'Account: ' . $accountTypeName . ' - ID: ' . $accountID . '<br>';
            echo '<hr>';

            echo '<br><br>';
        }

        //return 'Process on replicating Users is complete';
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

            $projectProcess = $container->cogworks->exec("
                insert into projects
                (project, organization_id, created)
                values('$projName', '$projOrg', '$dateDateTime');
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
            $podStatus = $pod['active'];
            $dateUpdated = date_create($pod['date_updated']);
            $dateDateTimeUpdated = date_format($dateUpdated,"Y-m-d H:i:s");

            $podProcess = $container->cogworks->exec("
                insert into pods
                (pod, organization_id, status_id, updated, created)
                values('$podContent', '$orgID', '$podStatus', '$dateDateTimeUpdated', '$dateDateTimeUpdated');
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
            $whatNotStatus = $whatNot['active'];
            $dateUpdated = date_create($whatNot['date_updated']);
            $dateDateTimeUpdated = date_format($dateUpdated,"Y-m-d H:i:s");

            $whatNotProcess = $container->cogworks->exec("
                insert into what_nots
                (what_not, user_id, status_id, updated, created)
                values('$whatNotContent', '$userID', '$whatNotStatus', '$dateDateTimeUpdated', '$dateDateTimeUpdated');
            ");
        }
        echo 'Process is complete!';
        //echo json_encode($whatNotProcess);
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
};
