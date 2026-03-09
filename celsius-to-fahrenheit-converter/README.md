# 🌡️ Temperature Converter

A simple and user-friendly command-line tool for converting temperatures between Celsius and Fahrenheit.

## 📋 Description

This Python application provides an interactive interface for converting temperatures between Celsius and Fahrenheit scales. It features input validation, formatted output, and a clean menu-driven interface.

## 🛠️ Technologies Used

- **Python 3.x**
- Standard library only (no external dependencies)

## ✨ Features

- **Bidirectional Conversion**
  - Celsius to Fahrenheit
  - Fahrenheit to Celsius
- **User-Friendly Interface**
  - Clear menu system
  - Formatted output with symbols
  - Input validation
- **Error Handling**
  - Validates numeric input
  - Handles invalid menu choices
- **Continuous Operation**
  - Option to perform multiple conversions
  - Clean exit option

## 🚀 How to Run

### Prerequisites

- Python 3.x installed on your system

### Running the Program

```bash
python celsius_to_fahrenheit.py
```

### Usage Example

```
🌡️  Welcome to the Temperature Converter! 🌡️

==================================================
  TEMPERATURE CONVERTER
==================================================
1. Celsius to Fahrenheit
2. Fahrenheit to Celsius
3. Exit
==================================================

Enter your choice (1-3): 1

Enter temperature in Celsius: 25

✓ 25.0°C = 77.00°F

Convert another temperature? (y/n): y
```

## 📐 Conversion Formulas

### Celsius to Fahrenheit
```
°F = (°C × 9/5) + 32
```

### Fahrenheit to Celsius
```
°C = (°F - 32) × 5/9
```

## 🎯 Key Functions

- `celsius_to_fahrenheit(celsius)` - Converts Celsius to Fahrenheit
- `fahrenheit_to_celsius(fahrenheit)` - Converts Fahrenheit to Celsius
- `get_temperature_input(unit)` - Handles user input with validation
- `display_menu()` - Shows the main menu
- `main()` - Main program loop

## 📈 Future Improvements

- [ ] Add Kelvin temperature scale
- [ ] Add Rankine temperature scale
- [ ] Create GUI version using Tkinter
- [ ] Add temperature history tracking
- [ ] Implement batch conversion from file
- [ ] Add unit tests
- [ ] Create web version using Flask
- [ ] Add temperature range validation (absolute zero check)
- [ ] Support for scientific notation input
- [ ] Add common temperature reference points (water freezing/boiling, body temp, etc.)

## 💡 Additional Features

### Task Manager (Bonus)

This project also includes a task manager application (`task_manager.py`) that was originally misnamed. It provides:
- Create, view, update, and delete tasks
- Task persistence using file storage
- Date tracking for tasks

To run the task manager:
```bash
python task_manager.py
```

## 👤 Author

**Mosin Ali**  
CodSoft Internship Project

## 📄 License

This project is part of the CodSoft internship program.

---

*Simple, clean, and effective temperature conversion!*
