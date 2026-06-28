from django.contrib import admin
from Service.models import Service#this is class name from models

# Register your models here.
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('Service_title','Service_dec')

admin.site.register(Service,ServiceAdmin)    
