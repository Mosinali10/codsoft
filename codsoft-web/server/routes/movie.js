const express = require('express');
const router = express.Router();
const Fuse = require('fuse.js');

const movies = [
  // ── Sci-Fi ──
  { title: "Inception", genre: "Sci-Fi", year: 2010, keywords: ["dreams", "reality", "heist", "mind-bending"] },
  { title: "Interstellar", genre: "Sci-Fi", year: 2014, keywords: ["space", "time-travel", "father-daughter", "wormhole"] },
  { title: "The Matrix", genre: "Sci-Fi", year: 1999, keywords: ["simulation", "technology", "action", "dystopia"] },
  { title: "Avatar", genre: "Sci-Fi", year: 2009, keywords: ["aliens", "nature", "war", "colonialism"] },
  { title: "The Martian", genre: "Sci-Fi", year: 2015, keywords: ["survival", "mars", "science", "astronaut"] },
  { title: "Gravity", genre: "Sci-Fi", year: 2013, keywords: ["space", "survival", "astronaut", "isolation"] },
  { title: "Ex Machina", genre: "Sci-Fi", year: 2014, keywords: ["AI", "robot", "consciousness", "thriller"] },
  { title: "Arrival", genre: "Sci-Fi", year: 2016, keywords: ["aliens", "language", "time", "first-contact"] },
  { title: "Blade Runner 2049", genre: "Sci-Fi", year: 2017, keywords: ["dystopia", "AI", "identity", "noir"] },
  { title: "Blade Runner", genre: "Sci-Fi", year: 1982, keywords: ["dystopia", "AI", "android", "noir"] },
  { title: "2001: A Space Odyssey", genre: "Sci-Fi", year: 1968, keywords: ["space", "AI", "evolution", "mind-bending"] },
  { title: "Dune", genre: "Sci-Fi", year: 2021, keywords: ["desert", "politics", "chosen-one", "epic"] },
  { title: "Minority Report", genre: "Sci-Fi", year: 2002, keywords: ["future", "crime", "surveillance", "police"] },
  { title: "Elysium", genre: "Sci-Fi", year: 2013, keywords: ["dystopia", "class-struggle", "robots", "future"] },
  { title: "Wall-E", genre: "Animation", year: 2008, keywords: ["robots", "environment", "love", "space"] },

  // ── Action / Superhero ──
  { title: "The Dark Knight", genre: "Action", year: 2008, keywords: ["superhero", "joker", "justice", "batman"] },
  { title: "Gladiator", genre: "Action", year: 2000, keywords: ["rome", "revenge", "historical", "epic"] },
  { title: "Avengers: Endgame", genre: "Action", year: 2019, keywords: ["superheroes", "team", "marvel", "time-travel"] },
  { title: "Avengers", genre: "Action", year: 2012, keywords: ["superheroes", "team", "marvel", "action"] },
  { title: "Mad Max: Fury Road", genre: "Action", year: 2015, keywords: ["dystopia", "chase", "survival", "post-apocalyptic"] },
  { title: "John Wick", genre: "Action", year: 2014, keywords: ["assassin", "revenge", "hitman", "guns"] },
  { title: "Mission: Impossible – Fallout", genre: "Action", year: 2018, keywords: ["spy", "heist", "chase", "twists"] },
  { title: "Die Hard", genre: "Action", year: 1988, keywords: ["hostage", "cop", "explosive", "christmas"] },
  { title: "Top Gun: Maverick", genre: "Action", year: 2022, keywords: ["military", "pilot", "jets", "legacy"] },
  { title: "Spider-Man: No Way Home", genre: "Action", year: 2021, keywords: ["superhero", "marvel", "multiverse", "spider-man"] },
  { title: "Black Panther", genre: "Action", year: 2018, keywords: ["superhero", "africa", "king", "marvel"] },
  { title: "Iron Man", genre: "Action", year: 2008, keywords: ["superhero", "technology", "billionaire", "marvel"] },
  { title: "Captain America: Civil War", genre: "Action", year: 2016, keywords: ["superheroes", "conflict", "marvel", "war"] },

  // ── Drama ──
  { title: "Fight Club", genre: "Drama", year: 1999, keywords: ["anarchy", "split-personality", "underground", "twist"] },
  { title: "The Prestige", genre: "Drama", year: 2006, keywords: ["magic", "rivalry", "twists", "obsession"] },
  { title: "Parasite", genre: "Drama", year: 2019, keywords: ["class-struggle", "social", "thriller", "korean"] },
  { title: "The Shawshank Redemption", genre: "Drama", year: 1994, keywords: ["prison", "hope", "friendship", "escape"] },
  { title: "Memento", genre: "Drama", year: 2000, keywords: ["memory", "nonlinear", "mystery", "identity"] },
  { title: "Schindler's List", genre: "Drama", year: 1993, keywords: ["war", "holocaust", "heroism", "historical"] },
  { title: "Forrest Gump", genre: "Drama", year: 1994, keywords: ["life", "history", "love", "inspirational"] },
  { title: "The Green Mile", genre: "Drama", year: 1999, keywords: ["prison", "supernatural", "justice", "death-row"] },
  { title: "Good Will Hunting", genre: "Drama", year: 1997, keywords: ["genius", "therapy", "self-discovery", "friendship"] },
  { title: "A Beautiful Mind", genre: "Drama", year: 2001, keywords: ["math", "genius", "mental-illness", "biography"] },
  { title: "Whiplash", genre: "Drama", year: 2014, keywords: ["music", "ambition", "obsession", "pressure"] },
  { title: "La La Land", genre: "Drama", year: 2016, keywords: ["music", "dreams", "romance", "los-angeles"] },
  { title: "The Revenant", genre: "Drama", year: 2015, keywords: ["survival", "revenge", "wilderness", "bear"] },
  { title: "12 Years a Slave", genre: "Drama", year: 2013, keywords: ["slavery", "historical", "freedom", "injustice"] },
  { title: "American History X", genre: "Drama", year: 1998, keywords: ["racism", "redemption", "gangs", "family"] },
  { title: "Requiem for a Dream", genre: "Drama", year: 2000, keywords: ["addiction", "dark", "dreams", "drugs"] },

  // ── Crime & Thriller ──
  { title: "The Godfather", genre: "Crime", year: 1972, keywords: ["mafia", "family", "loyalty", "power"] },
  { title: "Pulp Fiction", genre: "Crime", year: 1994, keywords: ["violence", "nonlinear", "cult", "dialogue"] },
  { title: "Goodfellas", genre: "Crime", year: 1990, keywords: ["mafia", "rise-and-fall", "gangster", "money"] },
  { title: "The Godfather Part II", genre: "Crime", year: 1974, keywords: ["mafia", "power", "family", "loyalty"] },
  { title: "The Silence of the Lambs", genre: "Thriller", year: 1991, keywords: ["serial-killer", "psychological", "FBI", "horror"] },
  { title: "Se7en", genre: "Thriller", year: 1995, keywords: ["serial-killer", "dark", "detective", "sins"] },
  { title: "Zodiac", genre: "Thriller", year: 2007, keywords: ["serial-killer", "investigation", "true-crime", "obsession"] },
  { title: "Gone Girl", genre: "Thriller", year: 2014, keywords: ["marriage", "mystery", "twist", "psychological"] },
  { title: "Prisoners", genre: "Thriller", year: 2013, keywords: ["kidnapping", "father", "detective", "dark"] },
  { title: "Knives Out", genre: "Thriller", year: 2019, keywords: ["murder-mystery", "family", "detective", "whodunit"] },
  { title: "No Country for Old Men", genre: "Thriller", year: 2007, keywords: ["violence", "fate", "cat-and-mouse", "dark"] },
  { title: "Oldboy", genre: "Thriller", year: 2003, keywords: ["revenge", "mystery", "twist", "korean"] },
  { title: "Memento", genre: "Thriller", year: 2000, keywords: ["memory", "nonlinear", "mystery", "revenge"] },

  // ── Horror ──
  { title: "The Shining", genre: "Horror", year: 1980, keywords: ["haunted", "isolation", "psychological", "hotel"] },
  { title: "Get Out", genre: "Horror", year: 2017, keywords: ["racism", "psychological", "social-horror", "twist"] },
  { title: "Hereditary", genre: "Horror", year: 2018, keywords: ["family", "grief", "occult", "disturbing"] },
  { title: "A Quiet Place", genre: "Horror", year: 2018, keywords: ["survival", "family", "silence", "monsters"] },
  { title: "It", genre: "Horror", year: 2017, keywords: ["clown", "children", "fear", "supernatural"] },
  { title: "The Conjuring", genre: "Horror", year: 2013, keywords: ["haunted", "supernatural", "family", "ghost"] },
  { title: "Us", genre: "Horror", year: 2019, keywords: ["doppelganger", "psychological", "identity", "social"] },

  // ── Comedy ──
  { title: "The Grand Budapest Hotel", genre: "Comedy", year: 2014, keywords: ["quirky", "art", "mystery", "europe"] },
  { title: "Superbad", genre: "Comedy", year: 2007, keywords: ["high-school", "friendship", "coming-of-age", "party"] },
  { title: "The Big Lebowski", genre: "Comedy", year: 1998, keywords: ["cult", "mystery", "quirky", "bowling"] },
  { title: "Bridesmaids", genre: "Comedy", year: 2011, keywords: ["friendship", "wedding", "women", "humor"] },
  { title: "Groundhog Day", genre: "Comedy", year: 1993, keywords: ["time-loop", "romance", "self-improvement", "humor"] },
  { title: "The Truman Show", genre: "Comedy", year: 1998, keywords: ["reality-tv", "surveillance", "identity", "twist"] },

  // ── Animation ──
  { title: "Spirited Away", genre: "Animation", year: 2001, keywords: ["fantasy", "japanese", "coming-of-age", "spirits"] },
  { title: "The Lion King", genre: "Animation", year: 1994, keywords: ["family", "royalty", "africa", "loss"] },
  { title: "Toy Story", genre: "Animation", year: 1995, keywords: ["friendship", "toys", "adventure", "coming-of-age"] },
  { title: "Up", genre: "Animation", year: 2009, keywords: ["adventure", "loss", "friendship", "flying"] },
  { title: "Inside Out", genre: "Animation", year: 2015, keywords: ["emotions", "psychology", "coming-of-age", "mind"] },
  { title: "Coco", genre: "Animation", year: 2017, keywords: ["family", "music", "mexico", "afterlife"] },
  { title: "Finding Nemo", genre: "Animation", year: 2003, keywords: ["ocean", "family", "friendship", "adventure"] },

  // ── Romance ──
  { title: "Titanic", genre: "Romance", year: 1997, keywords: ["disaster", "ship", "tragic", "love"] },
  { title: "Eternal Sunshine of the Spotless Mind", genre: "Romance", year: 2004, keywords: ["memory", "love", "mind-bending", "breakup"] },
  { title: "Her", genre: "Romance", year: 2013, keywords: ["AI", "love", "loneliness", "future"] },
  { title: "The Notebook", genre: "Romance", year: 2004, keywords: ["love", "memory", "tragic", "class"] },
  { title: "Atonement", genre: "Romance", year: 2007, keywords: ["war", "love", "tragedy", "regret"] },

  // ── Fantasy / Adventure ──
  { title: "The Lord of the Rings: The Fellowship of the Ring", genre: "Fantasy", year: 2001, keywords: ["epic", "quest", "magic", "friendship"] },
  { title: "The Lord of the Rings: The Return of the King", genre: "Fantasy", year: 2003, keywords: ["epic", "battle", "magic", "war"] },
  { title: "Harry Potter and the Philosopher's Stone", genre: "Fantasy", year: 2001, keywords: ["magic", "school", "friendship", "wizards"] },
  { title: "Pirates of the Caribbean", genre: "Adventure", year: 2003, keywords: ["pirates", "sea", "adventure", "cursed"] },
  { title: "Indiana Jones: Raiders of the Lost Ark", genre: "Adventure", year: 1981, keywords: ["archaeology", "adventure", "treasure", "historical"] },
  { title: "The Wizard of Oz", genre: "Fantasy", year: 1939, keywords: ["classic", "magic", "friendship", "journey"] },
  { title: "Pan's Labyrinth", genre: "Fantasy", year: 2006, keywords: ["war", "dark-fantasy", "fairy-tale", "spanish"] },

  // ── Biography / History ──
  { title: "The Social Network", genre: "Drama", year: 2010, keywords: ["tech", "betrayal", "startup", "facebook"] },
  { title: "Bohemian Rhapsody", genre: "Drama", year: 2018, keywords: ["music", "queen", "biography", "freddie-mercury"] },
  { title: "The Imitation Game", genre: "Drama", year: 2014, keywords: ["war", "codebreaking", "genius", "turing"] },
  { title: "Oppenheimer", genre: "Drama", year: 2023, keywords: ["war", "nuclear", "science", "biography"] },
];

