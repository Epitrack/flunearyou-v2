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
$ cd fny-dashboard
```

Run npm to to install Grunt and all dependencies

```sh
npm install
```

Install packages with bower

```shf
bower install

Note: select Angular 1.3.13 and jquery 2.1.3 for fny_dashboard at prompt).  May need to hit CTRL C if it hangs after last choice.
```
Run grunt to start dev server

```sh
grunt dev
```


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
