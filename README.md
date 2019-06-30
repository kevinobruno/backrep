# Backrep

## Description

Record and play your backend HTTP requests to make your e2e (end-to-end) 
tests easily reproducible in CI/CD environment.

## Motivation

The idea behind this library is to record all your backend responses, for all requests, 
during your local e2e tests development. This way, you can easily save these records and
use it in your CI/CD environment with a simple docker container running an express server
instead of your whole backend api/services/databases.

## Installation
```bash
$ npm install backrep
```

## Usage

```javascript
const express = require('express');
const app = express();
const yourLocalBackendUrl = 'http://localhost:3009';

const backrep = require('backrep')(yourLocalBackendUrl);

app.use(express.json());
app.use(backrep);
app.listen(4000);
```

That's it! Now just change your client to communicate with the server running on port `4000`,
the first time a request is made, it's going to proxy through your local backend and store 
the response on `records` folder, the next time the request is made with the same parameteres 
and body, the response in the file will be returned.

Basically it's a contract with the client side and this server, every time a request is
made with same parameteres and/or body, that response will be returned, so your e2e tests will 
always have the same results.

Note that this approach works with any kind of clients, React websites, React Native apps, etc.

## Docker

If your backend uses docker containers, make sure to see [docker example](examples/docker).

It's important to note that with the docker container implementation, you can make a 
repository with the backrep server plus the records that you've taped, and just up the
container in your CI/CD environment that is running the e2e tests.

## License
MIT
