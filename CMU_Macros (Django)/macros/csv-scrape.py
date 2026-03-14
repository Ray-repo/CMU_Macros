import pandas as pd

file_path = 'abpdata.csv'

df = pd.read_csv(file_path, encoding='latin1')

foodnames = df["Food Names"]
calories = df["Calories"]
carbs = df["Carbs"]
protein = df["Protein"]
fats = df["Fat"]

print(foodnames)
print(calories)
print(carbs)
print(fats)
print(protein)