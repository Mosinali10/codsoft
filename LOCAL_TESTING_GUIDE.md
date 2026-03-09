# 🧪 Local Testing Guide - All Projects

This guide will help you test each project locally before deployment.

---

## 📋 Prerequisites Check

### For Python Projects
```bash
# Check Python version (need 3.7+)
python --version

# If python doesn't work, try:
python3 --version

# Check pip
pip --version
```

### For C Projects
```bash
# Check GCC compiler
gcc --version

# If not installed:
# Windows: Install MinGW from https://www.mingw-w64.org/
# Linux: sudo apt-get install gcc
# Mac: xcode-select --install
```

---

## 🧪 Testing Order

We'll test in order of complexity:
1. ✅ Temperature Converter (Easiest)
2. ✅ Chatbot (Medium)
3. ✅ Tic Tac Toe (Medium)
4. ✅ Movie Recommender (Requires dataset)

---

## 1️⃣ Temperature Converter Testing

### Step 1: Navigate to Project
```bash
cd celsius-to-fahrenheit-converter
```

### Step 2: Run the Program
```bash
python celsius_to_fahrenheit.py
```

### Step 3: Test Cases

#### Test Case 1: Celsius to Fahrenheit
```
Input: 1
Enter temperature in Celsius: 0
Expected Output: 0.0°C = 32.00°F
```

#### Test Case 2: Fahrenheit to Celsius
```
Input: 2
Enter temperature in Fahrenheit: 32
Expected Output: 32.0°F = 0.00°C
```

#### Test Case 3: Common Values
```
Test: 25°C → 77°F
Test: 100°C → 212°F
Test: -40°C → -40°F (same in both!)
Test: 98.6°F → 37°C (body temperature)
```

#### Test Case 4: Error Handling
```
Input: abc (should show error and ask again)
Input: 4 (invalid choice, should show error)
```

### Step 4: Test Task Manager (Bonus)
```bash
python task_manager.py
```

Test:
- Create a task
- View tasks
- Update a task
- Delete a task
- Exit

### ✅ Success Criteria
- [ ] Program starts without errors
- [ ] Conversions are accurate
- [ ] Input validation works
- [ ] Can exit cleanly
- [ ] Menu displays correctly

---

## 2️⃣ Chatbot Testing

### Step 1: Navigate to Project
```bash
cd ../chatbot-c
```

### Step 2: Test Python Version First
```bash
python chatbot_demo.py
```

### Step 3: Test All Features

#### Test Case 1: Greetings
```
Input: hi
Expected: Greeting message

Input: what's your name?
Expected: "I'm Bot, your friendly chatbot!"
```

#### Test Case 2: Jokes
```
Input: jokes
Expected: Joke setup (e.g., "Why don't programmers like nature?")

Input: why?
Expected: Punchline (e.g., "It has too many bugs.")
```

#### Test Case 3: Calculator
```
Input: calculate
Expected: Calculator mode activated

Calculator> 25 + 17
Expected: Result: 42.00

Calculator> 10 / 0
Expected: Error: Division by zero!

Calculator> back
Expected: Exit calculator mode
```

#### Test Case 4: Quiz
```
Input: quiz
Expected: Quiz starts with questions

Test: Answer all questions correctly
Expected: Perfect score message
```

#### Test Case 5: Time
```
Input: time
Expected: Current system time displayed
```

#### Test Case 6: Help
```
Input: help
Expected: List of all commands
```

#### Test Case 7: Exit
```
Input: exit
Expected: Goodbye message and program ends
```

### Step 4: Test C Version (if GCC available)
```bash
gcc chatbot.c -o chatbot -lm
./chatbot

# On Windows:
gcc chatbot.c -o chatbot.exe -lm
chatbot.exe
```

### ✅ Success Criteria
- [ ] All greetings work
- [ ] Jokes display correctly
- [ ] Calculator performs operations
- [ ] Quiz runs and scores correctly
- [ ] Time displays
- [ ] Help menu shows
- [ ] Exit works cleanly

---

## 3️⃣ Tic Tac Toe Testing

### Step 1: Navigate to Project
```bash
cd ../tic-tac-toe-game
```

