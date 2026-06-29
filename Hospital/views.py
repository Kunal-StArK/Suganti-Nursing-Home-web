from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render, redirect
from .forms import UserForm
from Service.models import Service
from news.models import News
from django.core.paginator import Paginator
from contactenquiry.models import contactEnquiry
from django.core.mail import send_mail 
from django.core.mail import EmailMultiAlternatives

def homePage(request):
    
    newsData = News.objects.all()     # ye news app se aayega data 

    ServiceData= Service.objects.all().order_by('Service_title')

    paginator = Paginator(ServiceData,2)
    page_number = request.GET.get('page')
    ServiceDatafinal = paginator.get_page(page_number)

    if request.method == "GET":
        st = request.GET.get('servicesname')
        if st!=None:
            ServiceData= Service.objects.filter(Service_title__icontains=st)
    data={
        'newsData' : newsData,            # ye news data ko le jayega data name ke dic se
        'ServiceData' : ServiceDatafinal
    }
    return render(request,'index.html',data)


def newsDetailsPage(request,slug):
    newsDetails=News.objects.get(news_slug=slug)
    data={
        'newsDetails':newsDetails
    }
    return render(request,"newsDetails.html",data)


def aboutPage(request):
    if request.method=="GET":
        output=request.GET.get('output')
    return render(request,"about.html",{'output' : output})


def blogPage(request):
    # send_mail(                          # this for without html tags
    #     "Subject - Testing mail",
    #     "This is the main containt of the mail ",
    #     "otaswelifar@gmail.com",
    #     ["starkkunu@gmail.com"],
    #     fail_silently=False,
    # )

        subject = "hello"                 # this we can also use html tags 
        from_email = "otaswelifar@gmail.com"
        to = "starkkunu@gmail.com"
        text_content = "<p><b>This</b> is an <i>important</i> <u>message.</u>"
        html_content = "<p>This is an <strong>important</strong> message.</p>"
        msg = EmailMultiAlternatives(subject, text_content, from_email, [to])
        msg.content_subtype = 'html'
        msg.send()

        return render(request,"blog.html")

def billingPage(request):
    return render(request,"billing.html")

def medibillPage(request):
    return render(request,"medibill.html")



# def aboutcopyPage(request):
#     sum=0
#     data ={}
#     try:
#         if request.method=="POST":
#         # n1=int(request.GET['num1'])
#         # n2=int(request.GET['num2'])
#             n1=int(request.POST.get('num1'))
#             n2=int(request.POST.get('num2'))
#             sum = n1 + n2  # Dono numbers hain toh plus kar do
#             data={
#                  'n1' : n1,
#                  'n2' : n2,
#                  'output' : sum
#             }

#             url = "/about/?output={}".format(sum)
#             return redirect(url)
#     except :
#             pass # Agar kisi ne text daal diya toh

#     return render(request,"aboutform.html",data)



def aboutcopyPage(request):
    sum=0
    fn = UserForm()                 # UserForm ki class ko fn me store kr diya
    data = {'form':fn}               # fn ki value ko form me store kiya and data wale dic me send kiya 
    try:
        if request.method=="POST":
            n1=int(request.POST.get('num1'))
            n2=int(request.POST.get('num2'))

            sum = n1+n2

            data = {
                'form':fn,
                'output' : sum
            }
            url = "/about/?output={}".format(sum)
            return redirect(url)
    except:
        pass
    return render(request,"aboutform.html",data)



# ye calculator ka views ha
def calculatorPage(request):
    c=''
    try:
        if request.method== "POST":
            n1=eval(request.POST.get('num1'))
            n2=eval(request.POST.get('num2'))
            opr=request.POST.get('opr')
            if opr=="+":
                c=n1+n2
            elif opr == "-":
                c=n1-n2
            elif opr=="*":
                c=n1*n2
            elif opr=="/":
                c=n1/n2

    except:
        c="invalid opr................"
    return render(request,"calculator.html",{'c':c})


# ye even odd ka views hai
def evenoddPage(request):
    try:
        ans=''
        if request.method == "POST":
            num = eval(request.POST.get('num1'))
            if (num%2==0):
                ans="number is even"
            else:
                ans="number is odd"   
    except:
        pass
    return render(request,"evenodd.html",{'c':ans})


# ye markssheet ka views hai
def marksheetPage(request):
    data = {}
    try:
        if request.method=="POST":
            sub1=eval(request.POST.get('sub1'))
            sub2=eval(request.POST.get('sub2'))
            sub3=eval(request.POST.get('sub3'))
            sub4=eval(request.POST.get('sub4'))
            sub5=eval(request.POST.get('sub5'))

            t = sub1+sub2+sub3+sub4+sub5
            p = t/5

            if p >= 60:
                d="First division"
            elif p>=50:
                d="Second division"
            elif p>= 40:
                d="Third division"
            else:
                d="Fail"

            data={
                'total' : t,
                'percent' : p,
                'division': d
            }
    except:
        pass
    return render(request,"marksheet.html",data)


# ye form ka views h
def contactPage(request):
    if request.method == "POST":
        name=request.POST.get('name')
        email=request.POST.get('email')
        phone=request.POST.get('phone')
        website=request.POST.get('website')
        message=request.POST.get('message')
        data=contactEnquiry(name=name,email=email,phone=phone,website=website,message=message)
        data.save()
    return render(request,"contact.html")