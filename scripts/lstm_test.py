import numpy as np
import joblib
from tensorflow.keras.models import load_model

# ----------------------------
# LOAD MODEL + SCALER
# ----------------------------
model = load_model("lstm_model_15.h5")
scaler = joblib.load("scaler.pkl")

# ----------------------------
# SAME SEQUENCE FUNCTION
# ----------------------------
def make_sequence(row, timesteps=15):
    seq = []
    for t in range(timesteps):
        step = row.copy()
        step = step * (1 + t * 0.03)
        step += np.random.normal(0, 0.01, size=row.shape)
        seq.append(step)
    return np.array(seq)

# ----------------------------
# MULTIPLE TEST INPUTS (18 FEATURES EACH)
# ----------------------------
test_inputs = [
    # Case 1: moderate
    [52, 1, 2, 140, 250, 0, 1, 150, 0, 2.3, 0, 0, 1, 1, 0, 1, 2, 0],

    # Case 2: low risk-ish
    [45, 0, 1, 120, 180, 0, 0, 170, 0, 0.5, 1, 0, 1, 0, 0, 1, 1, 0],

    # Case 3: high risk-ish
    [60, 1, 3, 160, 300, 1, 2, 120, 1, 3.5, 0, 2, 2, 1, 1, 0, 3, 1],

    # Case 4: borderline
    [50, 1, 2, 135, 220, 0, 1, 145, 0, 1.2, 1, 1, 1, 0, 0, 1, 2, 0],

    # Case 5: another variation
    [38, 0, 1, 110, 160, 0, 0, 180, 0, 0.2, 1, 0, 1, 0, 0, 1, 1, 0]
]

# ----------------------------
# LOOP THROUGH INPUTS
# ----------------------------
for i, row in enumerate(test_inputs):

    row = np.array(row)

    # Scale
    row_scaled = scaler.transform(row.reshape(1, -1)).flatten()

    # Generate sequence
    sequence = make_sequence(row_scaled, 15)

    # Reshape
    x_new = sequence.reshape(1, 15, 18)

    # Predict
    y_pred = model.predict(x_new, verbose=0)

    prob = y_pred[0][0]
    prediction = 1 if prob > 0.5 else 0

    print(f"\n--- Test Case {i+1} ---")
    print(f"Probability: {prob:.4f}")
    print(f"Class: {prediction}")