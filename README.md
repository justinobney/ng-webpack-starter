# Angular + Webpack Minimal Development Environment (ES6)

### How to run:
1. clone the project
2. run `npm start`
4. navigate to 'localhost/8080'
5. start developing your Angular app with ES6 (javascript 2015)

### what you get?
- Minimal AngularJS development environment which
  loads and bootstrap angular.
- Set of basic loaders includes: Babel, json, css, html, fonts and images.  

### bundle for deploy
- run `npm run bundle` to package your code for deploy
- find it in the `dist` folder

### IMPORTANT NOTE
This project doesn't contains any configuration for code splitting and efficient bundling
for production. (when running `npm run bundle` it will bundle all of your code into one `bundle.js` file).
The main purpose of this project is to get you up and running with your development environment only.
Read more about how to configure webpack for production bundling and make your own choices.  
