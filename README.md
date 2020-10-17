# Pox

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.6.

Electron wrapper provided in `/electron`

## Requirements
* node
* angular CLI
    * `npm install -g @angular/cli`
* tsc
    * `npm install -g typescript`

## Build
`npm run build`
### Angular
`npm run build:angular`
### Electron
`npm run build:electron`

## Development server
`npm run build`
### Angular 
Run `npm start:angular` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Electron
Run `npm run start:electron` to run electron app that loads angular dev server

## Release
`npm run package`
* TODO Loads packaged angular instead of dev server

---

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
