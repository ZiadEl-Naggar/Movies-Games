from django.shortcuts import render, redirect
from django.views import generic
from django.views.generic import View
from django.http import HttpResponseRedirect, HttpResponse
from django.contrib.auth.models import User
from .models import Usersmovie

def IndexView(request):
    template_name = 'movies/home.html'
    return render(request, template_name)

def Addmovie(request):
    if request.method == 'GET':
            movieid = request.GET.get('movieid')
            title = request.GET.get('title')
            year = request.GET.get('year')
            poster = request.GET.get('poster')
            rate = request.GET.get('rate')

            user = User.objects.get(username=request.session['username'])
            movie = Usersmovie(id=None, movieid=movieid, title=title, year=year, poster=poster, rate=rate, user=user)
            # movie.id = None
            # movie.user = User.objects.get(username=request.session['username'])
            # movie.movieid = movieid
            # movie.title = title
            # movie.year = year
            # movie.poster = poster
            movie.save()
            return redirect('user:profile')
    else:
            return HttpResponse("Request method is not a GET")

def Deletemovie(request):
    if request.method == 'GET':
        movieid = request.GET.get('movieid')
        user = User.objects.get(username=request.session['username'])
        Usersmovie.objects.filter(user__username=user, movieid=movieid).delete()
        return HttpResponse("Deleted")

def CheckFav(request):
    if request.method == 'GET':
        movieid = request.GET.get('movieid')
        user = User.objects.get(username=request.session['username'])
        if Usersmovie.objects.filter(user__username=user, movieid=movieid).exists():
            return HttpResponse("Fav")
        else:
            return HttpResponse("Not")

def Mymovies(request):
    username = request.session['username']
    data = Usersmovie.objects.filter(user__username = username)
    return render(request, 'movies/mymovies.html', {'movies': data})

def Recommended(request):
    username = request.session['username']
    userlist = Usersmovie.objects.values('user').distinct().exclude(user__username = username)
    movielist = []
    data = []
    for field in userlist:
        userfield = field['user']
        moviefields = Usersmovie.objects.filter(user = userfield)
        for moviefield in moviefields:
            movielist.append(moviefield)
        data.append(movielist)
        movielist = []
    
    return render(request, 'movies/recommended.html', {'movies': data})

def DetailView(request, id):
    return render(request, 'movies/details.html', {'id': id})

def SearchView(request):
    return render(request, 'movies/search.html')