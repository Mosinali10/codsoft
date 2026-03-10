import streamlit as st
import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import difflib

# Page configuration
st.set_page_config(
    page_title="Movie Recommender",
    page_icon="🎞️",
    layout="centered"
)

# Theme tokens
ACCENT = "#22C55E"
BG = "#FFFFFF"
SURFACE = "#F8FAFC"
TEXT = "#0F172A"
BORDER = "#E2E8F0"
MUTED = "#64748B"

# Custom CSS (minimal SaaS style)
st.markdown(
    f"""
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

      html, body, [class*="css"]  {{
        font-family: 'Inter', sans-serif;
        color: {TEXT};
      }}

      .stApp {{
        background: {BG};
      }}

      /* Constrain content width for focus */
      .block-container {{
        padding-top: 2rem;
        padding-bottom: 4rem;
        max-width: 900px;
      }}

      .app-header {{
        background: {SURFACE};
        border: 1px solid {BORDER};
        border-radius: 16px;
        padding: 18px 20px;
        box-shadow: 0 1px 2px rgba(15, 23, 42, 0.05);
        margin-bottom: 18px;
      }}
      .app-header h1 {{
        font-size: 1.4rem;
        font-weight: 700;
        margin: 0;
        letter-spacing: -0.02em;
      }}
      .app-header p {{
        margin: 6px 0 0 0;
        color: {MUTED};
        font-size: 0.95rem;
      }}

      .card {{
        background: {SURFACE};
        border: 1px solid {BORDER};
        border-radius: 16px;
        padding: 16px;
        box-shadow: 0 1px 2px rgba(15, 23, 42, 0.05);
      }}

      .result-row {{
        background: {BG};
        border: 1px solid {BORDER};
        border-radius: 14px;
        padding: 14px 14px;
        margin: 10px 0;
      }}

      .result-title {{
        font-weight: 650;
        font-size: 1.05rem;
        margin: 0 0 6px 0;
      }}

      .badge {{
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 2px 10px;
        border-radius: 999px;
        border: 1px solid {BORDER};
        background: {SURFACE};
        color: {MUTED};
        font-size: 0.85rem;
      }}

      .badge-accent {{
        border-color: rgba(34, 197, 94, 0.25);
        background: rgba(34, 197, 94, 0.08);
        color: {ACCENT};
        font-weight: 500;
      }}

      /* Buttons */
      .stButton > button {{
        border-radius: 12px;
        border: 1px solid {BORDER};
        background: {BG};
        color: {TEXT};
        padding: 0.6rem 0.85rem;
        font-weight: 600;
        transition: all 0.2s ease;
      }}
      .stButton > button:hover {{
        border-color: {ACCENT};
        background: rgba(34, 197, 94, 0.04);
        transform: translateY(-1px);
      }}

      /* Text inputs */
      .stTextInput input {{
        border-radius: 12px !important;
        border: 1px solid {BORDER} !important;
        background: {BG} !important;
      }}
      .stSlider [data-baseweb="slider"] > div {{
        padding-top: 6px;
      }}

      /* Sidebar */
      section[data-testid="stSidebar"] {{
        border-right: 1px solid {BORDER};
      }}
    </style>
    """,
    unsafe_allow_html=True,
)

# Header
st.markdown(
    """
    <div class="app-header">
      <h1>Movie Recommender</h1>
      <p>Content-based recommendations using TF‑IDF and cosine similarity.</p>
    </div>
    """,
    unsafe_allow_html=True,
)

# Sample movie data (since we don't have the actual CSV)
@st.cache_data
def load_sample_data():
    """Load sample movie data for demonstration"""
    movies = {
        'title': [
            'Avatar', 'The Dark Knight', 'Inception', 'Interstellar', 'The Matrix',
            'Titanic', 'The Avengers', 'Jurassic Park', 'Star Wars', 'The Lion King',
            'Frozen', 'Toy Story', 'Finding Nemo', 'The Godfather', 'Pulp Fiction',
            'Forrest Gump', 'The Shawshank Redemption', 'Fight Club', 'Goodfellas', 'The Departed'
        ],
        'genres': [
            'Action Adventure Fantasy Science Fiction',
            'Action Crime Drama Thriller',
            'Action Science Fiction Thriller',
            'Adventure Drama Science Fiction',
            'Action Science Fiction',
            'Drama Romance',
            'Action Adventure Science Fiction',
            'Adventure Science Fiction',
            'Adventure Action Science Fiction',
            'Animation Drama Family',
            'Animation Adventure Comedy Family',
            'Animation Comedy Family',
            'Animation Adventure Comedy Family',
            'Crime Drama',
            'Crime Drama Thriller',
            'Comedy Drama Romance',
            'Crime Drama',
            'Drama',
            'Crime Drama',
            'Crime Drama Thriller'
        ],
        'keywords': [
            'culture clash future space war space colony',
            'dc comics crime fighter terrorist secret identity',
            'dream subconscious',
            'artificial intelligence space travel',
            'artificial intelligence dystopia',
            'ship iceberg love story',
            'marvel superhero team',
            'dinosaur theme park',
            'space opera rebellion',
            'lion africa coming of age',
            'princess magic snow',
            'toys friendship adventure',
            'fish ocean father son',
            'mafia family loyalty',
            'crime violence redemption',
            'vietnam war life story',
            'prison friendship hope',
            'identity violence',
            'mafia crime family',
            'undercover police mafia'
        ],
        'director': [
            'James Cameron', 'Christopher Nolan', 'Christopher Nolan', 'Christopher Nolan', 'Wachowski Brothers',
            'James Cameron', 'Joss Whedon', 'Steven Spielberg', 'George Lucas', 'Roger Allers',
            'Chris Buck', 'John Lasseter', 'Andrew Stanton', 'Francis Ford Coppola', 'Quentin Tarantino',
            'Robert Zemeckis', 'Frank Darabont', 'David Fincher', 'Martin Scorsese', 'Martin Scorsese'
        ]
    }
    return pd.DataFrame(movies)

