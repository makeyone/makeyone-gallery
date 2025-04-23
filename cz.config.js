const chalk = require('chalk');

const padLabel = (label, length = 10) => {
  const padLength = length - label.length;
  return label + ' '.repeat(padLength > 0 ? padLength : 0);
};

module.exports = {
  types: [
    { value: 'feat', name: `${chalk.green(padLabel('[feat]'))} Add a new feature` },
    { value: 'fix', name: `${chalk.red(padLabel('[fix]'))} Fix a bug or issue` },
    { value: 'design', name: `${chalk.cyan(padLabel('[design]'))} Update UI design` },
    { value: 'style', name: `${chalk.yellow(padLabel('[style]'))} Code style changes (no logic changes)` },
    { value: 'refactor', name: `${chalk.magenta(padLabel('[refactor]'))} Refactor code (no feature changes)` },
    { value: 'test', name: `${chalk.blue(padLabel('[test]'))} Add or update tests` },
    { value: 'rename', name: `${chalk.gray(padLabel('[rename]'))} Rename a file or folder` },
    { value: 'move', name: `${chalk.gray(padLabel('[move]'))} Move a file or folder` },
    { value: 'remove', name: `${chalk.gray(padLabel('[remove]'))} Delete a file or folder` },
    { value: 'docs', name: `${chalk.white(padLabel('[docs]'))} Update documentation or i18n files` },
    { value: 'chore', name: `${chalk.white(padLabel('[chore]'))} Build system or dependency changes` },
  ],
  allowCustomScopes: false,
  skipQuestions: ['body'],
  subjectLimit: 100,
};