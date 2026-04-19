from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register, name='register'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('foods/', views.food_list, name='food_list'),
    path('meals/', views.meal_log, name='meal_log'),
    path('meals/<int:log_id>/', views.delete_meal_log, name='delete_meal_log'),
    path('totals/', views.daily_totals, name='daily_totals'),
    path('goals/', views.user_goals, name='user_goals'),
    path('reset/', views.reset_daily_meals),
]