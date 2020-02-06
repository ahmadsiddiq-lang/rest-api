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

# Releases
https://nodejs.org/download/release/

# Testing

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

# Guide
https://expressjs.com/en/guide/routing.html

# Routing
Routing refers to how an application’s endpoints (URIs) respond to client requests. For an introduction to routing, [see Basic routing](https://expressjs.com/en/starter/basic-routing.html).


# Install Express

```console
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

# What Is REST

REST is acronym for REpresentational State Transfer. It is architectural style for distributed hypermedia systems and was first presented by Roy Fielding in 2000 in his famous dissertation.

Like any other architectural style, REST also does have it’s own 6 guiding constraints which must be satisfied if an interface needs to be referred as RESTful. These principles are listed below. https://restfulapi.net/



## Install modul

```console
$ npm install dotenv
```
```console
$ npm install -g nodemon
```
```console
$ npm install body-parser
```
```console
$ npm install --save mysql
```
```console
$ npm install --save multer
```
```console
$ npm install jsonwebtoken
```
```console
$ npm install bcrypt-nodejs
```

# Fiture in this program

<!-- * [CRUD Product](#crud_product)
* [CRUD Category](#crud_category)
* [File Upload](#file_upload) -->

## CRUD Product
`localhost:8080/api/v1/product`
## CRUD Category
`localhost:8080/api/v1/category`
## File Upload
`localhost:8080/api/v1/product/insert`
## Add/Reduce Product Order
`localhost:8080/api/v1/product/cart/2`
`localhost:8080/api/v1/product/order/2`
## Search Product by name
`localhost:8080/api/v1/product/search/leno`
## Sort product by name, category, date updated
`localhost:8080/api/v1/product/sort/name`
## Pagination
`localhost:8080/api/v1/product/pagination/2`
## Cannot reduce Order below 0 (-1, -5, etc)
`localhost:8080/api/v1/product/cart/2`
## Allowed CORS
```nodejs
const cors = require('cors');
app.use(cors());
```
## Login/Register with JWT
`localhost:8080/api/v1/product/login`
`localhost:8080/api/v1/product/register`




### by:
[ahmad siddiq](https://www.instagram.com/ahmad.sq/)
