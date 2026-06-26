from django import forms 

class UserForm(forms.Form):
    num1=forms.CharField(label="Value 1")
    num2=forms.CharField(label="Value 2")