@st.cache_resource
def create_recommendation_system(movies_data):
    """Create the recommendation system"""
    # Combine features
    movies_data['combined_features'] = (
        movies_data['genres'] + ' ' + 
        movies_data['keywords'] + ' ' + 
        movies_data['director']
    )
    
    # Create TF-IDF vectorizer
    vectorizer = TfidfVectorizer()
    feature_vectors = vectorizer.fit_transform(movies_data['combined_features'])
    
    # Calculate similarity
    similarity = cosine_similarity(feature_vectors)
    
    return similarity, movies_data

def get_recommendations(movie_name, movies_data, similarity, n_recommendations=5):
    """Get movie recommendations"""
    # Find close matches
    list_of_all_titles = movies_data['title'].tolist()
    find_close_match = difflib.get_close_matches(movie_name, list_of_all_titles, n=5, cutoff=0.4)
    
    if not find_close_match:
        return None, "No close match found. Try another title."
    
    close_match = find_close_match[0]
    index_of_movie = movies_data[movies_data.title == close_match].index[0]
    
    # Get similarity scores
    similarity_score = list(enumerate(similarity[index_of_movie]))
    sorted_similar_movies = sorted(similarity_score, key=lambda x: x[1], reverse=True)
    
    # Get top recommendations (excluding the movie itself)
    recommendations = []
    for i, movie in enumerate(sorted_similar_movies[1:n_recommendations+1]):
        index = movie[0]
        title = movies_data.iloc[index]['title']
        score = movie[1]
        recommendations.append({
            'rank': i + 1,
            'title': title,
            'genres': movies_data.iloc[index]['genres'],
            'director': movies_data.iloc[index]['director'],
            'similarity': f"{score*100:.1f}%"
        })
    
    return recommendations, close_match

# Load data
movies_data = load_sample_data()
similarity, movies_data = create_recommendation_system(movies_data)

# Sidebar (modern: selectbox instead of many buttons)
with st.sidebar:
    st.markdown("### Library")
    selected = st.selectbox("Select a title", options=sorted(movies_data["title"].tolist()), index=0)

# Main interface
col1, col2 = st.columns([3, 2], gap="large")

with col1:
    st.markdown('<div class="card">', unsafe_allow_html=True)
    st.markdown("#### Find similar movies")

    movie_input = st.text_input(
        "Movie title",
        value=st.session_state.get("movie_input", ""),
        placeholder="Type a movie title",
        label_visibility="visible",
    )

    n_recommendations = st.slider("Recommendations", min_value=3, max_value=10, value=5)

    c1, c2 = st.columns([1, 1])
    with c1:
        search_button = st.button("Get recommendations", use_container_width=True)
    with c2:
        use_selected = st.button("Use sidebar title", use_container_width=True)

    if use_selected:
        st.session_state["movie_input"] = selected
        st.rerun()

    st.markdown("</div>", unsafe_allow_html=True)

with col2:
    st.markdown('<div class="card">', unsafe_allow_html=True)
    st.markdown("#### How it works")
    st.markdown(
        """
        - Build a text profile per movie (genres + keywords + director)
        - Vectorize with TF‑IDF
        - Rank by cosine similarity
        """
    )
    st.markdown("</div>", unsafe_allow_html=True)

# Display recommendations
if search_button and movie_input:
    with st.spinner("Finding similar movies..."):
        recommendations, matched_movie = get_recommendations(
            movie_input, 
            movies_data, 
            similarity, 
            n_recommendations
        )
        
        if recommendations is None:
            st.error(matched_movie)
        else:
            st.markdown('<div class="card">', unsafe_allow_html=True)
            st.markdown(f"#### Results for: {matched_movie}")
            
            for rec in recommendations:
                st.markdown(
                    f"""
                    <div class="result-row">
                      <div class="result-title">{rec['rank']}. {rec['title']}</div>
                      <div style="display:flex; gap:10px; flex-wrap:wrap;">
                        <span class="badge badge-accent">Similarity {rec['similarity']}</span>
                        <span class="badge">Director {rec['director']}</span>
                        <span class="badge">Genres {rec['genres']}</span>
                      </div>
                    </div>
                    """,
                    unsafe_allow_html=True,
                )
            st.markdown("</div>", unsafe_allow_html=True)

# Information section
with st.expander("About"):
    st.markdown(
        """
        This demo uses a small in-code dataset to keep setup simple. For a larger dataset, you can extend the
        `load_sample_data()` function or wire it up to a CSV/DB.
        """
    )
