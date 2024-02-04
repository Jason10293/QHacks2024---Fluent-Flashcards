import json
from flask import Flask, render_template, jsonify
import text_translator
import ai_text_filter as atf

# img_text = text_translator.get_img_text('./Text Samples/Chinese_Text.png')
# translate_text_arr = text_translator.get_translated_text(img_text)
# img_text_arr = img_text.split(" ")
js_objects = []
img_text_arr = ['李', '叶', '的', '爷爷', '经常', '在', '外面', '很少', '在家', '李'] 
translate_text_arr = ['Li', "Ye's", 'grandfather', 'is', 'often', 'away', 'from', 'home', 'home.', 'plum']

# calls cohere api to filter the key words and parses them in to an array
translate_text_str = ' '.join(map(str, translate_text_arr))
filtered_text = atf.filter_text(translate_text_str).lower()
words = filtered_text.split('\n')
filtered_list = [word.strip() for word in words if word.strip()]

# locates the original word from the english translation and puts it in a list
filtered_list_foreign = []
count = 0
deletion_list = []
for word in filtered_list:
    try:
        filtered_list_foreign.append(img_text_arr[translate_text_arr.index(word)])
    except:
        deletion_list.append(count)
        count -= 1
    count += 1

# deletes all items not in the original text (faulty translations) 
for x in deletion_list:
    del filtered_list[x]

for i in range(len(filtered_list)):
    print(str(filtered_list[i]) + " = " + str(filtered_list_foreign[i]))

for filtered_list_foreign, filtered_list in zip(filtered_list_foreign, filtered_list):
    js_object = {
        'question': filtered_list_foreign,
        'answer': filtered_list
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
