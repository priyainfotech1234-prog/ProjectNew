from django.shortcuts import render,redirect
from django.db import connection

def login(request):
    if request.method=="POST":
        a=request.POST.get("username")
        b=request.POST.get("password")

        with connection.cursor() as cursor:
            cursor.execute("select id,password,role_id,name from user where username=%s",[a])
            result=cursor.fetchone()
            request.session['userid']=result[0]
            request.session['role_id']=result[2]
            request.session['name']=result[3]
            if result[2]!=1:
                return redirect('dashboard')

            elif result[2]==1:
                return redirect('userdetails')
               
            try:
                if result is not None:
                    pwd=result[1].decode('utf-8')
                    if pwd==b:
                        return redirect('dashboard')
                    else:
                        return render(request,'index.html',{'error':'Wrong Password!! Please try again'})
            except:
                return render(request,'index.html',{'error':'Invalid Credentials'}) 
            else:
                return render(request,'index.html',{'error':'First Signup'})   
    return render(request,'index.html')

def signup(request):
    if request.method=="POST":
        u1=request.POST.get("username")
        p1=request.POST.get("password")
        n1=request.POST.get("name")
        e1=request.POST.get("email")

        with connection.cursor() as cursor:
            cursor.execute("insert into user(username,password,name,email)values(%s,%s,%s,%s)",[u1,p1,n1,e1])
            return render(request,'Signup.html',{'message':'Registered Successfully'})
    return render(request,'Signup.html')


def dashboard(request):
    a=render(request,'dashboard.html')
    a['cache-control']='no-store,no-cache,must-revalidate,max-age=0'
    a['pragma']='no-cache'
    a['expires']='0'
    return a

def admindashboard(request):
    with connection.cursor() as cursor:
        cursor.execute("select user.name,user.email,user.role_id,role.role_name from user join role on user.role_id=role.id")
        output=cursor.fetchall()
    return render(request,"admindashboard.html",{"user":output})


def edit(request):
    user_id=request.session.get("userid")

    if request.method=="POST":
        na=request.POST.get("name")
        em=request.POST.get("email")

        with connection.cursor() as cursor:
            cursor.execute("update user set name=%s,email=%s where id=%s",[na,em,user_id])
            return render(request,"profile.html",{'message':'Updated Successfully'})
        return render(request,'profile.html')
        
    with connection.cursor() as cursor:
        cursor.execute("select name,email from user where id=%s",[user_id])
        res1=cursor.fetchone()
        if res1:
            data={"name":res1[0],"email":res1[1]}
    return render(request,'profile.html',{"user":data})


def userdetails(request):
    logged_in_role=request.session['role_id']
    logged_in_user=request.session['name']
    logged_in_person=request.session['userid']

    with connection.cursor() as cursor:
        if logged_in_role==1:
            cursor.execute("select user.id,user.name,user.email,role.role_name from user join role on user.role_id=role.id")
            result1=cursor.fetchall()
            cursor.execute("select user.name,user.email,applyleave.leave_type,applyleave.start_date,applyleave.end_date,applyleave.reason,applyleave.id,applyleave.status from user join applyleave on user.id=applyleave.user_id")
            result2=cursor.fetchall()
        elif logged_in_role==2:
            cursor.execute("select user.id,user.name,user.email,role.role_name from user join role on user.role_id=role.id where user.id=%s",[logged_in_person])
            result1=cursor.fetchall()
            cursor.execute("select user.name,user.email,applyleave.leave_type,applyleave.start_date,applyleave.end_date,applyleave.reason,applyleave.id,applyleave.status from user join applyleave on user.id=applyleave.user_id where user.id=%s",[logged_in_person])
            result2=cursor.fetchall()
        elif logged_in_role==3:
            cursor.execute("select user.id,user.name,user.email,role.role_name from user join role on user.role_id=role.id where user.id=%s",[logged_in_person])
            result1=cursor.fetchall()
            cursor.execute("select user.name,user.email,applyleave.leave_type,applyleave.start_date,applyleave.end_date,applyleave.reason,applyleave.id,applyleave.status from user join applyleave on user.id=applyleave.user_id where user.id=%s",[logged_in_person])
            result2=cursor.fetchall()
        elif logged_in_role==4:
            cursor.execute("select user.id,user.name,user.email,role.role_name from user join role on user.role_id=role.id where user.id=%s",[logged_in_person])
            result1=cursor.fetchall()
            cursor.execute("select user.name,user.email,applyleave.leave_type,applyleave.start_date,applyleave.end_date,applyleave.reason,applyleave.id,applyleave.status from user join applyleave on user.id=applyleave.user_id where user.id=%s",[logged_in_person])
            result2=cursor.fetchall()
    context={
        "user":result1,
        "applyleave":result2,
    }
    return render(request,"userdetails.html",context)


def editdetails(request,id):
    if request.method=="POST":
            n2=request.POST.get("name")
            e2=request.POST.get("email")
            r2=request.POST.get("role_id")

            with connection.cursor() as cursor:
                cursor.execute("update user set name=%s,email=%s,role_id=%s where id=%s",[n2,e2,r2,id])
                return redirect('userdetails')
    else:
            with connection.cursor() as cursor:
                cursor.execute("select name,email,role_id from user where id=%s",[id])
                user_data=cursor.fetchall()
                cursor.execute("select id,role_name from role")
                role_data=cursor.fetchall()
         
    return render(request,"editdetails.html",{"user":user_data,"role":role_data})


def delete(request,id):
    with connection.cursor() as cursor:
        cursor.execute("delete from user where id=%s",[id])
        return redirect('userdetails')

def logout(request):
    request.session.flush()
    return redirect('login')

def applyleave(request):
    login_person=request.session['userid']

    if request.method=="POST":
        leavetype=request.POST.get("leave_type")
        startdate=request.POST.get("start_date")
        enddate=request.POST.get("end_date")
        reason=request.POST.get("text")

        with connection.cursor() as cursor:
            cursor.execute("insert into applyleave(leave_type,start_date,end_date,reason,user_id)values(%s,%s,%s,%s,%s)",[leavetype,startdate,enddate,reason,login_person])
            return render(request,"applyleave.html",{'message':"Applied Successfully!!"})
    return render(request,"applyleave.html")


def status(request,id):
    if request.method=="POST":
        actionable_value=request.POST.get("action")

        with connection.cursor() as cursor:
            cursor.execute("update applyleave set status=%s where id=%s",[actionable_value,id] )
    return redirect('userdetails')
