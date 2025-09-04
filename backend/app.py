
from flask import Flask, request, jsonify
from flask_cors import CORS
import random, string, warnings, re, pandas as pd
import nltk
from nltk.stem import WordNetLemmatizer
from sklearn.metrics.pairwise import cosine_similarity
from sentence_transformers import SentenceTransformer
from spellchecker import SpellChecker

warnings.filterwarnings('ignore')

app = Flask(__name__)
CORS(app)


# Load CSV
csv_path = "C:/Users/aksha/Downloads/Master-Code-NAL-main/backend/your_questions_answers_expanded.csv"
df = pd.read_csv(csv_path)
questions = df['question'].astype(str).str.lower().tolist()
answers = df['answer'].astype(str).tolist()

# NLP setup
lemmatizer = WordNetLemmatizer()
remove_punct_dict = dict((ord(punct), None) for punct in string.punctuation)
model = SentenceTransformer('all-MiniLM-L6-v2')
question_embeddings = model.encode(questions)

spell = SpellChecker()
spell.word_frequency.load_words(['NAL', 'RealEstate', 'property', 'agent', 'listing'])

GREETING_RESPONSES = ["Hi!", "Hey!", "*nods*", "Hi there!", "Hello!"]

def correct_spelling(text):
    corrected_words = []
    for word in text.split():
        if word.lower() in spell:
            corrected_words.append(word)
        else:
            corrected_word = spell.correction(word)
            corrected_words.append(corrected_word if corrected_word else word)
    return " ".join(corrected_words)

def detect_intent(text):
    text = text.lower()
    if re.search(r'\b(hello|hi|hey|greetings)\b', text): return 'greeting'
    elif re.search(r'\b(thank(s| you)?|thanx)\b', text): return 'thanks'
    elif re.search(r'\b(bye|exit|quit)\b', text): return 'exit'
    else: return 'unknown'

def get_answer(user_input, threshold=0.3):
    corrected_input = correct_spelling(user_input).lower()
    input_emb = model.encode([corrected_input])
    similarities = cosine_similarity(input_emb, question_embeddings)
    max_idx = similarities.argmax()
    max_score = similarities[0][max_idx]
    if max_score >= threshold:
        return answers[max_idx]
    else:
        return "NAL Real Estate helps users buy, sell, and rent properties with ease."

@app.route("/chat", methods=["POST"])
def chat():
    user_msg = request.json.get("message", "")
    corrected_response = correct_spelling(user_msg).lower()
    intent = detect_intent(user_msg) or detect_intent(corrected_response)

    if intent == 'greeting':
        reply = random.choice(GREETING_RESPONSES)
    elif intent == 'thanks':
        reply = "You are welcome."
    elif intent == 'exit':
        reply = "Bye! Take care..."
    else:
        reply = get_answer(corrected_response)

    return jsonify({"reply": reply})

if __name__ == "__main__":
    app.run(debug=True)
