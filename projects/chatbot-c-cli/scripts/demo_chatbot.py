#!/usr/bin/env python3
"""
Automated Chatbot Demo
This script demonstrates all features of the chatbot automatically
"""

import time
import sys

def print_slow(text, delay=0.03):
    """Print text with a typing effect"""
    for char in text:
        sys.stdout.write(char)
        sys.stdout.flush()
        time.sleep(delay)
    print()

def demo_section(title):
    """Print a demo section header"""
    print("\n" + "="*70)
    print(f"  {title}")
    print("="*70 + "\n")
    time.sleep(1)

def simulate_conversation(user_input, bot_response):
    """Simulate a conversation exchange"""
    print(f"You: {user_input}")
    time.sleep(0.5)
    print(f"Bot: ", end="")
    print_slow(bot_response, 0.02)
    time.sleep(1)

def main():
    print("\n" + "🤖"*35)
    print_slow("        CHATBOT DEMONSTRATION - All Features Showcase", 0.05)
    print("🤖"*35 + "\n")
    time.sleep(2)
    
    # Introduction
    demo_section("1️⃣  INTRODUCTION & GREETINGS")
    simulate_conversation(
        "hi",
        "Hello! How can I assist you today? Type 'help' to see what I can do!"
    )
    
    simulate_conversation(
        "what's your name?",
        "I'm Bot, your friendly chatbot! 🤖"
    )
    
    simulate_conversation(
        "how are you?",
        "I'm doing great, thank you! How can I assist you today?"
    )
    
    # Help Menu
    demo_section("2️⃣  HELP MENU - Available Commands")
    simulate_conversation(
        "help",
        """I can help with the following:
• Start a quiz (type 'quiz')
• Tell a joke (type 'jokes' or 'tell me a joke')
• Perform basic math calculations (type 'calculate' or 'math')
• Show current time (type 'time')
• Answer general questions"""
    )
    
    # Jokes Feature
    demo_section("3️⃣  JOKE TELLING FEATURE")
    simulate_conversation(
        "tell me a joke",
        "Why don't programmers like nature?"
    )
    
    simulate_conversation(
        "why?",
        "It has too many bugs. 😄"
    )
    
    time.sleep(1)
    simulate_conversation(
        "another joke please",
        "Why did the scarecrow win an award?"
    )
    
    simulate_conversation(
        "what?",
        "Because he was outstanding in his field! 🌾"
    )
    
    # Calculator Feature
    demo_section("4️⃣  CALCULATOR FEATURE")
    simulate_conversation(
        "calculate",
        "Sure! I can help with basic arithmetic (+, -, *, /)"
    )
    
    print("\n📊 Calculator Mode Active:")
    calculations = [
        ("25 + 17", "Result: 42.00"),
        ("100 - 35", "Result: 65.00"),
        ("12 * 8", "Result: 96.00"),
        ("144 / 12", "Result: 12.00"),
    ]
    
    for calc, result in calculations:
        print(f"\nCalculator> {calc}")
        time.sleep(0.5)
        print(f"Bot: {result}")
        time.sleep(0.8)
    
    print("\nCalculator> back")
    time.sleep(0.5)
    print("Bot: Exiting calculator mode.\n")
    time.sleep(1)
    
    # Time Feature
    demo_section("5️⃣  TIME DISPLAY FEATURE")
    from datetime import datetime
    current_time = datetime.now().strftime('%A, %B %d, %Y %I:%M:%S %p')
    simulate_conversation(
        "what's the time?",
        f"The current time is: {current_time}"
    )
    
    # Quiz Feature
    demo_section("6️⃣  QUIZ GAME FEATURE")
    simulate_conversation(
        "quiz",
        "Starting the quiz..."
    )
    
    print("\n" + "="*50)
    print("🎮 LET'S START THE QUIZ!")
    print("="*50)
    print("Answer each question with the corresponding number.\n")
    time.sleep(1)
    
    quiz_questions = [
        {
            "q": "Question 1: What is 2 + 2?",
            "options": ["1) 3", "2) 4", "3) 5", "4) 6"],
            "answer": "2",
            "correct": True
        },
        {
            "q": "Question 2: How many sides does a triangle have?",
            "options": ["1) 2", "2) 3", "3) 4", "4) 5"],
            "answer": "2",
            "correct": True
        },
        {
            "q": "Question 3: What is the capital of France?",
            "options": ["1) London", "2) Paris", "3) Berlin", "4) Madrid"],
            "answer": "2",
            "correct": True
        }
    ]
    
    score = 0
    for q_data in quiz_questions:
        print(f"\n{q_data['q']}")
        for opt in q_data['options']:
            print(f"  {opt}")
        time.sleep(1)
        print(f"\nYour answer (1-4): {q_data['answer']}")
        time.sleep(0.5)
        if q_data['correct']:
            print("✓ Correct!")
            score += 1
        else:
            print("✗ Incorrect.")
        time.sleep(1)
    
    print("\n" + "="*50)
    print(f"🏆 Quiz Complete! Your score: {score}/{len(quiz_questions)}")
    print("="*50)
    print("🌟 Perfect score! You're amazing!")
    time.sleep(2)
    
    # Additional Features
    demo_section("7️⃣  OTHER FEATURES")
    
    simulate_conversation(
        "what's the weather like?",
        "I'm not connected to the internet, but you can check a weather app! ☀️"
    )
    
    simulate_conversation(
        "how old are you?",
        "I was never born, I was created! Age is just a number for bots. 😊"
    )
    
    # Conclusion
    demo_section("8️⃣  CONCLUSION")
    simulate_conversation(
        "exit",
        "Goodbye! Have a great day! 👋"
    )
    
    print("\n" + "="*70)
    print("                    ✨ DEMO COMPLETE ✨")
    print("="*70)
    print("\n📋 CHATBOT FEATURES DEMONSTRATED:")
    print("  ✅ Conversational responses")
    print("  ✅ Joke telling with two-part delivery")
    print("  ✅ Interactive quiz game with scoring")
    print("  ✅ Calculator for basic arithmetic")
    print("  ✅ Time display")
    print("  ✅ Help menu")
    print("  ✅ Keyword-based intent recognition")
    print("\n💡 To try it yourself, run: python chatbot_demo.py")
    print("="*70 + "\n")

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\nDemo interrupted!\n")
