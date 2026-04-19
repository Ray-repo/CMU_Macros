from django.contrib import admin

# Register your models here.
from .models import FoodItem, MealLog, UserGoals

# This makes the columns searchable and readable in the Admin
class FoodItemAdmin(admin.ModelAdmin):
    list_display = ('name', 'calories', 'protein', 'carbs', 'fat')
    search_fields = ('name',)

class MealLogAdmin(admin.ModelAdmin):
    list_display = ('user', 'food_item', 'meal_type', 'date', 'quantity')
    list_filter = ('meal_type', 'date', 'user')

# Registering the models
admin.site.register(FoodItem, FoodItemAdmin)
admin.site.register(MealLog, MealLogAdmin)
admin.site.register(UserGoals)