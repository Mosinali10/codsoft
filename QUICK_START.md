# 🚀 Quick Start Guide

Get up and running with all projects in minutes!

## 📋 Prerequisites

### For Python Projects
- Python 3.7 or higher
- pip (Python package manager)

### For C Projects
- GCC compiler (MinGW on Windows, gcc on Linux/Mac)
- Make (optional)

## ⚡ Quick Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/codsoft.git
cd codsoft
```

### 2. Choose Your Project

Jump to the section for the project you want to run:
- [Movie Recommendation System](#movie-recommendation-system)
- [Temperature Converter](#temperature-converter)
- [Tic Tac Toe Game](#tic-tac-toe-game)
- [Chatbot](#chatbot)

---

## 🎬 Movie Recommendation System

### Setup
```bash
cd movie-recommendation-system
pip install -r requirements.txt
```

### Run
```bash
# If using Jupyter Notebook
jupyter notebook movie_recommendation_system.py

# Or convert and run as script
jupyter nbconvert --to script movie_recommendation_system.py
python movie_recommendation_system.py
```

### Note
You'll need a `movies.csv` dataset. The code expects it in the same directory.

---

## 🌡️ Temperature Converter

### Run
```bash
cd celsius-to-fahrenheit-converter
python celsius_to_fahrenheit.py
```

### Bonus: Task Manager
```bash
python task_manager.py
```

### Example Usage
```
Enter your choice (1-3): 1
Enter temperature in Celsius: 25
✓ 25.0°C = 77.00°F
```

---

## ⭕ Tic Tac Toe Game

### Compile
```bash
cd tic-tac-toe-game

# On Linux/Mac
gcc tic_tac_toe.c -o tic_tac_toe

# On Windows
gcc tic_tac_toe.c -o tic_tac_toe.exe
```

### Run
```bash
# On Linux/Mac
./tic_tac_toe

# On Windows
tic_tac_toe.exe
```

### How to Play
- You are 'X', AI is 'O'
- Enter numbers 1-9 to place your mark
- Try to get 3 in a row!

---

## 🤖 Chatbot

### Compile
```bash
cd chatbot-c

# On Linux/Mac
gcc chatbot.c -o chatbot -lm

# On Windows
gcc chatbot.c -o chatbot.exe -lm
```

### Run
```bash
# On Linux/Mac
./chatbot

# On Windows
chatbot.exe
```

### Try These Commands
- `hi` - Greet the bot
- `quiz` - Start a quiz game
- `jokes` - Hear a joke
- `calculate` - Use calculator
- `what's the time` - Get current time
- `exit` - End conversation

---

## 🎥 Watch Demo Videos

All demo videos are in the `demo-videos/` folder:

```bash
cd demo-videos
# Open any .mp4 file with your video player
```

---

## 🐛 Troubleshooting

### Python Issues

**Problem**: `ModuleNotFoundError`
```bash
# Solution: Install dependencies
pip install -r requirements.txt
```

**Problem**: `python: command not found`
```bash
# Solution: Try python3
python3 celsius_to_fahrenheit.py
```

### C Compilation Issues

**Problem**: `gcc: command not found`
```bash
# Windows: Install MinGW
# Linux: sudo apt-get install gcc
# Mac: xcode-select --install
```

**Problem**: Undefined reference to `sqrt`
```bash
# Solution: Add -lm flag
gcc chatbot.c -o chatbot -lm
```

### General Issues

**Problem**: Permission denied
```bash
# Linux/Mac: Make file executable
chmod +x tic_tac_toe
./tic_tac_toe
```

---

## 📚 Learn More

Each project has detailed documentation:

- [Movie Recommendation System README](./movie-recommendation-system/README.md)
- [Temperature Converter README](./celsius-to-fahrenheit-converter/README.md)
- [Tic Tac Toe README](./tic-tac-toe-game/README.md)
- [Chatbot README](./chatbot-c/README.md)

---

## 💡 Tips

### For Development
1. Use a virtual environment for Python projects:
   ```bash
   python -m venv venv
   source venv/bin/activate  # Linux/Mac
   venv\Scripts\activate     # Windows
   ```

2. Use an IDE for better experience:
   - VS Code (recommended)
   - PyCharm (Python)
   - CLion (C)

3. Enable debugging:
   - Add `-g` flag when compiling C: `gcc -g chatbot.c -o chatbot`
   - Use Python debugger: `python -m pdb script.py`

### For Portfolio
1. Take screenshots while running
2. Record your own demo videos
3. Customize the code
4. Add your improvements
5. Share on GitHub/LinkedIn

---

## 🎯 What to Try First

### Beginner-Friendly
1. **Temperature Converter** - Simple and quick
2. **Chatbot** - Interactive and fun

### More Advanced
3. **Tic Tac Toe** - Learn about AI algorithms
4. **Movie Recommender** - Explore machine learning

---

## 📞 Need Help?

- Check the [CONTRIBUTING.md](./CONTRIBUTING.md) guide
- Review individual project READMEs
- Open an issue on GitHub
- Check the troubleshooting section above

---

## ✅ Quick Checklist

Before running any project:

- [ ] Prerequisites installed
- [ ] Repository cloned
- [ ] In correct directory
- [ ] Dependencies installed (Python)
- [ ] Code compiled (C)
- [ ] Ready to run!

---

**Happy Coding! 🎉**

*Get started in under 5 minutes!*
