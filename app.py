import json
from flask import Flask, render_template, jsonify
import text_translator
import time

start_time = time.time()

img_text = text_translator.detect_text('./Text Samples/Russian_Text.png')
img_text_arr = img_text.split("||") 
translated_text_arr = text_translator.get_translated_text(img_text)

js_objects = []
for img_text, translate_text in zip(img_text_arr, translated_text_arr):
    js_object = {
        'question': img_text,
        'answer': translate_text
    }
    js_objects.append(js_object)


app = Flask(__name__)
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/data')
def get_data():
    return jsonify(js_objects)

if __name__ == '__main__':
    app.run(debug=True) 
