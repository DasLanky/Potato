# Potato
#####Simple HTTP-enabled file hosting webserver with user database
Coded in Node.js Express using Pug/Jade for HTML and Stylus for CSS

##Installation

#####Linux

Install required packages (assuming root):
```
apt-get install git
apt-get install nodejs-legacy
```

Clone the repository:
```
cd ./path/to/projects/folder
git clone https://github.com/DasLanky/Potato.git
```

Install Potato dependencies:
```
cd ./path/to/Potato
npm install
```

##Running Potato webserver

#####Linux

Configure Potato:
```
cd ./path/to/Potato
gedit potato.json
<Change "port" value to an open port>
<Change "path" value to the absolute base directory for your files>
<Change "userdb" value to the absolute path of the user database>
```

Run Potato:
```
node bin/potato-init.js
```
