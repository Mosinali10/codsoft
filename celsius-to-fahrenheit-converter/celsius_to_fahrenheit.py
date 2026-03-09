#!/usr/bin/env python3
"""
Celsius to Fahrenheit and Fahrenheit to Celsius Converter
A simple temperature conversion tool with a user-friendly interface
Author: Mosin Ali
"""

def celsius_to_fahrenheit(celsius):
    """Convert Celsius to Fahrenheit"""
    return (celsius * 9/5) + 32

def fahrenheit_to_celsius(fahrenheit):
    """Convert Fahrenheit to Celsius"""
    return (fahrenheit - 32) * 5/9

def display_menu():
    """Display the main menu"""
    print("\n" + "="*50)
    print("  TEMPERATURE CONVERTER")
    print("="*50)
    print("1. Celsius to Fahrenheit")
    print("2. Fahrenheit to Celsius")
    print("3. Exit")
    print("="*50)

def get_temperature_input(unit):
    """Get temperature input from user with validation"""
    while True:
        try:
            temp = float(input(f"\nEnter temperature in {unit}: "))
            return temp
        except ValueError:
            print("Invalid input! Please enter a numeric value.")

def main():
    """Main program loop"""
    print("\n🌡️  Welcome to the Temperature Converter! 🌡️")
    
    while True:
        display_menu()
        choice = input("\nEnter your choice (1-3): ").strip()
        
        if choice == '1':
            celsius = get_temperature_input("Celsius")
            fahrenheit = celsius_to_fahrenheit(celsius)
            print(f"\n✓ {celsius}°C = {fahrenheit:.2f}°F")
            
        elif choice == '2':
            fahrenheit = get_temperature_input("Fahrenheit")
            celsius = fahrenheit_to_celsius(fahrenheit)
            print(f"\n✓ {fahrenheit}°F = {celsius:.2f}°C")
            
        elif choice == '3':
            print("\n👋 Thank you for using Temperature Converter! Goodbye!")
            break
            
        else:
            print("\n❌ Invalid choice! Please select 1, 2, or 3.")
        
        # Ask if user wants to continue
        if choice in ['1', '2']:
            continue_choice = input("\nConvert another temperature? (y/n): ").strip().lower()
            if continue_choice != 'y':
                print("\n👋 Thank you for using Temperature Converter! Goodbye!")
                break

if __name__ == "__main__":
    main()
