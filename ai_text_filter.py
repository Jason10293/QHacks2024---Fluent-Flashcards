import cohere
import Resources.API_credentials as API_credentials

co = cohere.Client(API_credentials.cohere())

def filter_text(input):
    response = co.generate(
    prompt='Pick out key words from the following text that would be useful for someone studying English. Only output the list of words with no other text before or after. The words should not contain spaces, and should each be on their own line with no bullet points:\n\n'
        + input,
    temperature=0.0
    )
    return response[0]

#print(filter_text("bob went to the store, but he got hungry and went home"))
