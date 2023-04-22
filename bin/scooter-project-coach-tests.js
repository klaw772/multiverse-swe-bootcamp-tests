#!/usr/bin/env node
const fs = require('fs');
console.log(__dirname);

// destination will be created or overwritten by default.
fs.cp('node_modules/multiverse-swe-bootcamp-tests/scooter-project-coach-tests', 'scooter-project-coach-tests', { recursive: true }, (err) => {
  if (err) throw err;
  console.log('File was copied to destination');
});