# Flu Near You - V2

#####Important!
You will need to have installed on your machine: 
node.js (https://nodejs.org) and bower (https://bower.io).

## Getting the FNY-V2 in your machine

#####Open your terminal and:

Clone repository

```sh
$ git clone https://github.com/healthmap/flunearyou-v2.git
```

Go to project folder

```sh
$ cd flunearyou-v2
```

```sh
$ git checkout production
```

## Install all modules and dependencies

```sh
$ npm install
```
And then

```sh
$ bower install --save
```

##Run the FNY-V2 in your machine

```sh
$ gulp serve
```

#Sending for Production
##### After your adjustment, you need to do:

```sh
$ npm install && bower install && gulp build && s3cmd --access_key=AKIAIRGBQWR365HFNREA --secret_key=DLkej0KS8WNP5zON3iDEfa+1ltVM8kErUGv/kHEn --no-mime-magic --guess-mime-type --acl-public -v sync ./dist/ s3://flunearyou.org/
```

## Updating branch

```sh
$ git add --all
```

```sh
$ git commit -m "YOUR MESSAGE"
```
```sh
$ git pull healthmap production
```

```sh
$ git push healthmap production
```