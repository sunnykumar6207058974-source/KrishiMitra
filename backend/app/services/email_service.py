import os
import smtplib
import logging
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from typing import Optional

from app.core.config import settings

logger = logging.getLogger("krishimitra.email")


def generate_welcome_email_html(
    full_name: str,
    district: str = "Assam",
    state: str = "Assam",
    preferred_language: str = "en"
) -> str:
    """Generate a responsive, beautifully styled HTML welcome email."""
    is_hindi = preferred_language == "hi"

    greeting = f"नमस्ते {full_name} जी!" if is_hindi else f"Namaste & Welcome, {full_name}!"
    subheading = (
        "कृषि मित्र (KrishiMitra) परिवार में आपका हार्दिक स्वागत है। हम वैज्ञानिक कृषि और तकनीक के माध्यम से आपकी खेती को समृद्ध बनाने के लिए समर्पित हैं।"
        if is_hindi
        else "Welcome to the KrishiMitra family! We are dedicated to bridging agricultural science with everyday decisions in your field."
    )

    portal_btn = "किसान डैशबोर्ड खोलें" if is_hindi else "Open Farmer Dashboard"
    portal_url = "https://krishimitra-wine-seven.vercel.app/app/dashboard"

    return f"""<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to KrishiMitra</title>
  <style>
    body {{
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      background-color: #f7faf5;
      color: #1f2937;
      margin: 0;
      padding: 0;
      line-height: 1.6;
    }}
    .container {{
      max-width: 600px;
      margin: 24px auto;
      background: #ffffff;
      border-radius: 16px;
      overflow: hidden;
      border: 1px solid #e5e7eb;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
    }}
    .header {{
      background: linear-gradient(135deg, #166534 0%, #15803d 100%);
      color: #ffffff;
      padding: 32px 24px;
      text-align: center;
    }}
    .logo-text {{
      font-size: 26px;
      font-weight: 800;
      letter-spacing: -0.5px;
      margin: 0;
    }}
    .tagline {{
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: #dcfce7;
      margin-top: 6px;
      font-weight: 600;
    }}
    .content {{
      padding: 32px 24px;
    }}
    .greeting {{
      font-size: 20px;
      font-weight: 700;
      color: #166534;
      margin-top: 0;
      margin-bottom: 12px;
    }}
    .intro {{
      font-size: 14px;
      color: #4b5563;
      margin-bottom: 24px;
    }}
    .profile-card {{
      background: #f0fdf4;
      border: 1px solid #bbf7d0;
      border-radius: 12px;
      padding: 16px 20px;
      margin-bottom: 28px;
    }}
    .profile-title {{
      font-size: 13px;
      font-weight: 700;
      color: #166534;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 8px;
    }}
    .profile-row {{
      font-size: 13px;
      color: #374151;
      padding: 3px 0;
    }}
    .features-grid {{
      margin-bottom: 28px;
    }}
    .feature-item {{
      display: flex;
      gap: 12px;
      padding: 12px;
      background: #fafaf9;
      border: 1px solid #f3f4f6;
      border-radius: 10px;
      margin-bottom: 10px;
    }}
    .feature-icon {{
      font-size: 20px;
    }}
    .feature-title {{
      font-size: 14px;
      font-weight: 700;
      color: #1f2937;
      margin: 0 0 2px 0;
    }}
    .feature-desc {{
      font-size: 12px;
      color: #6b7280;
      margin: 0;
    }}
    .btn-container {{
      text-align: center;
      margin: 32px 0 16px 0;
    }}
    .cta-btn {{
      background-color: #166534;
      color: #ffffff !important;
      padding: 14px 28px;
      border-radius: 10px;
      text-decoration: none;
      font-size: 14px;
      font-weight: 700;
      display: inline-block;
      box-shadow: 0 2px 8px rgba(22, 101, 52, 0.25);
    }}
    .support-note {{
      background: #f9fafb;
      border-radius: 10px;
      padding: 14px;
      font-size: 12px;
      color: #6b7280;
      text-align: center;
      margin-top: 24px;
      border: 1px dashed #e5e7eb;
    }}
    .footer {{
      background: #f9fafb;
      padding: 20px 24px;
      text-align: center;
      font-size: 11px;
      color: #9ca3af;
      border-top: 1px solid #f3f4f6;
    }}
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 class="logo-text">🌾 KrishiMitra</h1>
      <div class="tagline">Assam & National Smart Agriculture Platform</div>
    </div>

    <div class="content">
      <h2 class="greeting">{greeting}</h2>
      <p class="intro">{subheading}</p>

      <div class="profile-card">
        <div class="profile-title">📋 Your Registered Details | किसान विवरण</div>
        <div class="profile-row"><strong>Farmer Name:</strong> {full_name}</div>
        <div class="profile-row"><strong>Region / District:</strong> {district}, {state}</div>
        <div class="profile-row"><strong>Preferred Language:</strong> {"हिन्दी (Hindi)" if is_hindi else "English"}</div>
      </div>

      <div class="features-grid">
        <div class="feature-item">
          <div class="feature-icon">🤖</div>
          <div>
            <div class="feature-title">Krishi AI Farming Assistant</div>
            <div class="feature-desc">Ask agronomy questions grounded in verified ICAR & AAU packages of practices.</div>
          </div>
        </div>

        <div class="feature-item">
          <div class="feature-icon">🗓️</div>
          <div>
            <div class="feature-title">Crop Calendar & Activity Tracker</div>
            <div class="feature-desc">Timely alerts for sowing, weeding, urea top-dressing, and crop protection.</div>
          </div>
        </div>

        <div class="feature-item">
          <div class="feature-icon">🧪</div>
          <div>
            <div class="feature-title">Soil Health Card Analyzer</div>
            <div class="feature-desc">Upload soil tests to get personalized NPK dosages and soil acidity management.</div>
          </div>
        </div>

        <div class="feature-item">
          <div class="feature-icon">📈</div>
          <div>
            <div class="feature-title">Live APMC Mandi & Agromet Weather</div>
            <div class="feature-desc">Real-time market price discovery and passing rain advisories directly for your district.</div>
          </div>
        </div>
      </div>

      <div class="btn-container">
        <a href="{portal_url}" class="cta-btn" target="_blank">{portal_btn} →</a>
      </div>

      <div class="support-note">
        📞 <strong>Farmer Helpline:</strong> National Kisan Call Centre: <strong>1800-180-1551</strong> (Toll-Free, 6 AM – 10 PM)
      </div>
    </div>

    <div class="footer">
      © 2026 KrishiMitra. Grounded in ICAR research publications & Assam agronomy standards.<br>
      This email was sent to your registered email address on KrishiMitra.
    </div>
  </div>
</body>
</html>
"""


