/*динамическая смена стилей*/
let switchtheme = document.getElementById("switchbtn");
switchtheme.onclick = function(){
    let theme = document.getElementById("theme");
    if(theme.getAttribute("href") == "styledark.css")
    {
        theme.href = "stylelight.css";
    }
    else
    {
        theme.href = "styledark.css";
    }
}
/*проверка вводимых данных*/
var emailflag = false;
var nameflag = false;
var passwordflag = false;
function CheckEmail()
{
    var email = document.getElementById("input1");
    const mailPattern = /^[0-9a-z_-]+\@[0-9a-z_-]+\.[a-z]{2,4}$/i;
    if (!mailPattern.test(email.value.trim())) {
        email.style.border = "2px solid red";
        alert("электронная почта неверного формата");
    }
    else { 
        email.style.border = null;
        emailflag = true;
    }
}
function CheckName()
{
    var name = document.getElementById("input2");
    if ( name.value.search(/\d/) != -1 )
    {
        name.style.border = "2px solid red";
    }
    else{
        name.style.border = null;
        nameflag = true;
    }
}

function CheckPassword()
{
    var password = document.getElementById("input3");
    if (!password.value.match(/[0-9]/g) || !password.value.match(/[a-z]/g) || !password.value.match(/[A-Z]/g)){
        password.style.border = "2px solid red";
        alert("в пароле должны быть цифры, строчные и прописные буквы латинского алфавита");
    }
    else {
        password.style.border = null;
        passwordflag = true;
    }
}
//отправка данных
function json()
{
	let login = document.getElementById("input1");
	let password = document.getElementById("input2");
	let email = document.getElementById("input3");
    //проверка данных
    if(emailflag && nameflag && passwordflag)
    {
   	var request = new XMLHttpRequest();
	function reqReadyStateChange(){
		if (request.readyState == 4){
			var status = request.status;
			if (status == 200){
				document.getElementById("output").innerHTML=request.responseText;
			}
		}
	}
	var body = JSON.stringify({"login": login.value, "email": email.value, "password" : password.value});
	request.open("GET", "http://localhost:8080/postdata.php?"+body,true);
	request.setRequestHeader("Content-Type", "application/json");
	request.onreadystatechange = reqReadyStateChange;
	request.send();
    alert(body);
    }
}
