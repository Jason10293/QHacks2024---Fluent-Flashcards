import cohere
import API_credentials

co = cohere.Client(API_credentials.cohere())

response = co.generate(
  prompt='test',
)
print(response)