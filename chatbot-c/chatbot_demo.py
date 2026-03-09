#!/usr/bin/env python3
"""
Interactive Chatbot Demo - Python Version
This is a Python implementation of the C chatbot for easy demonstration
Original C version: chatbot.c
"""

import random
import time
from datetime import datetime

# Global variables for joke state
joke_step = 0
current_joke_question = None
current_joke_answer = None

def clean_input(user_input):
    """Clean and normalize user input"""
    return user_input.lower().strip()

def compare_keywords(user_input, keyword):
    """Check if keyword exists in user input"""
    return keyword in user_input

def tell_joke():
    """Select and tell a random joke"""
    global joke_step, current_joke_question, current_joke_answer
    
    jokes = [
        ("Why don't scientists trust atoms?", "Because they make up everything!"),
        ("Why did the scarecrow win an award?", "Because he was outstanding in his field!"),
        ("Why don't skeletons fight each other?", "They don't have the guts."),
        ("What do you call fake spaghetti?", "An impasta!"),
        ("Why did the bicycle fall over?", "Because it was two-tired."),
        ("Why don't programmers like nature?", "It has too many bugs."),
        ("What do you get if you cross a snowman and a vampire?", "Frostbite."),
        ("Why did the math book look sad?", "Because it had too many problems."),
        ("Why was the computer cold?", "It left its Windows open."),
        ("What did one ocean say to the other ocean?", "Nothing, they just waved.")
    ]
    
    joke = random.choice(jokes)
    current_joke_question = joke[0]
    current_joke_answer = joke[1]
    joke_step = 1
    
    return current_joke_question

def continue_joke():
    """Return the punchline of the current joke"""
    global joke_step
    joke_step = 0
    return current_joke_answer

def calculate(expression):
    """Simple calculator for basic arithmetic"""
    try:
        # Parse the expression
        parts = expression.split()
        if len(parts) != 3:
            return "Please use format: number operator number (e.g., 5 + 3)"
        
        num1 = float(parts[0])
        operator = parts[1]
        num2 = float(parts[2])
        
        if num1 > 1e7 or num2 > 1e7:
            return "Numbers too large!"
        
        if operator == '+':
            result = num1 + num2
        elif operator == '-':
            result = num1 - num2
        elif operator == '*':
            result = num1 * num2
        elif operator == '/':
            if num2 == 0:
                return "Error: Division by zero!"
            result = num1 / num2
        else:
            return "Invalid operator. Use +, -, *, or /"
        
        return f"Result: {result:.2f}"
    except ValueError:
        return "Invalid input. Please enter numbers."
    except Exception as e:
        return f"Error: {str(e)}"

def start_quiz():
    """Run an interactive quiz"""
    print("\n" + "="*50)
    print("🎮 LET'S START THE QUIZ!")
    print("="*50)
    print("Answer each question with the corresponding number.\n")
    
    questions = [
        {
            "question": "What is 2 + 2?",
            "options": ["1) 3", "2) 4", "3) 5", "4) 6"],
            "answer": 2
        },
        {
            "question": "How many sides does a triangle have?",
            "options": ["1) 2", "2) 3", "3) 4", "4) 5"],
            "answer": 2
        },
        {
            "question": "What is the capital of France?",
            "options": ["1) London", "2) Paris", "3) Berlin", "4) Madrid"],
            "answer": 2
        },
        {
            "question": "How many days are in a week?",
            "options": ["1) 5", "2) 6", "3) 7", "4) 8"],
            "answer": 3
        }
    ]
    
    score = 0
    
    for i, q in enumerate(questions, 1):
        print(f"\nQuestion {i}: {q['question']}")
        for option in q['options']:
            print(f"  {option}")
        
        while True:
            try:
                answer = input("\nYour answer (1-4): ").strip()
                answer_num = int(answer)
                if 1 <= answer_num <= 4:
                    break
                print("Please enter a number between 1 and 4.")
            except ValueError:
                print("Invalid input. Please enter a number.")
        
        if answer_num == q['answer']:
            print("✓ Correct!")
            score += 1
        else:
            print("✗ Incorrect.")
    
    print("\n" + "="*50)
    print(f"🏆 Quiz Complete! Your score: {score}/{len(questions)}")
    print("="*50)
    
    if score == len(questions):
        print("🌟 Perfect score! You're amazing!")
    elif score >= len(questions) // 2:
        print("👍 Good job! Keep it up!")
    else:
        print("💪 Keep practicing! You'll do better next time!")

