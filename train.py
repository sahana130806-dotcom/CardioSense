# train.py

import pandas as pd
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.ensemble import RandomForestClassifier
import joblib

# -------------------------------
# LOAD CLEANED DATA
# -------------------------------
data = pd.read_csv("cleaned_heart.csv")

# -------------------------------
# TARGET VARIABLE
# -------------------------------
data['risk'] = data['num'].apply(lambda x: 1 if x > 0 else 0)

# -------------------------------
# FEATURES
# -------------------------------
X = data.drop(columns=['num', 'risk', 'id'])
y = data['risk']

# -------------------------------
# SPLIT DATA
# -------------------------------
X_train, X_test, y_train, y_test = train_test_split(
    X, y,
    test_size=0.2,
    random_state=42
)

# -------------------------------
# MODEL
# -------------------------------
rf = RandomForestClassifier(random_state=42)

# -------------------------------
# GRID SEARCH
# -------------------------------
param_grid = {
    'n_estimators': [100, 200],
    'max_depth': [5, 10, None],
    'min_samples_split': [2, 5],
    'min_samples_leaf': [1, 2]
}

grid = GridSearchCV(rf, param_grid, cv=5, n_jobs=-1, verbose=1)

print("Running Grid Search...")
grid.fit(X_train, y_train)

# -------------------------------
# BEST MODEL
# -------------------------------
best_model = grid.best_estimator_

print("Best Parameters:", grid.best_params_)

# -------------------------------
# ACCURACY
# -------------------------------
accuracy = best_model.score(X_test, y_test)
print("Final Accuracy:", accuracy)

# -------------------------------
# SAVE MODEL
# -------------------------------
joblib.dump(best_model, "model.pkl")

print("✅ Model saved as model.pkl")

# -------------------------------
# TEST PREDICTION
# -------------------------------
sample = X_test.iloc[[0]]
pred = best_model.predict(sample)

print("Prediction:", "High Risk ⚠️" if pred[0] == 1 else "Low Risk ✅")