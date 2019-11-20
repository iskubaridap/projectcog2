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

    // use this for replicating from the orginal cogworks database
    $app->get('/extra/replicate/organizations/disable', function ($request, $response, $args) use ($container) {
        $date = new DateTime('NOW');
        $dateDateTime = $date->format('Y-m-d H:i:s');

        $cogOrigs = $container->cogworks_original->query("
            select * from organizations order by id;
        ")->fetchAll(PDO::FETCH_ASSOC);

        foreach($cogOrigs as $cogOrig)
        {
            if($cogOrig['name'] != 'Admin')
            {
                $orgName = $cogOrig['name'];
                $accountInsert = $container->projectcog->exec("
                    insert into accounts
                    (account_type_id, allowed_users_id, started)
                    values('2', '1', '$dateDateTime')
                ");
                $accountRetrieve = $container->projectcog->query("
                    select * from accounts 
                    order by id desc limit 1;
                ")->fetch(PDO::FETCH_ASSOC);
                $accountID = $accountRetrieve['id'];
                $org = $container->projectcog->exec("
                    insert into organizations
                    (organization, account_id)
                    values('$orgName', '$accountID')
                ");
            }
        }

        return 'Process on replicating Organization is complete';
    });
    $app->get('/extra/replicate/users/disable', function ($request, $response, $args) use ($container) {
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
            
            $userProcess = $container->projectcog->exec("
                insert into users
                (user, firstname, lastname, middlename, email, username, password, image, address, country, position_id, account_id, organization_id)
                values('$name', '$userFirstName', '$userLastName', '$userMiddleName', '$email', '$username', '$password', '$image', '', '', '$positionID', '$accountID', '$organizationID')
            ");
            
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
};
