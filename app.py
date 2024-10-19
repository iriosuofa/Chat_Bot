from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS to allow cross-origin requests

@app.route('/api/send-message', methods=['POST'])
def send_message():
    # Get the user message from the request
    user_message = request.json.get('message')
    
    # Here you can add any logic to process the message and generate a response
    bot_response = f"Echo: {user_message}"  # Example response for demonstration
    
    # Send back a JSON response
    return jsonify({'response': bot_response})

if __name__ == '__main__':
    app.run(debug=True)