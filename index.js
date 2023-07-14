const glob = require('glob');
const linkCheck = require('npm-link-check');
const execa = require('execa');
const yargs = require('yargs');

const argv = yargs
  .usage('Usage: linker <command> [options]')
  .command('clone <repo>', 'Clone the GitHub repository')
  .command('link <package>', 'Link the specified package')
  .command('update <package>', 'Update the package from GitHub and link it')
  .option('u', {
    alias: 'update',
    describe: 'Update the package from GitHub and link it',
    type: 'string',
  })
  .demandCommand()
  .help()
  .argv;

function cloneRepo(repo) {
  execa.commandSync(`git clone ${repo} source`);
  console.log('Repository cloned successfully.');
}

function linkPackage(packageName) {
  execa.commandSync('npm link', { cwd: `./source/${packageName}` });
  console.log('Package linked successfully.');
}

function updatePackage(packageName) {
  execa.commandSync('git pull', { cwd: `./source/${packageName}` });
  execa.commandSync('npm link', { cwd: `./source/${packageName}` });
  console.log('Package updated and linked successfully.');
}

if (argv._[0] === 'clone') {
  const repo = argv._[1];
  cloneRepo(repo);
} else if (argv._[0] === 'link') {
  const packageName = argv._[1];
  linkPackage(packageName);
} else if (argv._[0] === 'update') {
  const packageName = argv._[1];
  updatePackage(packageName);
}