### Step 2: Compile the Program
```bash
# Linux/Mac
gcc tic_tac_toe.c -o tic_tac_toe
./tic_tac_toe

# Windows
gcc tic_tac_toe.c -o tic_tac_toe.exe
tic_tac_toe.exe
```

### Step 3: Test Cases

#### Test Case 1: Valid Moves
```
Try moves: 1, 2, 3, 4, 5, 6, 7, 8, 9
Expected: Each move should be accepted if square is empty
```

#### Test Case 2: Invalid Moves
```
Try: 0 (out of range)
Try: 10 (out of range)
Try: Same position twice
Expected: Error messages and retry
```

#### Test Case 3: Win Conditions
```
Test horizontal win:
X X X
O O .
. . .

Test vertical win:
X O .
X O .
X . .

Test diagonal win:
X O .
O X .
. . X
```

#### Test Case 4: Draw
```
Play until all squares filled with no winner
Expected: "It's a draw!" message
```

#### Test Case 5: AI Behavior
```
Test: AI should block your winning moves
Test: AI should take winning moves when available
Test: Try to beat the AI (you can't! It's unbeatable)
```

### ✅ Success Criteria
- [ ] Program compiles without errors
- [ ] Board displays correctly
- [ ] Valid moves accepted
- [ ] Invalid moves rejected
- [ ] Win detection works
- [ ] Draw detection works
- [ ] AI makes smart moves
- [ ] Game ends properly

---

## 4️⃣ Movie Recommendation System Testing

### Step 1: Navigate to Project
```bash
cd ../movie-recommendation-system
```

### Step 2: Install Dependencies
```bash
pip install -r requirements.txt
```

### Step 3: Check for Dataset
```bash
# The program needs movies.csv
# If you don't have it, you'll need to download it
```

### Step 4: Run the Program
```bash
# If it's a Jupyter notebook
jupyter notebook movie_recommendation_system.py

# Or convert to script first
jupyter nbconvert --to script movie_recommendation_system.py
python movie_recommendation_system.py
```

### Step 5: Test Cases

#### Test Case 1: Valid Movie Name
```
Input: Avatar
Expected: List of similar movies
```

#### Test Case 2: Partial Movie Name
```
Input: spider
Expected: Should find "Spider-Man" movies
```

#### Test Case 3: Case Insensitive
```
Input: AVATAR
Input: avatar
Input: AvAtAr
Expected: All should work
```

#### Test Case 4: Invalid Movie
```
Input: XYZ123NotAMovie
Expected: Error message or "Movie not found"
```

### ✅ Success Criteria
- [ ] Dependencies install successfully
- [ ] Program loads dataset
- [ ] Movie search works
- [ ] Recommendations are relevant
- [ ] Handles invalid input
- [ ] No errors during execution

---

## 🔧 Troubleshooting

### Python Issues

**Problem**: `python: command not found`
```bash
# Try python3 instead
python3 celsius_to_fahrenheit.py
```

**Problem**: `ModuleNotFoundError`
```bash
# Install missing packages
pip install pandas numpy scikit-learn
# Or use requirements.txt
pip install -r requirements.txt
```

**Problem**: Permission denied
```bash
# Linux/Mac: Make executable
chmod +x celsius_to_fahrenheit.py
```

### C Compilation Issues

**Problem**: `gcc: command not found`
```bash
# Windows: Install MinGW
# Download from: https://www.mingw-w64.org/

# Linux:
sudo apt-get install gcc

# Mac:
xcode-select --install
```

**Problem**: Undefined reference to `sqrt` or `pow`
```bash
# Add -lm flag
gcc chatbot.c -o chatbot -lm
```

**Problem**: Permission denied when running
```bash
# Linux/Mac: Make executable
chmod +x tic_tac_toe
./tic_tac_toe
```

### General Issues

**Problem**: Program crashes
- Check input format
- Look for error messages
- Try simpler test cases first

**Problem**: Unexpected output
- Verify input format
- Check for typos
- Review expected vs actual output

---

## 📊 Testing Checklist

