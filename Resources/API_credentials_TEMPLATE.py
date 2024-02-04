import os

#google APIkey goes here
def credential():
    os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "API_KEY_HERE"

#cohere APIkey goes here 
def cohere():
    return "API_KEY_HERE"