def get_response(user_input):
    """Generate response based on user input"""
    global joke_step
    
    user_input = clean_input(user_input)
    
    # Greetings
    if compare_keywords(user_input, "hi") or compare_keywords(user_input, "hello") or compare_keywords(user_input, "hey"):
        return "Hello! How can I assist you today? Type 'help' to see what I can do, or 'exit' to end conversation."
    
    # Help
    elif compare_keywords(user_input, "help") or compare_keywords(user_input, "suggest"):
        return """
I can help with the following:
• Start a quiz (type 'quiz')
• Tell a joke (type 'jokes' or 'tell me a joke')
• Perform basic math calculations (type 'calculate' or 'math')
• Show current time (type 'time')
• Answer general questions

What would you like to do?"""
    
    # About bot
    elif compare_keywords(user_input, "what's your name") or compare_keywords(user_input, "what is your name"):
        return "I'm Bot, your friendly chatbot! 🤖"
    
    elif compare_keywords(user_input, "how are you"):
        return "I'm doing great, thank you! How can I assist you today?"
    
    elif compare_keywords(user_input, "how old are you"):
        return "I was never born, I was created! Age is just a number for bots. 😊"
    
    # Quiz
    elif compare_keywords(user_input, "quiz"):
        return "QUIZ"
    
    # Jokes
    elif compare_keywords(user_input, "joke") or compare_keywords(user_input, "jokes"):
        return tell_joke()
    
    elif (compare_keywords(user_input, "why") or compare_keywords(user_input, "what")) and joke_step == 1:
        return continue_joke()
    
    # Calculator
    elif compare_keywords(user_input, "calculate") or compare_keywords(user_input, "calculator") or compare_keywords(user_input, "math"):
        return "CALCULATOR"
    
    # Time
    elif compare_keywords(user_input, "time") or compare_keywords(user_input, "what's the time"):
        return f"The current time is: {datetime.now().strftime('%A, %B %d, %Y %I:%M:%S %p')}"
    
    # Weather
    elif compare_keywords(user_input, "weather"):
        return "I'm not connected to the internet, but you can check a weather app for the latest updates! ☀️"
    
    # Exit
    elif compare_keywords(user_input, "exit") or compare_keywords(user_input, "bye") or compare_keywords(user_input, "quit"):
        return "EXIT"
    
    # Default
    else:
        return """Sorry, I don't understand that. Here's what I can do:
• Start a quiz (type 'quiz')
• Tell a joke (type 'jokes')
• Perform basic math calculations (type 'calculate')
• Show current time (type 'time')
• Answer general questions (try 'help')"""

def main():
    """Main chatbot loop"""
    print("\n" + "="*60)
    print("🤖 WELCOME TO THE INTERACTIVE CHATBOT!")
    print("="*60)
    print("\nHello! I'm your friendly chatbot. I can:")
    print("  • Tell jokes")
    print("  • Run quizzes")
    print("  • Do calculations")
    print("  • Show the time")
    print("  • Have conversations")
    print("\nType 'help' to see all commands or 'exit' to quit.")
    print("="*60 + "\n")
    
    calculator_mode = False
    
    while True:
        if calculator_mode:
            user_input = input("Calculator> Enter expression (or 'back' to exit): ")
            if user_input.lower() == 'back':
                calculator_mode = False
                print("Exiting calculator mode.\n")
                continue
            
            result = calculate(user_input)
            print(f"Bot: {result}\n")
            continue
        
        user_input = input("You: ")
        
        if not user_input.strip():
            continue
        
        response = get_response(user_input)
        
        # Handle special responses
        if response == "EXIT":
            print("\nBot: Goodbye! Have a great day! 👋\n")
            print("="*60)
            break
        
        elif response == "QUIZ":
            start_quiz()
            print("\nWould you like to do something else?")
            continue
        
        elif response == "CALCULATOR":
            print("\nBot: Sure! I can help with basic arithmetic (+, -, *, /)")
            print("Enter expressions like: 5 + 3, 10 * 2, 15 / 3, etc.\n")
            calculator_mode = True
            continue
        
        else:
            print(f"Bot: {response}\n")

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\nBot: Interrupted! Goodbye! 👋\n")
    except Exception as e:
        print(f"\nAn error occurred: {e}")
