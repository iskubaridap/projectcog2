<?php
/* 
    'mtb' stands for 'main-tool-backend'. i made it that way to prevent me to type
    the entire name and also differentiate this to any custom functions
 */
function mtbTest(){
    echo 'foobar';
}
function mtbGetCogfilePath($id, $container){
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
            $result = setCogworksDirectoryPath($orgID) . $id . '/projects/' . $projID . '.cog';
        } else {
            $result = setCogworksDirectoryPath($orgID) . $orgID . '/projects/' . $projID . '/' . $id . '.cog';
        }
    }
    
    return $result;
}
function mtbGetUserFolderPath($id, $container){
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
?>