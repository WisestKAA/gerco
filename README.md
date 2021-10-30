# Gerco

CLI tool for creating React component files

---

# Fast start

## Installation 

Gerco requires [Node.js](https://nodejs.org/) v13+ to run.

The package can be installed via [npm](https://github.com/npm/cli)

```sh
npm i gerco --save-dev
```

## Usage

```sh
cd ./src/components
npx gerco gen -t component -n MyComponent -sin Desktop
```

### Options

| Name | Alias | Description |
|------|-------|-------------|
| -type | -t | type of component from config file |
| -name | -n | component's name |
| -style-import-name | -sin | the name or part of the name imported into the style file (optional)

## Configuration

You can use [default configuration](https://github.com/WisestKAA/gerco/blob/main/lib/default-config.json) or create your own

### Config file rules
- the config file must be located in the root directory of the application;
- the config file must be named `gerco.config.json`;
- structure of config file:
```json
{
    "[type-name]": {
        "files": {
            "[file-extension]": {
                "[part-name]": [
                    "[code]",
                    ...
                    "[code]"
                ]
            },
            ...
            "[file-extension]": { ... }
        },
        "includeIndex": [boolean],
        "indexData": {
            "filename": "index.js", 
            "data": [
                "[code]",
                ...
                "[code]"
            ]
        }
    },
    ...
    "[type-name]": { ... }
}
```
- `[file-extension]` may contain part of the name separated by `.`. For example, converting from `Types.ts` to` MyComponentTypes.ts` if the component name is `MyComponent`
- variables
-- `%name%` - component's name
-- `%style-name%` - style name. generated from component's name from camelCase to kebab-case. For example converting  from `TestComponent` to `.test-component`
-- `%style-imports-name%` - the name or part of the name imported into the style file (optional)
- example
```json
{
  "component": {
    "files": {
      "jsx": {
        "imports": [
          "import React from 'react';",
          "import block from 'bem-cn';",
          "import PT from 'prop-types';"
        ],
        "style-imports": [
          "import './%name%.scss';"
        ],
        "constants": [
          "const b = block('%style-name%');"
        ],
        "main": [
          "const %name% = () => {};"
        ],
        "additional": [
          "%name%.propTypes = {};"
        ],
        "export": [
          "export default %name%;"
        ]
      },
      "scss": {
        "imports": [
          "@import 'shared/style/var%style-imports-name%.scss';"
        ],
        "main": [
          ".%style-name% {}"
        ]
      }
    },
    "includeIndex": true,
    "indexData": {
      "filename": "index.js", 
      "data": [
        "import %name% from './%name%';",
        "export default %name%;"
      ]
    } 
  }
}
```

---
# Powred by
[**Yargs**](https://github.com/yargs/yargs)

## License

MIT
