const movies = require('./movies-data');

// Simple fuzzy search implementation
function fuzzySearch(query, movies) {
  const q = query.toLowerCase();
  return movies
    .map(movie => {
      const titleLower = movie.title.toLowerCase();
      let score = 0;
      
      // Exact match
      if (titleLower === q) score = 0;
      // Starts with
      else if (titleLower.startsWith(q)) score = 0.1;
      // Contains
      else if (titleLower.includes(q)) score = 0.3;
      // Keyword match
      else if (movie.keywords.some(k => k.includes(q))) score = 0.4;
      else score = 1;
      
      return { item: movie, score };
    })
    .filter(r => r.score < 1)
    .sort((a, b) => a.score - b.score);
}

const searchLogs = [];
const MAX_LOGS = 1000;

module.exports = (req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // GET /api/recommend/suggestions
  if (req.method === 'GET') {
    const { q } = req.query;
    if (!q || q.length < 2) return res.json([]);
    
    const results = fuzzySearch(q, movies);
    const uniqueTitles = [...new Set(results.slice(0, 8).map(r => r.item.title))];
    return res.json(uniqueTitles);
  }

  // POST /api/recommend
  if (req.method === 'POST') {
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ error: 'Movie title is required' });
    }

    const results = fuzzySearch(title, movies);
    
    const logEntry = {
      query: title,
      corrected: results.length > 0 ? results[0].item.title : 'None',
      confidenceScore: results.length > 0 ? results[0].score : 1,
      timestamp: new Date().toISOString()
    };
    
    if (searchLogs.length >= MAX_LOGS) searchLogs.shift();
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
      const recommendations = movies
        .filter(m => m.title !== matchedMovie.title)
        .map(movie => {
          let similarity = 0;
          if (movie.genre === matchedMovie.genre) similarity += 35;
          const sharedKeywords = movie.keywords.filter(k => matchedMovie.keywords.includes(k));
          similarity += (sharedKeywords.length / Math.max(matchedMovie.keywords.length, 1)) * 40;
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
      return res.json(createResponse({
        suggestions: results.slice(0, 6).map(r => r.item.title),
        didYouMean: true,
        explanation: `Did you mean one of these movies? Click a suggestion to see recommendations.`
      }));
    }
  }

  res.status(405).json({ error: 'Method not allowed' });
};
