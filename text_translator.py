import html
import os
from google.cloud import vision
from google.cloud import translate_v2 as translate

os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "C:/Users/jwu05/Downloads/innate-works-413104-3342d577b88f.json"

def detect_text(path):
    """Detects text in the file."""
    client = vision.ImageAnnotatorClient()

    with open(path, 'rb') as image_file:
        content = image_file.read()

    image = vision.Image(content=content)

    response = client.text_detection(image=image)
    texts = response.text_annotations

    words = ''
    for text in texts[1:]:
        words += ' ' + text.description

    return words.strip()
    
# Detect the language of the input text
def detect_language(text):
    translate_client = translate.Client()
    result = translate_client.detect_language(text)
    detected_language = result['language']
    return detected_language

#translate the text into english
def translate_text(text):
    translate_client = translate.Client()
    # Translate the text to English
    translation = translate_client.translate(text, target_language='en')
    return translation['translatedText']

def convert_html_entites_to_ascii(arr):
    for i, text in enumerate(arr):
        arr[i] = html.unescape(text)
    return arr

def get_img_text(path):
    return detect_text(path)
    
def get_translated_text(img_text):
    translated_text = translate_text(img_text)
    translate_text_arr = translated_text.split(" ")
    translate_text_arr = convert_html_entites_to_ascii(translate_text_arr)
    return translate_text_arr
