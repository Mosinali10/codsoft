# Movie Recommender (Streamlit)

## Project Description

This project is a Streamlit web app that recommends movies similar to a selected title using content-based filtering. It builds TF‑IDF vectors from basic movie metadata and ranks results using cosine similarity, with fuzzy matching to handle minor typos in the input.

## Features

- Content-based recommendations using TF‑IDF + cosine similarity
- Fuzzy title matching (handles small spelling differences)
- Adjustable number of recommendations (slider)
- Displays similarity score and basic movie metadata

## Technology Stack

- Python
- Streamlit
- pandas, numpy
- scikit-learn (TF‑IDF vectorization, cosine similarity)

## How to Run the Project

From the repository root:

```bash
cd projects/movie-recommender-streamlit
pip install -r requirements.txt
streamlit run app.py
```

Streamlit will print a local URL (typically `http://localhost:8501`).

## Example Output or Screenshots

When you enter a movie title (for example, `Inception`) and click **Get Recommendations**, the app shows a ranked list such as:

```
#1 Interstellar (93.4%)
#2 The Dark Knight (88.1%)
...
```

If you add screenshots later, place them in `screenshots/` and link them here.

## Project Structure (optional)

```
.
├── app.py
├── requirements.txt
├── README.md
└── screenshots/
```
