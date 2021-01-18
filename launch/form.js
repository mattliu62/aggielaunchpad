// form type
var form_type_div = document.getElementById("form_type_div");
var form_type_entry = document.getElementById("form_type_entry");

// name
var name_entry = document.getElementById("name_entry");

// organization
var np_org_entry = document.getElementById("np_org_entry");
var com_org_entry = document.getElementById("com_org_entry");
var uni_org_entry = document.getElementById("uni_org_entry");
var org_entry = document.getElementById("org_entry");

// email
var email_entry = document.getElementById("email_entry");

// password
var password_entry = document.getElementById("password_entry");

// description
var np_desc_entry = document.getElementById("np_desc_entry");
var com_desc_entry = document.getElementById("com_desc_entry");
var stu_desc_entry = document.getElementById("stu_desc_entry");
var desc_entry = document.getElementById("desc_entry");

// website
var website_entry = document.getElementById("website_entry");

// submit buttons
var submit_type_buttom = document.getElementById("submit_type_button");
var submit_name_button = document.getElementById("submit_name_button");
var submit_org_button = document.getElementById("submit_org_button");
var submit_email_button = document.getElementById("submit_email_button");
var submit_password_button = document.getElementById("submit_password_button");
var submit_desc_button = document.getElementById("submit_desc_button");
var submit_website_button = document.getElementById("submit_website_button");
var submit_form_div = document.getElementById("submit_form_div");

// submit type -> make type invisible, make name visible
submit_type_button.onclick = function() {
    MoveLeft();
    // make form type invisible
    form_type_div.style.display = "none";
    
 //   document.body.backgroundColor = "#f3f3f3";
    setTimeout(function(){
      // make name visible
      name_entry.style.display = "block";
      document.body.style.backgroundImage = "url('../images/2.jpg')";
      document.body.style.backgroundPosition = 'center';
    }, 1500);
}

// submit name -> make name invisible, make organization visible
submit_name_button.onclick = function() {
    MoveLeft();
    // make name invisible
    name_entry.style.display = "none";
    
    setTimeout(function() {
    document.body.style.backgroundPosition = 'center';
	document.body.style.backgroundImage = "url('../images/3.jpg')";

    // make organization visible
    org_entry.style.display = "block";
    if (form_type_entry.value == "Student") {
        uni_org_entry.style.display = "block";
    }
    if (form_type_entry.value == "Nonprofit") {
        np_org_entry.style.display = "block";
    }
    if (form_type_entry.value == "Company") {
        com_org_entry.style.display = "block";
    }
    }, 1500);
}

// submit organization -> make organization invisible, make email visible
submit_org_button.onclick = function() {
    MoveLeft();
    // make organization invisible
    org_entry.style.display = "none";
    np_org_entry.style.display = "none";
    com_org_entry.style.display = "none";
    uni_org_entry.style.display = "none";
    
    setTimeout(function() {
    document.body.style.backgroundPosition = 'center';
	document.body.style.backgroundImage = "url('../images/4.jpg')";
    if (form_type_entry.value == "Student") {
            uni_org_entry.style.display = "none";
    }
    if (form_type_entry.value == "Nonprofit") {
            np_org_entry.style.display = "none";
    }
    if (form_type_entry.value == "Company") {
            com_org_entry.style.display = "none";
    }
    // make email visible
    email_entry.style.display = "block";
    }, 1500);
}

// submit email -> make email invisible, make password visible
submit_email_button.onclick = function() {
    MoveLeft();
    // make email invisible
    email_entry.style.display = "none";
    
    setTimeout(function() {
    document.body.style.backgroundPosition = 'center';
	document.body.style.backgroundImage = "url('../images/4_5.jpg')";

    // make password visible
    password_entry.style.display = "block";
    }, 1500);
}

// submit password -> make password invisible, make description visible
submit_password_button.onclick = function() {
    MoveLeft();
    // make password invisible
    password_entry.style.display = "none";
    
    setTimeout(function() {
    document.body.style.backgroundPosition = 'center';
	document.body.style.backgroundImage = "url('../images/5.jpg')";

    // make description visible
    desc_entry.style.display = "block";
    if (form_type_entry.value == "Student") {
            stu_desc_entry.style.display = "block";
    }
    if (form_type_entry.value == "Nonprofit") {
            np_desc_entry.style.display = "block";
    }
    if (form_type_entry.value == "Company") {
            com_desc_entry.style.display = "block";
    }
    }, 1500);
}

// submit description -> make description invisible, make website visible
submit_desc_button.onclick = function() {
    MoveLeft();
    // make description invisibile
    desc_entry.style.display = "none";
    np_desc_entry.style.display = "none";
    com_desc_entry.style.display = "none";
    stu_desc_entry.style.display = "none";
    
    setTimeout(function() {
    document.body.style.backgroundPosition = 'center';
	document.body.style.backgroundImage = "url('../images/6.jpg')";
    if (form_type_entry.value == "Student") {
            stu_desc_entry.style.display = "none";
    }
    if (form_type_entry.value == "Nonprofit") {
            np_desc_entry.style.display = "none";
    }
    if (form_type_entry.value == "Company") {
            com_desc_entry.style.display = "none";
    }

    // make website visible
        website_entry.style.display = "block";
    }, 1500);
}

// submit website -> make website visible, make submit button visible
submit_website_button.onclick = function() {
    MoveLeft();
    // make website invisible
    website_entry.style.display = "none";
    
    setTimeout(function() {
    document.body.style.backgroundPosition = 'center';
	document.body.style.backgroundImage = "url('../images/8.jpg')";

    // make submit button visible
    submit_form_div.style.display = "block";
    }, 1500);
}

submit_form_button.onclick = function() {
	document.body.style.backgroundImage = "url('../images/8.jpg')";
    //let data = [form_type_entry.value, name_entry.value, org_entry.value, email_entry.value, password_entry.value, desc_entry.value, website_entry.value];
    //let col1 = ["form_type_entry", "name_entry", "org_entry", "email_entry", "password_entry", "desc_entry", "website_entry"];
    //let df1 = new dfd.DataFrame(data, {columns: col1});
    dfd.read_csv("data.csv").then(df1 => {
                df1.print();
                dfd.read_csv("data.csv").then(df2 => {
                    df2.print();
                    let new_df = dfd.concat({df_list: [df1, df2], axis: 0});
                    new_df.print();
                    // new_df.to_csv("data2.csv");
                    // new_df.to_csv("/home/abg/data2.csv");
                    var fs = require('fs');
                    fs.appendFile('mynewfile1.txt', 'Hello content!', function (err) {
                        if (err) throw err;
                        console.log('Saved!');
                    });
                })
            }).catch(err => {
                console.log(err);
            })
}

function MoveLeft() {
    console.log('MoveLeft');
    var i=0;
    var move=1;
    function step() {
       document.body.style.backgroundPosition=i+"px";
       //form_type_entry.style.left=i+"px";
       i-=move;
       move++;
       if (i>=-2000) setTimeout(step,10);
    }
    step();
}

