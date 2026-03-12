# Movie Dataset

## Overview
Comprehensive movie database with 300+ popular films across multiple genres.

## Statistics
- **Total Movies**: 300+
- **Genres**: 10 (Sci-Fi, Action, Drama, Crime, Thriller, Horror, Comedy, Animation, Romance, Fantasy/Adventure)
- **Year Range**: 1939 - 2024
- **Keywords**: 4-6 per movie for smart recommendations

## Genre Breakdown
- **Sci-Fi**: 50 movies (Inception, Interstellar, The Matrix, Avatar, Dune, etc.)
- **Action/Superhero**: 60 movies (Marvel, DC, John Wick, Mission Impossible, etc.)
- **Drama**: 50 movies (Shawshank Redemption, Parasite, Oppenheimer, etc.)
- **Crime & Thriller**: 40 movies (Godfather, Pulp Fiction, Se7en, Gone Girl, etc.)
- **Horror**: 30 movies (The Shining, Get Out, A Quiet Place, Hereditary, etc.)
- **Comedy**: 30 movies (Grand Budapest Hotel, Superbad, The Hangover, etc.)
- **Animation**: 30 movies (Pixar, Disney, Studio Ghibli, etc.)
- **Romance**: 20 movies (Titanic, The Notebook, Pride and Prejudice, etc.)
- **Fantasy/Adventure**: 30 movies (LOTR, Harry Potter, Pirates of Caribbean, etc.)

## Features
- **Smart Recommendations**: Based on genre (35%), keywords (40%), and era (25%)
- **Fuzzy Search**: Handles typos and partial matches
- **Auto-suggestions**: Real-time search suggestions as you type
- **Rich Metadata**: Title, genre, year, and thematic keywords for each film

## Recommendation Algorithm
1. **Genre Matching** (35%): Prioritizes movies from the same genre
2. **Keyword Similarity** (40%): Matches thematic elements and plot keywords
3. **Era Proximity** (25%): Considers release year (within 8 years)

## Usage
The dataset is used by the Movie Recommender API to provide intelligent film suggestions based on user input.
