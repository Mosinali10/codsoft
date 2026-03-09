import streamlit as st

# Page configuration
st.set_page_config(
    page_title="Temperature Converter",
    page_icon="🌡️",
    layout="centered",
    initial_sidebar_state="collapsed"
)

# Custom CSS for clean, professional design
st.markdown("""
    <style>
    /* Import Google Fonts */
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
    
    /* Global Styles */
    * {
        font-family: 'Inter', sans-serif;
    }
    
    .main {
        background-color: #f5f7fa;
        padding: 2rem 1rem;
    }
    
    /* Header */
    .header {
        text-align: center;
        padding: 2rem 0 1rem 0;
        background: white;
        border-radius: 10px;
        margin-bottom: 2rem;
        box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    }
    
    .header h1 {
        color: #2c5f2d;
        font-size: 2rem;
        font-weight: 700;
        margin: 0;
    }
    
    .header p {
        color: #666;
        font-size: 1rem;
        margin-top: 0.5rem;
    }
    
    /* Converter Box */
    .converter-box {
        background: white;
        border-radius: 10px;
        padding: 2.5rem;
        box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        margin-bottom: 2rem;
    }
    
    /* Input styling */
    .stNumberInput > div > div > input {
        font-size: 1.2rem;
        font-weight: 500;
        border: 2px solid #e0e0e0;
        border-radius: 6px;
        padding: 0.75rem;
        background: #fafafa;
    }
    
    .stNumberInput > div > div > input:focus {
        border-color: #2c5f2d;
        background: white;
    }
    
    /* Labels */
    label {
        font-weight: 600;
        color: #333;
        font-size: 0.95rem;
    }
    
    /* Button styling */
    .stButton > button {
        width: 100%;
        background-color: #2c5f2d;
        color: white;
        font-weight: 600;
        font-size: 1rem;
        padding: 0.75rem 2rem;
        border-radius: 6px;
        border: none;
        transition: all 0.2s ease;
    }
    
    .stButton > button:hover {
        background-color: #234d24;
        box-shadow: 0 4px 12px rgba(44, 95, 45, 0.3);
    }
    
    /* Result box */
    .result-box {
        background: #f0f9f0;
        border-left: 4px solid #2c5f2d;
        padding: 1.5rem;
        border-radius: 6px;
        margin-top: 1.5rem;
    }
    
    .result-label {
        color: #666;
        font-size: 0.9rem;
        margin-bottom: 0.5rem;
    }
    
    .result-value {
        color: #2c5f2d;
        font-size: 2rem;
        font-weight: 700;
    }
    
    /* Info section */
    .info-section {
        background: white;
        border-radius: 10px;
        padding: 2rem;
        box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        margin-top: 2rem;
    }
    
    .info-section h3 {
        color: #2c5f2d;
        font-size: 1.3rem;
        font-weight: 600;
        margin-bottom: 1rem;
    }
    
    .info-section p {
        color: #555;
        line-height: 1.6;
        margin: 0.5rem 0;
    }
    
    .formula-box {
        background: #fafafa;
        border: 1px solid #e0e0e0;
        border-radius: 6px;
        padding: 1rem;
        margin: 1rem 0;
        font-family: 'Courier New', monospace;
        color: #333;
    }
    
    /* Reference table */
    .ref-table {
        width: 100%;
        border-collapse: collapse;
        margin: 1rem 0;
    }
    
    .ref-table th {
        background: #f5f7fa;
        padding: 0.75rem;
        text-align: left;
        font-weight: 600;
        color: #333;
        border-bottom: 2px solid #e0e0e0;
    }
    
    .ref-table td {
        padding: 0.75rem;
        border-bottom: 1px solid #f0f0f0;
        color: #555;
    }
    
    /* Hide Streamlit branding */
    #MainMenu {visibility: hidden;}
    footer {visibility: hidden;}
    .stDeployButton {display: none;}
    
    /* Divider */
    hr {
        border: none;
        border-top: 1px solid #e0e0e0;
        margin: 2rem 0;
    }
    </style>
""", unsafe_allow_html=True)

