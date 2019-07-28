// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  //urlSpring: 'https://sheap.herokuapp.com/rest',
  urlSpring: 'http://167.86.118.44:8080/rest',
  urlAuth: 'http://167.86.118.44:8080',
  //urlAuth: 'http://localhost:8080',
  //urlSpring: 'http://localhost:8080/rest',
  
  //urlAuth: 'https://sheap.herokuapp.com',
  
  urlS3: 'https://s3-sa-east-1.amazonaws.com/sheap-bucket'
};