### Temperature Converter
- [ ] Program starts
- [ ] C to F conversion works
- [ ] F to C conversion works
- [ ] Input validation works
- [ ] Can exit cleanly
- [ ] Task manager works (bonus)

### Chatbot
- [ ] Greetings work
- [ ] Jokes work (all 10)
- [ ] Calculator works (all operations)
- [ ] Quiz works (all questions)
- [ ] Time display works
- [ ] Help menu works
- [ ] Exit works

### Tic Tac Toe
- [ ] Compiles successfully
- [ ] Board displays correctly
- [ ] Player moves work
- [ ] AI moves work
- [ ] Win detection works
- [ ] Draw detection works
- [ ] AI is unbeatable

### Movie Recommender
- [ ] Dependencies install
- [ ] Dataset loads
- [ ] Search works
- [ ] Recommendations display
- [ ] Error handling works

---

## 🎯 Quick Test Script

Save this as `test_all.sh` (Linux/Mac) or `test_all.bat` (Windows):

```bash
#!/bin/bash

echo "🧪 Testing All Projects..."
echo ""

# Test 1: Temperature Converter
echo "1️⃣ Testing Temperature Converter..."
cd celsius-to-fahrenheit-converter
python celsius_to_fahrenheit.py <<EOF
1
25
n
EOF
cd ..
echo "✅ Temperature Converter test complete"
echo ""

# Test 2: Chatbot
echo "2️⃣ Testing Chatbot..."
cd chatbot-c
python chatbot_demo.py <<EOF
hi
exit
EOF
cd ..
echo "✅ Chatbot test complete"
echo ""

# Test 3: Tic Tac Toe
echo "3️⃣ Testing Tic Tac Toe..."
cd tic-tac-toe-game
gcc tic_tac_toe.c -o tic_tac_toe 2>/dev/null
if [ $? -eq 0 ]; then
    echo "✅ Tic Tac Toe compiled successfully"
else
    echo "❌ Tic Tac Toe compilation failed"
fi
cd ..
echo ""

# Test 4: Movie Recommender
echo "4️⃣ Testing Movie Recommender..."
cd movie-recommendation-system
pip install -r requirements.txt -q
echo "✅ Dependencies installed"
cd ..
echo ""

echo "🎉 All tests complete!"
```

---

## 📝 Test Results Template

Use this to document your testing:

```
PROJECT: Temperature Converter
Date: ___________
Tester: ___________

Test Results:
[ ] Program starts: PASS / FAIL
[ ] C to F works: PASS / FAIL
[ ] F to C works: PASS / FAIL
[ ] Input validation: PASS / FAIL
[ ] Exit works: PASS / FAIL

Notes: ___________________________________________

---

PROJECT: Chatbot
Date: ___________
Tester: ___________

Test Results:
[ ] Greetings: PASS / FAIL
[ ] Jokes: PASS / FAIL
[ ] Calculator: PASS / FAIL
[ ] Quiz: PASS / FAIL
[ ] Time: PASS / FAIL
[ ] Help: PASS / FAIL
[ ] Exit: PASS / FAIL

Notes: ___________________________________________

---

PROJECT: Tic Tac Toe
Date: ___________
Tester: ___________

Test Results:
[ ] Compilation: PASS / FAIL
[ ] Board display: PASS / FAIL
[ ] Player moves: PASS / FAIL
[ ] AI moves: PASS / FAIL
[ ] Win detection: PASS / FAIL
[ ] Draw detection: PASS / FAIL

Notes: ___________________________________________

---

PROJECT: Movie Recommender
Date: ___________
Tester: ___________

Test Results:
[ ] Dependencies: PASS / FAIL
[ ] Dataset loads: PASS / FAIL
[ ] Search works: PASS / FAIL
[ ] Recommendations: PASS / FAIL
[ ] Error handling: PASS / FAIL

Notes: ___________________________________________
```

---

## 🚀 Ready for Deployment?

Once all tests pass:
- [ ] All projects run without errors
- [ ] All features work as expected
- [ ] Error handling is robust
- [ ] Documentation is complete
- [ ] Code is clean and commented

**Next Step**: Proceed to deployment guide!

---

*Happy Testing! 🧪*
