import pickle
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

vectorizer = pickle.load(open("vectorizer.pkl", "rb"))
model = pickle.load(open("model.pkl", "rb"))


app = FastAPI()

# Configure CORS
origins = [
    "http://localhost:3000",  # Replace with your Express app's URL
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/predict/{text}")
def predict(text: str):
    prediction = predict_model(text)

    return {
        "text": text,
        "sentiment": "positive" if prediction[1] > 0.5 else "negative",
        "confidence": prediction[1] if prediction[1] > 0.5 else prediction[0]
    }

def predict_model(text: str):
    x = vectorizer.transform([text])
    return model.predict_proba(x)[0]