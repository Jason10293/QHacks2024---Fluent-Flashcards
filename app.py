import json
from flask import Flask, render_template, jsonify
import text_translator

img_text = text_translator.get_img_text('./Text Samples/Chinese_Text.png')
translate_text_arr = text_translator.get_translated_text(img_text)
img_text_arr = img_text.split(" ")


app = Flask(__name__)
@app.route('/')
def index():
    
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True) #dubug=True arg allows for the server to restart when changes are made to the code + other things
