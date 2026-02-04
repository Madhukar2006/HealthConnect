from flask import Flask, render_template, request, jsonify, session, redirect, url_for
from flask_socketio import SocketIO, emit, join_room, leave_room
from datetime import datetime, timedelta
import os
from functools import wraps

app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'dev-secret-key-change-in-production')
socketio = SocketIO(app, cors_allowed_origins="*")

# Mock database (in production, use PostgreSQL/MySQL)   
users = {}
appointments = []
prescriptions = []
health_records = []
medicine_orders = []

# Language translations
translations = {
    'en': {
        'hero_title': 'Bringing Healthcare Closer to Rural Communities',
        'hero_subtitle': 'Connect with qualified doctors through video consultations from the comfort of your home',
        'book_consultation': 'Book a Consultation',
        'login_doctor': 'Login as Doctor'
    },
    'hi': {
        'hero_title': 'ग्रामीण समुदायों के करीब स्वास्थ्य सेवा लाना',
        'hero_subtitle': 'अपने घर से वीडियो परामर्श के माध्यम से योग्य डॉक्टरों से जुड़ें',
        'book_consultation': 'परामर्श बुक करें',
        'login_doctor': 'डॉक्टर के रूप में लॉगिन करें'
    }
}

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'user_id' not in session:
            return redirect(url_for('patient_login'))
        return f(*args, **kwargs)
    return decorated_function

def doctor_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'doctor_id' not in session:
            return redirect(url_for('doctor_login'))
        return f(*args, **kwargs)
    return decorated_function

# Landing Page
@app.route('/')
def index():
    lang = request.args.get('lang', 'en')
    return render_template('index.html', translations=translations.get(lang, translations['en']), lang=lang)

# Patient Routes
@app.route('/patient/login', methods=['GET', 'POST'])
def patient_login():
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')
        # Mock authentication
        session['user_id'] = email
        session['user_name'] = 'Patient User'
        return redirect(url_for('patient_dashboard'))
    return render_template('patient/login.html')

@app.route('/patient/signup', methods=['GET', 'POST'])
def patient_signup():
    if request.method == 'POST':
        name = request.form.get('name')
        email = request.form.get('email')
        mobile = request.form.get('mobile')
        village = request.form.get('village')
        password = request.form.get('password')
        # Mock user creation
        users[email] = {
            'name': name,
            'email': email,
            'mobile': mobile,
            'village': village,
            'type': 'patient'
        }
        session['user_id'] = email
        session['user_name'] = name
        return redirect(url_for('patient_dashboard'))
    return render_template('patient/signup.html')

@app.route('/patient/dashboard')
@login_required
def patient_dashboard():
    upcoming_appointments = [
        {
            'id': 1,
            'doctor': 'Dr. Sarah Johnson',
            'specialty': 'General Physician',
            'date': 'Today',
            'time': '2:30 PM',
            'type': 'Video'
        }
    ]
    return render_template('patient/dashboard.html', 
                         user_name=session.get('user_name'),
                         appointments=upcoming_appointments)

@app.route('/patient/book')
@login_required
def patient_book():
    doctors = [
        {'id': 1, 'name': 'Dr. Sarah Johnson', 'specialty': 'General Physician', 'experience': '15 years', 'rating': 4.8, 'fee': 500},
        {'id': 2, 'name': 'Dr. Rajesh Kumar', 'specialty': 'Cardiologist', 'experience': '20 years', 'rating': 4.9, 'fee': 800},
        {'id': 3, 'name': 'Dr. Priya Sharma', 'specialty': 'Pediatrician', 'experience': '12 years', 'rating': 4.7, 'fee': 600},
    ]
    return render_template('patient/book.html', doctors=doctors)

@app.route('/patient/prescriptions')
@login_required
def patient_prescriptions():
    prescriptions_list = [
        {
            'id': 1,
            'doctor': 'Dr. Sarah Johnson',
            'date': '2025-03-01',
            'diagnosis': 'Common Cold',
            'medicines': [
                {'name': 'Paracetamol 500mg', 'dosage': '1-0-1', 'duration': '3 days'},
                {'name': 'Cetirizine 10mg', 'dosage': '0-0-1', 'duration': '5 days'}
            ]
        }
    ]
    return render_template('patient/prescriptions.html', prescriptions=prescriptions_list)

@app.route('/patient/records')
@login_required
def patient_records():
    records = [
        {'id': 1, 'type': 'Blood Test', 'date': '2025-02-15', 'doctor': 'Dr. Sarah Johnson'},
        {'id': 2, 'type': 'X-Ray', 'date': '2025-01-20', 'doctor': 'Dr. Rajesh Kumar'}
    ]
    return render_template('patient/records.html', records=records)

@app.route('/patient/orders')
@login_required
def patient_orders():
    orders = [
        {'id': 'ORD001', 'date': '2025-03-01', 'status': 'In Transit', 'items': 2, 'total': 450},
        {'id': 'ORD002', 'date': '2025-02-25', 'status': 'Delivered', 'items': 3, 'total': 680}
    ]
    return render_template('patient/orders.html', orders=orders)

# Doctor Routes
@app.route('/doctor/login', methods=['GET', 'POST'])
def doctor_login():
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')
        # Mock authentication
        session['doctor_id'] = email
        session['doctor_name'] = 'Dr. Sarah Johnson'
        return redirect(url_for('doctor_dashboard'))
    return render_template('doctor/login.html')

