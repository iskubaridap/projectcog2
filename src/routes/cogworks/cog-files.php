<?php

use Slim\App;
use Slim\Http\Request;
use Slim\Http\Response;
use Slim\Http\UploadedFile;

return function (App $app) {
    $container = $app->getContainer();
    
    $app->post('/cogworks/cog-files/retrieve/active', function ($request, $response, $args) use ($container) {
        $loggedUser = identifyLoggedUser($container);
        $userID = $loggedUser['id'];
        $userPosition = $loggedUser['position_id'];
        $userOrg = $loggedUser['organization_id'];
        $result = array();
        $projectID = $request->getParam('projID');
        $page = $request->getParam('page');

        $orgs = $container->projectcog->query("
            select * from organizations
            order by organization asc
        ")->fetchAll(PDO::FETCH_ASSOC);
        $statues = $container->projectcog->query("
            select status from statues
        ")->fetchAll(PDO::FETCH_ASSOC);

        // This assumes that the user is the Admin
        if($page == 'manage')
        {
            if($projectID === 'all') {
                $cogFiles = $container->cogworks->query("
                    select * from cog_files
                    order by cog_file asc
                ")->fetchAll(PDO::FETCH_ASSOC);
                $projects = $container->cogworks->query("
                    select * from projects
                    order by project asc
                ")->fetchAll(PDO::FETCH_ASSOC);
            } else {
                $cogFiles = $container->cogworks->query("
                    select * from cog_files
                    where status_id = '1' and project_id = '$projectID'
                    order by cog_file asc
                ")->fetchAll(PDO::FETCH_ASSOC);
                $projects = $container->cogworks->query("
                    select * from projects
                    where id = '$projectID'
                    order by project asc
                ")->fetchAll(PDO::FETCH_ASSOC);
            }
        }
        else
        {
            if($projectID === 'all') {
                $cogFiles = $container->cogworks->query("
                    select * from cog_files
                    where user_id = '$userID' and status_id = '1'
                    order by cog_file asc
                ")->fetchAll(PDO::FETCH_ASSOC);
                $projects = $container->cogworks->query("
                    select * from projects
                    where organization_id = '$userOrg' and status_id = '1'
                    order by project asc
                ")->fetchAll(PDO::FETCH_ASSOC);
            } else {
                $cogFiles = $container->cogworks->query("
                    select * from cog_files
                    where project_id = '$projectID' and status_id = '1'
                    order by cog_file asc
                ")->fetchAll(PDO::FETCH_ASSOC);
                $projects = $container->cogworks->query("
                    select * from projects
                    where id = '$projectID' and organization_id = '$userOrg' and status_id = '1'
                    order by project asc
                ")->fetchAll(PDO::FETCH_ASSOC);
            }
        }

        foreach($cogFiles as $cog)
        {
            $statusName = str_replace(' ', '-', strtolower($statues[(((int) $cog['status_id']) - 1)]['status']));
            $cogFile = array();
            $cogFileUserID = $cog['user_id'];
            $cogFile['id'] = $cog['id'];
            $cogFile['cogfile'] = str_replace('.cog', '', $cog['cog_file']);
            $cogFile['user'] = $cog['user_id'];
            $cogFile['projectID'] = $cog['project_id'];
            $cogFile['created'] = explode(" ",$cog['created'])[0];
            $cogFile['updated'] = explode(" ",$cog['updated'])[0];
            $cogFile['project'] = '(Personal File)';
            $cogFile['imageValue'] = '';
            $cogFile['status'] = $cog['status_id'];
            $cogFile['statusName'] = $statusName;
            $cogFile['code'] = base64_encode('{"c":"' . $cog['id'] . '","u":"' . $userID . '"}');
            $tmpAry = array();

            foreach($projects as $prj)
            {
                if($cog['project_id'] == $prj['id'])
                {
                    $cogFile['project'] = $prj['project'];
                    break;
                }
            }
            $tmpAry = getCogFileThumbnail($userOrg, $userID, $cog['id'], $cog['image'], $container);
            $cogFile['imageValue'] = $tmpAry['imageValue'];
            $cogFile['imageFolder'] = $tmpAry['folder'];
            $cogFile['image'] = $tmpAry['path'];
            array_push($result, $cogFile);
        }
        return json_encode($result);
    });
    $app->post('/cogworks/cog-files/retrieve/templates', function ($request, $response, $args) use ($container) {
        $loggedUser = identifyLoggedUser($container);
        $userID = $loggedUser['id'];
        $userPosition = $loggedUser['position_id'];
        $userOrg = $loggedUser['organization_id'];
        $result = array();
        $bs3Blank = array();
        $bs4Blank = array();

        if($userOrg == 1) {
            $result = $container->cogworks->query("
                select * from templates where status_id = '1' order by bootstrap_version asc
            ")->fetchAll(PDO::FETCH_ASSOC);
        } else if ($userOrg == 2) {
            $result = $container->cogworks->query("
                select * from templates where (user_id = '0' or user_id = '$userID') and status_id = '1' order by bootstrap_version asc
            ")->fetchAll(PDO::FETCH_ASSOC);
        } else {
            $result = $container->cogworks->query("
                select * from templates where user_id = '0' and (organization_id = '0' or organization_id = '$userOrg') and status_id = '1' order by bootstrap_version asc
            ")->fetchAll(PDO::FETCH_ASSOC);
        }
        return json_encode($result);
    });
    $app->post('/cogworks/cog-files/deactivate', function ($request, $response, $args) use ($container) {
        $id = $request->getParam('id');
        $dateDateTime = getCurrentDate();
        $result = null;
        
        $prepare = $container->cogworks->prepare("
            update cog_files
            set
            status_id = '2',
            updated = '$dateDateTime'
            where id = '$id'
        ");

        $result = $prepare->execute();

        return json_encode($result);
    });
    $app->post('/cogworks/cog-files/activate', function ($request, $response, $args) use ($container) {
        $id = $request->getParam('id');
        $dateDateTime = getCurrentDate();
        $result = null;
        
        $prepare = $container->cogworks->prepare("
            update cog_files
            set
            status_id = '1',
            updated = '$dateDateTime'
            where id = '$id'
        ");

        $result = $prepare->execute();

        return json_encode($result);
    });
    $app->post('/cogworks/cog-files/retrieve/details', function ($request, $response, $args) use ($container) {
        $result = null;
        $id = $request->getParam('id');
        $basePath = '';
        $tmpAry = array();

        $cog = $container->cogworks->query("
            select * from cog_files
            where id = '$id';
        ")->fetch(PDO::FETCH_ASSOC);
        $userID = $cog['user_id'];
        $projID = $cog['project_id'];
        $project = $container->cogworks->query("
            select * from projects
            where id = '$projID';
        ")->fetch(PDO::FETCH_ASSOC);
        $statID = $cog['status_id'];
        $status = $container->projectcog->query("
            select * from statues
            where id = '$statID';
        ")->fetch(PDO::FETCH_ASSOC);
        $user = $container->projectcog->query("
            select * from users
            where id = '$userID';
        ")->fetch(PDO::FETCH_ASSOC);
        $orgID = $user['organization_id'];
        // reserve code
        /* $org = $container->projectcog->query("
            select * from organizations
            where id = '$orgID';
        ")->fetch(PDO::FETCH_ASSOC); */

        $tmpAry = getCogFileThumbnail($orgID, $userID, $id, $cog['image'], $container);

        $cogFileImageValue = $tmpAry['imageValue'];
        $cogFileImage = $tmpAry['path'];

        $result = array();
        $result['id'] = $cog['id'];
        $result['cogfile'] = $cog['cog_file'];
        // $result['content'] = $cog['cog_file_content']; // reserve code
        $result['image'] = $cogFileImage;
        $result['imageValue'] = $cogFileImageValue;
        $result['userID'] = $cog['user_id'];
        $result['projectID'] = $cog['project_id'];
        $result['project'] = ($projID != 0) ? $project['project'] : '(Personal File)';
        $result['status'] = $status['status'];
        $result['orgID'] = $orgID;
        $result['updated'] = explode(" ",$cog['updated'])[0];
        $result['created'] = explode(" ",$cog['created'])[0];

        $cogName = $cog['id'] . '.cog';
        $basePath = getCogFileDirectory($projID, $orgID, $userID);
        $result['content'] = json_decode(file_get_contents($basePath . $cogName, true));

        return json_encode($result);
    });
    $app->post('/cogworks/cog-files/update', function ($request, $response, $args) use ($container) {
        $cogID = $request->getParam('id');
        $name = $request->getParam('cogName');
        $projID = $request->getParam('cogProject');
        $file = $request->getUploadedFiles();
        $dateDateTime = getCurrentDate();
        $path = '';
        $cogFileContent = null;
        $result = null;
        $cogName = $name . '.cog';
        $imageName = null;

        // getting the orginal info before making any updates
        $cog = $container->cogworks->query("
            select * from cog_files
            where id = '$cogID';
        ")->fetch(PDO::FETCH_ASSOC);
        $cogFilename = $cog['cog_file'];
        $cogUserID = $cog['user_id'];
        // this is to retrieve the original user who made the file.
        $cogUser = $container->projectcog->query("
            select * from users
            where id = '$cogUserID';
        ")->fetch(PDO::FETCH_ASSOC);
        $cogProjectID = $cog['project_id'];
        $cogOrgID = $cogUser['organization_id'];
        $imagePathAry = getCogImageThumbnailDirectory($cogID, $cogOrgID, $cogUserID, 'cog-files');
        $imagePath = $imagePathAry['path'];
        $sourcePath = getCogFileDirectory($cogProjectID, $cogOrgID, $cogUserID) . $cogID . '.cog';
        $targetPath = getCogFileDirectory($projID, $cogOrgID, $cogUserID) . $cogID . '.cog';
        $cogFileContent = json_decode(file_get_contents($sourcePath, true));        
        $cogFileContent->design->name = $name;

        $myfile = fopen($sourcePath, "w");
        fwrite($myfile, (json_encode($cogFileContent)));
        fclose($myfile);
        chmod($sourcePath,0777);
        
        if($cogProjectID != $projID)
        {
            $result = rename($sourcePath, $targetPath);
            chmod($targetPath,0777);
        }
        if(!empty($file))
        {
            $uploadedFile = $file['file'];
            $imageName = $file['file']->getClientFilename();
            $uploadedFile->moveTo($imagePath . $imageName);
            chmod($imagePath . $imageName,0777);

            $prepare = $container->cogworks->prepare("
                update cog_files
                set
                cog_file = '$cogName',
                image = '$imageName',
                project_id = '$projID',
                updated = '$dateDateTime'
                where id = '$cogID'
            ");
        }
        else
        {
            $prepare = $container->cogworks->prepare("
                update cog_files
                set
                cog_file = '$cogName',
                project_id = '$projID',
                updated = '$dateDateTime'
                where id = '$cogID'
            ");
        }

        $result = $prepare->execute();
        return json_encode($result);
    });
    $app->post('/cogworks/cog-files/clone', function ($request, $response, $args) use ($container) {
        $loggedUser = identifyLoggedUser($container);
        $userID = $loggedUser['id'];
        $cogID = $request->getParam('id');
        $name = $request->getParam('cogName');
        $projID = $request->getParam('cogProject');
        $file = $request->getUploadedFiles();
        $dateDateTime = getCurrentDate();
        $path = '';
        $cogFileContent = null;
        $result = null;
        $cogName = $name . '.cog';
        $imageName = null;

        // getting the orginal info before making any updates
        $cog = $container->cogworks->query("
            select * from cog_files
            where id = '$cogID';
        ")->fetch(PDO::FETCH_ASSOC);
        $cogFilename = $cog['cog_file'];
        $cogUserIDForPrj = $cog['user_id'];
        $cogUserID = ($cog['user_id'] != $userID) ? $userID : $cog['user_id'];
        // this is to retrieve the original user who made the file.
        $cogUser = $container->projectcog->query("
            select * from users
            where id = '$cogUserIDForPrj';
        ")->fetch(PDO::FETCH_ASSOC);
        $cogProjectID = $cog['project_id'];
        $cogOrgID = $cogUser['organization_id'];

        if(!empty($file)) {
            $uploadedFile = $file['file'];
            $imageName = $file['file']->getClientFilename();

            $insert = $container->cogworks->exec("
                insert into cog_files
                (cog_file, image, project_id, user_id)
                values('$cogName', '$imageName', '$projID', '$cogUserID')
            ");
            $newCog = $container->cogworks->query("
                select * from cog_files
                where cog_file = '$cogName' and user_id = '$cogUserID'
                order by id desc limit 1
            ")->fetch(PDO::FETCH_ASSOC);
            $cogUserNew = $container->projectcog->query("
                select * from users
                where id = '$cogUserID';
            ")->fetch(PDO::FETCH_ASSOC);

            $imagePathAry = getCogImageThumbnailDirectory($newCog['id'], $cogUserNew['organization_id'], $cogUserID, 'cog-files');
            $imagePath = $imagePathAry['path'];

            $uploadedFile->moveTo($imagePath . $imageName);
            chmod($imagePath . $imageName,0777);
        } else {
            $insert = $container->cogworks->exec("
                insert into cog_files
                (cog_file, project_id, user_id)
                values('$cogName' , '$projID', '$cogUserID')
            ");
            $newCog = $container->cogworks->query("
                select * from cog_files
                where cog_file = '$cogName' and user_id = '$cogUserID'
                order by id desc limit 1
            ")->fetch(PDO::FETCH_ASSOC);
        }

        if($insert == 1) {
            $result = true;
            $newCogID = $newCog['id'];
            $sourcePath = getCogFileDirectory($cogProjectID, $cogOrgID, $cog['user_id']) . $cogID . '.cog';
            $targetPath = getCogFileDirectory($projID, $loggedUser['organization_id'], $cogUserID) . $newCogID . '.cog';
            $cogFileContent = json_decode(file_get_contents($sourcePath, true));        
            $cogFileContent->design->id = setCogworksDesignUniqueID($cogUserID);
            $cogFileContent->design->name = $name;
    
            $myfile = fopen($targetPath, "w");
            fwrite($myfile, (json_encode($cogFileContent)));
            fclose($myfile);
            chmod($targetPath,0777);
        } else {
            $result = false;
        }
        echo($result);
    });
    $app->post('/cogworks/cog-files/add', function ($request, $response, $args) use ($container) {
        $cogUser = (int) $request->getParam('cogUser');
        $user = $cogUser !== 0 ? getUserInfo($cogUser, $container) : identifyLoggedUser($container);
        $loggedUser = identifyLoggedUser($container);
        $userID = $user['id'];
        $userOrgID = $user['organization_id'];
        $cogTempID = $request->getParam('cogTemplate');
        $name = $request->getParam('cogName');
        $projID = $request->getParam('cogProject');
        $file = $request->getUploadedFiles();
        $cogName = $name . '.cog';

        $template = $container->cogworks->query("
            select * from templates
            where id = '$cogTempID';
        ")->fetch(PDO::FETCH_ASSOC);

        if(!empty($file)) {
            $uploadedFile = $file['file'];
            $imageName = $file['file']->getClientFilename();
            $insert = $container->cogworks->exec("
                insert into cog_files
                (cog_file, image, project_id, user_id)
                values('$cogName', '$imageName', '$projID', '$userID')
            ");
        } else {
            $insert = $container->cogworks->exec("
                insert into cog_files
                (cog_file, project_id, user_id)
                values('$cogName' , '$projID', '$userID')
            ");
        }
        if($insert == 1) {
            // just in-case there's more than 1 similar filename
            $cogfile = $container->cogworks->query("
                select * from cog_files
                where cog_file = '$cogName' and user_id = '$userID'
                order by id desc limit 1
            ")->fetch(PDO::FETCH_ASSOC);
            $cogfile['code'] = base64_encode('{"c":"' . $cogfile['id'] . '","u":"' . $loggedUser['id'] . '"}');
            $cogID = $cogfile['id'];

            $sourcePath = getCogTemplateDirectory($template) . 'template.json';
            $targetPath = getCogFileDirectory($projID, $userOrgID, $userID) . $cogID . '.cog';
            $cogFileContent = json_decode(file_get_contents($sourcePath, true));        
            $cogFileContent->design->id = setCogworksDesignUniqueID($userID);
            $cogFileContent->design->name = $name;

            $myfile = fopen($targetPath, "w");
            fwrite($myfile, (json_encode($cogFileContent)));
            fclose($myfile);
            chmod($targetPath,0777);

            if(!empty($file)) {
                $imagePathAry = getCogImageThumbnailDirectory($cogID, $userOrgID, $userID, 'cog-files');
                $imagePath = $imagePathAry['path'];
                
                $uploadedFile->moveTo($imagePath . $imageName);
                chmod($imagePath . $imageName,0777);
            }
            $result = $cogfile;
        } else {
            $result = false;
        }
        return json_encode($result);
    });
};