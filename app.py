import json
from flask import Flask, render_template, jsonify
import text_translator

img_text = text_translator.get_img_text('./Text Samples/Chinese_Text.png')
translate_text_arr = text_translator.get_translated_text(img_text)
img_text_arr = img_text.split(" ")


app = Flask(__name__)
@app.route('/')
def index():
    # # detect text from image file in argument
    # img_text = detect_text('./Text Samples/German_Text.png')

    # # translate the text into english
    # translated_text = translate_text(img_text)

    # # split the translated text into an array of words
    # translate_text_arr = translated_text.split(" ")

    # # convert html entities to ascii in the array
    # translate_text_arr = convert_html_entites_to_ascii(translate_text_arr)

    # # print statments for debugging in python only (NOT for the web app)
    # # print(translate_text_arr)
    # # print(detect_language(img_text))

    # # render the index.html template with the translated text array
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True) #dubug=True arg allows for the server to restart when changes are made to the code + other things
