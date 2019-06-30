const express = require('express');
const app = express();

const yourLocalBackendUrl = `http://${process.env.CONTAINER_NAME}:${process.env.CONTAINER_PORT}`;
 
const backrep = require('backrep')(yourLocalBackendUrl);
 
app.use(express.json());
app.use(backrep);
app.listen(process.env.PORT);
