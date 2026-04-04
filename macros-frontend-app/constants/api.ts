const BASE_URL = 'http://127.0.0.1:8000/api/auth';

export const api = {
  searchFoods: async (query: string, token: string) => {
    const res = await fetch(`${BASE_URL}/foods/?q=${query}`, {
      headers: { Authorization: `Token ${token}` },
    });
    return res.json();
  },

  logMeal: async (foodId: number, mealType: string, quantity: number, token: string) => {
    const res = await fetch(`${BASE_URL}/meals/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({ food_id: foodId, meal_type: mealType, quantity }),
    });
    return res.json();
  },

  getTodayMeals: async (token: string) => {
    const res = await fetch(`${BASE_URL}/meals/`, {
      headers: { Authorization: `Token ${token}` },
    });
    return res.json();
  },

  getDailyTotals: async (token: string) => {
    const res = await fetch(`${BASE_URL}/totals/`, {
      headers: { Authorization: `Token ${token}` },
    });
    return res.json();
  },

  getGoals: async (token: string) => {
    const res = await fetch(`${BASE_URL}/goals/`, {
      headers: { Authorization: `Token ${token}` },
    });
    return res.json();
  },

  deleteMeal: async (logId: number, token: string) => {
    const res = await fetch(`${BASE_URL}/meals/${logId}/`, {
      method: 'DELETE',
      headers: { Authorization: `Token ${token}` },
    });
    return res.json();
  },
};