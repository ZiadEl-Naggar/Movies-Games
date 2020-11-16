from django.shortcuts import render, redirect, get_object_or_404
from django.views import generic
from django.contrib.auth import authenticate, login, logout
from django.views.generic import View
from django.http import HttpResponseRedirect, HttpResponse
from django.urls import reverse
from .forms import UserRegister, UserLogin, ProfileUpdateForm, ProfileCreateForm
from .models import User, Profile
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, viewsets
from.serializers import UserSerializer, ProfileSerializer
from rest_framework.decorators import api_view
from rest_framework.authtoken.models import Token

def IndexView(request):
    template_name = 'user/home.html'
    return render(request, template_name)

class RegisterView(View):
    form_class = UserRegister
    template_name = 'user/registeration_form.html'

    def get(self, request):
        form = self.form_class(None)
        return render(request, self.template_name, {'form': form})

    def post(self, request):
        form = self.form_class(request.POST)

        if form.is_valid():
            user = form.save(commit=False)

            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            user.set_password(password)
            user.save()

            user = authenticate(username = username, password = password)

            if user is not None:
                if user.is_active:
                    login(request, user)
                    username = request.POST['username']
                    request.session['username'] = username
                    return redirect('user:profile')

        return render(request, self.template_name, {'form': form})

class LoginView(View):
    form_class = UserLogin
    template_name = 'user/login_form.html'

    def get(self, request):
        form = self.form_class(None)
        return render(request, self.template_name, {'form': form})

    def post(self, request):
        form = self.form_class(request.POST)

        if request.method == 'POST':
            username = request.POST['username']
            password =  request.POST['password']

            user = authenticate(username=username, password=password)

            if user is not None:
                if user.is_active:
                    login(request, user)
                    username = request.POST['username']
                    request.session['username'] = username
                    return redirect('user:profile')

        return render(request, self.template_name, {'form': form})

def ProfileView(request):
    if request.session.has_key('username'):
        username = request.session['username']
        data = Profile.objects.filter(user__username = username)
        return render(request, 'user/profile.html', {'data': data})

    return render(request, 'user/home.html')

def LogoutView(request):
    logout(request)
    return redirect('user:home')

class ProfileCreate(generic.CreateView):
    form_class = ProfileUpdateForm
    template_name = 'user/profile_form.html'

    # def get_object(self): 
    #     return get_object_or_404(Profile, user_id=self.kwargs['pk'])
    def form_valid(self, form):
        form.instance.user = self.request.user
        return super(ProfileCreate, self).form_valid(form)

class ProfileUpdate(generic.UpdateView):
    form_class = ProfileUpdateForm
    template_name = 'user/profile_form.html'

    def get_object(self): 
        return get_object_or_404(Profile, user_id=self.kwargs['pk'])

class CreateUserApi(APIView):
    def post(self, request):
        serializer = UserSerializer(request.data)
        username = request.data.get("username", None)
        password = request.data.get("password", None)
        email = request.data.get("email", None)
        user = User.objects.create_user(username, email, password)
        user.set_password(password)
        user.save()
        return Response("success", status=status.HTTP_201_CREATED)

class LoginUserApi(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        username = request.data.get("username", None)
        password = request.data.get("password", None)

        
        Token.objects.create(user = authenticate(username=username.strip(), password=password.strip()))
        # serializer.is_valid(raise_exception=True)
        # usernn = serializer.validated_data['username']
        # user = User.objects.filter(username=usern)
        if user is not None:
            if user.is_active:
                login(request, user)
                return Response("success")
            return Response("User is currently disabled")
        return Response("User does not exist")

class ProfileApi(APIView):
    # queryset = Profile.objects.all()
    # serializer_class = ProfileSerializer

    def get(self, request):
        user = Profile.objects.all()
        serializer = ProfileSerializer(user, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        username = request.data.get("username", None)
        user = Profile.objects.filter(user__username=username)
        serializer = ProfileSerializer(user, many=True)
        alldata = {}
        alldata['username'] = username
        alldata['data'] = serializer.data
        return Response(alldata)