const fs = require('fs');
const path = require('path');
const dirPath = path.join(__dirname, 'files-copy')

function copyDir () {
  fs.access(dirPath, err => {
      if (!err) {
        deleteFolder();
      } else {
        makeFolder();
        copyFiles ();
      }
  });
}

function deleteFolder() {
  fs.rmdir(dirPath, { recursive: true }, err => {
    if (err) {
      throw err
    }
    makeFolder();
    copyFiles ();
  })
}

function makeFolder() {
  fs.mkdir(dirPath, err => {
    if (err) throw err;
  });
}

function copyFiles () {
  fs.readdir(
    path.join(__dirname, 'files'), 
    { withFileTypes: true },
    (err, files) => {
      if (err) throw err;
      files.forEach(file => {
        fs.copyFile(path.join(__dirname, 'files', file.name), path.join(__dirname, 'files-copy', file.name), (err) => {
          if (err) throw err;
        });
      });
      console.log('All files was copied');
  });
}

copyDir ();

