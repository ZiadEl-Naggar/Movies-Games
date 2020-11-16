from django.urls import path, include
from .import views
from rest_framework import routers
from rest_framework.urlpatterns import format_suffix_patterns

app_name = 'user'

router = routers.DefaultRouter()
# router.register(r'users', views.ProfileApi)

urlpatterns = [
    path('', views.IndexView, name='home'),
    path('register', views.RegisterView.as_view(), name='register'),
    path('login', views.LoginView.as_view(), name='login'),
    path('profile', views.ProfileView, name='profile'),
    path('logout', views.LogoutView, name='logout'),
    path('addprofile', views.ProfileCreate.as_view(), name='addprofile'),
    path('editprofile/<int:pk>/', views.ProfileUpdate.as_view(), name='editprofile'),
    
    path('users', views.ProfileApi.as_view(), name='users'),
    path('createapi', views.CreateUserApi.as_view(), name='createapi'),
    path('loginapi', views.LoginUserApi.as_view(), name='loginapi'),

    # path('api', include(router.urls)),
    # path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]

urlpatterns = format_suffix_patterns(urlpatterns)
