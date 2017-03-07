# Meangular

Full-stack solution based on Mean Stack JS (readme documentation included below) and Angular-cli.

Out-of-the-box features:
* Authentication and Authorization
* Blog functionality
* Optional social login using Google Oauth2

## Demo
[Try it live](http://meangular.herokuapp.com)

## Notes
Angular (2+) files found in `/client/src`.

To use Google Oauth2 authentication flow for login/signup, set the client id, client secret, and redirect url in the `/configs/environments/*.js` file(s) you will be using or set them as environment variables on `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, and `GOOGLE_REDIRECT_URL` before running the app. If this information is not present, the Google login/signup links will result in a 404. If login through google is not being used these links can be deleted. 

```bash
# Start in development mode and watch for changes on server and frontend
# using nodemon and angular-cli. 
npm start

# Start browser-sync
npm run browser-sync

# Run frontend and backend unit tests, e2e tests, and linting
npm test

# Build production frontend files and run e2e tests
npm run e2e

# Run e2e dev mode (assumes frontend files built and in /client/dist)
npm run e2e:dev

# Run frontend tests
./node_modules/bin/ng test

# Build frontend files in production mode and then run server in production mode
npm run start:production
```





# Mean Stack JS Documentation


Why Mean Stack JS
-----------------

The best developers want to be efficient and productive, quickly prototyping and experimenting, able to build successes into production-ready applications. We believe Mean Stack JS gives developers of all skill levels—whether at enterprise scale or working solo—an ideal open-source toolset for building rapid, scalable Javascript applications. We'll provide you a simple project structure that is versatile enough to quickly apply to your own development projects. Want to get started?


How to Learn Mean Stack JS
-----------------
Start learning with documentation:
* [Check Documentation Here](https://github.com/greenpioneersolutions/meanstackjs/wiki)

Start visualizing what the meanstack can do for you with our demo
* [Check Demo Here](https://meanstackjs.herokuapp.com/)

Check out this YouTube channel that has content to help you:
* [Subscribe to our Youtube Channel - MeanStackJs](https://www.youtube.com/channel/UC5lpSv5tNowgWxC9crTl97g)
* [Watch MeanStackJS - Releases](https://www.youtube.com/playlist?list=PLhJ-Q2setTdrhK1m0F1lUfZsIzBbw6wny)
* [Watch MeanStackJS - How to series](https://www.youtube.com/playlist?list=PLhJ-Q2setTdqgwW6U39s_oMAehgtXa15O)
* [Watch MeanStackJS - Error series](https://www.youtube.com/playlist?list=PLhJ-Q2setTdr19ha6bx7jt6Bu2RCM5c5_)
* [Watch MeanStackJS - What is series](https://www.youtube.com/playlist?list=PLhJ-Q2setTdpkHfA-mDMSjl4Wv-trKlY8)

For more control or something more basic, start here instead:
* [Lite Version](https://github.com/greenpioneersolutions/meanstackjs-lite)

For the Api version, start here instead:
* [Men Version](https://github.com/greenpioneersolutions/menstackjs)

Want more content?
* [LiveCoding.TV](https://www.livecoding.tv/greenpioneer/)
* [GPS Style Guide](https://github.com/greenpioneersolutions/gps-style-guide)
* [GPS Setup Guide](https://github.com/greenpioneersolutions/gps-setup-guide)
* [Roadmap](https://github.com/greenpioneersolutions/meanstackjs/wiki/Roadmap)

What is Mean Stack JS?
-----------------

- [MongoDB](https://www.mongodb.org/) - MongoDB is the leading NoSQL database, empowering businesses to be more agile and scalable
- [Express](http://expressjs.com/) - Express is a minimal and flexible node.js web application framework, providing a robust set of features for building single and multi-page, and hybrid web applications
- [AngularJS](https://angularjs.org/) - based framework. -AngularJS lets you extend HTML vocabulary for your application. The resulting environment is extraordinarily expressive, readable, and quick to develop
- [Node.js](http://www.nodejs.org/) - Node.js is a platform built on Chrome's JavaScript runtime for easily building fast, scalable network applications

[Check Demo Here](https://meanstackjs.herokuapp.com/)

[Check Documentation Here](https://github.com/greenpioneersolutions/meanstackjs/wiki)

Pre-Requisites
-------------

- <img src="https://www.mongodb.com/assets/global/favicon-bf23af61025ab0705dc84c3315c67e402d30ed0cba66caff15de0d57974d58ff.ico" height="17">&nbsp; [Download](https://www.mongodb.org/downloads) and Install mongodb - <a href="https://docs.mongodb.org/manual/">Checkout their manual</a> if you're just starting
  - <img src="http://deluge-torrent.org/images/apple-logo.gif" height="17">&nbsp; [OSX MongoDB](https://docs.mongodb.org/manual/tutorial/install-mongodb-on-os-x/)
  - <img src="http://dc942d419843af05523b-ff74ae13537a01be6cfec5927837dcfe.r14.cf1.rackcdn.com/wp-content/uploads/windows-8-50x50.jpg" height="17">&nbsp; [Windows Mongodb](https://docs.mongodb.org/manual/tutorial/install-mongodb-on-windows/)
  - <img src="https://lh5.googleusercontent.com/-2YS1ceHWyys/AAAAAAAAAAI/AAAAAAAAAAc/0LCb_tsTvmU/s46-c-k/photo.jpg" height="17">&nbsp; [Linux Mongodb](https://docs.mongodb.org/manual/administration/install-on-linux/)
- <img src="https://nodejs.org/static/apple-touch-icon.png" height="17">&nbsp; [Download](http://nodejs.org) and Install Node.js  - nodeschool has free <a href=" http://nodeschool.io/#workshoppers">node tutorials</a> to get you started


[Check Documentation Here](https://github.com/greenpioneersolutions/meanstackjs/wiki)

[Check Demo Here](https://meanstackjs.herokuapp.com/)

Getting Started
---------------

The easiest way to get started is to clone the repository:

```bash
# Get the latest snapshot
git clone https://github.com/greenpioneersolutions/meanstackjs.git

# Change directory
cd meanstackjs

# Install NPM dependencies
npm install

# Start up the server
npm start
# or
node index.js
```

[Check Documentation Here](https://github.com/greenpioneersolutions/meanstackjs/wiki)

[Check Demo Here](https://meanstackjs.herokuapp.com/)

[Check Roadmap Here](https://github.com/greenpioneersolutions/meanstackjs/wiki/Roadmap)

[express]: <http://expressjs.com>
[AngularJS]: <http://angularjs.org>
[node.js]: <http://nodejs.org>
[license]: http://showalicense.com/?fullname=Green%20Pioneer%20%3Cgreen%40greenpioneersolutions.com%3E&year=2016#license-mit
[website]: http://greenpioneersolutions.com/


<div align="center">
  <img src="http://greenpioneersolutions.com/img/icons/apple-icon-180x180.png"><br>
  <a href="https://www.facebook.com/Green-Pioneer-Solutions-1023752974341910">
    <img src="https://greenpioneer.github.io/images/social-1_square-facebook.svg">
  </a>
  <a href="https://twitter.com/greenpioneerdev">
    <img src="https://greenpioneer.github.io/images/social-1_logo-twitter.svg">
  </a>
  <a href="https://github.com/greenpioneersolutions">
    <img src="https://greenpioneer.github.io/images/social-1_logo-github.svg">
  </a>
  <a href="http://greenpioneersolutions.com/">
    <img src="https://greenpioneer.github.io/images/social-1_logo-blogger.svg">
  </a>
 </div>


[MIT][license] © [Green Pioneer][website]