def send_welcome_email(
    to_email: str,
    full_name: str,
    district: str = "Assam",
    state: str = "Assam",
    preferred_language: str = "en"
) -> bool:
    """
    Send a welcoming email to a newly registered user.
    If SMTP credentials are not configured, it logs the simulated delivery safely
    so registration NEVER fails.
    """
    if not to_email:
        return False

    subject = (
        f"🌾 कृषि मित्र में आपका स्वागत है, {full_name}! | Welcome to KrishiMitra"
        if preferred_language == "hi"
        else f"🌾 Welcome to KrishiMitra, {full_name}! Your Smart Farming Assistant"
    )

    html_content = generate_welcome_email_html(
        full_name=full_name,
        district=district,
        state=state,
        preferred_language=preferred_language
    )

    # Check if SMTP configuration is provided
    smtp_host = getattr(settings, "SMTP_HOST", "")
    smtp_user = getattr(settings, "SMTP_USER", "")
    smtp_password = getattr(settings, "SMTP_PASSWORD", "")
    smtp_port = getattr(settings, "SMTP_PORT", 587)
    from_email = getattr(settings, "EMAILS_FROM_EMAIL", "support@krishimitra.org")
    from_name = getattr(settings, "EMAILS_FROM_NAME", "KrishiMitra Smart Agriculture")

    if not smtp_host or not smtp_user:
        # Safe fallback: Log the email simulation
        logger.info(
            f"[EMAIL SERVICE] SMTP not configured. Welcome email simulated successfully for: {to_email} "
            f"(Farmer: {full_name}, Region: {district}, {state})"
        )
        return True

    try:
        msg = MIMEMultipart("alternative")
        msg["Subject"] = subject
        msg["From"] = f"{from_name} <{from_email}>"
        msg["To"] = to_email

        # Attach text fallback and HTML
        text_fallback = (
            f"Namaste {full_name}!\n\nWelcome to KrishiMitra, your smart agriculture assistant.\n"
            f"Access your dashboard here: https://krishimitra-wine-seven.vercel.app/app/dashboard\n\n"
            f"Kisan Helpline: 1800-180-1551"
        )
        msg.attach(MIMEText(text_fallback, "plain", "utf-8"))
        msg.attach(MIMEText(html_content, "html", "utf-8"))

        use_tls = getattr(settings, "SMTP_TLS", True)
        if smtp_port == 465:
            with smtplib.SMTP_SSL(smtp_host, smtp_port, timeout=10) as server:
                server.login(smtp_user, smtp_password)
                server.sendmail(from_email, [to_email], msg.as_string())
        else:
            with smtplib.SMTP(smtp_host, smtp_port, timeout=10) as server:
                if use_tls:
                    server.starttls()
                server.login(smtp_user, smtp_password)
                server.sendmail(from_email, [to_email], msg.as_string())

        logger.info(f"[EMAIL SERVICE] Successfully sent welcome email to {to_email}")
        return True
    except Exception as e:
        logger.error(f"[EMAIL SERVICE] Failed to deliver welcome email to {to_email}: {e}")
        # Return False but never re-raise to protect user registration
        return False
