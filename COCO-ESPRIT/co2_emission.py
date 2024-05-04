import streamlit as st
import pandas as pd
from sklearn import linear_model
import numpy as np
import matplotlib.pyplot as plt
from io import BytesIO

st.write("""
# CO2 Emission Prediction
This app predicts the **Ammount of CO2 Emission** of a **car**.
""")


st.sidebar.header('Input Parameters')

def user_input_features():
    engine_size = st.sidebar.slider('Engine Size', 1.0, 6.8, 3.5)
    cylinder_num = st.sidebar.slider('Cylinder Number', 4, 12, 8,  step=2)
    fuelconsumption_city = st.sidebar.slider('Fuel Consumption in City', 5.3, 30.2, 15.8)
    fuelconsumption_hwy = st.sidebar.slider('Fuel Consumption in Highway', 5.1, 20.5, 12.5)
    data = {'Engine Size': engine_size,
            'Cylinder Number': cylinder_num,
            'Fuel Consumption in City': fuelconsumption_city,
            'Fuel Consumption in Highway': fuelconsumption_hwy}
    features = pd.DataFrame(data, index=[0])
    return features

df = user_input_features()

st.subheader('Input parameters')
st.write(df)

data = pd.read_csv("FuelConsumption.csv")
data_select = data[['ENGINESIZE', 'CYLINDERS', 'FUELCONSUMPTION_CITY', 'FUELCONSUMPTION_HWY', 'FUELCONSUMPTION_COMB', 'CO2EMISSIONS']]
regr = linear_model.LinearRegression()
x = np.asanyarray(data_select[["ENGINESIZE", "CYLINDERS", "FUELCONSUMPTION_CITY", "FUELCONSUMPTION_HWY" ]])
y = np.asanyarray(data_select[["CO2EMISSIONS"]])
regr.fit(x,y)

prediction = regr.predict(df)

st.subheader('Predicted co2 emission (in PPM)')
st.write(prediction)

actual_emissions = data_select['CO2EMISSIONS']
st.subheader(f'Actual emission: {actual_emissions}')

#difference = actual_emissions - prediction[0]  # Use prediction[0] to get the single prediction value
difference = actual_emissions - prediction.squeeze()

st.subheader(f'difference: {difference}')

# Calculate the mean absolute error (MAE) to assess the overall performance
mae = np.mean(np.abs(difference))

# Define a threshold to determine whether the prediction is good or bad
threshold = 5  

# Determine if the prediction is good or bad
if mae <= threshold:
    result = "best"
else:
    result = "worst"

# Display the result
st.subheader(f'Result: {result}')

# Plotting CO2 emissions
fig, ax = plt.subplots(figsize=(10, 6))
ax.plot(data_select.index, data_select['CO2EMISSIONS'], label='Actual CO2 Emissions', color='blue')
ax.axhline(y=prediction[0], color='red', linestyle='--', label='Predicted CO2 Emissions')
ax.set_xlabel('Index')
ax.set_ylabel('CO2 Emissions')
ax.set_title('Actual vs Predicted CO2 Emissions')
ax.legend()
st.pyplot(fig)

# Download as PDF
def download_pdf():
    # Save plot to BytesIO
    pdf_bytes = BytesIO()
    fig.savefig(pdf_bytes, format='pdf')
    pdf_bytes.seek(0)
    
    # Download as PDF
    st.download_button(label="Download PDF", data=pdf_bytes, file_name='co2_emission_prediction.pdf', mime='application/pdf')

download_pdf()

# Lien pour retourner à la base HTML
st.write("[Retour](http://localhost:4200/ListCarsFront)")
