# 🚀 CodSoft Internship Projects - Modern Web Applications

A collection of modern, interactive web applications showcasing full-stack development skills, machine learning, and algorithm implementation.

![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Streamlit](https://img.shields.io/badge/Streamlit-FF4B4B?style=for-the-badge&logo=Streamlit&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

## 📋 Overview

This repository contains four professional web applications developed during the CodSoft internship program. Each project demonstrates different technical skills, from machine learning and algorithms to modern web development and UI/UX design.

---

## 🗂️ Projects

### 1. 🌡️ [Temperature Converter](./temperature-converter/)

A modern web app for converting temperatures between Celsius and Fahrenheit.

**Tech Stack**: Python, Streamlit  
**Features**:
- Bidirectional conversion
- Real-time results
- Reference temperature points
- Formula explanations
- Responsive design

[View Project →](./temperature-converter/) | [Live Demo](#)

---

### 2. 🤖 [Interactive Chatbot](./chatbot/)

A feature-rich chatbot with conversation, quiz, calculator, and entertainment features.

**Tech Stack**: Python, Streamlit  
**Features**:
- Natural language conversation
- 10 interactive jokes
- Quiz game with scoring
- Built-in calculator
- Time display
- Session memory

[View Project →](./chatbot/) | [Live Demo](#)

---

### 3. 🎬 [Movie Recommendation System](./movie-recommender/)

An intelligent movie recommender using machine learning and content-based filtering.

**Tech Stack**: Python, Streamlit, scikit-learn, Pandas  
**Features**:
- TF-IDF vectorization
- Cosine similarity algorithm
- Content-based filtering
- Fuzzy search matching
- Similarity scoring
- Interactive UI

[View Project →](./movie-recommender/) | [Live Demo](#)

---

### 4. ⭕ [Tic Tac Toe with AI](./tic-tac-toe/)

A web-based Tic Tac Toe game with an unbeatable AI opponent.

**Tech Stack**: HTML5, CSS3, JavaScript  
**Features**:
- Minimax algorithm
- Unbeatable AI
- Score tracking
- Smooth animations
- Local storage
- Responsive design

[View Project →](./tic-tac-toe/) | [Live Demo](#)

---

## 🛠️ Technologies Used

### Frontend
- **HTML5** - Structure
- **CSS3** - Styling and animations
- **JavaScript (ES6)** - Interactive functionality
- **Streamlit** - Python web framework

### Backend & ML
- **Python 3.8+** - Core programming
- **Pandas** - Data manipulation
- **NumPy** - Numerical computing
- **scikit-learn** - Machine learning
- **TF-IDF** - Text vectorization
- **Cosine Similarity** - Similarity calculation

### Algorithms
- **Minimax** - Game theory AI
- **Content-Based Filtering** - Recommendation system
- **Keyword Matching** - Intent recognition

---

## 📦 Quick Start

### Prerequisites
```bash
# Python 3.8 or higher
python --version

# pip package manager
pip --version
```

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/codsoft-projects.git
cd codsoft-projects
```

2. **Choose a project**
```bash
# Temperature Converter
cd temperature-converter
pip install -r requirements.txt
streamlit run app.py

# Chatbot
cd chatbot
pip install -r requirements.txt
streamlit run app.py

# Movie Recommender
cd movie-recommender
pip install -r requirements.txt
streamlit run app.py

# Tic Tac Toe (no installation needed)
cd tic-tac-toe
# Open index.html in browser
```

---

## 🎯 Project Highlights

| Project | Complexity | Key Technology | Lines of Code |
|---------|-----------|----------------|---------------|
| Temperature Converter | ⭐⭐ | Streamlit | ~150 |
| Chatbot | ⭐⭐⭐ | Streamlit + State Management | ~300 |
| Movie Recommender | ⭐⭐⭐⭐ | ML + TF-IDF + Cosine Similarity | ~250 |
| Tic Tac Toe | ⭐⭐⭐⭐ | Minimax Algorithm | ~350 |

---

## 📸 Screenshots

### Temperature Converter
![Temperature Converter](screenshots/temperature-converter.png)

### Chatbot
![Chatbot](screenshots/chatbot.png)

### Movie Recommender
![Movie Recommender](screenshots/movie-recommender.png)

### Tic Tac Toe
![Tic Tac Toe](screenshots/tic-tac-toe.png)

---

## 🌐 Deployment

All projects are deployment-ready for multiple platforms:

### Streamlit Cloud
```bash
# Push to GitHub
# Visit share.streamlit.io
# Connect repository
# Deploy
```

### Render
```yaml
# Add render.yaml to each project
services:
  - type: web
    name: project-name
    env: python
    buildCommand: pip install -r requirements.txt
    startCommand: streamlit run app.py --server.port $PORT
```

### Vercel (for Tic Tac Toe)
```bash
vercel
```

### GitHub Pages (for Tic Tac Toe)
```bash
# Settings → Pages → Deploy from main branch
```

---

## 📊 Skills Demonstrated

### Technical Skills
✅ Python Programming  
✅ Web Development (HTML/CSS/JS)  
✅ Machine Learning (scikit-learn)  
✅ Algorithm Implementation (Minimax)  
✅ Data Processing (Pandas, NumPy)  
✅ UI/UX Design  
✅ State Management  
✅ API Integration Ready  

### Software Engineering
✅ Clean Code Practices  
✅ Project Structure  
✅ Documentation  
✅ Version Control (Git)  
✅ Deployment  
✅ Testing  
✅ Error Handling  

### Problem Solving
✅ Algorithm Design  
✅ Data Structures  
✅ Optimization  
✅ User Experience  

---

## 🔮 Future Enhancements

### Temperature Converter
- [ ] Add Kelvin and Rankine scales
- [ ] Weather API integration
- [ ] Temperature history tracking
- [ ] Export to PDF

### Chatbot
- [ ] NLP integration
- [ ] Voice input/output
- [ ] More quiz categories
- [ ] User profiles

### Movie Recommender
- [ ] TMDB API integration
- [ ] Collaborative filtering
- [ ] User ratings
- [ ] Movie posters

### Tic Tac Toe
- [ ] Difficulty levels
- [ ] Online multiplayer
- [ ] Larger boards
- [ ] Tournament mode

---

## 📁 Repository Structure

```
codsoft-projects/
│
├── temperature-converter/
│   ├── app.py
│   ├── requirements.txt
│   ├── README.md
│   └── screenshots/
│
├── chatbot/
│   ├── app.py
│   ├── requirements.txt
│   ├── README.md
│   └── screenshots/
│
├── movie-recommender/
│   ├── app.py
│   ├── requirements.txt
│   ├── README.md
│   └── screenshots/
│
├── tic-tac-toe/
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   ├── README.md
│   └── screenshots/
│
├── demo-videos/
│   └── [project demos]
│
└── README.md (this file)
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 👤 Author

**Mosin Ali**

CodSoft Internship Program - 2026

📧 Email: [your-email@example.com]  
💼 LinkedIn: [your-linkedin-profile]  
🐙 GitHub: [@yourusername](https://github.com/yourusername)  
🌐 Portfolio: [your-portfolio-website]

---

## 📄 License

This project is part of the CodSoft internship program.

---

## 🙏 Acknowledgments

- **CodSoft** for the internship opportunity
- **Streamlit** for the amazing framework
- **scikit-learn** community
- **Open-source** community
- All contributors and supporters

---

## 📞 Contact

For questions, feedback, or collaboration opportunities:

- Open an issue in this repository
- Email: [your-email@example.com]
- LinkedIn: [Your LinkedIn Profile]

---

<div align="center">

### ⭐ Star this repository if you find it helpful!

**Built with ❤️ during CodSoft Internship**

[View Live Demos](#) | [Report Bug](https://github.com/yourusername/codsoft-projects/issues) | [Request Feature](https://github.com/yourusername/codsoft-projects/issues)

</div>
