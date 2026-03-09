# Temperature Converter (CLI)

## Project Description

This project is a command-line temperature converter that supports Celsius ↔ Fahrenheit conversion with basic input validation and a menu-driven interface. The folder also contains a small bonus CLI program: a simple task manager.

## Features

- Menu-driven CLI
- Celsius to Fahrenheit conversion
- Fahrenheit to Celsius conversion
- Numeric input validation
- Bonus: task manager CLI (create/list/update/delete tasks)

## Technology Stack

- Python (standard library only)

## How to Run the Project

From the repository root:

```bash
cd projects/temperature-converter-cli
python src/celsius_to_fahrenheit.py
```

Bonus task manager:

```bash
python src/task_manager.py
```

## Example Output or Screenshots

Example session:

```
TEMPERATURE CONVERTER
1. Celsius to Fahrenheit
2. Fahrenheit to Celsius
3. Exit

Enter your choice (1-3): 1
Enter temperature in Celsius: 25
25.0°C = 77.00°F
```

## Project Structure (optional)

```
.
├── README.md
├── src/
│   ├── celsius_to_fahrenheit.py
│   └── task_manager.py
├── tests/
│   └── test_converter.py
└── screenshots/
```
