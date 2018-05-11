const packageJson = require('../../package.json');

export const environment = {
  appName: 'Ent Assist',
  envName: 'PROD',
  production: true,
  versions: {
    app: packageJson.version,
    angular: packageJson.dependencies['@angular/core'],
    ngrx: packageJson.dependencies['@ngrx/store'],
    material: packageJson.dependencies['@angular/material'],
    bootstrap: packageJson.dependencies.bootstrap,
    rxjs: packageJson.dependencies.rxjs,
    angularCli: packageJson.devDependencies['@angular/cli'],
    typescript: packageJson.devDependencies['typescript']
  },
  firebaseConfig: {
    apiKey: "AIzaSyA9pr-EL3QoNSumlMSGQUXK5SHFf2qqhmU",
    authDomain: "ent-assist.firebaseapp.com",
    databaseURL: "https://ent-assist.firebaseio.com",
    projectId: "ent-assist",
    storageBucket: "ent-assist.appspot.com",
    messagingSenderId: "869832178255"
  }
};
