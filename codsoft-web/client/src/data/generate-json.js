// This script converts the movies.js to movies.json
// Run this from the client/src/data directory: node generate-json.js

const fs = require('fs');
const path = require('path');

// Read the movies.js file from server
const moviesPath = path.join(__dirname, '../../../server/data/movies.js');
const movies = require(moviesPath);

// Write to JSON
const outputPath = path.join(__dirname, 'movies.json');
fs.writeFileSync(outputPath, JSON.stringify(movies, null, 2), 'utf8');

console.log(`✅ Successfully converted ${movies.length} movies to JSON!`);
console.log(`📁 File saved to: ${outputPath}`);
