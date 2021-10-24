const fs = require('fs');
const path = require('path');

const validateType = (types, type) => {
  if (!types.includes(type)) {
    throw new Error(`Incorrect type '${type}'! Check your config file`);
  }
};

const validateName = name => {
  if (!name) {
    throw new Error('Name can`t be empty')
  }
}

const kebabize = str => {
  return str.split('').map((letter, idx) => {
    return letter.toUpperCase() === letter
     ? `${idx !== 0 ? '-' : ''}${letter.toLowerCase()}`
     : letter;
  }).join('');
}

const replaceName = (data, name, styleName, styleImportsName) => {
  switch (true) {
    case data.includes('%name%'): return data.replace(/%name%/g, name);
    case data.includes('%style-name%'): return data.replace(/%style-name%/g, styleName);
    case styleImportsName && data.includes('%style-imports-name%'):
      return data.replace(/%style-imports-name%/g, styleImportsName);
    case !styleImportsName && data.includes('%style-imports-name%'): return '';
    default: return data;
  }
}

const getFileStringData = (fileData, name, styleName, styleImportsName) => {
  let data = '';
  Object.keys(fileData).forEach(segment => {
    let temp = '';
    fileData[segment].forEach(item => {
      const replacedString = replaceName(item, name, styleName, styleImportsName);
      temp = replacedString === '' ? temp : `${temp}${replacedString}\n`;
    });
    data = temp === '' ? data : `${data}${temp}\n`;
  });
  return data.slice(0, -1);
}

const createFiles = (files, pathName, name, styleImportsName, needIndex, indexName, indexData) => {
  const styleName = kebabize(name);
  Object.keys(files).forEach(ext => {
    fs.writeFile(
      path.join(pathName, `${name}.${ext}`),
      getFileStringData(files[ext], name, styleName, styleImportsName),
      (err) => { if (err) console.log(err); }
    )
  })
  if (needIndex && indexData) {
    const indexStringData = indexData.reduce((data, current) => `${data}${replaceName(current, name)}\n`, '');
    fs.writeFile(
      path.join(pathName, indexName),
      indexStringData,
      (err) => { if (err) console.log(err); }
    )
  }
}

function gen (config, type, name, styleImportsName) {
  const types = Object.keys(config);
  validateType(types, type);
  validateName(name);

  const currentPath = path.resolve(process.cwd());
  fs.mkdirSync(path.join(currentPath, name));

  const componentPath = path.join(currentPath, name);
  
  createFiles(
    config[type].files,
    componentPath,
    name,
    styleImportsName,
    config[type].includeIndex,
    config[type].indexData.filename,
    config[type].indexData.data,
  )

  console.log(name)
  
}

module.exports = gen;