# 🎬 Movie Recommendation System

A content-based movie recommendation system that suggests similar movies based on user preferences using machine learning techniques.

## 📋 Description

This project implements a movie recommendation engine that analyzes movie features such as genres, keywords, tagline, cast, and director to find similar movies. It uses TF-IDF (Term Frequency-Inverse Document Frequency) vectorization and cosine similarity to calculate movie similarities.

## 🛠️ Technologies Used

- **Python 3.x**
- **NumPy** - Numerical computing
- **Pandas** - Data manipulation and analysis
- **scikit-learn** - Machine learning library
  - TfidfVectorizer - Text feature extraction
  - cosine_similarity - Similarity calculation
- **difflib** - String matching for movie title suggestions

## 📊 Dataset

- **Size**: 4,803 movies
- **Features**: 24 attributes including:
  - Genres
  - Keywords
  - Tagline
  - Cast
  - Director
  - Budget, Revenue, Runtime
  - Vote average and count

## ✨ Features

- Content-based filtering using multiple movie attributes
- TF-IDF vectorization for text feature extraction
- Cosine similarity for finding similar movies
- Fuzzy matching for movie title input
- Handles 4,803 movies with comprehensive metadata

## 🚀 How to Run

### Prerequisites

Install required dependencies:

```bash
pip install -r requirements.txt
```

### Running the Program

1. Ensure you have the `movies.csv` dataset in the project directory
2. Run the Jupyter notebook or convert it to a Python script:

```bash
# If using Jupyter Notebook
jupyter notebook movie_recommendation_system.py

# Or convert to Python script and run
jupyter nbconvert --to script movie_recommendation_system.py
python movie_recommendation_system.py
```

### Usage Example

```python
# Enter your favorite movie name when prompted
Enter your favourite movie name: spiderman

# The system will recommend similar movies based on:
# - Genre similarity
# - Cast overlap
# - Director
# - Keywords and themes
```

## 🎯 How It Works

1. **Data Loading**: Loads movie dataset with 24 features
2. **Feature Selection**: Combines genres, keywords, tagline, cast, and director
3. **Text Vectorization**: Converts combined features into TF-IDF vectors
4. **Similarity Calculation**: Computes cosine similarity between all movies
5. **Recommendation**: Returns top N most similar movies to user's input

## 📈 Future Improvements

- [ ] Convert Jupyter notebook to standalone Python script
- [ ] Add collaborative filtering for hybrid recommendations
- [ ] Implement user rating system
- [ ] Create web interface using Flask/Django
- [ ] Add movie poster display using TMDB API
- [ ] Implement caching for faster recommendations
- [ ] Add support for multiple movie inputs
- [ ] Include user preference learning over time
- [ ] Add filtering by year, rating, or language
- [ ] Implement A/B testing for recommendation algorithms

## 📝 Notes

- The current file is in Jupyter Notebook format (.ipynb saved as .py)
- Requires `movies.csv` dataset (not included in repository)
- Recommendation quality depends on dataset completeness

## 👤 Author

**Mosin Ali**  
CodSoft Internship Project

## 📄 License

This project is part of the CodSoft internship program.

---

*Built with ❤️ for movie enthusiasts*
