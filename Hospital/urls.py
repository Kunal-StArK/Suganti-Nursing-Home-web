"""
URL configuration for Hospital project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from Hospital import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.homePage, name='home'),
    path('about/',views.aboutPage, name='about'),
    path('blog/',views.blogPage, name='blog'),
    path('aboutform/',views.aboutcopyPage, name='aboutform'),
    path('billing/',views.billingPage, name='billing'),
    path('medibill/',views.medibillPage, name='medibill'),
    path('calculator/',views.calculatorPage),
    path('evenodd/',views.evenoddPage),
    path('marksheet/',views.marksheetPage),
    path('newsDetail/<slug>',views.newsDetailsPage),
    path('form/',views.formPage, name='form')
]
