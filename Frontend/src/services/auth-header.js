//authorization headers
export default function authHeader(){
    const user = JSON.parse(localStorage.getItem("user"))
    if(user && user.acessToken) {
        console.log(user.accessToken)
        return { "x-access-token" :user.accessToken}
    }else{
        return{}
    }
}