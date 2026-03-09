#!/usr/bin/env python3
import sys
from pathlib import Path

import difflib
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


REQUIRED_COLUMNS = ["title", "genres", "keywords", "tagline", "cast", "director"]


def _load_movies_csv(csv_path: Path) -> pd.DataFrame | None:
    if not csv_path.exists():
        return None

    df = pd.read_csv(csv_path)

    missing = [c for c in REQUIRED_COLUMNS if c not in df.columns]
    if missing:
        raise ValueError(
            f"CSV at {csv_path} is missing required columns: {', '.join(missing)}"
        )

    df = df[REQUIRED_COLUMNS].copy()
    for c in REQUIRED_COLUMNS:
        df[c] = df[c].fillna("").astype(str)
    return df


def _sample_movies() -> pd.DataFrame:
    movies = [
        {
            "title": "Avatar",
            "genres": "Action Adventure Fantasy Science Fiction",
            "keywords": "culture clash future space war space colony",
            "tagline": "Enter the World of Pandora.",
            "cast": "Sam Worthington Zoe Saldana Sigourney Weaver",
            "director": "James Cameron",
        },
        {
            "title": "The Dark Knight",
            "genres": "Action Crime Drama Thriller",
            "keywords": "dc comics crime fighter terrorist secret identity",
            "tagline": "Why So Serious?",
            "cast": "Christian Bale Heath Ledger Aaron Eckhart",
            "director": "Christopher Nolan",
        },
        {
            "title": "Inception",
            "genres": "Action Science Fiction Thriller",
            "keywords": "dream subconscious heist",
            "tagline": "Your mind is the scene of the crime.",
            "cast": "Leonardo DiCaprio Joseph Gordon-Levitt Elliot Page",
            "director": "Christopher Nolan",
        },
        {
            "title": "Interstellar",
            "genres": "Adventure Drama Science Fiction",
            "keywords": "artificial intelligence space travel wormhole",
            "tagline": "Mankind was born on Earth. It was never meant to die here.",
            "cast": "Matthew McConaughey Anne Hathaway Jessica Chastain",
            "director": "Christopher Nolan",
        },
        {
            "title": "The Matrix",
            "genres": "Action Science Fiction",
            "keywords": "artificial intelligence dystopia reality",
            "tagline": "Welcome to the Real World.",
            "cast": "Keanu Reeves Laurence Fishburne Carrie-Anne Moss",
            "director": "Lana Wachowski Lilly Wachowski",
        },
        {
            "title": "Titanic",
            "genres": "Drama Romance",
            "keywords": "ship iceberg love story",
            "tagline": "Nothing on Earth could come between them.",
            "cast": "Leonardo DiCaprio Kate Winslet Billy Zane",
            "director": "James Cameron",
        },
        {
            "title": "The Avengers",
            "genres": "Action Adventure Science Fiction",
            "keywords": "marvel superhero team",
            "tagline": "Some assembly required.",
            "cast": "Robert Downey Jr. Chris Evans Scarlett Johansson",
            "director": "Joss Whedon",
        },
        {
            "title": "Jurassic Park",
            "genres": "Adventure Science Fiction Thriller",
            "keywords": "dinosaur theme park",
            "tagline": "An adventure 65 million years in the making.",
            "cast": "Sam Neill Laura Dern Jeff Goldblum",
            "director": "Steven Spielberg",
        },
        {
            "title": "Star Wars",
            "genres": "Adventure Action Science Fiction",
            "keywords": "space opera rebellion",
            "tagline": "A long time ago in a galaxy far, far away...",
            "cast": "Mark Hamill Harrison Ford Carrie Fisher",
            "director": "George Lucas",
        },
        {
            "title": "The Godfather",
            "genres": "Crime Drama",
            "keywords": "mafia family loyalty",
            "tagline": "An offer you can't refuse.",
            "cast": "Marlon Brando Al Pacino James Caan",
            "director": "Francis Ford Coppola",
        },
    ]
    return pd.DataFrame(movies)


def _build_similarity(df: pd.DataFrame):
    combined = (
        df["genres"]
        + " "
        + df["keywords"]
        + " "
        + df["tagline"]
        + " "
        + df["cast"]
        + " "
        + df["director"]
    )
    vectorizer = TfidfVectorizer(stop_words="english")
    vectors = vectorizer.fit_transform(combined)
    similarity = cosine_similarity(vectors)
    return similarity


def recommend(df: pd.DataFrame, similarity, movie_name: str, top_n: int):
    titles = df["title"].tolist()
    matches = difflib.get_close_matches(movie_name, titles, n=5, cutoff=0.4)
    if not matches:
        return None, None

    picked = matches[0]
    idx = df.index[df["title"] == picked][0]
    scores = list(enumerate(similarity[idx]))
    scores.sort(key=lambda x: x[1], reverse=True)

    recs = []
    for i, (j, score) in enumerate(scores[1 : top_n + 1], start=1):
        recs.append((i, df.iloc[j]["title"], float(score)))
    return picked, recs


def main() -> int:
    project_root = Path(__file__).resolve().parents[1]
    csv_path = project_root / "data" / "movies.csv"

    try:
        df = _load_movies_csv(csv_path)
    except Exception as e:
        print(f"Error reading dataset: {e}", file=sys.stderr)
        return 2

    using_sample = False
    if df is None:
        using_sample = True
        df = _sample_movies()

    similarity = _build_similarity(df)

    print("🎬 Movie Recommendation System (CLI)")
    if using_sample:
        print(
            "Note: using a small built-in sample dataset.\n"
            f"To use the full dataset, place `movies.csv` at: {csv_path}"
        )

    movie_name = input("\nEnter your favourite movie name: ").strip()
    if not movie_name:
        print("No movie provided.")
        return 1

    try:
        top_n = int(input("How many recommendations? (default 10): ").strip() or "10")
    except ValueError:
        top_n = 10
    top_n = max(1, min(top_n, 20))

    picked, recs = recommend(df, similarity, movie_name, top_n)
    if not picked or not recs:
        print("No close match found. Try another title.")
        return 1

    print(f"\nShowing recommendations for: {picked}\n")
    for rank, title, score in recs:
        print(f"{rank:>2}. {title}  ({score*100:.1f}%)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

