# 🌡️ Temperature Converter Web App

A modern, interactive web application for converting temperatures between Celsius and Fahrenheit scales.

![Temperature Converter](https://img.shields.io/badge/Streamlit-FF4B4B?style=for-the-badge&logo=Streamlit&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)

## 📋 Problem Statement

Temperature conversion is a common need in daily life, science, and international communication. This web app provides an instant, accurate, and user-friendly solution for converting between Celsius and Fahrenheit temperature scales.

## ✨ Features

- **Bidirectional Conversion**: Convert from Celsius to Fahrenheit and vice versa
- **Real-time Results**: Instant conversion as you input values
- **Visual Design**: Modern, gradient-based UI with intuitive layout
- **Reference Points**: Displays common temperature references (freezing, boiling, body temp)
- **Formula Display**: Shows the mathematical formulas used
- **Quick Reference Table**: Common temperature conversions at a glance
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## 🛠️ Technologies Used

- **Python 3.8+**
- **Streamlit** - Web framework for data apps
- **HTML/CSS** - Custom styling

## 📦 Installation

### Prerequisites
- Python 3.8 or higher
- pip (Python package manager)

### Steps

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/codsoft-projects.git
cd codsoft-projects/temperature-converter
```

2. **Install dependencies**
```bash
pip install -r requirements.txt
```

## 🚀 How to Run

### Local Development
```bash
streamlit run app.py
```

The app will open in your default browser at `http://localhost:8501`

### Using Python directly
```bash
python -m streamlit run app.py
```

## 📸 Screenshots

![Temperature Converter Interface](screenshots/main-interface.png)
*Main conversion interface with dual input fields*

![Conversion Result](screenshots/conversion-result.png)
*Real-time conversion with reference information*

## 🎯 How to Use

1. **Choose Conversion Direction**:
   - Left column: Celsius to Fahrenheit
   - Right column: Fahrenheit to Celsius

2. **Enter Temperature**:
   - Type or use arrows to input temperature value

3. **Click Convert**:
   - Click the conversion button to see results

4. **View Results**:
   - Result displayed in a highlighted box
   - Reference information shown for common temperatures

5. **Quick Reference**:
   - Check the reference table for common conversions
   - Expand formula section to see conversion math

## 📐 Conversion Formulas

**Celsius to Fahrenheit:**
```
°F = (°C × 9/5) + 32
```

**Fahrenheit to Celsius:**
```
°C = (°F - 32) × 5/9
```

## 🌐 Deployment

### Deploy to Streamlit Cloud

1. Push your code to GitHub
2. Go to [share.streamlit.io](https://share.streamlit.io)
3. Connect your GitHub repository
4. Select `temperature-converter/app.py`
5. Click "Deploy"

### Deploy to Render

1. Create a `render.yaml` file:
```yaml
services:
  - type: web
    name: temperature-converter
    env: python
    buildCommand: pip install -r requirements.txt
    startCommand: streamlit run app.py --server.port $PORT
```

2. Connect to Render and deploy

### Deploy to Hugging Face Spaces

1. Create a new Space on Hugging Face
2. Select "Streamlit" as SDK
3. Upload your files
4. Space will auto-deploy

## 🔮 Future Improvements

- [ ] Add Kelvin temperature scale
- [ ] Add Rankine temperature scale
- [ ] Temperature history tracking
- [ ] Batch conversion from CSV
- [ ] Temperature range validation
- [ ] Scientific notation support
- [ ] Dark mode toggle
- [ ] Multi-language support
- [ ] Temperature unit converter (Celsius, Fahrenheit, Kelvin, Rankine)
- [ ] Weather API integration for real-time temperatures
- [ ] Export results to PDF
- [ ] Voice input for temperature values

## 📊 Project Structure

```
temperature-converter/
├── app.py                 # Main Streamlit application
├── requirements.txt       # Python dependencies
├── README.md             # Project documentation
└── screenshots/          # Application screenshots
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 👤 Author

**Mosin Ali**
- CodSoft Internship Project
- Task: Temperature Converter Web Application

## 📄 License

This project is part of the CodSoft internship program.

## 🙏 Acknowledgments

- CodSoft for the internship opportunity
- Streamlit for the amazing framework
- The open-source community

---

<div align="center">
  <p>Built with ❤️ using Streamlit</p>
  <p>⭐ Star this repo if you find it helpful!</p>
</div>
