#!/usr/bin/env node
const fs = require('fs');
console.log('hello');

// destination will be created or overwritten by default.
fs.copyFile('../scooter-project-coach-tests', '../..', (err) => {
  if (err) throw err;
  console.log('File was copied to destination');
});