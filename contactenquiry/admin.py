from django.contrib import admin
from contactenquiry.models import contactEnquiry
# Register your models here.

class contactAdmin(admin.ModelAdmin):
    list_display=('name','email','phone', 'website','message')

admin.site.register(contactEnquiry,contactAdmin)    
