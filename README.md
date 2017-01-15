
# Sails Angular Material Starter App

a [Sails](http://sailsjs.org) application

## Requirements:
0. Node Package Manager (https://nodejs.org/en/)
 * If running OS X or Linux, try NVM (https://github.com/creationix/nvm)
0. Ruby (for SASS)
 * `sudo apt-get install ruby-full`
0. MongoDB (for session management)
 * If running Ubuntu 14.04 use https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-ubuntu-14-04
 * If running Ubuntu 16.04 use https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-ubuntu-16-04
0. SailsJS
 * `npm install -g sails`
0. Bower
 * `npm install -g bower`
0. SASS
 * `gem install sass`

## Install
0. Clone the repository:
0. Run `npm install`
0. Run `bower install`

## Run

0. Run `sails lift` for development on port 1337
0. Open a browser, go to http://localhost:1337

## Configure
* Run a global find and replace for `SailsAngularMaterialStarter` and replace with your project name.
* Add the following to `config/local.js` to configure the default admin account:
```javascript
module.exports = {
        permissions: {
                adminUsername: 'admin',
                adminEmail: 'admin@email.com',
                adminPassword: 'admin1234'
        }
};

```
