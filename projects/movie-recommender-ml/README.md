# Movie Recommender (ML, CLI + Notebook)

## Project Description

This project is a content-based movie recommender. It builds TF‑IDF vectors from movie metadata (genres, keywords, tagline, cast, director) and uses cosine similarity to rank movies that are most similar to a given title. A notebook version is included for exploratory work, and a clean CLI script is included for running locally.

## Features

- Content-based recommendations using TF‑IDF + cosine similarity
- Fuzzy title matching (helps when the input title is slightly misspelled)
- CLI script that runs with either:
  - a real dataset at `data/movies.csv`, or
  - a small built-in sample dataset (no external files required)
- Notebook version for step-by-step exploration

## Technology Stack

- Python
- pandas
- scikit-learn
- Jupyter (optional, for the notebook)

## How to Run the Project

From the repository root:

```bash
cd projects/movie-recommender-ml
pip install -r requirements.txt
```

### Option A: Run the CLI script

```bash
python src/movie_recommendation_system.py
```

To use your own dataset, place `movies.csv` at `data/movies.csv`. The script expects these columns:

- `title`, `genres`, `keywords`, `tagline`, `cast`, `director`

### Option B: Run the notebook

```bash
jupyter notebook notebooks/movie_recommendation_system.ipynb
```

## Example Output or Screenshots

Example CLI output:

```
Enter your favourite movie name: inception
How many recommendations? (default 10): 5

Showing recommendations for: Inception

 1. Interstellar  (41.2%)
 2. The Dark Knight  (28.7%)
 ...
```

## Project Structure (optional)

```
.
├── README.md
├── requirements.txt
├── data/
├── notebooks/
│   └── movie_recommendation_system.ipynb
├── src/
│   └── movie_recommendation_system.py
└── screenshots/
```
