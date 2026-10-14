import json
from django.http import JsonResponse
from django.db import connection
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def api_login(request):
    if request.method=="POST":
        data=json.loads(request.body)
        a=data.get("username")
        b=data.get("password")

        with connection.cursor() as cursor:
            cursor.execute("select id,password,role_id,name from user where username=%s",[a])
            result=cursor.fetchone()
            request.session['userid']=result[0]
            request.session['role_id']=result[2]
            request.session['name']=result[3]
            try:
                if result is not None:
                    pwd=result[1].decode('utf-8')
                    if pwd==b:
                        return JsonResponse({'message':'Login Successful','role_id':result[2]},status=200)
                    else:
                        return JsonResponse({'error':'Wrong Password!! Please try again'},status=400)
            except:
                return JsonResponse({'error':'Invalid Credentials'},status=400) 
            else:
                return JsonResponse({'error':'First Signup'},status=404)   
    return JsonResponse({'error':'Invalid Method'},status=405)


@csrf_exempt
def signup(request):
    if request.method=="POST":
        data=json.loads(request.body)
        u1=data.get("username")
        p1=data.get("password")
        n1=data.get("name")
        e1=data.get("email")

        with connection.cursor() as cursor:
            cursor.execute("insert into user(username,password,name,email)values(%s,%s,%s,%s)",[u1,p1,n1,e1])
            return JsonResponse({'message':'Registered Successfully'})
    return JsonResponse({'error':'Invalid method'},status=405)