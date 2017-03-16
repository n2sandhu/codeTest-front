## Install dependencies:

```
npm install
bower install
```

## Installing
```js
npm install -g grunt-cli bower
```

## Running
```js
grunt serve
```

## Building for production
```js
grunt build
```

## System Assumptions

1. There are only two employee levels in organisation setup.
2. An employee who does not have a valid manager OR an employee with no manager is not a valid employee

## Project structure

Lets start, by introducing the folder structure of the project.

We have few importants  folder to mention, and they shouldnt be moved unless necessary (GruntJS tasks will fail):

1. js - main javascript folder for all related javascript stuff
  * src - code written by developers, used by Grunt to process
  * build - code processed by GruntJS ( dont edit anything there !)
2. libs - main folder for 3-party javascript libraries such as jQuery or Bootstrap, Angular etc
3. views - place where all html tempalate files goes
4. styles - place for styles
  * less - all less files that are going to be proccessed by GruntJS goes here
  * css - files created by GruntJS

## GruntJS tasks

Now, lets go to GruntJS tasks.

Right now we have one main grunt task that combines all the usefull tools to develop our application. When you type:

```js
grunt serve
```

thats whats happening under the hood:

1. Grunt calls Bower and download all javascript libraries to the libs/vendor directory
2. Grunt takes all developer written javascript files from js directory, creates controllers.js etc and puts them inside the js/build folder
3. Grunt compiles less files inside the styles/less directory and outputs css file to styles/css
4. Grunt launches web browser with application deployed on Connect.js
5. Grunt goes into background mode, listens for any changes made in the code by developer, rebuild the application, and refreshes active browser window

```js
grunt build
```

