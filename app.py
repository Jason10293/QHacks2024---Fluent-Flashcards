import json
from flask import Flask, render_template, jsonify
import text_translator
import ai_text_filter as atf

img_text = text_translator.get_img_text('./Text Samples/German_Text.png')
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
app = Flask(__name__)
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/data')
def get_data():
    return jsonify(js_objects)

if __name__ == '__main__':
    app.run(debug=True) 
