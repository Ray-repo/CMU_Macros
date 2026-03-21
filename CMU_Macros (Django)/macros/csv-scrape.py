import pandas as pd

file_path = 'abpdata_cleaned.csv'

df = pd.read_csv(file_path, encoding='latin1')

foodnames = df["Food Names"]
calories = df["Calories (Kcal)"]
carbs = df["Carbs (g)"]
protein = df["Protein (g)"]
fats = df["Fat (g)"]

print(foodnames)
print(calories)
print(carbs)
print(fats)
print(protein)
print(df.head)
