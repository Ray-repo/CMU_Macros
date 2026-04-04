import os
import django
import csv

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'macros.settings')
django.setup()

from CMUMacros.models import FoodItem

FoodItem.objects.all().delete()  # Clear existing

with open('abpdata_cleaned.csv', newline='', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    count = 0
    for row in reader:
        try:
            FoodItem.objects.create(
                name=row['Food Names'],
                serving_size=row['Serving Size'],
                calories=float(row['Calories (Kcal)'] or 0),
                fat=float(row['Fat (g)'] or 0),
                carbs=float(row['Carbs (g)'] or 0),
                protein=float(row['Protein (g)'] or 0),
                fiber=float(row['Fiber (g)'] or 0),
                sugars=float(row['Sugars (g)'] or 0),
            )
            count += 1
        except Exception as e:
            print(f"Skipped row: {row['Food Names']} - {e}")

print(f"Imported {count} food items!")