<?php

use Slim\App;
use Slim\Http\Request;
use Slim\Http\Response;
use Slim\Http\UploadedFile;

return function (App $app) {
    $container = $app->getContainer();
    
    $app->post('/cogworks/cog-files/retrieve/active', function ($request, $response, $args) use ($container) {
        // @session_start();
        // $result = null;
        // $userID = $_SESSION['id'];
        $userPosition = 1;
        $userID = 1; // temporary value
        $result = array();
        $projectID = $request->getParam('projID');

        $user = $container->projectcog->query("
            select * from users
            where id = '$userID';
        ")->fetch(PDO::FETCH_ASSOC);

        $orgs = $container->projectcog->query("
            select * from organizations
            order by organization asc
        ")->fetchAll(PDO::FETCH_ASSOC);

        $userOrg = $user['organization_id'];

        // This assumes that the user is the Admin
        if($userPosition == 1)
        {
            if($projectID == 'all')
            {
                $cogFiles = $container->cogworks->query("
                    select * from cog_files
                    where status_id = '1'
                    order by cog_file asc
                ")->fetchAll(PDO::FETCH_ASSOC);
                $projects = $container->cogworks->query("
                    select * from projects
                    where status_id = '1'
                    order by project asc
                ")->fetchAll(PDO::FETCH_ASSOC);
            }
            else
            {
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
            if($projectID == 'all')
            {
                $cogFiles = $container->cogworks->query("
                    select * from cog_files
                    where status_id = '1' and user_id = '$userID' and organization_id = '$userOrg'
                    order by cog_file asc
                ")->fetchAll(PDO::FETCH_ASSOC);
                $projects = $container->cogworks->query("
                    select * from projects
                    where status_id = '1' and organization_id = '$userOrg'
                    order by project asc
                ")->fetchAll(PDO::FETCH_ASSOC);
            }
            else
            {
                $cogFiles = $container->cogworks->query("
                    select * from cog_files
                    where status_id = '1' and user_id = '$userID' and organization_id = '$userOrg' and project_id = '$projectID'
                    order by cog_file asc
                ")->fetchAll(PDO::FETCH_ASSOC);
                $projects = $container->cogworks->query("
                    select * from projects
                    where id = '$projectID' and organization_id = '$userOrg'
                    order by project asc
                ")->fetchAll(PDO::FETCH_ASSOC);
            }
        }

        foreach($cogFiles as $cog)
        {
            $cogFile = array();
            $cogFileUserID = $cog['user_id'];
            $cogFile['id'] = $cog['id'];
            $cogFile['cogfile'] = str_replace('.cog', '', $cog['cog_file']);
            $cogFile['user'] = $cog['user_id'];
            $cogFile['projectID'] = $cog['project_id'];
            $cogFile['created'] = (explode(" ",$cog['created']))[0];
            $cogFile['updated'] = (explode(" ",$cog['updated']))[0];
            $cogFile['project'] = '(Personal File)';
            $cogFile['imageValue'] = '';
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
            $cogFile['image'] = $tmpAry['path'];
            array_push($result, $cogFile);
        }
        return json_encode($result);
    });
    $app->post('/cogworks/cog-files/deactivate', function ($request, $response, $args) use ($container) {
        $id = $request->getParam('id');
        $date = new DateTime('NOW');
        $dateDateTime = $date->format('Y-m-d H:i:s');
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
        $result['updated'] = (explode(" ",$cog['updated']))[0];
        $result['created'] = (explode(" ",$cog['created']))[0];

        $cogName = $cog['id'] . '.cog';
        $basePath = getCogFileDirectory($projID, $orgID, $userID);
        $result['content'] = json_decode(file_get_contents($basePath . $cogName, true));

        return json_encode($result);
    });
    $app->post('/cogworks/cog-files/update', function ($request, $response, $args) use ($container) {
        // @session_start();
        // $result = null;
        // $userID = $_SESSION['id'];
        // $userID = 5; // temporary value...this assumes that i'm nina of jsi
        $userID = 5; // temporary value...this assumes that i'm nina of jsi
        $cogID = $request->getParam('id');
        $name = $request->getParam('cogName');
        $projID = $request->getParam('cogProject');
        $file = $request->getUploadedFiles();
        $date = new DateTime('NOW');
        $dateDateTime = $date->format('Y-m-d H:i:s');
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

        $imagePath = getCogImageThumbnailDirectory($projID, $cogOrgID, $cogUserID, 'cog-files');
        $sourcePath = getCogFileDirectory($cogProjectID, $cogOrgID, $cogUserID) . $cogID . '.cog';
        $targetPath = getCogFileDirectory($projID, $cogOrgID, $cogUserID) . $cogID . '.cog';
        $cogFileContent = json_decode(file_get_contents($sourcePath, true));        
        $cogFileContent->design->name = $name;

        $myfile = fopen($sourcePath, "w");
        fwrite($myfile, (json_encode($cogFileContent)));
        fclose($myfile);
        
        if($cogProjectID != $projID)
        {
            $result = rename($sourcePath, $targetPath);
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
        // @session_start();
        // $result = null;
        // $userID = $_SESSION['id'];
        // $userID = 5; // temporary value...this assumes that i'm nina of jsi
        $userID = 5; // temporary value...this assumes that i'm nina of jsi
        $cogID = $request->getParam('id');
    });
};