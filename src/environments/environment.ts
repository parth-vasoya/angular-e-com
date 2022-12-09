// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyD8IcSjLo2QrBM1YO7AeYgD3BVoPetK7jY",
    authDomain: "e-commerce-ebf06.firebaseapp.com",
    databaseURL: "https://e-commerce-ebf06-default-rtdb.firebaseio.com",
    projectId: "e-commerce-ebf06",
    storageBucket: "e-commerce-ebf06.appspot.com",
    messagingSenderId: "637842488757",
    appId: "1:637842488757:web:004d513771232d5f502dfc"
  },
  signUpUrl: 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD8IcSjLo2QrBM1YO7AeYgD3BVoPetK7jY',
  signInUrl: 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD8IcSjLo2QrBM1YO7AeYgD3BVoPetK7jY',
  updatePwdUrl: 'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyD8IcSjLo2QrBM1YO7AeYgD3BVoPetK7jY'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
