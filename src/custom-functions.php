<?php

function test()
{
    echo 'hello world!';
}
function getCogOrganizationThumbnail($orgID, $img, $container)
{
    $ary = array();
    $ary['imageValue'] = '';
    $ary['path'] = '';
    if($img == null || strlen($img) <= 0)
    {
        $ary['imageValue'] = '';
        $ary['path'] = 'assets/img/thumbnail/cog-project.svg';
    }
    else
    {
        // excluding org image for admin and developers, because i think it not necessary
        $ary['imageValue'] = $img;
        if($orgID == 1 && $orgID == 2){
            $ary['imageValue'] = '';
            $ary['path'] = 'assets/img/thumbnail/cog-project.svg';
        } else {
            $ary['folder'] = 'cogworks/organizations/' . $orgID . '/img/thumbnail/organizations';
            $ary['path'] = 'cogworks/organizations/' . $orgID . '/img/thumbnail/organizations/' . $img;
        }
    }
    generateDirectory($ary['folder']);
    return $ary;
}
function getCogDeveloperThumbnail($orgID, $userID, $img, $container)
{
    $ary = array();
    $ary['imageValue'] = '';
    $ary['path'] = '';
    if($img == null || strlen($img) <= 0)
    {
        $ary['imageValue'] = '';
        $ary['path'] = 'assets/img/thumbnail/thumbnail-profile-pic.png';
    }
    else
    {
        $ary['imageValue'] = $img;
        if($orgID == 1)
        {
            $ary['folder'] = 'cogworks/admin/img/thumbnail/profiles/' . $userID;
            $ary['path'] = 'cogworks/admin/img/thumbnail/profiles/' . $userID . '/' . $img;
        }
        else if($orgID == 2)
        {
            $ary['folder'] = 'cogworks/developers/' . $userID . '/img/thumbnail/profiles';
            $ary['path'] = 'cogworks/developers/' . $userID . '/img/thumbnail/profiles/' . $img;
        }
        else
        {
            $ary['folder'] = 'cogworks/organizations/' . $orgID . '/img/thumbnail/profiles/' . $userID;
            $ary['path'] = 'cogworks/organizations/' . $orgID . '/img/thumbnail/profiles/' . $userID . '/' . $img;
        }
    }
    generateDirectory($ary['folder']);
    return $ary;
}
function getCogProjectThumbnail($orgID, $projID, $img, $container)
{
    $ary = array();
    $ary['imageValue'] = '';
    $ary['path'] = '';
    $userID = 0; // initial value
    if($img == null || strlen($img) <= 0)
    {
        $ary['imageValue'] = '';
        $ary['path'] = 'assets/img/thumbnail/cog-project.svg';
    }
    else
    {
        $ary['imageValue'] = $img;
        // first determine or initiate $userID org for Developers
        if($orgID == 2)
        {
            // it just need one query to retrieve user id
            $cogInfo = $container->cogworks->query("
                select * from cog_files
                where id = '$projID'
            ")->fetch(PDO::FETCH_ASSOC);
            $userID = $cogInfo['user_id'];
        }
        if($orgID == 1)
        {
            $ary['folder'] = 'cogworks/admin/img/thumbnail/projects/' . $projID;
            $ary['path'] = 'cogworks/admin/img/thumbnail/projects/' . $projID . '/' . $img;
        }
        else if($orgID == 2)
        {
            $ary['folder'] = 'cogworks/developers/' . $userID . '/img/thumbnail/projects/' . $projID;
            $ary['path'] = 'cogworks/developers/' . $userID . '/img/thumbnail/projects/' . $projID . '/' . $img;
        }
        else
        {
            $ary['folder'] = 'cogworks/organizations/' . $orgID . '/img/thumbnail/projects/' . $projID;
            $ary['path'] = 'cogworks/organizations/' . $orgID . '/img/thumbnail/projects/' . $projID . '/' . $img;
        }
    }
    generateDirectory($ary['folder']);
    return $ary;
}
function getCogFileThumbnail($orgID, $userID, $cogID, $img, $container)
{
    $ary = array();
    $ary['imageValue'] = '';
    $ary['path'] = '';
    if($img == null || strlen($img) <= 0)
    {
        $ary['imageValue'] = '';
        $ary['path'] = 'assets/img/thumbnail/cog-file.svg';
    }
    else
    {
        $ary['imageValue'] = $img;
        $cogInfo = $container->cogworks->query("
            select * from cog_files
            where id = '$cogID';
        ")->fetch(PDO::FETCH_ASSOC);
        $cogUserID = $cogInfo['user_id'];
        $cogProjectID = $cogInfo['project_id'];
        $userInfo = $container->projectcog->query("
            select * from users
            where id = '$cogUserID';
        ")->fetch(PDO::FETCH_ASSOC);
        $userInfoID = $userInfo['id'];
        $userInfoOrgID = $userInfo['organization_id'];

        if($orgID == 1)
        {
            if($userInfoOrgID == 1)
            {
                $ary['folder'] = 'cogworks/admin/img/thumbnail/cog-files/' . $cogID;
                $ary['path'] = 'cogworks/admin/img/thumbnail/cog-files/' . $cogID . '/' . $img;
            }
            else if($userInfoOrgID == 2) // belongs to no organization
            {
                $ary['folder'] = 'cogworks/developers/' . $userInfoID . '/img/thumbnail/cog-files/' . $cogID;
                $ary['path'] = 'cogworks/developers/' . $userInfoID . '/img/thumbnail/cog-files/' . $cogID . '/' . $img;
            }
            else
            {
                $ary['folder'] = 'cogworks/organizations/' . $userInfoOrgID . '/img/thumbnail/cog-files/' . $cogID;
                $ary['path'] = 'cogworks/organizations/' . $userInfoOrgID . '/img/thumbnail/cog-files/' . $cogID . '/' . $img;
            }
        }
        else if($orgID == 2)
        {
            $ary['folder'] = 'cogworks/developers/' . $userID . '/img/thumbnail/cog-files/' . $cogID;
            $ary['path'] = 'cogworks/developers/' . $userID . '/img/thumbnail/cog-files/' . $cogID . '/' . $img;
        }
        else
        {
            $ary['folder'] = 'cogworks/organizations/' . $orgID . '/img/thumbnail/cog-files/' . $cogID;
            $ary['path'] = 'cogworks/organizations/' . $orgID . '/img/thumbnail/cog-files/' . $cogID . '/' . $img;
        }
    }
    generateDirectory($ary['folder']);
    return $ary;
}
function getCogImageThumbnailDirectory($fileID, $orgID, $userID, $type)
{
    $path = '';
    $typePath = '';
    $projPath = '';
    $result = array();
    if($orgID == 1)
    {
        $result['path'] = setCogworksDirectoryPath($orgID) . 'img/thumbnail/' . $type . '/' . $fileID . '/';
        $result['typePath'] = setCogworksDirectoryPath($orgID) . 'img/thumbnail/' . $type;
        $result['filePath'] = setCogworksDirectoryPath($orgID) . 'img/thumbnail/' . $type . '/' . $fileID;
    }
    else if($orgID == 2)
    {
        $result['path'] = setCogworksDirectoryPath($orgID) . $userID . '/img/thumbnail/' . $type . '/' . $fileID . '/';
        $result['typePath'] = setCogworksDirectoryPath($orgID) . $userID . '/img/thumbnail/' . $type;
        $result['filePath'] = setCogworksDirectoryPath($orgID) . $userID . '/img/thumbnail/' . $type . '/' . $fileID;
    }
    else
    {
        $result['path'] = setCogworksDirectoryPath($orgID) . $orgID . '/img/thumbnail/' . $type . '/' . $fileID . '/';
        $result['typePath'] = setCogworksDirectoryPath($orgID) . $orgID . '/img/thumbnail/' . $type;
        $result['filePath'] = setCogworksDirectoryPath($orgID) . $orgID . '/img/thumbnail/' . $type . '/' . $fileID;
    }
    generateDirectory($result['typePath']);
    generateDirectory($result['filePath']);
    
    return $result;
}
// reserve code just in-case it needed
function getCogImageDirectory($projID, $orgID, $userID, $folder)
{
    $path = '';
    $folderPath = '';
    $projPath = '';
    if($orgID == 1)
    {
        $path = setCogworksDirectoryPath($orgID) . 'img/' . $folder . '/' . $projID . '/';
        $folderPath = setCogworksDirectoryPath($orgID) . 'img/' . $folder;
        $projPath = setCogworksDirectoryPath($orgID) . 'img/' . $folder . '/' . $projID;
    }
    else if($orgID == 2)
    {
        $path = setCogworksDirectoryPath($orgID) . $userID . '/img/' . $folder . '/' . $projID . '/';
        $folderPath = setCogworksDirectoryPath($orgID) . $userID . 'img/' . $folder;
        $projPath = setCogworksDirectoryPath($orgID) . $userID . 'img/' . $folder . '/' . $projID;
    }
    else
    {
        $path = setCogworksDirectoryPath($orgID) . $orgID . '/img/' . $folder . '/' . $projID . '/';
        $folderPath = setCogworksDirectoryPath($orgID) . $orgID . 'img/' . $folder;
        $projPath = setCogworksDirectoryPath($orgID) . $orgID . 'img/' . $folder . '/' . $projID;
    }
    generateDirectory($folderPath);
    generateDirectory($projPath);

    return $path;
}
function getCogProjectDirectory($projID, $orgID, $userID)
{
    $path = '';
    // keeping the else if statement just in-case it might needed in the future
    if($orgID == 1) {
        $path = setCogworksDirectoryPath($orgID) . '/projects/' . $projID;
    } else if($orgID == 2) {
        $path = setCogworksDirectoryPath($orgID) . '/' . $userID . '/projects/' . $projID;
    } else {
        $path = setCogworksDirectoryPath($orgID) . '/' . $orgID  . '/projects/' . $projID;
    }
    generateDirectory($path);
    $path = $path . '/';
    return $path;
}
function getCogFileDirectory($projID, $orgID, $userID)
{
    $path = '';
    if($projID == 0)
    {
        if($orgID == 1)
        {
            $path = setCogworksDirectoryPath($orgID) . 'users/' . $userID . '/raw-files/';
        }
        else if($orgID == 2)
        {
            $path = setCogworksDirectoryPath($orgID) . $userID . '/raw-files/';
        }
        else
        {
            $path = setCogworksDirectoryPath($orgID) . $orgID . '/users/' . $userID . '/raw-files/';
        }
    }
    else
    {
        if($orgID == 1)
        {
            $path = setCogworksDirectoryPath($orgID) . 'projects/' . $projID . '/';
        }
        else if($orgID == 2)
        {
            $path = setCogworksDirectoryPath($orgID) . $userID . '/projects/' . $projID . '/';
        }
        else
        {
            $path = setCogworksDirectoryPath($orgID) . $orgID . '/projects/' . $projID . '/';
        }
    }
    return $path;
}
function getCogTemplateDirectory($obj)
{
    $result = $_SERVER['DOCUMENT_ROOT'] . '/assets/cogworks/templates/' . $obj['bootstrap_version'] . '/' . $obj['folder_name'] . '/';
    return $result;
}
function setCogworksDesignUniqueID($userID)
{
    $milliseconds = (int) (microtime(true) * 1000);
    return $userID . '_' . $milliseconds;
}
function setCogworksDirectoryPath($orgID)
{
    $path = '';
    switch($orgID)
    {
        case '1':
            $path = $_SERVER['DOCUMENT_ROOT'] . '/cogworks/admin/';
            break;
        case '2':
            $path = $_SERVER['DOCUMENT_ROOT'] . '/cogworks/developers/';
            break;
        default:
            $path = $_SERVER['DOCUMENT_ROOT'] . '/cogworks/organizations/';
    }
    return $path;
}
function getCurrentDate() {
    $date = new DateTime('NOW');
    $dateDateTime = $date->format('Y-m-d H:i:s');
    return $dateDateTime;
}
// reserve code
/* function generateNewDirectory($rootPath, $folder)
{
    $folderAry = explode('/', $folder);
    $path = $rootPath;
    foreach($folderAry as $item)
    {
        $path .= '/' . $item;
        // check first if the $item is not a forward slash for some reason
        if(strlen($item) > 0)
        {
            generateDirectory($path);
        }
    }
} */
function generateDirectory($path)
{
    // check first if the directory exists
    if(!is_dir($path))
    {
        mkdir($path, 0777, true);
        chmod($path,0777);
        return false;
    }
    else
    {
        return true;
    }
}
function generateCogworksDefaultDirectories($path)
{
    generateDirectory($path . '/projects');
    generateDirectory($path . '/resources');
    generateDirectory($path . '/resources/audio');
    generateDirectory($path . '/resources/video');
    generateDirectory($path . '/resources/pdf');
    generateDirectory($path . '/resources/extra');
    generateDirectory($path . '/img');
    generateDirectory($path . '/img/thumbnail');
    generateDirectory($path . '/img/thumbnail/cog-files');
    generateDirectory($path . '/img/thumbnail/organizations');
    generateDirectory($path . '/img/thumbnail/pods');
    generateDirectory($path . '/img/thumbnail/profiles');
    generateDirectory($path . '/img/thumbnail/projects');
    generateDirectory($path . '/img/thumbnail/what-nots');
}
function generateCogworksUserDirectories($path)
{
    generateDirectory($path . '/preview');
    generateDirectory($path . '/raw-files');
    generateDirectory($path . '/tmp');
    generateDirectory($path . '/tmp-resources');
    generateDirectory($path . '/tmp-resources/audio');
    generateDirectory($path . '/tmp-resources/video');
    generateDirectory($path . '/tmp-resources/pdf');
    generateDirectory($path . '/tmp-resources/extra');
    generateCogworksDefaultDirectories($path);
}
function getCogfilePath($id, $container){
    $obj = $container->cogworks->query("
        select * from cog_files
        where id = '$id';
    ")->fetch(PDO::FETCH_ASSOC);
    $projID = $obj['project_id'];
    $userID = $obj['user_id'];

    $userObj = $container->projectcog->query("
        select * from users
        where id = '$userID';
    ")->fetch(PDO::FETCH_ASSOC);
    $orgID = $userObj['organization_id'];
    if($projID == 0) {
        if($orgID == 1) {
            $result = setCogworksDirectoryPath($orgID) . 'users/' . $userID . '/raw-files/' . $id . '.cog';
        } else if($orgID == 2) {
            $result = setCogworksDirectoryPath($orgID) . $userID . '/raw-files/' . $id . '.cog';
        } else {
            $result = setCogworksDirectoryPath($orgID) . $orgID . '/users/' . $userID . '/raw-files/' . $id . '.cog';
        }
    } else {
        if($orgID == 1) {
            $result = setCogworksDirectoryPath($orgID) . 'projects/' . $projID . '/' . $id . '.cog';
        } else if($orgID == 2) {
            $result = setCogworksDirectoryPath($orgID) . $userID . '/projects/' . $projID . '/' . $id . '.cog';
        } else {
            $result = setCogworksDirectoryPath($orgID) . $orgID . '/projects/' . $projID . '/' . $id . '.cog';
        }
    }
    
    return $result;
}
function getCogResourcesPath($id, $container){
    $obj = $container->cogworks->query("
        select * from cog_files
        where id = '$id';
    ")->fetch(PDO::FETCH_ASSOC);
    $projID = $obj['project_id'];
    $userID = $obj['user_id'];

    $userObj = $container->projectcog->query("
        select * from users
        where id = '$userID';
    ")->fetch(PDO::FETCH_ASSOC);
    $orgID = $userObj['organization_id'];
    $result = array();
    $path = '';

    if($orgID == 1) {
        $path = setCogworksDirectoryPath($orgID) . 'resources/';
    } else if($orgID == 2) {
        $path = setCogworksDirectoryPath($orgID) . $userID . '/resources/';
    } else {
        $path = setCogworksDirectoryPath($orgID) . $orgID . '/resources/';
    }
    
    $result['audio'] = $path . 'audio/' . $id;
    $result['pdf'] = $path . 'pdf/' . $id;
    $result['video'] = $path . 'video/' . $id;
    $result['extra'] = $path . 'extra/' . $id;
    return $result;
}
function getTmpResourcesDirectoryPath($orgID, $userID, $resourceFolder) {
    $path = '';
    if($orgID == 1) {
        $path = setCogworksDirectoryPath($orgID) . 'users/' . $userID . '/tmp-resources/' . $resourceFolder;
    } else if($orgID == 2) {
        $path = setCogworksDirectoryPath($orgID) . $userID . '/tmp-resources/' . $resourceFolder;
    } else {
        $path = setCogworksDirectoryPath($orgID) . $orgID . '/users/' . $userID . '/tmp-resources/' . $resourceFolder;
    }
    return $path;
}
function getCogUserFolderPath($id, $container){
    $result = '';
    $obj = $container->projectcog->query("
        select * from users
        where id = '$id';
    ")->fetch(PDO::FETCH_ASSOC);
    $orgID = $obj['organization_id'];
    if($orgID == 1) {
        $result = setCogworksDirectoryPath($orgID) . 'users/' . $id . '/';
    } else if($orgID == 2) {
        $result = setCogworksDirectoryPath($orgID) . $id . '/';
    } else {
        $result = setCogworksDirectoryPath($orgID) . $orgID . '/users/' . $id . '/';
    }
    return $result;
}
function rrmdir($dir)
{
    if (is_dir($dir)) {
        $objects = scandir($dir);
        foreach ($objects as $object) {
            if ($object != "." && $object != "..") {
                if (filetype($dir."/".$object) == "dir") {
                    rrmdir($dir."/".$object); 
                } else {
                    unlink($dir."/".$object);
                }
            }
        }
        reset($objects);
        rmdir($dir);
    }
}
function getUserInfo($id, $container)
{
    $userInfo = null;
    $userID = $id;
    $userInfo = $container->projectcog->query("
        select users.id, users.user, users.firstname, users.lastname, users.middlename,
            users.email, users.username, users.password, users.image, users.address,
            users.country, users.organization_id, organizations.organization,
            users.position_id, positions.position, users.last_login, users.account_id,
            account_types.account_type, allowed_users.allowed_user, users.status_id,
            statues.status, users.updated, users.created
        from users, organizations, positions, accounts, account_types, allowed_users, statues
        where users.id = '$userID' and users.organization_id = organizations.id and
            users.position_id = positions.id and users.account_id = accounts.id and
            accounts.account_type_id = account_types.id and
            accounts.allowed_users_id = allowed_users.id and users.status_id = statues.id
    ")->fetch(PDO::FETCH_ASSOC);

    /* if(is_array($userInfo) && count($userInfo) > 0)
    {
        if($userInfo['organization_id'] == 1)
        {
            $userInfo['superAdmin'] = true;
        }
        else
        {
            $userInfo['superAdmin'] = false;
        }
    }
    else
    {
        $userInfo = null;
    } */

    return $userInfo;
}
function identifyLoggedUser($container)
{
    check_session();
    $userInfo = null;
    $userID = $_SESSION['id'];
    $userInfo = getUserInfo($userID, $container);
    return $userInfo;
}
function custom_redirect($loc) {
    // echo "<script language='javascript'> window.location = '" . $loc . "'</script>";

    // reserve code
    $logPage = ROOT . "dashboard#/login";
    $home = ROOT;
    switch($loc)
    {
        case 'login':
            echo "<script language='javascript'> window.location = '" . $logPage . "'</script>";
            break;
        default:
            echo "<script language='javascript'> window.location = '" . $home . "'</script>";
    }
    exit();
}
function chmodDir($source)
{
    $dir_handle = @opendir($source) or die("fail");
    while ($file = readdir($dir_handle))  {
        if($file!="." && $file!=".." && !is_dir("$source/$file")) //if it is file
        {
            chmod("$source/$file",0777);
        }
        if($file!="." && $file!=".." && is_dir("$source/$file")) //if it is folder
        {
            chmod("$source/$file",0777);
            chmodDir("$source/$file");
        }
    }
    closedir($dir_handle);
}
function copyFilesIndirectory($src,$dst) { 
    $dir = opendir($src); 
    @mkdir($dst); 
    while(false !== ( $file = readdir($dir)) ) { 
        if (( $file != '.' ) && ( $file != '..' )) { 
            if ( is_dir($src . '/' . $file) ) { 
                copyFilesIndirectory($src . '/' . $file,$dst . '/' . $file); 
            } 
            else { 
                copy($src . '/' . $file,$dst . '/' . $file); 
            } 
        } 
    } 
    closedir($dir); 
} 
function copydir($source, $destination)
{
    if(!is_dir($destination)){
        $oldumask = umask(0); 
        mkdir($destination, 01777); // so you get the sticky bit set 
        umask($oldumask);
    }
    $dir_handle = @opendir($source) or die("fail");
    while ($file = readdir($dir_handle))  {
        if($file!="." && $file!=".." && !is_dir("$source/$file")) //if it is file
        {
            copy("$source/$file","$destination/$file");
            chmod("$destination/$file",0777);
        }
        if($file!="." && $file!=".." && is_dir("$source/$file")) //if it is folder
        {
            copydir("$source/$file","$destination/$file");
        }
    }
    closedir($dir_handle);
}
function convertToZip($path, $filename) {
    $rootPath = realpath($path);

    // Initialize archive object
    $zip = new ZipArchive();
    $zip->open($path . $filename .'.zip', ZipArchive::CREATE | ZipArchive::OVERWRITE);

    // Create recursive directory iterator
    /** @var SplFileInfo[] $files */
    $files = new RecursiveIteratorIterator(
        new RecursiveDirectoryIterator($rootPath),
        RecursiveIteratorIterator::LEAVES_ONLY
    );
    
    foreach ($files as $name => $file)
    {
        // Skip directories (they would be added automatically)
        if (!$file->isDir())
        {
            // Get real and relative path for current file
            $filePath = $file->getRealPath();
            $relativePath = substr($filePath, strlen($rootPath) + 1);
            
            echo "filePath - " . $filePath . "\n";
            echo "relativePath - " . $relativePath . "\n";

            // Add current file to archive
            $zip->addFile($filePath, $relativePath) or die ("fail"); //die ("ERROR: Could not add file: $key");
        }
    }

    // Zip archive will be created only after closing object
    $zip->close();
    chmod($path . $filename .'.zip',0777);
}

function check_session() {
    @session_start();
    
    // reserve code 'dashboard'
    if(!isset($_SESSION["logged"])) {
        custom_redirect('login');
    }
}
?>
