import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
data = pd.read_csv("heart.csv")
data = data.drop(columns=['ca', 'thal', 'slope'])
data.columns = data.columns.str.strip()
print(data.head())
print("Null values:\n", data.isnull().sum())
# Fill numeric columns with mean
numeric_cols = data.select_dtypes(include=['int64', 'float64']).columns
data[numeric_cols] = data[numeric_cols].fillna(data[numeric_cols].mean())

# Fill categorical columns with mode
categorical_cols = data.select_dtypes(include=['object']).columns
for col in categorical_cols:
    data[col] = data[col].fillna(data[col].mode()[0])
#verify cleaning
print("After cleaning:\n", data.isnull().sum())
subset = data[['age', 'trestbps', 'chol', 'oldpeak', 'num']]
sns.pairplot(subset, hue='num')
plt.show()