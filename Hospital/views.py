from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render, redirect

def homePage(request):
    return render(request,'index.html')

def aboutPage(request):
    if request.method=="GET":
        output=request.GET.get('output')
    return render(request,"about.html",{'output' : output})

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

            url = "/about/?output={}".format(sum)
            return redirect(url)
    except :
            pass # Agar kisi ne text daal diya toh

    return render(request,"aboutform.html",data)