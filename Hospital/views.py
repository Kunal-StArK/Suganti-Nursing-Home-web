from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render

def homePage(request):
    return render(request,'index.html')

def aboutPage(request):
    return render(request,"about.html")

def blogPage(request):
    return render(request,"blog.html")

def billingPage(request):
    return render(request,"billing.html")

def medibillPage(request):
    return render(request,"medibill.html")



def aboutcopyPage(request):
    sum=0
    data ={}
    try:
        if request.method=="POST":
        # n1=int(request.GET['num1'])
        # n2=int(request.GET['num2'])
            n1=int(request.POST.get('num1'))
            n2=int(request.POST.get('num2'))
            sum = n1 + n2  # Dono numbers hain toh plus kar do
            data={
                 'n1' : n1,
                 'n2' : n2,
                 'output' : sum
            }

            return HttpResponseRedirect('/about/')
    except :
            pass # Agar kisi ne text daal diya toh

    return render(request,"aboutform.html",data)