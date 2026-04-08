import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense

# -------------------------------
# LOAD CLEAN DATA
# -------------------------------
data = pd.read_csv("cleaned_heart.csv")

# Target
data['risk'] = data['num'].apply(lambda x: 1 if x > 0 else 0)

# Features
X = data.drop(columns=['num', 'risk'])
y = data['risk']

# -------------------------------
# SCALE DATA
# -------------------------------
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# -------------------------------
# RESHAPE FOR LSTM
# -------------------------------
# LSTM expects 3D: (samples, timesteps, features)

X_lstm = X_scaled.reshape(X_scaled.shape[0], 1, X_scaled.shape[1])

# -------------------------------
# TRAIN-TEST SPLIT
# -------------------------------
X_train, X_test, y_train, y_test = train_test_split(
    X_lstm, y, test_size=0.2, random_state=42
)

# -------------------------------
# BUILD LSTM MODEL
# -------------------------------
model = Sequential()

model.add(LSTM(64, input_shape=(1, X.shape[1])))
model.add(Dense(1, activation='sigmoid'))

model.compile(
    optimizer='adam',
    loss='binary_crossentropy',
    metrics=['accuracy']
)

# -------------------------------
# TRAIN MODEL
# -------------------------------
print("Training LSTM...")

model.fit(
    X_train, y_train,
    epochs=10,
    batch_size=16,
    validation_data=(X_test, y_test)
)

# -------------------------------
# EVALUATE
# -------------------------------
loss, acc = model.evaluate(X_test, y_test)

print("LSTM Accuracy:", acc)