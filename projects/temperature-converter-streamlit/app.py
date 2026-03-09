import streamlit as st

# Page configuration
st.set_page_config(
    page_title="Temperature Converter",
    page_icon="°C",
    layout="centered",
    initial_sidebar_state="collapsed"
)

ACCENT = "#F97316"
BG = "#FFFFFF"
SURFACE = "#F8FAFC"
TEXT = "#0F172A"
BORDER = "#E2E8F0"
MUTED = "#475569"

st.markdown(
    f"""
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

      html, body, [class*="css"] {{
        font-family: 'Inter', sans-serif;
        color: {TEXT};
      }}

      .stApp {{
        background: {BG};
      }}

      .block-container {{
        padding-top: 2.25rem;
        padding-bottom: 3rem;
        max-width: 900px;
      }}

      .header {{
        background: {SURFACE};
        border: 1px solid {BORDER};
        border-radius: 16px;
        padding: 18px 20px;
        box-shadow: 0 1px 2px rgba(15, 23, 42, 0.05);
        margin-bottom: 16px;
      }}
      .header h1 {{
        margin: 0;
        font-size: 1.35rem;
        font-weight: 700;
        letter-spacing: -0.02em;
      }}
      .header p {{
        margin: 6px 0 0 0;
        color: {MUTED};
        font-size: 0.95rem;
      }}

      .card {{
        background: {SURFACE};
        border: 1px solid {BORDER};
        border-radius: 16px;
        padding: 16px;
        box-shadow: 0 1px 2px rgba(15, 23, 42, 0.05);
        margin-top: 14px;
      }}

      .result-box {{
        background: {BG};
        border: 1px solid {BORDER};
        border-radius: 14px;
        padding: 14px 14px;
        margin-top: 10px;
      }}

      .result-label {{
        color: {MUTED};
        font-size: 0.9rem;
        margin-bottom: 6px;
      }}

      .result-value {{
        color: {TEXT};
        font-size: 1.8rem;
        font-weight: 700;
      }}

      .pill {{
        display: inline-flex;
        align-items: center;
        padding: 2px 10px;
        border-radius: 999px;
        border: 1px solid rgba(249, 115, 22, 0.30);
        background: rgba(249, 115, 22, 0.10);
        color: {TEXT};
        font-size: 0.85rem;
        font-weight: 600;
      }}

      /* Inputs */
      .stNumberInput input {{
        border-radius: 12px !important;
        border: 1px solid {BORDER} !important;
        background: {BG} !important;
      }}

      /* Buttons */
      .stButton > button {{
        border-radius: 12px;
        border: 1px solid {BORDER};
        background: {BG};
        color: {TEXT};
        padding: 0.6rem 0.85rem;
        font-weight: 650;
      }}
      .stButton > button:hover {{
        border-color: rgba(249, 115, 22, 0.35);
        background: rgba(249, 115, 22, 0.06);
      }}

      /* Hide Streamlit branding */
      #MainMenu {{visibility: hidden;}}
      footer {{visibility: hidden;}}
      .stDeployButton {{display: none;}}
    </style>
    """,
    unsafe_allow_html=True,
)

# Header
st.markdown(
    """
    <div class="header">
        <h1>Temperature Converter</h1>
        <p>Convert between Celsius and Fahrenheit.</p>
    </div>
    """,
    unsafe_allow_html=True,
)

# Conversion functions
def celsius_to_fahrenheit(celsius):
    return (celsius * 9/5) + 32

def fahrenheit_to_celsius(fahrenheit):
    return (fahrenheit - 32) * 5/9

# Main converter
st.markdown('<div class="card">', unsafe_allow_html=True)
col1, col2 = st.columns(2, gap="large")

with col1:
    st.markdown("#### Celsius to Fahrenheit")
    celsius_input = st.number_input("Celsius (°C)", value=0.0, step=1.0, format="%.2f", key="celsius")
    if st.button("Convert", key="c_to_f", use_container_width=True):
        fahrenheit_result = celsius_to_fahrenheit(celsius_input)
        st.markdown(
            f"""
            <div class="result-box">
              <div class="result-label">Result</div>
              <div class="result-value">{fahrenheit_result:.2f}°F</div>
            </div>
            """,
            unsafe_allow_html=True,
        )

with col2:
    st.markdown("#### Fahrenheit to Celsius")
    fahrenheit_input = st.number_input("Fahrenheit (°F)", value=32.0, step=1.0, format="%.2f", key="fahrenheit")
    if st.button("Convert", key="f_to_c", use_container_width=True):
        celsius_result = fahrenheit_to_celsius(fahrenheit_input)
        st.markdown(
            f"""
            <div class="result-box">
              <div class="result-label">Result</div>
              <div class="result-value">{celsius_result:.2f}°C</div>
            </div>
            """,
            unsafe_allow_html=True,
        )

st.markdown("</div>", unsafe_allow_html=True)

with st.expander("Reference", expanded=False):
    st.markdown(
        f"""
        <div class="card" style="margin-top:0;">
          <div style="display:flex; align-items:center; gap:10px; margin-bottom:10px;">
            <span class="pill">Common points</span>
          </div>
          <ul style="margin:0; padding-left:1.2rem; color:{MUTED}; line-height:1.8;">
            <li>-40°C = -40°F</li>
            <li>0°C = 32°F (water freezes)</li>
            <li>25°C = 77°F (room temperature)</li>
            <li>37°C = 98.6°F (body temperature)</li>
            <li>100°C = 212°F (water boils)</li>
          </ul>
          <div style="margin-top:14px; color:{MUTED};">
            <div><strong style="color:{TEXT};">C → F</strong>: °F = (°C × 9/5) + 32</div>
            <div><strong style="color:{TEXT};">F → C</strong>: °C = (°F − 32) × 5/9</div>
          </div>
        </div>
        """,
        unsafe_allow_html=True,
    )
