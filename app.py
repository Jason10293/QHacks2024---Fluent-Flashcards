import json
import os
from flask import Flask, render_template, jsonify, flash, request, redirect, url_for
import text_translator
import ai_text_filter as atf
from werkzeug.utils import secure_filename

app = Flask(__name__)
js_objects = []

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/data')
def get_data():
    return jsonify(js_objects)

@app.route('/', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        # check if the post request has the file part
        if 'file' not in request.files:
            flash('No file part')
            return redirect(request.url)
        file = request.files['file']
        # If the user does not select a file, the browser submits an
        # empty file without a filename.
        if file.filename == '':
            flash('No selected file')
            return redirect(request.url)
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            print(app.config['UPLOAD_FOLDER'] + "/" + filename)
            full_image_parse(app.config['UPLOAD_FOLDER'] + "/" + filename)
            return redirect(request.url)#redirect(url_for('download_file', name=filename))
    return

UPLOAD_FOLDER = './Uploads'
ALLOWED_EXTENSIONS = {'png'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def full_image_parse(image_path):
    img_text = text_translator.get_img_text(image_path)
    translate_text_arr = text_translator.get_translated_text(img_text)
    img_text_arr = img_text.split(" || ")

    # print(img_text)
    # print(img_text_arr)
    # print(translate_text_arr)

    # calls cohere api to filter the key words and parses them in to an array
    translate_text_str = '\n'.join(map(str, translate_text_arr))
    filtered_text = atf.filter_text(translate_text_str).lower()
    words = filtered_text.split('\n')
    filtered_list = [word.strip() for word in words if word.strip()]

    # locates the original word from the english translation and puts it in a list
    front_flashcards = []
    back_flashcards = []
    for i in range(len(filtered_list)):
        try:
            pos = translate_text_arr.index(filtered_list[i])
            front_flashcards.append(img_text_arr[pos])
            back_flashcards.append(translate_text_arr[pos])
        except:
            print(filtered_list[i] + " could not be found in the original")

    # for i in range(len(front_flashcards)):
    #     print(str(front_flashcards[i]) + " = " + str(back_flashcards[i]))
    js_objects = []
    for front_flashcards, back_flashcards in zip(front_flashcards, back_flashcards):
        js_object = {
            'question': front_flashcards,
            'answer': back_flashcards
        }
        js_objects.append(js_object)

        print(js_objects)

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


if __name__ == '__main__':
    app.run(debug=True) 
