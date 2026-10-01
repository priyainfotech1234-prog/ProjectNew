from django.shortcuts import render,redirect
from django.db import connection
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['POST'])
def api_login(request):

    if request.method=="POST":
        username=request.data.get("username")
        password=request.data.get("password")
    
        with connection.cursor() as cursor:
            cursor.execute("select id,password,role_id,name from user where username=%s",[username])
            result=cursor.fetchone()

            if result is None:
                return Response({"error":"First Signup / User not found"},status=400)

            user_id=result[0]
            db_password=result[1]
            role_id=result[2]
            name=result[3]

            try:
                if isinstance(db_password,bytes):
                    pwd=db_password.decode('utf-8')
                else:
                    pwd=str(db_password)
                if pwd==password:
                    return Response({
                       "message":"Login Successful",
                       "userid":user_id,
                       "role_id":role_id,
                       "name":name 
                    },status=200)
                else:
                    return Response({"error":"Wrong Password!! Please try again"},status=400)

            except Exception:
                return Response({"error":"Invalid Credentials"},status=400)
            
    return Response({"error":"Invalid request method"},status=400)

