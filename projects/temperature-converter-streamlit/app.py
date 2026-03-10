import streamlit as st

# Page configuration
st.set_page_config(
    page_title="Temperature Converter",
    page_icon="°C",
    layout="centered",
    initial_sidebar_state="collapsed"
)

# Design System Tokens
ACCENT = "#22C55E"
BG = "#FFFFFF"
SURFACE = "#F8FAFC"
TEXT = "#0F172A"
BORDER = "#E2E8F0"
MUTED = "#64748B"

# Logic for temperature messages
def get_temp_context(celsius):
    if abs(celsius - 0) < 0.1:
        return "Freezing point of water"
    elif abs(celsius - 20) < 0.1:
        return "Room temperature"
    elif abs(celsius - 37) < 0.1:
        return "Human body temperature"
    elif abs(celsius - 100) < 0.1:
        return "Boiling point of water"
    return None

# Custom CSS for the 600px centered card and SaaS style
st.markdown(
    f"""
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

      html, body, [class*="css"], .stMarkdown, p, h1, h2, h3, label {{
        font-family: 'Inter', sans-serif !important;
        color: {TEXT} !important;
      }}

      .stApp {{
        background: {BG};
      }}

      /* Center and constraint main container */
      .block-container {{
        max-width: 600px !important;
        padding-top: 2rem;
      }}

      .calc-card {{
        background: {SURFACE};
        border: 1px solid {BORDER};
        border-radius: 20px;
        padding: 32px;
        box-shadow: 0 4px 20px rgba(15, 23, 42, 0.04);
      }}

      .title {{
        font-size: 1.5rem;
        font-weight: 700;
        margin-bottom: 8px;
        letter-spacing: -0.02em;
        text-align: center;
      }}

      .section-divider {{
        height: 1px;
        background: {BORDER};
        margin: 24px 0;
      }}

      .result-box {{
        background: {BG};
        border: 1px solid {BORDER};
        border-radius: 12px;
        padding: 16px;
        margin-top: 12px;
        text-align: center;
        animation: fadeIn 0.3s ease;
      }}

      .result-val {{
        font-size: 1.75rem;
        font-weight: 700;
        color: {TEXT};
      }}

      .context-msg {{
        color: {ACCENT};
        font-size: 0.9rem;
        font-weight: 500;
        margin-top: 4px;
      }}

      @keyframes fadeIn {{
        from {{ opacity: 0; transform: translateY(4px); }}
        to {{ opacity: 1; transform: translateY(0); }}
      }}

      /* Inputs */
      .stNumberInput div[data-baseweb="input"] {{
        border-radius: 10px !important;
        border: 1px solid {BORDER} !important;
        background: {BG} !important;
      }}
      .stNumberInput input {{
        color: {TEXT} !important;
      }}
      /* Remove red border on focus/error if any */
      .stNumberInput div[data-baseweb="input"]:focus-within {{
        border-color: {ACCENT} !important;
        box-shadow: none !important;
      }}

      /* Buttons */
      .stButton > button {{
        border-radius: 10px;
        border: 1px solid {BORDER};
        background: {BG};
        color: {TEXT};
        padding: 0.6rem 1rem;
        font-weight: 600;
        transition: all 0.2s ease;
        margin-top: 8px;
        width: 100%;
      }}
      .stButton > button:hover {{
        border-color: {ACCENT};
        background: rgba(34, 197, 94, 0.04);
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(34, 197, 94, 0.08);
      }}

      /* Hide Streamlit elements */
      #MainMenu, footer, .stDeployButton {{visibility: hidden;}}
    </style>
    """,
    unsafe_allow_html=True,
)

# App Content
st.markdown('<div class="calc-card">', unsafe_allow_html=True)
st.markdown('<h1 class="title">Temperature Converter</h1>', unsafe_allow_html=True)
st.markdown(f'<p style="text-align:center; color:{MUTED}; margin-bottom:24px;">Simple, professional temperature tools</p>', unsafe_allow_html=True)

# 1. Celsius to Fahrenheit
st.markdown("### Celsius → Fahrenheit")
c_val = st.number_input("Celsius (°C)", value=0.0, step=1.0, format="%.1f", key="c_in")
if st.button("Convert to Fahrenheit", key="c_btn"):
    f_res = (c_val * 9/5) + 32
    ctx = get_temp_context(c_val)
    st.markdown(
        f"""
        <div class="result-box">
            <div class="result-val">{f_res:.1f}°F</div>
            {f'<div class="context-msg">{ctx}</div>' if ctx else ""}
        </div>
        """, 
        unsafe_allow_html=True
    )

st.markdown('<div class="section-divider"></div>', unsafe_allow_html=True)

# 2. Fahrenheit to Celsius
st.markdown("### Fahrenheit → Celsius")
f_val = st.number_input("Fahrenheit (°F)", value=32.0, step=1.0, format="%.1f", key="f_in")
if st.button("Convert to Celsius", key="f_btn"):
    c_res = (f_val - 32) * 5/9
    ctx = get_temp_context(c_res)
    st.markdown(
        f"""
        <div class="result-box">
            <div class="result-val">{c_res:.1f}°C</div>
            {f'<div class="context-msg">{ctx}</div>' if ctx else ""}
        </div>
        """, 
        unsafe_allow_html=True
    )

st.markdown('</div>', unsafe_allow_html=True)
