const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;

fs.writeFile(
  path.join(__dirname, 'text.txt'), '',
  (err) => {
  if (err) throw err;
  }
);

stdout.write('Здравствуйте, введите текст\n');

stdin.on('data', data => {
  const exit = Buffer.from('exit\n', 'utf-8');
  if (data.toString() === exit.toString()) process.exit();
  fs.appendFile(
    path.join(__dirname, 'text.txt'),
    data,
    err => {
      if (err) throw err;
    }
  );
});

process.on('exit', () => stdout.write('\nСпасибо, желаем удачи!\n'));

process.on('SIGINT', () => process.exit());