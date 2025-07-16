import numpy as np
import pandas as pd
import joblib

le_gender = joblib.load("gender_encoder.pkl")
le_complaint = joblib.load("complaint_encoder.pkl")

def preprocess_input(json_data):
    df = pd.DataFrame([json_data])

    cols_to_drop = ['icu_admit', 'hospital_admit', 'mortality', 'flag']
    df = df.drop(columns=[col for col in cols_to_drop if col in df.columns], errors='ignore')

    if 'gender' in df.columns:
        df.at[0, 'gender'] = df.at[0, 'gender'].strip().upper()
        try:
            df.at[0, 'gender_encoded'] = le_gender.transform([df.at[0, 'gender']])[0]
        except ValueError:
            raise ValueError(f"Unknown gender: {df.at[0, 'gender']}. Please use one of: {le_gender.classes_}")

    if 'chief_complaint' in df.columns:
        df.at[0, 'chief_complaint'] = df.at[0, 'chief_complaint'].strip().lower()
        try:
            df.at[0, 'complaint_encoded'] = le_complaint.transform([df.at[0, 'chief_complaint']])[0]
        except ValueError:
            raise ValueError(f"Unknown chief_complaint: {df.at[0, 'chief_complaint']}. Please use one of: {le_complaint.classes_}")

    df.drop(columns=['gender', 'chief_complaint'], inplace=True, errors='ignore')

    return df

