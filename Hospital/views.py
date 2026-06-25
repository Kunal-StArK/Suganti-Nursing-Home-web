from django.http import HttpResponse
from django.shortcuts import render

def homePage(request):
    return render(request,'index.html')

def aboutPage(request):
    return render(request,"about.html")

def blogPage(request):
    return render(request,"blog.html")





def aboutcopyPage(request):
    sum=0
    # if val1 is not None and val2 is not None and val1 != "" and val2 != "":
    try:
            # n1=int(request.GET['num1'])
            # n2=int(request.GET['num2'])
            val1=int(request.GET.get('num1'))
            val2=int(request.GET.get('num2'))
            sum = val1 + val2  # Dono numbers hain toh plus kar do
    except ValueError:
            sum = "Enter Number only" # Agar kisi ne text daal diya toh

    return render(request,"aboutform.html",{'output' : sum})