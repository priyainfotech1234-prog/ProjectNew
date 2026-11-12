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
            cursor.execute("select id,password,role_id,name,email from user where username=%s",[a])
            result=cursor.fetchone()
            if result is None:
                return JsonResponse({'error':'First signup or User not found'},status=404)
            
            try:
                pwd=result[1].decode('utf-8')
                if pwd==b:
                    request.session['id']=result[0]
                    request.session['role_id']=result[2]
                    request.session['name']=result[3]

                    return JsonResponse({'message':'Login Successful','role_id':result[2],'name':result[3],'id':result[0],'email':result[4]},status=200)
                    
                else:
                    return JsonResponse({'error':'Wrong Password!! Please try again'},status=400)
            except Exception as e:
                print("Login error",str(e))
                return JsonResponse({'error':f'Invalid Credentials:{str(e)}'},status=400) 
               
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

@csrf_exempt
def update(request,id):
    print("----------------------------------------")
    print("DEBUG: Update view was hit!")
    print("DEBUG: All Session Data ->", dict(request.session))
    user_id=request.session.get("id")
    print(user_id)
    if request.method=="PUT":
        data=json.loads(request.body)
        print("received",data)
        id=data.get("id")
        print(id)
        na=data.get("name")
        em=data.get("email")
        ro=data.get("role_id")
        #user_id=data.get("role_id")

        with connection.cursor() as cursor:
           cursor.execute("update user set name=%s, email=%s, role_id=%s where id=%s", [na, em, ro, id])
           return JsonResponse({'message':'Updated Successfully'},status=200)
    return JsonResponse({'message':'please use only PUT method'},status=400)

@csrf_exempt
def read(request,id=None):
    logged_in_user=request.session.get('role_id')
    print(logged_in_user)
    if not logged_in_user:
        return JsonResponse({'error':'Unauthorized Please login again'},status=401)
    if request.method=="GET":
        with connection.cursor() as cursor:
            if logged_in_user==1:
                cursor.execute("select id,name,email,role_id from user")
                result=cursor.fetchall()
                return JsonResponse(result, safe=False)
            else:
                cursor.execute("select id,name,email,role_id from user where id=%s",[id])
                result=cursor.fetchone()
                return JsonResponse(result,safe=False)

@csrf_exempt
def delete(request,id):
    if request.method=="DELETE":
        try:
            with connection.cursor() as cursor:
                cursor.execute("delete from user where id=%s",[id])
                return JsonResponse({"message":"User deleted successfully"})
        except Exception as e:
            print("server error",e)
            return JsonResponse({"error":str(e)},status=500)
    return JsonResponse({"error":"Invalid Method"},status=400)
        
