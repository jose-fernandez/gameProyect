function print(){
	var click=getCookie("click");
	var time=getCookie("time");
	var objClick=document.querySelector(".click");
	var objTime=document.querySelector(".time");
	objTime.setAttribute("data-elements",`${time} secs.`);
	objClick.setAttribute("data-elements",`${click} clicks.`);

}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
}
print();