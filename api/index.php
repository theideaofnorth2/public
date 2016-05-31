<?php

// Adaptation of http://stackoverflow.com/questions/4987551/parse-directory-structure-strings-to-json-using-php

function ReadFolderDirectory($dir,$listDir= array())
{
    $listDir = array();
    if($handler = opendir($dir))
    {
        while (($sub = readdir($handler)) !== FALSE)
        {
            if ($sub != "." && $sub != ".." && $sub != "Thumb.db")
            {
                if(is_file($dir."/".$sub))
                {
                    $listDir[] = $sub;
                } elseif(is_dir($dir."/".$sub)) {
                    $listDir[][$sub] = ReadFolderDirectory($dir."/".$sub);
                }
            }
        }
        closedir($handler);
    }
    return $listDir;
}

$config = json_decode(file_get_contents('./config.json'));
$config->assets = ReadFolderDirectory("../assets");

echo json_encode($config);

?>
