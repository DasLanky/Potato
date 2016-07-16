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
gedit potato.properties
<Change "Port" to an open port>
<Change "Path" to the absolute base directory for your files>
```

Run Potato:
```
node bin/potato-init.js
```
