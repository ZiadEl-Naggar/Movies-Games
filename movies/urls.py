from django.urls import path
from .import views

app_name = 'movies'

urlpatterns = [
    path('', views.IndexView, name='home'),
    path('addmovie', views.Addmovie, name='addmovie'),
    path('deletemovie', views.Deletemovie, name='deletemovie'),
    path('checkfav', views.CheckFav, name='checkfav'),
    path('mymovies', views.Mymovies, name='mymovies'),
    path('recommended', views.Recommended, name='recommended'),
    path('<int:id>', views.DetailView, name='detail'),
    path('search', views.SearchView, name='search'),
]