@app.route('/doctor/dashboard')
@doctor_required
def doctor_dashboard():
    today_appointments = [
        {'id': 1, 'patient': 'Rahul Sharma', 'time': '10:00 AM', 'type': 'Video', 'status': 'Upcoming'},
        {'id': 2, 'patient': 'Priya Patel', 'time': '11:30 AM', 'type': 'Audio', 'status': 'Upcoming'},
        {'id': 3, 'patient': 'Amit Kumar', 'time': '2:30 PM', 'type': 'Video', 'status': 'Upcoming'}
    ]
    stats = {
        'today_appointments': 8,
        'total_patients': 156,
        'pending_prescriptions': 3,
        'completed_today': 2
    }
    return render_template('doctor/dashboard.html', 
                         doctor_name=session.get('doctor_name'),
                         appointments=today_appointments,
                         stats=stats)

@app.route('/doctor/appointments')
@doctor_required
def doctor_appointments():
    appointments_list = {
        'upcoming': [
            {'id': 1, 'patient': 'Rahul Sharma', 'age': 35, 'date': 'Today', 'time': '10:00 AM', 'type': 'Video'},
            {'id': 2, 'patient': 'Priya Patel', 'age': 28, 'date': 'Today', 'time': '11:30 AM', 'type': 'Audio'}
        ],
        'ongoing': [],
        'completed': [
            {'id': 3, 'patient': 'Amit Kumar', 'age': 42, 'date': 'Yesterday', 'time': '3:00 PM', 'type': 'Video'}
        ]
    }
    return render_template('doctor/appointments.html', appointments=appointments_list)

@app.route('/doctor/patients')
@doctor_required
def doctor_patients():
    patients_list = [
        {'id': 1, 'name': 'Rahul Sharma', 'age': 35, 'gender': 'Male', 'village': 'Rampur', 'last_visit': '2025-03-01'},
        {'id': 2, 'name': 'Priya Patel', 'age': 28, 'gender': 'Female', 'village': 'Sitapur', 'last_visit': '2025-02-28'}
    ]
    return render_template('doctor/patients.html', patients=patients_list)

@app.route('/doctor/prescriptions', methods=['GET', 'POST'])
@doctor_required
def doctor_prescriptions():
    if request.method == 'POST':
        # Handle prescription creation
        return jsonify({'success': True, 'message': 'Prescription created successfully'})
    return render_template('doctor/prescriptions.html')

# Consultation Routes
@app.route('/consultation/<int:consultation_id>')
@login_required
def consultation(consultation_id):
    consultation_data = {
        'id': consultation_id,
        'patient': {
            'name': 'Rahul Sharma',
            'age': 35,
            'gender': 'Male',
            'blood_group': 'O+',
            'allergies': 'Penicillin',
            'chronic_conditions': 'Hypertension'
        },
        'doctor': {
            'name': 'Dr. Sarah Johnson',
            'specialty': 'General Physician'
        }
    }
    return render_template('consultation/room.html', consultation=consultation_data)

@app.route('/consultation/waiting')
@login_required
def consultation_waiting():
    return render_template('consultation/waiting.html')

# AI Symptom Checker
@app.route('/symptom-checker')
def symptom_checker():
    return render_template('symptom-checker.html')

@app.route('/api/symptom-checker', methods=['POST'])
def api_symptom_checker():
    data = request.get_json()
    message = data.get('message', '')
    
    # Mock AI response (in production, integrate with OpenAI API)
    response = f"Based on your symptoms: '{message}', I recommend consulting with a doctor for proper diagnosis. Common causes could include viral infections or allergies. Would you like to book a consultation?"
    
    return jsonify({'response': response})

# Health Tips
@app.route('/health-tips')
def health_tips():
    articles = [
        {
            'id': 1,
            'title': '10 Heart-Healthy Habits for a Longer Life',
            'category': 'Heart Health',
            'date': '2025-03-01',
            'excerpt': 'Discover essential lifestyle changes that can significantly improve your cardiovascular health...',
            'image': '/static/images/heart-health.png'
        },
        {
            'id': 2,
            'title': 'Understanding Diabetes: Prevention and Management',
            'category': 'Diabetes',
            'date': '2025-02-28',
            'excerpt': 'Learn about diabetes prevention strategies and effective management techniques...',
            'image': '/static/images/diabetes.jpg'
        }
    ]
    return render_template('health-tips.html', articles=articles)

# WebSocket for real-time chat
@socketio.on('join_consultation')
def on_join(data):
    room = data['room']
    join_room(room)
    emit('user_joined', {'message': 'A user has joined the consultation'}, room=room)

@socketio.on('send_message')
def on_message(data):
    room = data['room']
    message = data['message']
    sender = data['sender']
    emit('receive_message', {'message': message, 'sender': sender, 'timestamp': datetime.now().strftime('%H:%M')}, room=room)

@socketio.on('leave_consultation')
def on_leave(data):
    room = data['room']
    leave_room(room)
    emit('user_left', {'message': 'A user has left the consultation'}, room=room)

# Logout
@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('index'))

if __name__ == '__main__':
    socketio.run(app, debug=True, host='0.0.0.0', port=5000)
