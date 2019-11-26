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

        $cogOrigUsers = $container->cogworks_original->query("
            select * from users order by id;
        ")->fetchAll(PDO::FETCH_ASSOC);

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
    $app->post('/extra/replicate/cogworks', function ($request, $response, $args) use ($container) {
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
};