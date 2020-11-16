from django.contrib.auth.models import User
from django import forms
from .models import Profile

class UserRegister(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput)

    class Meta:
        model = User
        fields = ['username', 'password', 'email']
    
    def __init__(self, *args, **kwargs):
        super(UserRegister, self).__init__(*args, **kwargs)
        self.fields['username'].widget.attrs={
            'class': 'form-control form-control-md',
            'placeholder': 'Username'}
        self.fields['password'].widget.attrs={
            'class': 'form-control form-control-md',
            'placeholder': 'Password'}
        self.fields['email'].widget.attrs={
            'class': 'form-control form-control-md',
            'placeholder': 'Email'}

class UserLogin(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput)

    class Meta:
        model = User
        fields = ['username', 'password']

    def __init__(self, *args, **kwargs):
        super(UserLogin, self).__init__(*args, **kwargs)
        self.fields['username'].widget.attrs={
            'class': 'form-control form-control-md',
            'placeholder': 'Username'}
        self.fields['password'].widget.attrs={
            'class': 'form-control form-control-md',
            'placeholder': 'Password'}

class ProfileCreateForm(forms.ModelForm):
    class Meta:
        model = Profile
        fields = ['firstname', 'lastname', 'birthdate', 'picture', 'details']

    def __init__(self, *args, **kwargs):
        super(ProfileCreateForm, self).__init__(*args, **kwargs)
        self.fields['firstname'].widget.attrs={
            'class': 'form-control form-control-md col-md-12'}
        self.fields['lastname'].widget.attrs={
            'class': 'form-control form-control-md col-md-12'}
        self.fields['birthdate'].widget.attrs={
            'class': 'form-control form-control-md datetimepicker-input', 'data-target':"#datetimepicker"}
        self.fields['details'].widget.attrs={
            'class': 'form-control form-control-md'}

class ProfileUpdateForm(forms.ModelForm):
    class Meta:
        model = Profile
        fields = ['firstname', 'lastname', 'birthdate', 'picture', 'details']

    def __init__(self, *args, **kwargs):
        super(ProfileUpdateForm, self).__init__(*args, **kwargs)
        self.fields['firstname'].widget.attrs={
            'class': 'form-control form-control-md col-md-12'}
        self.fields['lastname'].widget.attrs={
            'class': 'form-control form-control-md col-md-12'}
        self.fields['birthdate'].widget.attrs={
            'class': 'form-control form-control-md datetimepicker-input', 'data-target':"#datetimepicker"}
        self.fields['details'].widget.attrs={
            'class': 'form-control form-control-md'}