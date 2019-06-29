const express = require('express');
const app = express();

const backrep = require('backrep')('http://localhost:3009');

app.use(express.json());
app.use(backrep);
app.listen(4000);
