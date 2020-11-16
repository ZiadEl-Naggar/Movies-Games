from django.urls import path
from .import views

app_name = 'games'

urlpatterns = [
    path('', views.IndexView, name='home'),
    path('addgame', views.Addgame, name='addgame'),
    path('deletegame', views.Deletegame, name='deletegame'),
    path('checkfav', views.CheckFav, name='checkfav'),
    path('mygames', views.Mygames, name='mygames'),
    path('recommended', views.Recommended, name='recommended'),
    path('<int:id>', views.DetailView, name='detail'),
    path('search', views.SearchView, name='search'),
]