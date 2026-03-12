const fs = require('fs');
const movies = require('./server/data/movies.js');

// Write movies to JSON file
fs.writeFileSync(
  './client/src/data/movies.json',
  JSON.stringify(movies, null, 2),
  'utf8'
);

console.log(`Successfully converted ${movies.length} movies to JSON format!`);
console.log('File created at: ./client/src/data/movies.json');
