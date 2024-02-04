import json
from flask import Flask, render_template, jsonify
import text_translator
import time

start_time = time.time()
js_objects = []
img_text_arr = ['李', '叶', '的', '爷爷', '经常', '在', '外面', '很少', '在家', '。', '李'] 
translated_text_arr = ['Li', "Ye's", 'grandfather', 'is', 'often', 'away', 'from', 'home', 'and', 'rarely', 'at', 'home.', 'plum']


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
