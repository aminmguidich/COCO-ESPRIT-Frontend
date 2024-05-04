from flask import Flask, jsonify, request, render_template
from io import BytesIO
import pandas as pd
from sklearn import linear_model
import numpy as np
import matplotlib.pyplot as plt
import streamlit as st
from flask_cors import CORS

# Initialize Flask app
app = Flask(__name__)
CORS(app, supports_credentials=True, origins='http://localhost:4200')

# Load the machine learning model
data = pd.read_csv("FuelConsumption.csv")
data_select = data[['ENGINESIZE', 'CYLINDERS', 'FUELCONSUMPTION_CITY', 'FUELCONSUMPTION_HWY', 'FUELCONSUMPTION_COMB', 'CO2EMISSIONS']]
regr = linear_model.LinearRegression()
x = np.asanyarray(data_select[["ENGINESIZE", "CYLINDERS", "FUELCONSUMPTION_CITY", "FUELCONSUMPTION_HWY" ]])
y = np.asanyarray(data_select[["CO2EMISSIONS"]])
regr.fit(x, y)

# Define Streamlit app logic
def run_streamlit(engine_size, cylinder_num, fuelconsumption_city, fuelconsumption_hwy):
    df = pd.DataFrame({
        'Engine Size': [engine_size],
        'Cylinder Number': [cylinder_num],
        'Fuel Consumption in City': [fuelconsumption_city],
        'Fuel Consumption in Highway': [fuelconsumption_hwy]
    })

    # Predict CO2 emissions
    prediction = regr.predict(df)

    # Display prediction
    st.subheader('Predicted CO2 Emission (in PPM)')
    st.write(prediction[0])



# Define API endpoint for predictions
@app.route('/CO2', methods=['POST'])
def predict():
    data = request.json
    engine_size = data['Engine Size']
    cylinder_num = data['Cylinder Number']
    fuelconsumption_city = data['Fuel Consumption in City']
    fuelconsumption_hwy = data['Fuel Consumption in Highway']
    
    df = pd.DataFrame({
        'Engine Size': [engine_size],
        'Cylinder Number': [cylinder_num],
        'Fuel Consumption in City': [fuelconsumption_city],
        'Fuel Consumption in Highway': [fuelconsumption_hwy]
    })

    # Predict CO2 emissions
    prediction = regr.predict(df)

    return jsonify({'prediction': prediction[0]})

if __name__ == '__main__':
    app.run(debug=True)
