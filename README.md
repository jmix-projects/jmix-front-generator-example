# Custom jmix front generator 

This project is an example of creating and usage custom generator for jmix frontend.
Generator creates screen with bar chart and add it to app frontend module. 
Note that chart required extra dependencies that will not be added automatically by a generator. 
If app doesn't contain `@nivo/core @nivo/bar` in `package.json`, dependencies should be installed via npm 
```bash
npm install @nivo/core @nivo/bar
```

# Build 

```bash
npm run build
```
After build, generator `react-typescript:charts` will be available in `dist` folder and could be 
used in `gen-jmix-front` by passing folder as argument
```bash
npx gen-jmix-front --custom-generator-paths jmix-generator-example/dist
```


# Usage in jmix project

Note that all commands below should be executed in `fontend` module folder of jmix-project.

* install `react-typescript:charts` generator
```bash
npm install @haulmont/jmix-generator-example --prefix generation --save-dev
```

* generate `chart` screen, type `Chart` as component name and menu item answers 
```bash
node generation/node_modules/@haulmont/jmix-front-generator/bin/gen-jmix-front.js react-typescript:charts --custom-generator-paths generation/node_modules/@haulmont/jmix-generator-example/dist --model generation/projectModel.json --dest src/app --dirShift ../

```

* install nivo charts deps in app if they are not installed yet
```bash
npm install @nivo/core @nivo/bar
```

Start fronted app. Chart screen will be available at [http://localhost:3000/chart](http://localhost:3000/chart)
