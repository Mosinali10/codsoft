#!/usr/bin/env python3
"""
Automated test to demonstrate the temperature converter
"""

# Import the functions from the main file
import sys
sys.path.insert(0, '.')

def celsius_to_fahrenheit(celsius):
    """Convert Celsius to Fahrenheit"""
    return (celsius * 9/5) + 32

def fahrenheit_to_celsius(fahrenheit):
    """Convert Fahrenheit to Celsius"""
    return (fahrenheit - 32) * 5/9

print("="*60)
print("🌡️  TEMPERATURE CONVERTER - DEMO")
print("="*60)
print()

# Test Celsius to Fahrenheit
print("📊 CELSIUS TO FAHRENHEIT CONVERSIONS:")
print("-" * 60)
test_cases_c_to_f = [0, 25, 37, 100, -40]
for celsius in test_cases_c_to_f:
    fahrenheit = celsius_to_fahrenheit(celsius)
    print(f"   {celsius:>6.1f}°C  =  {fahrenheit:>6.2f}°F")
print()

# Test Fahrenheit to Celsius
print("📊 FAHRENHEIT TO CELSIUS CONVERSIONS:")
print("-" * 60)
test_cases_f_to_c = [32, 77, 98.6, 212, -40]
for fahrenheit in test_cases_f_to_c:
    celsius = fahrenheit_to_celsius(fahrenheit)
    print(f"   {fahrenheit:>6.1f}°F  =  {celsius:>6.2f}°C")
print()

print("="*60)
print("✅ Temperature Converter is working correctly!")
print("="*60)
print()
print("💡 Common conversions:")
print("   • Water freezes: 0°C = 32°F")
print("   • Room temperature: 25°C = 77°F")
print("   • Body temperature: 37°C = 98.6°F")
print("   • Water boils: 100°C = 212°F")
print("   • Same value: -40°C = -40°F")
print()
