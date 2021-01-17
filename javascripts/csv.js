/*
function insertIntoDB() {
    var type = document.getElementById("select_form_type").value;
	var name = document.getElementById("yourname").value;
	var org = document.getElementById("organization").value;
	var email = document.getElementById("email").value;
	var pass = document.getElementById("password").value;
	var np_desc = '';
	if (document.getElementById("description").value != '') {
		np_desc = document.getElementById("description").value;
	} else if (document.getElementById("com_description").value != '') {
         np_desc = document.getElementById("com_description").value;
   } else if (document.getElementById("stu_description").value != '') {
       np_desc = document.getElementById("stu_description").value;
   }
   var web = document.getElementById("website").value;
   
   //const vals = [name, org, email, pass, np_desc, web];
   const vals = ['hello', 'world'];
   var csvContent = "data:text/csv;charset=utf-8,";
   
   var row = vals.join(",");
   csvContent += row + "\r\n";
   
   var encodedUri = encodeURI(csvContent);
   window.open(encodedUri);
}
*/

function testy() {
    console.log('Hello World');
}

document.getElementById("but").addEventListener("click", testy);