# Header
st.markdown("""
    <div class="header">
        <h1>🌡️ Convert Celsius to Fahrenheit</h1>
        <p>Simple and accurate temperature conversion tool</p>
    </div>
""", unsafe_allow_html=True)

# Conversion functions
def celsius_to_fahrenheit(celsius):
    return (celsius * 9/5) + 32

def fahrenheit_to_celsius(fahrenheit):
    return (fahrenheit - 32) * 5/9

# Main converter
st.markdown('<div class="converter-box">', unsafe_allow_html=True)

# Create two columns
col1, col2 = st.columns(2, gap="medium")

with col1:
    st.markdown("### Celsius → Fahrenheit")
    celsius_input = st.number_input(
        "From: Celsius (°C)",
        value=0.0,
        step=1.0,
        format="%.2f",
        key="celsius"
    )
    
    if st.button("Convert to Fahrenheit", key="c_to_f", use_container_width=True):
        fahrenheit_result = celsius_to_fahrenheit(celsius_input)
        st.markdown(f"""
            <div class="result-box">
                <div class="result-label">To: Fahrenheit (°F)</div>
                <div class="result-value">{fahrenheit_result:.2f}°F</div>
            </div>
        """, unsafe_allow_html=True)

with col2:
    st.markdown("### Fahrenheit → Celsius")
    fahrenheit_input = st.number_input(
        "From: Fahrenheit (°F)",
        value=32.0,
        step=1.0,
        format="%.2f",
        key="fahrenheit"
    )
    
    if st.button("Convert to Celsius", key="f_to_c", use_container_width=True):
        celsius_result = fahrenheit_to_celsius(fahrenheit_input)
        st.markdown(f"""
            <div class="result-box">
                <div class="result-label">To: Celsius (°C)</div>
                <div class="result-value">{celsius_result:.2f}°C</div>
            </div>
        """, unsafe_allow_html=True)

st.markdown('</div>', unsafe_allow_html=True)

# Quick Reference
st.markdown("""
    <div class="info-section">
        <h3>📊 Quick Reference</h3>
        <table class="ref-table">
            <tr>
                <th>Celsius (°C)</th>
                <th>Fahrenheit (°F)</th>
                <th>Description</th>
            </tr>
            <tr>
                <td>-40</td>
                <td>-40</td>
                <td>Extremely cold</td>
            </tr>
            <tr>
                <td>0</td>
                <td>32</td>
                <td>Water freezes</td>
            </tr>
            <tr>
                <td>25</td>
                <td>77</td>
                <td>Room temperature</td>
            </tr>
            <tr>
                <td>37</td>
                <td>98.6</td>
                <td>Body temperature</td>
            </tr>
            <tr>
                <td>100</td>
                <td>212</td>
                <td>Water boils</td>
            </tr>
        </table>
    </div>
""", unsafe_allow_html=True)

# Formulas
st.markdown("""
    <div class="info-section">
        <h3>📐 Conversion Formulas</h3>
        
        <p><strong>Celsius to Fahrenheit:</strong></p>
        <div class="formula-box">°F = (°C × 9/5) + 32</div>
        <p>Example: 25°C = (25 × 9/5) + 32 = 77°F</p>
        
        <hr>
        
        <p><strong>Fahrenheit to Celsius:</strong></p>
        <div class="formula-box">°C = (°F - 32) × 5/9</div>
        <p>Example: 77°F = (77 - 32) × 5/9 = 25°C</p>
    </div>
""", unsafe_allow_html=True)

# About section
st.markdown("""
    <div class="info-section">
        <h3>ℹ️ About Temperature Scales</h3>
        <p><strong>Celsius:</strong> The Celsius scale is based on the freezing point (0°C) and boiling point (100°C) of water at standard atmospheric pressure.</p>
        <p><strong>Fahrenheit:</strong> The Fahrenheit scale sets the freezing point of water at 32°F and the boiling point at 212°F.</p>
        <p><strong>Fun Fact:</strong> -40°C and -40°F are the same temperature - the only point where both scales meet!</p>
    </div>
""", unsafe_allow_html=True)
