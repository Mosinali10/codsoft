import streamlit as st
import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import difflib

# Page configuration
st.set_page_config(
    page_title="Movie Recommender",
    page_icon="🎬",
    layout="wide"
)

# Custom CSS
st.markdown("""
    <style>
    .main {
        padding: 2rem;
    }
    .movie-card {
        padding: 1.5rem;
        border-radius: 1rem;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        margin: 1rem 0;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }
    .movie-title {
        font-size: 1.5rem;
        font-weight: bold;
        margin-bottom: 0.5rem;
    }
    </style>
""", unsafe_allow_html=True)

# Title
st.title("🎬 Movie Recommendation System")
st.markdown("### Discover movies similar to your favorites!")
st.markdown("---")

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
    find_close_match = difflib.get_close_matches(movie_name, list_of_all_titles)
    
    if not find_close_match:
        return None, "Movie not found. Please try another title."
    
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

# Main interface
col1, col2 = st.columns([2, 1])

with col1:
    st.subheader("🔍 Find Similar Movies")
    
    # Movie input
    movie_input = st.text_input(
        "Enter a movie name:",
        placeholder="e.g., Avatar, Inception, The Matrix...",
        help="Type a movie name to get recommendations"
    )
    
    # Number of recommendations
    n_recommendations = st.slider(
        "Number of recommendations:",
        min_value=3,
        max_value=10,
        value=5
    )
    
    search_button = st.button("🎯 Get Recommendations", use_container_width=True)

with col2:
    st.subheader("📊 How it Works")
    st.info("""
    This system uses:
    - **TF-IDF** vectorization
    - **Cosine Similarity**
    - Content-based filtering
    
    It analyzes:
    - Genres
    - Keywords
    - Directors
    """)

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
            st.error(f"❌ {matched_movie}")
        else:
            st.success(f"✅ Showing recommendations for: **{matched_movie}**")
            st.markdown("---")
            
            # Display recommendations
            for rec in recommendations:
                st.markdown(f"""
                    <div class="movie-card">
                        <div class="movie-title">#{rec['rank']} {rec['title']}</div>
                        <div>🎭 Genres: {rec['genres']}</div>
                        <div>🎬 Director: {rec['director']}</div>
                        <div>📊 Similarity: {rec['similarity']}</div>
                    </div>
                """, unsafe_allow_html=True)

# Sidebar with available movies
with st.sidebar:
    st.subheader("📚 Available Movies")
    st.markdown("Click on a movie to search:")
    
    for movie in sorted(movies_data['title'].tolist()):
        if st.button(movie, key=f"movie_{movie}", use_container_width=True):
            st.session_state.selected_movie = movie
            st.rerun()

# If movie selected from sidebar
if 'selected_movie' in st.session_state:
    movie_input = st.session_state.selected_movie
    recommendations, matched_movie = get_recommendations(
        movie_input, 
        movies_data, 
        similarity, 
        n_recommendations
    )
    
    if recommendations:
        st.success(f"✅ Showing recommendations for: **{matched_movie}**")
        st.markdown("---")
        
        for rec in recommendations:
            st.markdown(f"""
                <div class="movie-card">
                    <div class="movie-title">#{rec['rank']} {rec['title']}</div>
                    <div>🎭 Genres: {rec['genres']}</div>
                    <div>🎬 Director: {rec['director']}</div>
                    <div>📊 Similarity: {rec['similarity']}</div>
                </div>
            """, unsafe_allow_html=True)
    
    del st.session_state.selected_movie

# Information section
st.markdown("---")
with st.expander("ℹ️ About This System"):
    st.markdown("""
    ### Content-Based Filtering
    
    This movie recommendation system uses **content-based filtering** to suggest similar movies.
    
    **How it works:**
    1. **Feature Extraction**: Combines genres, keywords, and director information
    2. **TF-IDF Vectorization**: Converts text features into numerical vectors
    3. **Cosine Similarity**: Calculates similarity between movies
    4. **Ranking**: Returns top N most similar movies
    
    **Note:** This is a demo with sample data. In production, this would use a complete movie database.
    """)

# Footer
st.markdown("---")
st.markdown("""
    <div style='text-align: center; color: #666;'>
        <p>Built with ❤️ using Streamlit | CodSoft Internship Project</p>
    </div>
""", unsafe_allow_html=True)
