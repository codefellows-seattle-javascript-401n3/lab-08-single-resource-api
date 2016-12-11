'use strict';

//parse req.body (this is assumed to be JSON? this is moving across the stream as....whatever is set in the header?)

const parseURL = require('url').parse;
const parseQuery = require('querystring').parse;
