from django.db import models
from django.contrib.auth.models import User

class FoodItem(models.Model):
    name = models.CharField(max_length=255)
    serving_size = models.CharField(max_length=100)
    calories = models.FloatField()
    fat = models.FloatField()
    carbs = models.FloatField()
    protein = models.FloatField()
    fiber = models.FloatField()
    sugars = models.FloatField()

    def __str__(self):
        return self.name

class MealLog(models.Model):
    MEAL_TYPES = [
        ('breakfast', 'Breakfast'),
        ('lunch', 'Lunch'),
        ('dinner', 'Dinner'),
        ('snack', 'Snack'),
    ]
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    food_item = models.ForeignKey(FoodItem, on_delete=models.CASCADE)
    meal_type = models.CharField(max_length=20, choices=MEAL_TYPES)
    quantity = models.FloatField(default=1)
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.food_item.name}"

class UserGoals(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    calories = models.IntegerField(default=2000)
    protein = models.IntegerField(default=150)
    carbs = models.IntegerField(default=200)
    fat = models.IntegerField(default=65)

    def __str__(self):
        return f"{self.user.username} goals"