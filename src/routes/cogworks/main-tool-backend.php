<?php

use Slim\App;
use Slim\Http\Request;
use Slim\Http\Response;
use Slim\Http\UploadedFile;

return function (App $app) {
    $container = $app->getContainer();
    $app->get('/cogworks/[{cogfile}]', function ($request, $response, $args) use ($container) {
        @session_start();
        // check_session();
        $obj = json_decode(base64_decode($args['cogfile']), true);
        $result = array();
        $result['user'] = $obj['u'];
        $result['file'] = $obj['c'];
    
        if(!isset($_SESSION["logged"])) {
            $content .= $container->renderer->fetch('cogworks/cog-login.php');
        } else {
            $content .= $container->renderer->fetch('cogworks/cog-main.php', array(
                'root' => ROOT,
                'obj' => json_encode($result)
            ));
        }
        return $response->write($content);
    });
    $app->post('/cogworks/login/validate', function ($request, $response, $args) use ($container) {
        @session_start();
        $result = 'false';
        $dateDateTime = getCurrentDate();
        
        // using email for now
        $email = $request->getParam('email');
        $pass = md5($request->getParam('password'));
        
        $user = $container->projectcog->query("
            select * from users
            where email = '$email' and password = '$pass'
        ")->fetch(PDO::FETCH_ASSOC);
        
        if(is_array($user) && count($user) > 0)
        {
            $id = $user['id'];
            $prepare = $container->projectcog->prepare("
                update users
                set last_login = '$dateDateTime'
                where id = '$id'
            ");

            $prepare->execute();
            $_SESSION['id'] = $id;
            $_SESSION['logged'] = true;
            $result = true;
        }
        else
        {
            $result = false;
        }
        return json_encode($result);
    });
    // reserve code. this might be useful in the future
    
    /* $app->get('/cogworks/preview/[{userID}]', function ($request, $response, $args) use ($container) {
        check_session();
        $id = base64_decode($args['userID']);
        $cogworksFolder = '';
        $previewFolder = '';

        $obj = $container->projectcog->query("
            select * from users
            where id = '$id';
        ")->fetch(PDO::FETCH_ASSOC);
        $orgID = $obj['organization_id'];
        switch($orgID)
        {
            case '1':
                $cogworksFolder = 'cogworks/admin/';
                break;
            case '2':
                $cogworksFolder = 'cogworks/developers/';
                break;
            default:
                $cogworksFolder = 'cogworks/organizations/';
        }

        if($orgID == 1) {
            $previewFolder = $cogworksFolder . 'users/' . $id . '/preview/index.html';
        } else if($orgID == 2) {
            $previewFolder = $cogworksFolder . $id . '/preview/index.html';
        } else {
            $previewFolder = $cogworksFolder . $orgID . '/users/' . $id . '/preview/index.html';
        }

        $path = '../' . $previewFolder;
        
        $content .= $container->renderer->fetch($path);
        return $response->write($content);
    }); */


    $app->post('/cogworks/main-tool-backend/test', function ($request, $response, $args) use ($container) {
        // echo getCogfilePath(14, $container);
        $result = array();
        $result['status'] = false;
        $result['txt'] = 'foobar';
        $result['id'] = 0;
        return json_encode($result);
    });
    $app->post('/cogworks/main-tool-backend/retrieve/cogfiles', function ($request, $response, $args) use ($container) {
        $user = getUserInfo($request->getParam('id'), $container);
        $userID = $user['id'];
        $orgID = $user['organization_id'];
        $position = $user['position_id'];
        $result = array();
        $personalPrj = array();
        $personalPrj['id'] = 0;
        $personalPrj['project'] = 'Personal File';

        if($orgID == 1 && $position == 1) {
            $projects = $container->cogworks->query("
                select * from projects
                where status_id = '1'
                order by project asc
            ")->fetchAll(PDO::FETCH_ASSOC);
        } else {
            $projects = $container->cogworks->query("
                select * from projects
                where status_id = '1' and organization_id = '$orgID'
                order by project asc
            ")->fetchAll(PDO::FETCH_ASSOC);
        }
        // just making sure we have an array value
        $projects = is_array($projects) ? $projects : array();
        array_push($projects, $personalPrj);
        foreach($projects as $prj) {
            $projectID = $prj['id'];
            if($projectID != 0) {
                $cogfiles = $container->cogworks->query("
                    select * from cog_files
                    where project_id = '$projectID' and status_id = '1'
                    order by cog_file asc
                ")->fetchAll(PDO::FETCH_ASSOC);
            } else {
                // for personal files
                if($orgID == 1 && $position == 1) {
                    $cogfiles = $container->cogworks->query("
                        select * from cog_files
                        where project_id = 0 and status_id = '1'
                        order by cog_file asc
                    ")->fetchAll(PDO::FETCH_ASSOC);
                } else {
                    $cogfiles = $container->cogworks->query("
                        select * from cog_files
                        where project_id = 0 and user_id = '$userID' and status_id = '1'
                        order by cog_file asc
                    ")->fetchAll(PDO::FETCH_ASSOC);
                }
            }

            foreach($cogfiles as $file) {
                $cog = array();
                $cog['id'] = $file['id'];
                $cog['cogfile'] = str_replace('.cog', '', $file['cog_file']);
                $cog['user'] = $file['user_id'];
                $cog['project'] = $prj['project'];
                $cog['projectID'] = $prj['id'];
                $cog['created'] = (explode(" ",$file['created']))[0];
                $cog['updated'] = (explode(" ",$file['updated']))[0];
                $tmpAry = array();

                $tmpAry = getCogFileThumbnail($orgID, $userID, $file['id'], $file['image'], $container);
                $cog['imageValue'] = $tmpAry['imageValue'];
                $cog['image'] = $tmpAry['path'];
                array_push($result, $cog);
            }
        }
        if(count($result) > 0) {
            usort($result, function($a, $b) {
                if ($a['created'] == $b['created']) {
                    return 0;
                }
                return ($a['created'] > $b['created']) ? -1 : 1;
            });
        }
        return json_encode($result);
    });
    $app->post('/cogworks/main-tool-backend/projects-cogfiles', function ($request, $response, $args) use ($container) {
        $user = getUserInfo($request->getParam('id'), $container);
        $userID = $user['id'];
        $orgID = $user['organization_id'];
        $position = $user['position_id'];
        $result = array();
        $personalPrj = array();
        $personalPrj['id'] = 0;
        $personalPrj['project'] = 'Personal File';
        $personalPrj['organization_id'] = $orgID;
        $personalPrj['created'] = $user['created'];
        $personalPrj['imageValue'] = '';
        $personalPrj['image'] = ''; // no value for now 'coz i think it doesn't matter

        if($orgID == 1 && $position == 1) {
            $projects = $container->cogworks->query("
                select * from projects
                where status_id = '1'
                order by project asc
            ")->fetchAll(PDO::FETCH_ASSOC);
        } else {
            $projects = $container->cogworks->query("
                select * from projects
                where status_id = '1' and organization_id = '$orgID'
                order by project asc
            ")->fetchAll(PDO::FETCH_ASSOC);
        }
        // just making sure we have an array value
        $projects = is_array($projects) ? $projects : array();
        array_push($projects, $personalPrj);
        foreach($projects as $prj) {
            $project = array();
            $project['id'] = $prj['id'];
            $projectID = $prj['id'];
            $project['project'] = $prj['project'];
            $project['orgID'] = $prj['organization_id'];
            $project['created'] = (explode(" ",$prj['created']))[0];
            $project['cogfiles'] = array();

            $projImgAry = getCogProjectThumbnail($prj['organization_id'], $prj['id'], $prj['image'], $container);
            $project['imageValue'] = $projImgAry['imageValue'];
            $project['image'] = $projImgAry['path'];

            /* foreach($orgs as $org) {
                if($prj['organization_id'] == $org['id']) {
                    $project['organization'] = $org['organization'];
                    break;
                }
            } */
            $cogfiles = $container->cogworks->query("
                select * from cog_files
                where project_id = '$projectID' and status_id = '1'
                order by cog_file asc
            ")->fetchAll(PDO::FETCH_ASSOC);

            foreach($cogfiles as $file) {
                $cog = array();
                $cog['id'] = $file['id'];
                $cog['cogfile'] = $file['cog_file'];
                $cog['user'] = $file['user_id'];
                $cog['created'] = $file['created'];
                $cog['updated'] = $file['updated'];
                $tmpAry = array();

                $tmpAry = getCogFileThumbnail($orgID, $userID, $file['id'], $file['image'], $container);
                $cog['imageValue'] = $tmpAry['imageValue'];
                $cog['image'] = $tmpAry['path'];
                array_push($project['cogfiles'], $cog);
            }
            array_push($result, $project);
        }
        return json_encode($result);
    });
    $app->post('/cogworks/main-tool-backend/set-init-value', function ($request, $response, $args) use ($container) {
        header('Content-type: text/html; charset=utf-8');
        $obj = json_decode(base64_decode($request->getParam('value')), true);
        $cogID = $obj['c'];
        $path = getCogfilePath($cogID, $container);
        $result = array();
        $result['user'] = $obj['u'];
        $result['userPath'] = getCogUserFolderPath($obj['u'], $container);
        $result['fileID'] = $cogID;

        $myfile = fopen($path, "r") or die("fail"); //die("Unable to open file!");
        while(!feof($myfile)) {
            $cogfile = fgets($myfile);
        }
        fclose($myfile);
        $result['file'] = json_decode($cogfile, true);
        $cogObj = $container->cogworks->query("
            select * from cog_files
            where id = '$cogID';
        ")->fetch(PDO::FETCH_ASSOC);
        $result['file']['design']['name'] = str_replace('.cog', '', $cogObj['cog_file']);
        $result['file']['content']['design']['name'] = str_replace('.cog', '', $cogObj['cog_file']);
        $result['file']['id'] = $cogID;
        $result['filePath'] = getCogfilePath($cogID, $container);
        
        return json_encode($result);
    });
    $app->post('/cogworks/main-tool-backend/path/cog-file', function ($request, $response, $args) use ($container) {
        $id = $request->getParam('id');
        $path = getCogfilePath($id, $container);
        return $path;
    });
    $app->post('/cogworks/main-tool-backend/read-cog-file', function ($request, $response, $args) use ($container) {
        // reserve code
        /* $id = $request->getParam('id');
        $path = getCogfilePath($id, $container); */
        $path = urldecode($request->getParam('path'));
        $fName = $request->getParam('fName');
        $userID = $request->getParam('user');
        $id = str_replace('.cog', '', $fName);
        $fileLocation = $path . "/" . $fName;
        $cogfile = null;
        $result = null;

        header('Content-type: text/html; charset=utf-8');
        $myfile = fopen($fileLocation, "r") or die("fail"); //die("Unable to open file!");
        
        while(!feof($myfile)) {
            $cogfile = fgets($myfile);
        }
        fclose($myfile);
        $result = json_decode($cogfile, true);
        $cogObj = $container->cogworks->query("
            select * from cog_files
            where id = '$id';
        ")->fetch(PDO::FETCH_ASSOC);
        $user = getUserInfo($userID, $container);
        $result['design']['name'] = str_replace('.cog', '', $cogObj['cog_file']);
        $result['content']['design']['name'] = str_replace('.cog', '', $cogObj['cog_file']);
        $result['id'] = $id;
        $result['fileID'] = $id;

        // echo getTmpResourcesDirectoryPath($user['organization_id'], $userID, 'audio');
        return json_encode($result);
    });
    $app->post('/cogworks/main-tool-backend/make-resource-folders', function ($request, $response, $args) use ($container) {
        $cogID = $request->getParam('cogID');
        $designID = $request->getParam('designID');
        $userID = $request->getParam('user');
        $user = getUserInfo($userID, $container);
        $assets = json_decode($request->getParam('assets'), true);
        $resources = array('audio', 'pdf', 'extra', 'video');

        foreach($resources as $resource) {
            $resourcePath = ($cogID != 0) ? (getCogResourcesPath($cogID, $container))[$resource] : 0;
            $tmpResourcePath = getTmpResourcesDirectoryPath($user['organization_id'], $userID, $resource);
            generateDirectory($tmpResourcePath . '/' . $designID);
            if(count($assets[$resource]['children']) > 0) {
                copydir($resourcePath, $tmpResourcePath . '/' . $designID);
            }
        }

        /* // generating folders for the assets
        $resourcePath = ($cogID != 0) ? (getCogResourcesPath($cogID, $container))['audio'] : 0;
        $tmpResourcePath = getTmpResourcesDirectoryPath($user['organization_id'], $userID, 'audio');
        generateDirectory($tmpResourcePath . '/' . $designID);
        if(count($assets['audio']['children']) > 0) {
            copydir($resourcePath, $tmpResourcePath . '/' . $designID);
        }
        
        $resourcePath = ($cogID != 0) ? (getCogResourcesPath($cogID, $container))['pdf'] : 0;
        $tmpResourcePath = getTmpResourcesDirectoryPath($user['organization_id'], $userID, 'pdf');
        generateDirectory($tmpResourcePath . '/' . $designID);
        if(count($assets['pdf']['children']) > 0) {
            copydir($resourcePath, $tmpResourcePath . '/' . $designID);
        }

        $resourcePath = ($cogID != 0) ? (getCogResourcesPath($cogID, $container))['video'] : 0;
        $tmpResourcePath = getTmpResourcesDirectoryPath($user['organization_id'], $userID, 'video');
        generateDirectory($tmpResourcePath . '/' . $designID);
        if(count($assets['video']['children']) > 0) {
            copydir($resourcePath, $tmpResourcePath . '/' . $designID);
        }
        
        $resourcePath = ($cogID != 0) ? (getCogResourcesPath($cogID, $container))['extra'] : 0;
        $tmpResourcePath = getTmpResourcesDirectoryPath($user['organization_id'], $userID, 'extra');
        generateDirectory($tmpResourcePath . '/' . $designID);
        if(count($assets['extra']['children']) > 0) {
            copydir($resourcePath, $tmpResourcePath . '/' . $designID);
        } */
        
        return json_encode(true);
    });
    $app->post('/cogworks/main-tool-backend/read-file', function ($request, $response, $args) use ($container) {
        $path = urldecode($request->getParam('path'));
        $fName = $request->getParam('fName');
        $fileLocation = $path . "/" . $fName;

        header('Content-type: text/html; charset=utf-8');
        $myfile = fopen($fileLocation, "r") or die("fail"); //die("Unable to open file!");
        
        while(!feof($myfile)) {
            echo fgets($myfile);
        }
        
        fclose($myfile);
    });
    $app->post('/cogworks/main-tool-backend/clean-tmp-resources', function ($request, $response, $args) use ($container) {
        $userID = $request->getParam('userID');
        $user = getUserInfo($userID, $container);
        $resources = array('audio', 'pdf', 'extra', 'video');

        foreach($resources as $resource) {
            rrmdir(getTmpResourcesDirectoryPath($user['organization_id'], $userID, $resource));
            generateDirectory(getTmpResourcesDirectoryPath($user['organization_id'], $userID, $resource));
        }
        // this is may be handy in the future
        return json_encode(true);
    });
    $app->post('/cogworks/main-tool-backend/pods/update', function ($request, $response, $args) use ($container) {
        $user = getUserInfo($request->getParam('id'), $container);
        $userID = $user['id'];
        $userPosition = $user['position_id'];
        $userOrg = $user['organization_id'];
        $content = addslashes($request->getParam('content'));
        $dateDateTime = getCurrentDate();
        $result = null;
        $result = null;

        $prepare = $container->cogworks->prepare("
            update pods
            set
            pod = '$content',
            updated = '$dateDateTime'
            where organization_id = '$userOrg'
        ");

        $result = $prepare->execute();

        return json_encode($result);
    });
    $app->post('/cogworks/main-tool-backend/what-nots/update', function ($request, $response, $args) use ($container) {
        $user = getUserInfo($request->getParam('id'), $container);
        $userID = $user['id'];
        $userPosition = $user['position_id'];
        $userOrg = $user['organization_id'];
        $content = addslashes($request->getParam('content'));
        $dateDateTime = getCurrentDate();
        $result = null;
        $result = null;

        $prepare = $container->cogworks->prepare("
            update what_nots
            set
            what_not = '$content',
            updated = '$dateDateTime'
            where user_id = '$userID'
        ");

        $result = $prepare->execute();

        return json_encode($result);
    });
    $app->post('/cogworks/main-tool-backend/copy-folder', function ($request, $response, $args) use ($container) {
        $sourceVal = $request->getParam('source');
        $destinationVal = $request->getParam('destination');
        
        copyFilesIndirectory($sourceVal, $destinationVal);
        
        echo 'success';
    });
    $app->post('/cogworks/main-tool-backend/read-image', function ($request, $response, $args) use ($container) {
        header('Content-type: text/html; charset=utf-8');
        $path = urldecode($request->getParam('path'));
        $fName = $request->getParam('fName');
        
        $fileLocation = $path . "/" . $fName;

        $im = file_get_contents($fileLocation);
        $imdata = base64_encode($im);
        
        return $imdata;
    });
    $app->post('/cogworks/main-tool-backend/write-image', function ($request, $response, $args) use ($container) {
        $path = urldecode($request->getParam('path'));
        $fName = $request->getParam('fName');
        $content = $request->getParam('content');

        $folder = $path;
        if (!file_exists($folder)) {
            mkdir($folder, 0777, true);
        }

        $fileLocation = $path . "/" . $fName;

        $ifp = fopen($fileLocation, "wb") or die("fail"); //die("Unable to open file!"); 

        $data = explode(',', $content);

        fwrite($ifp, base64_decode($data[1])); 
        fclose($ifp);

        chmod($fileLocation, 0777);

        echo 'success';
    });
    $app->post('/cogworks/main-tool-backend/write-file', function ($request, $response, $args) use ($container) {
        header('Content-type: text/html; charset=utf-8');
        $path = urldecode($request->getParam('path'));
        $fName = $request->getParam('fName');
        $content = $request->getParam('content');

        $folder =  $path;
        if (!file_exists($folder)) {
            mkdir($folder, 0777, true);
        }
        
        $fileLocation =  $path . "/" . $fName;

        $myfile = fopen($fileLocation, "w") or die("fail"); //die("Unable to open file!");
        fwrite($myfile, $content);
        fclose($myfile);

        chmod($fileLocation, 0777);
        
        echo 'success';
    });
    $app->post('/cogworks/main-tool-backend/mkdir', function ($request, $response, $args) use ($container) {
        $path = $request->getParam('path');
        $result = true;
        if (!is_dir($path)) {
            $result = mkdir($path, 0777, true);
            chmod($path, 0777);
        }
        return json_encode($result);
    });
    $app->post('/cogworks/main-tool-backend/copy-file', function ($request, $response, $args) use ($container) {
        $from = $request->getParam('from');
        $to = $request->getParam('to');
        $path = substr($to, 0, (strrpos($to, '/') + 1));
        $result = false;

        $folder = $path;
        if (!file_exists($folder)) {
            mkdir($folder, 0777, true);
        }
        $result = copy($from, $to);
        chmod($to, 0777);

        return json_encode($result);
    });
    $app->post('/cogworks/main-tool-backend/remove-file', function ($request, $response, $args) use ($container) {
        $sourceVal = $request->getParam('path');
        $result = array();
        $result['status'] = unlink($sourceVal);
        $result['path'] = $sourceVal;
        return json_encode($result);
    });
    $app->post('/cogworks/main-tool-backend/remove-dir-files', function ($request, $response, $args) use ($container) {
        $sourceVal = $request->getParam('path');
        rrmdir($sourceVal);
        echo $sourceVal;
    });
    $app->post('/cogworks/main-tool-backend/resources-path', function ($request, $response, $args) use ($container) {
        $id = $request->getParam('id');
        return json_encode(getCogResourcesPath($id, $container));
    });
    // reserve code
    $app->post('/cogworks/main-tool-backend/tmp-resources-path', function ($request, $response, $args) use ($container) {
        $userID = $request->getParam('userID');
        $designID = $request->getParam('designID');
        $resources = array('audio', 'pdf', 'extra', 'video');
        $user = getUserInfo($userID, $container);
        $result = array();

        foreach($resources as $resource) {
            $result[$resource] = getTmpResourcesDirectoryPath($user['organization_id'], $userID, $resource) . '/' . $designID;
        }
        return json_encode($result);
    });
    $app->post('/cogworks/main-tool-backend/general-info/cog-file', function ($request, $response, $args) use ($container) {
        $result = null;
        $fileName = $request->getParam('fileName');
        $uID = $request->getParam('userID');
        $id = $request->getParam('id');
        $designID = $request->getParam('designID');
        $basePath = '';
        $resources = array('audio', 'pdf', 'extra', 'video');
        $tmpAry = array();

        // identify if the file exist first. if not, the logged user will be used
        if($id != 0) {
            // gets the file info coming from the original user
            $cog = $container->cogworks->query("
                select * from cog_files
                where id = '$id';
            ")->fetch(PDO::FETCH_ASSOC);
            $userID = $cog['user_id'];
            $projID = $cog['project_id'];
        } else {
            $cog = array();
            $userID = $uID;
            $projID = 0;
            $cog['id'] = 0;
            $cog['cog_file'] = $fileName;
            $cog['user_id'] = $userID;
            $cog['project_id'] = $projID;
            $cog['status_id'] = 1;
            $cog['image'] = null;
            $cog['updated'] = getCurrentDate();
            $cog['created'] = getCurrentDate();
        }

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
        $org = $container->projectcog->query("
            select * from organizations
            where id = '$orgID';
        ")->fetch(PDO::FETCH_ASSOC);

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
        $result['userOrgID'] = $orgID;
        $result['userOrg'] = $org['organization'];
        $result['status'] = $status['status'];
        $result['updated'] = (explode(" ",$cog['updated']))[0];
        $result['created'] = (explode(" ",$cog['created']))[0];
        $result['filename'] = $cog['id'] . '.cog';
        $result['basePath'] = $basePath = getCogFileDirectory($projID, $orgID, $userID);
        // $result['resources'] = getCogResourcesPath($id, $container);

        foreach($resources as $resource) {
            $result['resources'][$resource] = getTmpResourcesDirectoryPath($user['organization_id'], $userID, $resource) . '/' . $designID;
        }

        return json_encode($result);
    });
    $app->post('/cogworks/main-tool-backend/convert-to-zip', function ($request, $response, $args) use ($container) {
        return convertToZip($request->getParam('path'), $request->getParam('filename'));
    });
    $app->post('/cogworks/main-tool-backend/cog-file/add', function ($request, $response, $args) use ($container) {
        $userID = $request->getParam('id');
        $content = json_decode($request->getParam('content'), true);
        $contentRaw = addslashes($request->getParam('content'));
        $filename = $content['design']['name'] . '.cog';
        $designID = $content['design']['id'];
        $resources = array('audio', 'pdf', 'extra', 'video');
        $user = getUserInfo($userID, $container);
        $result = array();
        $result['path'] = '';
        $result['fileID'] = 0;
        $result['status'] = $container->cogworks->exec("
            insert into cog_files
            (cog_file, user_id)
            values('$filename', '$userID')
        ");
        if($result['status']) {
            // just in-case there's more than 1 similar filename
            $cog = $container->cogworks->query("
                select * from cog_files
                where cog_file = '$filename' and user_id = '$userID'
                order by id desc limit 1
            ")->fetch(PDO::FETCH_ASSOC);
            $cogID = $cog['id'];
            $result['fileID'] = $cogID;
            $result['path'] = getCogfilePath($cogID, $container);

            foreach($resources as $resource) {
                if($content['design']['assets'][$resource]['children'] > 0) {
                    $resourceFolder = (getCogResourcesPath($cogID, $container))[$resource];
                    $tmpResourceFolder = getTmpResourcesDirectoryPath($user['organization_id'], $userID, $resource) . '/' . $designID;
                    rrmdir($resourceFolder);
                    copydir($tmpResourceFolder, $resourceFolder);
                }
            }
        }
        return json_encode($result);
    });
    $app->post('/cogworks/main-tool-backend/write-context-to-disk', function ($request, $response, $args) use ($container) {
        header('Content-type: text/html; charset=utf-8');
        $userID = $request->getParam('userID');
        $fileID = $request->getParam('fileID');
        $destinationPath = urldecode($request->getParam('destinationPath'));
        $fName = $request->getParam('fName');
        $content = $request->getParam('content');
        $tmpPath = getCogUserFolderPath($userID, $container) . 'tmp';
        $dateDateTime = getCurrentDate();
        $contentRaw = addslashes($content);
        $result = array();
        $result['status'] = false;
        $result['updated'] = false;
        $contentObj = json_decode($content, true);
        $designID = $contentObj['design']['id'];
        $user = getUserInfo($userID, $container);
        $resources = array('audio', 'pdf', 'extra', 'video');
        
        $tmpLocation = $tmpPath . "/" . $fName;

        $myfile = fopen($tmpLocation, "w") or die("fail"); //die("Unable to open file!");
        fwrite($myfile, $content);
        fclose($myfile);

        $fileLocation = $destinationPath . "/" . $fName;
        
        if (copy($tmpLocation,$fileLocation)) {
            chmod($fileLocation, 0777);
            unlink($tmpLocation);
            $result['status'] = true;
        }

        $prepare = $container->cogworks->prepare("
            update cog_files
            set updated = '$dateDateTime'
            where id = '$fileID'
        ");
        $result['dbUpdated'] = $prepare->execute();

        foreach($resources as $resource) {
            if($contentObj['design']['assets'][$resource]['children'] > 0) {
                $resourceFolder = (getCogResourcesPath($fileID, $container))[$resource];
                $tmpResourceFolder = getTmpResourcesDirectoryPath($user['organization_id'], $userID, $resource) . '/' . $designID;
                rrmdir($resourceFolder);
                copydir($tmpResourceFolder, $resourceFolder);
            }
        }

        return json_encode($result);
    });
    $app->post('/cogworks/main-tool-backend/make-cog-backup', function ($request, $response, $args) use ($container) {
        $id = $request->getParam('id');
        $content = addslashes($request->getParam('content'));

        $cog = $container->cogworks->query("
            select * from cog_files
            where id = '$id'
        ")->fetch(PDO::FETCH_ASSOC);
        $cogID = $cog['id'];
        $userID = $cog['user_id'];
        $cogFileCount = $container->cogworks->query("
            select count(id) from cog_file_backup
            where cog_file_id='$cogID'
        ")->fetch(PDO::FETCH_ASSOC);

        $cogFileVersion = ($cogFileCount['count(id)'] + 1);

        $result = $container->cogworks->query("
            insert into cog_file_backup
            (user_id, cog_file_id, cog_file_backup_content, version)
            values('$userID', '$id', '$content','$cogFileVersion')
        ");
        return json_encode($result);
    });
    $app->post('/cogworks/main-tool-backend/rename/asset', function ($request, $response, $args) use ($container) {
        $oldName = $request->getParam('oldName');
        $newName = $request->getParam('newName');
        $designID = $request->getParam('designID');
        $userID = $request->getParam('user');
        $asset = $request->getParam('asset');
        $user = getUserInfo($userID, $container);
        $result = array();

        $oldNamePath = getTmpResourcesDirectoryPath($user['organization_id'], $userID, $asset) . '/' . $designID . '/' . $oldName;
        $newNamePath = getTmpResourcesDirectoryPath($user['organization_id'], $userID, $asset) . '/' . $designID . '/' . $newName;
        $result['status'] = rename($oldNamePath, $newNamePath);
        $result['old'] = $oldNamePath;
        $result['new'] = $newNamePath;
        $result['path'] = $newNamePath;
        return json_encode($result);
    });
    $app->post('/cogworks/main-tool-backend/remove/asset', function ($request, $response, $args) use ($container) {
        $file = $request->getParam('file');
        $designID = $request->getParam('designID');
        $userID = $request->getParam('user');
        $asset = $request->getParam('asset');
        $user = getUserInfo($userID, $container);
        $result = array();

        $path = getTmpResourcesDirectoryPath($user['organization_id'], $userID, $asset) . '/' . $designID . '/' . $file;
        $result['status'] = unlink($path);
        $result['path'] = $path;
        return json_encode($result);
    });
    $app->post('/cogworks/main-tool-backend/move/upload/assets', function ($request, $response, $args) use ($container) {
        $file = $request->getUploadedFiles();
        $designID = $request->getParam('designID');
        $userID = $request->getParam('user');
        $asset = $request->getParam('asset');
        $user = getUserInfo($userID, $container);
        $result = array();

        // $tmpResourcePath = getTmpResourcesDirectoryPath($user['organization_id'], $userID, $asset);
        $uploadedFile = $file['file'];
        $path = getTmpResourcesDirectoryPath($user['organization_id'], $userID, $asset) . '/' . $designID . '/' . $file['file']->getClientFilename();
        $uploadedFile->moveTo($path);
        chmod($path,0777);
        $result['status'] = true;
        $result['path'] = $path;
        return json_encode($result);
    });
    $app->post('/cogworks/main-tool-backend/move/file/tmp', function ($request, $response, $args) use ($container) {
        $file = $request->getUploadedFiles();
        $userID = $request->getParam('user');
        $result = array();

        $uploadedFile = $file['file'];
        $path = getCogUserFolderPath($userID, $container) . 'tmp/' . $file['file']->getClientFilename();
        $uploadedFile->moveTo($path);
        chmod($path,0777);
        $result['status'] = true;
        $result['path'] = $path;

        // if ($file->getError() == 'UPLOAD_ERR_OK') {
        //     $result['status'] = false;
        //     $result['path'] = '';
        // }
        // else {
            
        // }
        // return json_encode($file);
        return json_encode($result);
    });
};