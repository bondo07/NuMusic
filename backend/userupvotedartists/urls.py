from django.urls import path, include
from userupvotedartists import views

urlpatterns= [
    path('', views.add_upvotedartist),
    path('<str:user>/', views.get_all_upvoted_artists),
]