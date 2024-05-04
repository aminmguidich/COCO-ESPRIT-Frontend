from flask import Flask, request, jsonify, render_template
import json
from chat import get_response
from flask_cors import CORS
import easyocr
import os
from PIL import Image

app = Flask(__name__)
CORS(app, supports_credentials=True, origins='http://localhost:4200')

# Define the list of bad words
bad_words = [
    "Fuck", "Shit", "Asshole", "Bitch", "Bastard", "Cunt", "Dick", "Pussy",
    "Motherfucker", "Cock", "Twat", "Wanker", "Slut", "Whore", "Arsehole",
    "Douchebag", "Faggot", "Nigger", "Prick", "Dumbass"
]

# Initialize EasyOCR reader for English
reader = easyocr.Reader(['en'])

# Function to check if the file extension is allowed
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in {'png', 'jpg', 'jpeg'}

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'image' not in request.files:
        return jsonify({'error': 'No file part'}), 400
        
    file = request.files['image']
    
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file and allowed_file(file.filename):
        img = Image.open(file)
        results = reader.readtext(img)
        detected_text = ' '.join(result[1] for result in results)
        contains_bad_word = any(word in detected_text for word in bad_words)
        return jsonify({'detected_text': detected_text, 'contains_bad_word': contains_bad_word}), 200
    else:
        return jsonify({'error': 'Invalid file type'}), 400

def load_intents():
    with open('intents.json', 'r') as file:
        intents = json.load(file)
    return intents

intents = load_intents()

#@app.get("/")
#def index_get():
#    return render_template("base.html")

@app.post("/predict")
def predict():
    text = request.get_json().get("message")
    # TODO: check if text is valid
    response = get_response(text)
    message = {"answer" : response}
    return jsonify(message)

if __name__ == '__main__':
    app.run(debug=True)
