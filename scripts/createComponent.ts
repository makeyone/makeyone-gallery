import fs from 'fs';
import path from 'path';
import url from 'url';

import inquirer from 'inquirer';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const templateDir = path.resolve(__dirname, './templates/component');
const files = fs.readdirSync(templateDir);
const filesData = new Map<string, string>();
const cacheDir = path.resolve(__dirname, './.cache');

files.forEach((file) => {
  const filePath = path.resolve(templateDir, file);
  const fileData = fs.readFileSync(filePath, 'utf8');
  filesData.set(file, fileData);
});

function replaceMyComponent(text: string, name: string) {
  return text.replace(/CreateComponent/g, name);
}

function createComponent(directory: string, componentName: string) {
  const componentDir = path.resolve(directory, componentName);
  if (!fs.existsSync(componentDir)) {
    fs.mkdirSync(componentDir, { recursive: true });
  }

  files.forEach((file) => {
    const fileData = filesData.get(file);
    if (fileData === undefined) return;
    const code = replaceMyComponent(fileData, componentName);
    const newFilePath = path.resolve(componentDir, replaceMyComponent(file, componentName));
    fs.writeFileSync(newFilePath, code);
  });
}

async function main() {
  const { type } = await inquirer.prompt([
    {
      type: 'list',
      name: 'type',
      message: 'Do you want to save in "common components" directory or "in app _components" directory?',
      choices: ['in app _components', 'common components'],
      default: 'in app _components',
    },
  ]);

  let feature = 'sample';
  if (type === 'in app _components') {
    try {
      feature = fs.readFileSync(cacheDir, 'utf8');
    } catch (err) {
      console.error(err);
    }
  }

  const answers = await inquirer.prompt(
    [
      type === 'in app _components'
        ? {
            name: 'feature',
            message: 'Enter feature name',
            default: feature,
          }
        : null,
      {
        name: 'names',
        message: 'Enter component name \x1b[2m(Separate multiple names with space)\x1b[0m',
      },
    ].filter((q) => q !== null),
  );

  const dir =
    type === 'common components'
      ? path.resolve(__dirname, '../src/components')
      : path.resolve(__dirname, `../src/app/${answers.feature}/_components`);

  const names = answers.names.split(' ') as string[];

  names.forEach((name) => {
    if (name.trim() === '') throw new Error('Invalid component name');
    createComponent(dir, name.trim());
  });

  if (type === 'in app _components') {
    fs.writeFileSync(path.resolve(__dirname, './.cache'), answers.feature, 'utf8');
  }
}

main();
