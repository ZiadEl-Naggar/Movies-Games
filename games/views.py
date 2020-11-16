from django.shortcuts import render
from django.shortcuts import render, redirect
from django.views import generic
from django.views.generic import View
from django.http import HttpResponseRedirect, HttpResponse
from django.contrib.auth.models import User
from .models import Usersgame

def IndexView(request):
    template_name = 'games/home.html'
    return render(request, template_name)

def Addgame(request):
    if request.method == 'GET':
            gameid = request.GET.get('gameid')
            title = request.GET.get('title')
            year = request.GET.get('year')
            poster = request.GET.get('poster')
            rate = request.GET.get('rate')

            user = User.objects.get(username=request.session['username'])
            game = Usersgame(id=None, gameid=gameid, title=title, year=year, poster=poster, rate=rate, user=user)
            # game.id = None
            # game.user = User.objects.get(username=request.session['username'])
            # game.gameid = gameid
            # game.title = title
            # game.year = year
            # game.poster = poster
            game.save()
            return redirect('user:profile')
    else:
            return HttpResponse("Request method is not a GET")

def Deletegame(request):
    if request.method == 'GET':
        gameid = request.GET.get('gameid')
        user = User.objects.get(username=request.session['username'])
        Usersgame.objects.filter(user__username=user, gameid=gameid).delete()
        return HttpResponse("Deleted")

def CheckFav(request):
    if request.method == 'GET':
        gameid = request.GET.get('gameid')
        user = User.objects.get(username=request.session['username'])
        if Usersgame.objects.filter(user__username=user, gameid=gameid).exists():
            return HttpResponse("Fav")
        else:
            return HttpResponse("Not")

def Mygames(request):
    username = request.session['username']
    data = Usersgame.objects.filter(user__username = username)
    return render(request, 'games/mygames.html', {'games': data})

def Recommended(request):
    username = request.session['username']
    userlist = Usersgame.objects.values('user').distinct().exclude(user__username = username)
    gamelist = []
    data = []
    for field in userlist:
        userfield = field['user']
        gamefields = Usersgame.objects.filter(user = userfield)
        for gamefield in gamefields:
            gamelist.append(gamefield)
        data.append(gamelist)
        gamelist = []
    
    return render(request, 'games/recommended.html', {'games': data})

def DetailView(request, id):
    return render(request, 'games/details.html', {'id': id})

def SearchView(request):
    return render(request, 'games/search.html')