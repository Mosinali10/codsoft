const express = require('express');
const router = express.Router();
const Fuse = require('fuse.js');
const movies = require('../data/movies');

const searchLogs = [];
const MAX_LOGS = 1000; // Prevent memory leak

const fuse = new Fuse(movies, {
  keys: ['title', 'keywords'],
  includeScore: true,
  threshold: 0.4, // Fuzzy match threshold for typo tolerance
  useExtendedSearch: true
});

// Suggestions Endpoint
router.get('/suggestions', (req, res) => {
  const { q } = req.query;
  if (!q || q.length < 2) return res.json([]);
  
  const results = fuse.search(q);
  const uniqueTitles = [...new Set(results.slice(0, 8).map(r => r.item.title))];
  res.json(uniqueTitles);
});

router.post('/', (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Movie title is required' });
  }

  const results = fuse.search(title);
  
  // Log search internally with size limit
  const logEntry = {
    query: title,
    corrected: results.length > 0 ? results[0].item.title : 'None',
    confidenceScore: results.length > 0 ? results[0].score : 1,
    timestamp: new Date().toISOString()
  };
  
  // Prevent memory leak by limiting log size
  if (searchLogs.length >= MAX_LOGS) {
    searchLogs.shift(); // Remove oldest entry
  }
  searchLogs.push(logEntry);

  const createResponse = (overrides = {}) => ({
    query: title,
    correctedTitle: null,
    confidenceScore: 0,
    didYouMean: false,
    suggestions: [],
    recommendations: [],
    explanation: "",
    ...overrides
  });

  if (results.length === 0) {
    // No match found - show popular movies
    const popularMovies = movies
      .filter(m => m.year >= 2010)
      .sort((a, b) => b.year - a.year)
      .slice(0, 6)
      .map(m => ({ ...m, similarity: 45 }));
    
    return res.json(createResponse({
      recommendations: popularMovies,
      explanation: "We couldn't find that movie. Here are some popular recent films you might enjoy!"
    }));
  }

  const bestMatch = results[0];
  const score = bestMatch.score;
  const matchedMovie = bestMatch.item;

  if (score < 0.5) {
    // Good match - generate smart recommendations
    const recommendations = movies
      .filter(m => m.title !== matchedMovie.title)
      .map(movie => {
        let similarity = 0;
        
        // Genre match (35%)
        if (movie.genre === matchedMovie.genre) similarity += 35;
        
        // Keywords match (40%)
        const sharedKeywords = movie.keywords.filter(k => matchedMovie.keywords.includes(k));
        similarity += (sharedKeywords.length / Math.max(matchedMovie.keywords.length, 1)) * 40;
        
        // Era match (25%) - within 8 years
        const yearDiff = Math.abs(movie.year - matchedMovie.year);
        if (yearDiff <= 8) similarity += (1 - yearDiff / 8) * 25;

        return { ...movie, similarity: Math.round(similarity) };
      })
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, 6);

    const topKeywords = matchedMovie.keywords.slice(0, 3).join(', ');
    const explanation = `Based on "${matchedMovie.title}" (${matchedMovie.year}), we found ${matchedMovie.genre} films with similar themes: ${topKeywords}.`;

    return res.json(createResponse({
      correctedTitle: matchedMovie.title,
      confidenceScore: (1 - score).toFixed(2),
      didYouMean: score > 0.15,
      selectedMovie: matchedMovie,
      suggestions: results.slice(0, 6).map(r => r.item.title),
      recommendations: recommendations,
      explanation: explanation
    }));
  } else {
    // Weak match - show suggestions
    return res.json(createResponse({
      suggestions: results.slice(0, 6).map(r => r.item.title),
      didYouMean: true,
      explanation: `Did you mean one of these movies? Click a suggestion to see recommendations.`
    }));
  }
});

module.exports = router;
