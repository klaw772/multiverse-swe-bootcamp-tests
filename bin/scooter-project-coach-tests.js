#!/usr/bin/env node
const fs = require('fs');
console.log(__dirname);

// destination will be created or overwritten by default.
fs.cp('../scooter-project-coach-tests', '../..', { recursive: true }, (err) => {
  if (err) throw err;
  console.log('File was copied to destination');
});