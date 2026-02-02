# Telemedicine Web Application (Python/Flask)

A comprehensive telemedicine platform built with Python Flask for rural healthcare access.

## Features

- **Landing Page**: Modern, responsive design with hero section
- **Patient Portal**: Login, dashboard, book consultations, view prescriptions
- **Doctor Portal**: Manage appointments, patient records, write prescriptions    
- **Video Consultations**: Real-time video calls with chat functionality
- **AI Symptom Checker**: AI-powered symptom analysis  
- **Multi-language Support**: English, Hindi, and regional languages
- **Health Tips Blog**: Educational content for patients

## Installation

1. Install Python 3.8 or higher

2. Install dependencies:
\`\`\`bash
pip install -r requirements.txt
\`\`\`

3. Set environment variables:
\`\`\`bash
export SECRET_KEY="your-secret-key-here"
export OPENAI_API_KEY="your-openai-api-key"  # For AI features
\`\`\`

4. Run the application:
\`\`\`bash
python app.py
\`\`\`

5. Open your browser and navigate to:
\`\`\`
http://localhost:5000
\`\`\`

## Project Structure

\`\`\`
telemedicine-app/
├── app.py                 # Main Flask application
├── requirements.txt       # Python dependencies
├── templates/            # HTML templates
│   ├── base.html
│   ├── index.html
│   ├── patient/
│   │   ├── login.html
│   │   ├── dashboard.html
│   │   └── ...
│   ├── doctor/
│   │   ├── login.html
│   │   ├── dashboard.html
│   │   └── ...
│   └── consultation/
│       └── room.html
└── static/              # Static files (CSS, JS, images)
    └── images/
\`\`\`

## Technology Stack

- **Backend**: Flask (Python)
- **Frontend**: HTML, Tailwind CSS, Alpine.js
- **Real-time**: Flask-SocketIO
- **AI**: OpenAI API (for symptom checker)

## Usage

### For Patients:
1. Sign up at `/patient/signup`
2. Login at `/patient/login`
3. Book consultations, view prescriptions, manage health records

### For Doctors:
1. Login at `/doctor/login`
2. Manage appointments and patient records
3. Write digital prescriptions

## Production Deployment

For production deployment:
1. Use a production WSGI server (Gunicorn, uWSGI)
2. Set up a proper database (PostgreSQL, MySQL)
3. Configure environment variables securely
4. Use HTTPS for secure connections
5. Set up proper authentication and authorization
