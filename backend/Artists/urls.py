from django.urls import path, include
from Artists import views

urlpatterns= [
    path('', views.get_all_artists),
    path('add/', views.add_user_artist),
    path('<int:pk>/update/', views.update_user_artist),
]