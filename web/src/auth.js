class Auth{

    login(userid,password,successCallback,errorCallback){

        let body={
            "username":userid,
            "password":password
        }

        fetch("http://localhost:5000/api/login",{
            method:"POST",
            headers:{
                "Content-type":"application/json",
                "Accept":"application/json"
            },
            body:JSON.stringify(body)
        })
        
        .then(res=>{
            if (res.status>=200 && res.status<=300){
                localStorage.setItem("loggedin",'true')
                res.json().then(res=>{
                    localStorage.setItem("token",res.token)
                    successCallback()}
                )
            }
            else
                errorCallback(res.status)
        })
        .catch(err=>{
            console.log(err)
            errorCallback(1000)
        })
    }

    register(firstname,lastname,userid,password,successCallback,errorCallback){
        let body={
            "firstname":firstname,
            "lastname":lastname,
            "username":userid,
            "password":password
        }

        fetch("http://localhost:5000/api/register",{
            method:"POST",
            headers:{
                "Content-type":"application/json",
                "Accept":"application/json"
            },
            body:JSON.stringify(body)
        })
        
        .then(res=>{
            if (res.status>=200 && res.status<=300){
                successCallback()
            }
            else{
                let status=res.status
                res.json().then(res=>errorCallback(status,res.message))
            }
                
        })
        .catch(err=>{
            console.log(err)
            errorCallback(1000)
        })
    }

    logout(logoutCallback){
        localStorage.removeItem("loggedin")
        localStorage.removeItem("token")
        logoutCallback()
    }
}
export default new Auth()