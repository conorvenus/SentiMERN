import pickle
from fastapi import FastAPI
from pydantic import BaseModel

vectorizer = pickle.load(open("vectorizer.pkl", "rb"))
model = pickle.load(open("model.pkl", "rb"))

app = FastAPI()

class PredictionRequest(BaseModel):
    text: str

@app.post("/api/predict")
def predict(predictionRequest: PredictionRequest):
    prediction = predict_model(predictionRequest.text)

    return {
        "text": predictionRequest.text,
        "sentiment": "positive" if prediction[1] > 0.5 else "negative",
        "confidence": prediction[1] if prediction[1] > 0.5 else prediction[0]
    }

def predict_model(text: str):
    x = vectorizer.transform([text])
    return model.predict_proba(x)[0]