const searchLogs = [];

const fuse = new Fuse(movies, {
  keys: ['title'],
  includeScore: true,
  threshold: 0.45 
});

// New Suggestions Endpoint
router.get('/suggestions', (req, res) => {
  const { q } = req.query;
  if (!q || q.length < 2) return res.json([]);
  
  const results = fuse.search(q);
  res.json(results.slice(0, 5).map(r => r.item.title));
});

router.post('/', (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Movie title is required' });
  }

  const results = fuse.search(title);
  
  // Log search internally
  const logEntry = {
    query: title,
    corrected: results.length > 0 ? results[0].item.title : 'None',
    confidenceScore: results.length > 0 ? results[0].score : 1,
    timestamp: new Date().toISOString()
  };
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
    return res.json(createResponse({
      recommendations: movies.slice(0, 3).map(m => ({ ...m, similarity: 50 }))
    }));
  }

  const bestMatch = results[0];
  const score = bestMatch.score;
  const matchedMovie = bestMatch.item;

  if (score < 0.4) {
    // Smart recommendation scoring
    const recommendations = movies
      .filter(m => m.title !== matchedMovie.title)
      .map(movie => {
        let similarity = 0;
        
        // Genre match (40%)
        if (movie.genre === matchedMovie.genre) similarity += 40;
        
        // Keywords match (30%)
        const sharedKeywords = movie.keywords.filter(k => matchedMovie.keywords.includes(k));
        similarity += (sharedKeywords.length / Math.max(matchedMovie.keywords.length, 1)) * 30;
        
        // Era match (30%) - within 10 years
        const yearDiff = Math.abs(movie.year - matchedMovie.year);
        if (yearDiff <= 10) similarity += (1 - yearDiff / 10) * 30;

        return { ...movie, similarity: Math.round(similarity) };
      })
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, 5);

    const explanation = `Because you searched for ${matchedMovie.title}, here are movies with similar ${matchedMovie.genre} themes.`;

    return res.json(createResponse({
      correctedTitle: matchedMovie.title,
      confidenceScore: (1 - score).toFixed(2),
      didYouMean: score > 0.1,
      selectedMovie: matchedMovie,
      suggestions: results.slice(0, 5).map(r => r.item.title),
      recommendations: recommendations,
      explanation: explanation
    }));
  } else {
    return res.json(createResponse({
      suggestions: results.slice(0, 5).map(r => r.item.title),
      didYouMean: true
    }));
  }
});

module.exports = router;
