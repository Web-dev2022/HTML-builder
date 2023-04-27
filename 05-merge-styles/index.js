const fs = require('fs');
const path = require('path');

fs.writeFile(
  path.join(__dirname, 'project-dist', 'bundle.css'), '',
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
        if (stats.isFile() && path.extname(file) == '.css') {
          fs.readFile(
            path.join(__dirname, 'styles', file),
            'utf-8',
            (err, data) => {
                if (err) throw err;
                fs.appendFile(
                  path.join(__dirname, 'project-dist', 'bundle.css'),
                  data,
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


