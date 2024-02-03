import json
from flask import Flask, render_template, jsonify
import text_translator

img_text = text_translator.get_img_text('./Text Samples/Chinese_Text.png')
img_text_arr = img_text.split(" ")
translate_text_arr = text_translator.get_translated_text(img_text)

print(f"Original Text: {img_text_arr}")
print(f"Translated Text: {translate_text_arr}")

app = Flask(__name__)
@app.route('/')

def index():
    data = {
        "Question": img_text_arr,
        "Answer": translate_text_arr
    }
    return render_template('script.js', data=json.dumps(data))

# print(detect_language(img_text))

if __name__ == '__main__':
    app.run(debug=True)
