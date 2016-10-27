# Flu Near You - V2

#####Important!
You will need to have installed on your machine: 
node.js (https://nodejs.org) and bower (https://bower.io).

## Getting the FNY-V2 in your machine

#####Opne your terminal and:

Clone repository

```sh
$ git clone https://github.com/healthmap/flunearyou-v2.git
```

Go to project folder

```sh
$ cd flunearyou-v2
```

##Install all modules and dependencies

```sh
$ npm install
```
And then

```sh
$ bower install --save

##Run the FNY-V2 in your machine

```sh
$ gulp serve


From web browser connect to local server at [http://127.0.0.1:1337](http://127.0.0.1:1337)


## Production

Before compiling assets for production, run all tests

```sh
grunt test
```


Minified source code to create production assets

```sh
grunt minified
```


Copy icons

```sh
grunt copy-icons
```

Code is ready to be deployed on production server


## More information

Go to [wiki](https://github.com/healthmap/fny-dashboard/wiki) for more information


## Deployment

Only authorized users can deploy to the FNY dashboard ( http://dashboard.flunearyou.org ) using Deploybot (https://deploybot.com/ ).

FNY dashboard deployment status: [![Deployment status from DeployBot](https://boston-childrens-hosptial.deploybot.com/badge/34534836067950/87987.svg)](http://deploybot.com)
