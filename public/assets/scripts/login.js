//Password visibility toggle function
function toggleVisibility(){
    const x = document.getElementById('password-field');
    if(x.type === "password"){
        x.type = "text";
        document.getElementById('hide').style.display ="inline-block";
        document.getElementById('show').style.display ="none";
        
    }
    else{
        x.type = "password";
        document.getElementById('hide').style.display ="none";
        document.getElementById('show').style.display ="inline-block";
    };
}



//Home to User page redirect function
 //   document.getElementById("user-access-btn").onclick = function () {
//    location.href = "http://localhost:5000/user.html";
//};

/*--Home to Admin page redirect function
    document.getElementById("admin-btn").onclick = function () {
    location.href = "http://localhost:3001/admin.html"
};--*/
