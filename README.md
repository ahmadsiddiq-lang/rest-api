<p align="center">
  <a href="https://nodejs.org/">
    <img
      alt="Node.js"
      src="https://nodejs.org/static/images/logo-light.svg"
      width="400"
    />
  </a>
</p>

Node.js is an open-source, cross-platform, JavaScript runtime environment. It
executes JavaScript code outside of a browser. For more information on using
Node.js, see the [Node.js Website][].

The Node.js project uses an [open governance model](./GOVERNANCE.md). The
[OpenJS Foundation][] provides support for the project.

## Download
Binaries, installers, and source tarballs are available at https://nodejs.org/en/download/.

## Releases
https://nodejs.org/download/release/

### Testing

```console
$ node 'filename.js'
```

## Express JS

<p align="center">
  <a href="https://expressjs.com/">
    <img
      alt="expressjs.com"
      src="https://github.com/ahmadsiddiq-lang/rest-api/blob/master/upload/express.PNG"
      width="450"
    />
  </a>
</p>

## Guide
https://expressjs.com/en/guide/routing.html

## Routing
Routing refers to how an application’s endpoints (URIs) respond to client requests. For an introduction to routing, [see Basic routing](https://expressjs.com/en/starter/basic-routing.html).


#### Install Express

```nodejs
$ npm install express
```

## RESTful API

<p align="center">
  <a href="https://restfulapi.net/">
    <img
      alt="restfulapi.net"
      src="https://github.com/ahmadsiddiq-lang/rest-api/blob/master/upload/restful_api.jpg"
      width="400"
    />
  </a>
</p>

### What Is REST

REST is acronym for REpresentational State Transfer. It is architectural style for distributed hypermedia systems and was first presented by Roy Fielding in 2000 in his famous dissertation.

Like any other architectural style, REST also does have it’s own 6 guiding constraints which must be satisfied if an interface needs to be referred as RESTful. These principles are listed below. https://restfulapi.net/

#

## Install the module to run this program

```nodejs
$ npm install dotenv
```
```nodejs
$ npm install -g nodemon
```
```nodejs
$ npm install body-parser
```
```nodejs
$ npm install --save mysql
```
```nodejs
$ npm install --save multer
```
```nodejs
$ npm install jsonwebtoken
```
```nodejs
$ npm install bcrypt-nodejs
```
#
### Require module

```nodejs
const express = require('express');
const app = express();
```
#
## Fiture in this program


#### CRUD Product
#### CRUD Category
#### File Upload
#### Add/Reduce Product Order
#### Search Product by name
#### Sort product by name, category, date updated
#### Pagination
#### Cannot reduce Order below 0 (-1, -5, etc)
#### Allowed CORS
#### Login/Register with JWT(jsonwebtoken)

#

### SERVER :
```nodejs

require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var cors = require('cors');
const port = process.env.SERVER_PORT;

app.use(cors());
app.use('/upload', express.static('./upload'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


const router = require('./src/routers/index.js');

app.use('/api/v1', router);
app.listen(port, (req, res)=>{
    console.log(`App Listen port ${port}`)
})

```

### Test

```nodejs
localhost:8080/api/v1/product
```



#### createby:
* [ahmadsiddiq](https://www.instagram.com/ahmad.sq/)