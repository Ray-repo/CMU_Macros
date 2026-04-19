from django.contrib.auth.models import User
from django.utils.timezone import localtime
from django.contrib.auth import authenticate
from django.utils import timezone
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from .models import FoodItem, MealLog, UserGoals

@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    username = request.data.get('username')
    password = request.data.get('password')
    email = request.data.get('email', '')
    if not username or not password:
        return Response({'error': 'Username and password required'}, status=400)
    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already taken'}, status=400)
    user = User.objects.create_user(username=username, password=password, email=email)
    UserGoals.objects.create(user=user)
    token, _ = Token.objects.get_or_create(user=user)
    return Response({'token': token.key, 'username': user.username}, status=201)

@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(username=username, password=password)
    if not user:
        return Response({'error': 'Invalid credentials'}, status=400)
    token, _ = Token.objects.get_or_create(user=user)
    return Response({'token': token.key, 'username': user.username})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_view(request):
    request.user.auth_token.delete()
    return Response({'message': 'Logged out'})

@api_view(['GET'])
@permission_classes([AllowAny])
def food_list(request):
    query = request.query_params.get('q', '')
    foods = FoodItem.objects.filter(name__icontains=query)[:20]
    data = [{
        'id': f.id,
        'name': f.name,
        'serving_size': f.serving_size,
        'calories': f.calories,
        'fat': f.fat,
        'carbs': f.carbs,
        'protein': f.protein,
        'fiber': f.fiber,
        'sugars': f.sugars,
    } for f in foods]
    return Response(data)

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def meal_log(request):
    if request.method == 'GET':
        today = localtime(timezone.now()).date()
        logs = MealLog.objects.filter(user=request.user, date=today)
        data = [{
            'id': log.id,
            'food_name': log.food_item.name,
            'meal_type': log.meal_type,
            'quantity': log.quantity,
            'calories': log.food_item.calories * log.quantity,
            'fat': log.food_item.fat * log.quantity,
            'carbs': log.food_item.carbs * log.quantity,
            'protein': log.food_item.protein * log.quantity,
        } for log in logs]
        return Response(data)

    elif request.method == 'POST':
        food_id = request.data.get('food_id')
        meal_type = request.data.get('meal_type', 'snack')
        quantity = request.data.get('quantity', 1)
        try:
            food = FoodItem.objects.get(id=food_id)
        except FoodItem.DoesNotExist:
            return Response({'error': 'Food not found'}, status=404)
        log = MealLog.objects.create(
            user=request.user,
            food_item=food,
            meal_type=meal_type,
            quantity=quantity,
        )
        return Response({'message': 'Logged!', 'id': log.id}, status=201)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_meal_log(request, log_id):
    try:
        log = MealLog.objects.get(id=log_id, user=request.user)
        log.delete()
        return Response({'message': 'Deleted'})
    except MealLog.DoesNotExist:
        return Response({'error': 'Not found'}, status=404)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def daily_totals(request):
    today = localtime(timezone.now()).date()
    logs = MealLog.objects.filter(user=request.user, date = today)    
    totals = {
        'calories': sum(l.food_item.calories * l.quantity for l in logs),
        'fat': sum(l.food_item.fat * l.quantity for l in logs),
        'carbs': sum(l.food_item.carbs * l.quantity for l in logs),
        'protein': sum(l.food_item.protein * l.quantity for l in logs),
    }
    return Response(totals)

@api_view(['GET', 'PUT'])
@permission_classes([IsAuthenticated])
def user_goals(request):
    goals, _ = UserGoals.objects.get_or_create(user=request.user)
    if request.method == 'GET':
        return Response({
            'calories': goals.calories,
            'protein': goals.protein,
            'carbs': goals.carbs,
            'fat': goals.fat,
        })
    elif request.method == 'PUT':
        goals.calories = request.data.get('calories', goals.calories)
        goals.protein = request.data.get('protein', goals.protein)
        goals.carbs = request.data.get('carbs', goals.carbs)
        goals.fat = request.data.get('fat', goals.fat)
        goals.save()
        return Response({'message': 'Goals updated!'})
    
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def reset_daily_meals(request):
    today = localtime(timezone.now()).date()
    # Find today's logs for this user
    logs = MealLog.objects.filter(user=request.user, date=today)
    count = logs.count()
    logs.delete() # Remove them from the database
    
    return Response({'message': f'Deleted {count} meals. Reset successful.'})