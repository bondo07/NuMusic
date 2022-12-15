from django.urls import path, include
from favorites import views

urlpatterns= [
    path('', views.add_favorite),
    path('<str:user>/', views.get_all_favorites),
    path('<int:pk>/update/', views.update_user_artist),
]