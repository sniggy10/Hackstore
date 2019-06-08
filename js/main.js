var attempt = 3; // Variable to count number of attempts.
// Below function Executes on click of login button.
function validate(){
var username = document.getElementById("name").value;
var password = document.getElementById("password").value;

axios.get('http://localhost:3006/userModel',{
  
}

if ( username ===  && password === ){
alert ("Login successfully");
window.location = "success.html"; // Redirecting to other page.
return false;
}
else {

}

}

function validateSignUp(){

    var pass1=document.getElementById('pass').value;
    var pass2=document.getElementById('re_pass').value;
        var email1=document.getElementById('email').value;

        //if(0)console.log("this");else{
        if(pass1===pass2){
         axios.post('http://localhost:3006/userModel',{
            email_id:email1,
            password:pass1
                  })
            window.open("/blog.html");
           }
           else
           {
            alert("Yours passwords do not match");
           }
        
        }
        
      //}



