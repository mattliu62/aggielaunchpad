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
    // make form type invisible
    form_type_div.style.display = "none";

    // make name visible
    name_entry.style.display = "block";
}

// submit name -> make name invisible, make organization visible
submit_name_button.onclick = function() {
    // make name invisible
    name_entry.style.display = "none";

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
}

// submit organization -> make organization invisible, make email visible
submit_org_button.onclick = function() {
    // make organization invisible
    org_entry.style.display = "none";
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
}

// submit email -> make email invisible, make password visible
submit_email_button.onclick = function() {
    // make email invisible
    email_entry.style.display = "none";

    // make password visible
    password_entry.style.display = "block";
}

// submit password -> make password invisible, make description visible
submit_password_button.onclick = function() {
    // make password invisible
    password_entry.style.display = "none";

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
}

// submit description -> make description invisible, make website visible
submit_desc_button.onclick = function() {
    // make description invisibile
    desc_entry.style.display = "none";
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
}

// submit website -> make website visible, make submit button visible
submit_website_button.onclick = function() {
    // make website invisible
    website_entry.style.display = "none";

    // make submit button visible
    submit_form_div.style.display = "block";
}

submit_form_button.onclick = function() {
    //let data = [form_type_entry.value, name_entry.value, org_entry.value, email_entry.value, password_entry.value, desc_entry.value, website_entry.value];
    //let col1 = ["form_type_entry", "name_entry", "org_entry", "email_entry", "password_entry", "desc_entry", "website_entry"];
    //let df1 = new dfd.DataFrame(data, {columns: col1});
    dfd.read_csv("data.csv").then(df1 => {
                df1.print();
                dfd.read_csv("data.csv").then(df2 => {
                    df2.print();
                    let new_df = dfd.concat({df_list: [df1, df2], axis: 0});
                    new_df.print();
                    new_df.to_csv("data2.csv");
                })
            }).catch(err => {
                console.log(err);
            })
}

