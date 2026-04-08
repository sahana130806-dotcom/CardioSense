# preprocess.py

import pandas as pd

# -------------------------------
# LOAD DATA
# -------------------------------
data = pd.read_csv("heart.csv")

# Clean column names
data.columns = data.columns.str.strip()

print("Missing values BEFORE:\n", data.isnull().sum())

# -------------------------------
# DROP BAD COLUMNS
# -------------------------------
data = data.drop(columns=['ca', 'thal'])

# -------------------------------
# HANDLE MISSING VALUES
# -------------------------------

# Numeric → mean
num_cols = data.select_dtypes(include=['int64', 'float64']).columns
data[num_cols] = data[num_cols].fillna(data[num_cols].mean())

# Categorical → mode
cat_cols = data.select_dtypes(include=['object', 'string']).columns
for col in cat_cols:
    data[col] = data[col].fillna(data[col].mode()[0])

# -------------------------------
# ENCODE CATEGORICAL DATA
# -------------------------------
data = pd.get_dummies(data, drop_first=True)

print("\nMissing values AFTER:\n", data.isnull().sum())

# -------------------------------
# SAVE CLEAN DATA
# -------------------------------
data.to_csv("cleaned_heart.csv", index=False)

print("\n✅ Cleaned data saved as cleaned_heart.csv")

