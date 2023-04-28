const fs = require('fs');
const path = require('path');

fs.access(
  path.join(__dirname, 'project-dist'),
  err => {
    if (!err) {
      fs.rmdir(
        path.join(__dirname, 'project-dist'),
        { recursive: true },
        err => {
          if (err) throw err
          core();
      });
    } else {
      core();
    }
});

function makeFolderProjectDist() {
  fs.mkdir(
    path.join(__dirname, 'project-dist'),
    err => {
      if (err) throw err;
  });
}

function createFileIndex() {
  fs.readFile(
    path.join(__dirname, 'template.html'),
    'utf-8',
    (err, dataTemplate) => {
        if (err) throw err;
        fs.readdir(
          path.join(__dirname, 'components'), 
          (err, files) => {
            if (err) throw err;
            files.forEach(file => {
              fs.readFile(
                path.join(__dirname, 'components', file),
                'utf-8',
                (err, dataFile) => {
                  if (err) throw err;
                  tagName = '{{' + path.parse(file).name + '}}'
                  dataTemplate = dataTemplate.replace(tagName, dataFile);
                  fs.writeFile(
                    path.join(__dirname, 'project-dist', 'index.html'),
                    dataTemplate,
                    (err) => {
                      if (err) throw err;
                    }
                  );
                }
              );  
            });
        });
      }
  );
}

function createFileStyle () {

  fs.writeFile(
    path.join(__dirname, 'project-dist', 'style.css'), '',
    (err) => {
        if (err) throw err;
    }
  );

  fs.readdir(
    path.join(__dirname, 'styles'), 
    (err, files) => {
      if (err) throw err;
      files.forEach(file => {
        fs.stat(
          path.join(__dirname, 'styles', file), function(err, stats) {
          if (err) throw err;
          if (stats.isFile() && path.extname(file) == '.css') {
            fs.readFile(
              path.join(__dirname, 'styles', file),
              'utf-8',
              (err, data) => {
                  if (err) throw err;
                  fs.appendFile(
                    path.join(__dirname, 'project-dist', 'style.css'),
                    data + '\n',
                    err => {
                        if (err) throw err;
                    }
                );
              }
            );
          }
        });
      })
  });
}

function copyFolderAssets() {
  const pathOne = 'project-dist';
  let pathTwo = '';
  let folderName = 'assets';

  makeFolder(pathOne, pathTwo, folderName);
  
  fs.readdir(
    path.join(__dirname, 'assets'), 
    (err, files) => {
      if (err) throw err;
      pathTwo = 'assets';
      files.forEach(file => {
        if (file !== '.DS_Store') {
          folderName = file;
          makeFolder(pathOne, pathTwo, folderName);
          copyFiles(folderName);
        }
      });
  });
}

function makeFolder(pathOne, pathTwo, folderName) {
  fs.mkdir(
    path.join(__dirname, pathOne, pathTwo, folderName),
    err => {
      if (err) throw err;
  });
}

function copyFiles(folderName) {
  fs.readdir(
    path.join(__dirname, 'assets', folderName), 
    (err, files) => {
      if (err) throw err;
      files.forEach(file => {
        fs.copyFile(path.join(__dirname, 'assets', folderName, file), path.join(__dirname, 'project-dist', 'assets', folderName, file), (err) => {
          if (err) throw err;
        });
      });
  });
}

function core() {
  makeFolderProjectDist();
  createFileIndex();
  createFileStyle();
  copyFolderAssets();
}