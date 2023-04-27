const fs = require('fs');
const path = require('path');

fs.readdir(
  path.join(__dirname, 'secret-folder'), 
  { withFileTypes: true },
  (err, files) => {
    if (err) throw err;
    files.forEach(file => {
      fs.stat(
        path.join(__dirname, 'secret-folder', file.name), function(err, stats) {
        if (stats.isFile()) {
          const fileName = path.parse(file.name).name;
          const fileSize = stats["size"];
          let fileExtName = path.extname(file.name);

          fileExtName = fileExtName.replace('.', '');

          console.log(fileName + ' - ' + fileExtName + ' - ' + fileSize / 1000 + 'kb');
        }
      });
    })
});
