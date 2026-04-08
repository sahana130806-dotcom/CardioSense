# ===============================
# IMPORT LIBRARIES
# ===============================
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

from sklearn.preprocessing import MinMaxScaler
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, confusion_matrix

from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense, Dropout, Input

# ===============================
# LOAD DATA
# ===============================
data = pd.read_csv("cleaned_heart.csv")

# ===============================
# CREATE TARGET VARIABLE
# ===============================
data['risk'] = data['num'].apply(lambda x: 1 if x > 0 else 0)

# ===============================
# FEATURES & LABELS
# ===============================
drop_cols = ['num', 'risk']

if 'id' in data.columns:
    drop_cols.append('id')

X = data.drop(columns=drop_cols)
y = data['risk']

# ===============================
# NORMALIZE FEATURES
# ===============================
scaler = MinMaxScaler()
X_scaled = scaler.fit_transform(X)
X_scaled = pd.DataFrame(X_scaled, columns=X.columns)

# ===============================
# GENERATE SEQUENCES (TIMESTEP = 5)
# ===============================
def generate_sequences(data, labels, timesteps=5):
    X_seq = []
    y_seq = []

    for i in range(len(data)):
        row = data.iloc[i].values
        sequence = []

        for t in range(timesteps):
            new_step = row.copy()

            # simulate progression
            progression_factor = 1 + (t * 0.03)
            new_step = new_step * progression_factor

            # add noise
            noise = np.random.normal(0, 0.01, size=row.shape)
            new_step = new_step + noise

            sequence.append(new_step)

        X_seq.append(sequence)
        y_seq.append(labels.iloc[i])

    return np.array(X_seq), np.array(y_seq)

# ===============================
# CREATE LSTM DATA
# ===============================
timesteps = 5

X_lstm, y_lstm = generate_sequences(X_scaled, y, timesteps)

print("X shape:", X_lstm.shape)
print("y shape:", y_lstm.shape)

# ===============================
# TRAIN-TEST SPLIT
# ===============================
X_train, X_test, y_train, y_test = train_test_split(
    X_lstm, y_lstm,
    test_size=0.2,
    random_state=42
)

# ===============================
# BUILD MODEL
# ===============================
model = Sequential()

model.add(Input(shape=(X_train.shape[1], X_train.shape[2])))
model.add(LSTM(64))
model.add(Dropout(0.3))
model.add(Dense(1, activation='sigmoid'))

model.compile(
    loss='binary_crossentropy',
    optimizer='adam',
    metrics=['accuracy']
)

model.summary()

# ===============================
# TRAIN MODEL
# ===============================
history = model.fit(
    X_train, y_train,
    epochs=15,
    batch_size=32,
    validation_split=0.2
)

# ===============================
# EVALUATE MODEL
# ===============================
loss, accuracy = model.evaluate(X_test, y_test)

print("\nTest Accuracy:", accuracy)

# ===============================
# PREDICTIONS
# ===============================
y_pred = (model.predict(X_test) > 0.5).astype("int32")

print("\nConfusion Matrix:\n", confusion_matrix(y_test, y_pred))
print("\nClassification Report:\n", classification_report(y_test, y_pred))

# ===============================
# PLOT GRAPHS
# ===============================
plt.plot(history.history['accuracy'], label='train')
plt.plot(history.history['val_accuracy'], label='val')
plt.legend()
plt.title("Accuracy")
plt.show()

plt.plot(history.history['loss'], label='train')
plt.plot(history.history['val_loss'], label='val')
plt.legend()
plt.title("Loss")
plt.show()

# ===============================
# SAVE MODEL
# ===============================
model.save("lstm_model_5.h5")

print("\n✅ Model saved as lstm_model_5.h5")