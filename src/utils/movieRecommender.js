// Client-side Movie Recommendation Engine
import moviesData from '../data/movies.json';

/**
 * Calculate similarity score between two movies
 * @param {Object} movie1 - First movie
 * @param {Object} movie2 - Second movie
 * @returns {number} - Similarity score (0-100)
 */
export function calculateSimilarity(movie1, movie2) {
  let similarity = 0;
  
  // Genre match (35%)
  if (movie1.genre === movie2.genre) {
    similarity += 35;
  }
  
  // Keywords match (40%)
  const sharedKeywords = movie1.keywords.filter(k => 
    movie2.keywords.includes(k)
  );
  const keywordScore = (sharedKeywords.length / Math.max(movie1.keywords.length, 1)) * 40;
  similarity += keywordScore;
  
  // Era match (25%) - within 8 years
  const yearDiff = Math.abs(movie1.year - movie2.year);
  if (yearDiff <= 8) {
    similarity += (1 - yearDiff / 8) * 25;
  }
  
  return Math.round(similarity);
}

/**
 * Fuzzy search for movie titles
 * @param {string} query - Search query
 * @param {Array} movies - Array of movies
 * @returns {Array} - Matching movies with scores
 */
export function fuzzySearch(query, movies = moviesData) {
  const lowerQuery = query.toLowerCase().trim();
  
  if (!lowerQuery) return [];
  
  const results = movies.map(movie => {
    const lowerTitle = movie.title.toLowerCase();
    let score = 0;
    
    // Exact match
    if (lowerTitle === lowerQuery) {
      score = 1.0;
    }
    // Starts with query
    else if (lowerTitle.startsWith(lowerQuery)) {
      score = 0.9;
    }
    // Contains query
    else if (lowerTitle.includes(lowerQuery)) {
      score = 0.7;
    }
    // Word match
    else {
      const titleWords = lowerTitle.split(/\s+/);
      const queryWords = lowerQuery.split(/\s+/);
      
      const matchingWords = queryWords.filter(qw =>
        titleWords.some(tw => tw.includes(qw) || qw.includes(tw))
      );
      
      if (matchingWords.length > 0) {
        score = (matchingWords.length / queryWords.length) * 0.6;
      }
    }
    
    // Keyword match
    const keywordMatch = movie.keywords.some(k => 
      k.toLowerCase().includes(lowerQuery) || lowerQuery.includes(k.toLowerCase())
    );
    if (keywordMatch && score < 0.5) {
      score = 0.5;
    }
    
    return { movie, score };
  })
  .filter(result => result.score > 0)
  .sort((a, b) => b.score - a.score);
  
  return results;
}

/**
 * Get movie recommendations based on a title
 * @param {string} title - Movie title to base recommendations on
 * @param {number} limit - Number of recommendations to return
 * @returns {Object} - Recommendation results
 */
export function getRecommendations(title, limit = 6) {
  // Search for the movie
  const searchResults = fuzzySearch(title);
  
  if (searchResults.length === 0) {
    // No match found - return popular recent movies
    const popularMovies = moviesData
      .filter(m => m.year >= 2010)
      .sort((a, b) => b.year - a.year)
      .slice(0, limit)
      .map(m => ({ ...m, similarity: 45 }));
    
    return {
      query: title,
      found: false,
      selectedMovie: null,
      recommendations: popularMovies,
      suggestions: [],
      explanation: "We couldn't find that movie. Here are some popular recent films you might enjoy!"
    };
  }
  
  const bestMatch = searchResults[0];
  const matchedMovie = bestMatch.movie;
  const matchScore = bestMatch.score;
  
  // If match is weak, return suggestions
  if (matchScore < 0.5) {
    return {
      query: title,
      found: false,
      selectedMovie: null,
      recommendations: [],
      suggestions: searchResults.slice(0, 6).map(r => r.movie.title),
      explanation: "Did you mean one of these movies? Click a suggestion to see recommendations."
    };
  }
  
  // Good match - generate recommendations
  const recommendations = moviesData
    .filter(m => m.title !== matchedMovie.title)
    .map(movie => ({
      ...movie,
      similarity: calculateSimilarity(matchedMovie, movie)
    }))
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, limit);
  
  const topKeywords = matchedMovie.keywords.slice(0, 3).join(', ');
  const explanation = `Based on "${matchedMovie.title}" (${matchedMovie.year}), we found ${matchedMovie.genre} films with similar themes: ${topKeywords}.`;
  
  return {
    query: title,
    found: true,
    selectedMovie: matchedMovie,
    recommendations,
    suggestions: searchResults.slice(0, 6).map(r => r.movie.title),
    explanation,
    confidenceScore: matchScore.toFixed(2)
  };
}

/**
 * Get autocomplete suggestions
 * @param {string} query - Search query
 * @param {number} limit - Number of suggestions
 * @returns {Array} - Array of movie titles
 */
export function getAutocompleteSuggestions(query, limit = 8) {
  if (!query || query.length < 2) return [];
  
  const results = fuzzySearch(query);
  return results.slice(0, limit).map(r => r.movie.title);
}

export default {
  calculateSimilarity,
  fuzzySearch,
  getRecommendations,
  getAutocompleteSuggestions,
  movies: moviesData
};
