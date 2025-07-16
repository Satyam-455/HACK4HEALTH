from flask import Flask, request, jsonify
import pandas as pd
import numpy as np
import joblib
from sklearn.preprocessing import LabelEncoder
from preprocessing import preprocess_input

app = Flask(__name__)

model = joblib.load("model.pkl")
le_gender = joblib.load("gender_encoder.pkl")
le_complaint = joblib.load("complaint_encoder.pkl")
label_encoder = joblib.load("flag_label_encoder.pkl")  


import numpy as np  

@app.route('/predict', methods=['POST'])
def predict_flag():
    try:
        input_json = request.get_json(force=True)
        print("Received JSON:", json_data)

        processed_df = preprocess_input(json_data)
        print("Processed DF:\n", processed_df)
        print("Shape:", processed_df.shape)
        print("Columns:", processed_df.columns.tolist())

        prediction_encoded = model.predict(processed_df)
        print("Raw Prediction Output:", prediction_encoded)
        print("Type:", type(prediction_encoded))

        if isinstance(prediction_encoded, (np.ndarray, list)):
            prediction_scalar = int(prediction_encoded[0])
        else:
            prediction_scalar = int(prediction_encoded)

        print("Scalar to decode:", prediction_scalar)
        print("Classes in LabelEncoder:", label_encoder.classes_)

        
        prediction_label = label_encoder.inverse_transform([prediction_scalar])[0]

        return jsonify({
            "prediction": prediction_label,
            "status": "success"
        })

    except Exception as e:
        print("ERROR:", e)
        return jsonify({
            "error": str(e),
            "status": "failed"
        })

if __name__ == '__main__':
    app.run(debug=True)
