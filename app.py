import json
from flask import Flask, render_template, jsonify
import text_translator

img_text = text_translator.get_img_text('./Text Samples/Chinese_Text.png')
translate_text_arr = text_translator.get_translated_text(img_text)
img_text_arr = img_text.split(" ")


# app = Flask(__name__)
# @app.route('/')

# def index():
#     data = {
#         "Question": img_text_arr,
#         "Answer": translate_text_arr
#     }
#     return render_template('index.html', data=json.dumps(data))

# if __name__ == '__main__':
#     app.run(debug=True)
