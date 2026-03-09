# 🎬 Movie Recommendation System

An intelligent movie recommendation web app using content-based filtering with TF-IDF and cosine similarity.

![Streamlit](https://img.shields.io/badge/Streamlit-FF4B4B?style=for-the-badge&logo=Streamlit&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![scikit-learn](https://img.shields.io/badge/scikit--learn-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white)

## 📋 Problem Statement

With thousands of movies available, finding similar movies to ones you enjoy can be overwhelming. This system uses machine learning to analyze movie features and recommend similar titles based on content similarity.

## ✨ Features

- **Content-Based Filtering**: Recommends movies based on genres, keywords, and directors
- **TF-IDF Vectorization**: Converts text features into numerical vectors
- **Cosine Similarity**: Calculates similarity between movies
- **Interactive Search**: Type any movie name to get recommendations
- **Adjustable Results**: Choose how many recommendations to see (3-10)
- **Similarity Scores**: Shows percentage match for each recommendation
- **Movie Sidebar**: Quick access to available movies
- **Detailed Information**: Displays genres and directors for each recommendation
- **Fuzzy Matching**: Finds movies even with slight spelling variations

## 🛠️ Technologies Used

- **Python 3.8+**
- **Streamlit** - Web framework
- **Pandas** - Data manipulation
- **NumPy** - Numerical computing
- **scikit-learn** - Machine learning
  - TfidfVectorizer - Text feature extraction
  - cosine_similarity - Similarity calculation
- **difflib** - Fuzzy string matching

## 📦 Installation

### Prerequisites
- Python 3.8 or higher
- pip (Python package manager)

### Steps

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/codsoft-projects.git
cd codsoft-projects/movie-recommender
```

2. **Install dependencies**
```bash
pip install -r requirements.txt
```

## 🚀 How to Run

### Local Development
```bash
streamlit run app.py
```

The app will open at `http://localhost:8501`

## 📸 Screenshots

![Movie Search](screenshots/search-interface.png)
*Search interface with movie input*

![Recommendations](screenshots/recommendations.png)
*Movie recommendations with similarity scores*

## 🎯 How to Use

1. **Enter Movie Name**:
   - Type a movie title in the search box
   - System will find close matches

2. **Adjust Recommendations**:
   - Use slider to choose number of recommendations (3-10)

3. **Get Recommendations**:
   - Click "Get Recommendations" button
   - View similar movies with details

4. **Quick Select**:
   - Use sidebar to quickly select from available movies
   - Click any movie name to search

5. **View Details**:
   - Each recommendation shows:
     - Movie title
     - Genres
     - Director
     - Similarity percentage

## 🧠 How It Works

### 1. Feature Extraction
Combines multiple movie attributes:
- Genres (Action, Drama, Comedy, etc.)
- Keywords (themes, plot elements)
- Director name

### 2. TF-IDF Vectorization
```python
# Converts text to numerical vectors
vectorizer = TfidfVectorizer()
feature_vectors = vectorizer.fit_transform(combined_features)
```

### 3. Cosine Similarity
```python
# Calculates similarity between all movies
similarity = cosine_similarity(feature_vectors)
```

### 4. Recommendation
- Finds input movie in database
- Retrieves similarity scores
- Sorts by highest similarity
- Returns top N recommendations

## 📊 Algorithm Details

**TF-IDF (Term Frequency-Inverse Document Frequency)**
- Measures importance of words in documents
- Higher weight for unique, distinctive terms
- Lower weight for common terms

**Cosine Similarity**
- Measures angle between feature vectors
- Range: 0 (no similarity) to 1 (identical)
- Formula: `similarity = (A · B) / (||A|| × ||B||)`

## 🌐 Deployment

### Streamlit Cloud
1. Push to GitHub
2. Go to [share.streamlit.io](https://share.streamlit.io)
3. Connect repository
4. Select `movie-recommender/app.py`
5. Deploy

### Render
```yaml
# render.yaml
services:
  - type: web
    name: movie-recommender
    env: python
    buildCommand: pip install -r requirements.txt
    startCommand: streamlit run app.py --server.port $PORT
```

### Hugging Face Spaces
1. Create Streamlit Space
2. Upload files
3. Auto-deploy

## 🔮 Future Improvements

- [ ] Integrate with TMDB API for real movie data
- [ ] Add movie posters and images
- [ ] Implement collaborative filtering
- [ ] User rating system
- [ ] Hybrid recommendation (content + collaborative)
- [ ] Movie trailers integration
- [ ] Advanced filters (year, rating, language)
- [ ] User preference learning
- [ ] Watchlist functionality
- [ ] Social sharing features
- [ ] Movie reviews and ratings
- [ ] Trending movies section
- [ ] Genre-based browsing
- [ ] Actor-based recommendations
- [ ] Similar movies carousel

## 📊 Project Structure

```
movie-recommender/
├── app.py                # Main Streamlit application
├── requirements.txt      # Python dependencies
├── README.md            # Project documentation
└── screenshots/         # Application screenshots
```

## 📈 Performance

- **Dataset Size**: 20 sample movies (expandable)
- **Recommendation Time**: < 1 second
- **Accuracy**: Based on content similarity
- **Scalability**: Can handle thousands of movies

## 🤝 Contributing

Contributions welcome! Please submit a Pull Request.

## 👤 Author

**Mosin Ali**
- CodSoft Internship Project
- Task: Movie Recommendation System

## 📄 License

Part of CodSoft internship program.

## 🙏 Acknowledgments

- CodSoft for the opportunity
- scikit-learn community
- Streamlit team
- Movie database providers

---

<div align="center">
  <p>Built with ❤️ using Streamlit & Machine Learning</p>
  <p>🎬 Discover Your Next Favorite Movie!</p>
  <p>⭐ Star this repo if you find it helpful!</p>
</div>
