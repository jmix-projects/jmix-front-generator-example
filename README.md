# Custom jmix front generator

This project is an example of creating and usage custom generator for jmix frontend. Generator can create screens with bar chart, line chart or pie chart and add it to app frontend module. Note that generated screens required extra dependencies that will not be added automatically by a generator. If app doesn't contain `@haulmont/jmix-addon-charts` in `package.json`, dependencies should be installed via npm

```bash
npm install @haulmont/jmix-addon-charts
```

# Build

```bash
npm run build
```
After build, generators: `react-typescript:bar-chart`, `react-typescript:line-chart`, `react-typescript:pie-chart` will be available in `dist` folder and could be used in `gen-jmix-front` by passing folder to `custom-generator-paths` argument
```bash
npx gen-jmix-front react-typescript:bar-chart --custom-generator-paths jmix-front-generator-example/dist
```


# Usage in jmix project

Note that all commands below should be executed in `fontend` module folder of jmix-project.

* install generator
```bash
npm install @haulmont/jmix-generator-example --prefix generation --save-dev
```

* generate `line-chart` screen, type `LineChart` as component name and menu item answers
```bash
node generation/node_modules/@haulmont/jmix-front-generator/bin/gen-jmix-front.js react-typescript:line-chart --custom-generator-paths generation/node_modules/@haulmont/jmix-generator-example/dist --model generation/projectModel.json --dest src/app --dirShift ../

```

* install charts deps in app if they are not installed yet
```bash
npm install @haulmont/jmix-addon-charts
```

Start fronted app. Chart screen will be available at [http://localhost:3000/chart](http://localhost:3000/chart)
