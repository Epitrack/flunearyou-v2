<?php

class Catrina {
  public $grunt_files;
  public $dev = FALSE;

  public function __construct() {
    $this->grunt_files = $this->readGruntConfig();
  }

  private function readGruntConfig() {
    $json_data = file_get_contents('grunt-config.json');
    $files = json_decode($json_data, true);
    return $files['uglify']['dist']['files'];
  }

  public function writeScripts() {
    if($this->dev === FALSE) {
      $files = array_keys($this->grunt_files);
    } else {
      $libs = $this->grunt_files['dist/js/libs.min.js'];
      $scripts = $this->grunt_files['dist/js/scripts.min.js'];
      $files = array_merge($libs, $scripts);
    }


    foreach($files as $file) {
      echo '<script src="'.$file.'"></script>'."\n";
    }
  }
}

?>
