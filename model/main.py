import pickle
from fastapi import FastAPI

vectorizer = pickle.load(open("vectorizer.pkl", "rb"))
model = pickle.load(open("model.pkl", "rb"))

app = FastAPI()

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