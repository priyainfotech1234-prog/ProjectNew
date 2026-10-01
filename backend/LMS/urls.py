"""
URL configuration for LMS project.

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
from LMSsys import views

urlpatterns = [
    path('admin/', admin.site.urls),
    #path('',views.login,name="login"),
    #path('signup/',views.signup,name="signup"),
    #path('dashboard/',views.dashboard,name="dashboard"),
    #path('userdetails/',views.userdetails,name="userdetails"),
    #path('edit/',views.edit,name="edit"),
    #path('editdetails/<int:id>/',views.editdetails,name="editdetails"),
    #path('delete/<int:id>/',views.delete,name="delete"),
    #path('logout/',views.logout,name="logout"),
    #path('applyleave/',views.applyleave,name="applyleave"),
    #path('status/<int:id>/',views.status,name="status"),
    path('api/login/',views.api_login,name="api_login"),
]
