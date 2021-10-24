const fs = require('fs');
const path = require('path');

function getConfig (appPath) {
  const manualConfigPath = path.join(appPath, 'gerco.config.json')
  let configPath = fs.existsSync(manualConfigPath)
    ? manualConfigPath
    : path.join(__dirname, 'default-config.json')
  return JSON.parse(fs.readFileSync(configPath).toString());
};

module.exports = getConfig;