function confirmReset() {
    return confirm("Do you want to reset all the fields?");
}

function checkEmpty(id) {
    var x = document.getElementById(id).value;

    if (x == "") {
        document.getElementById(id).style.border = "2px solid red";
        alert("Please fill out this field.");
    }else {
        document.getElementById(id).style.border = "1px solid black";
    }
}

function saveSignup() {
    if (!confirm("Do you want to submit the form?")) {
        return false;
    }

let signups = JSON.parse(localStorage.getItem("signups")) || [];

let statusElement = document.querySelector('input[name="status"]:checked');
let status = statusElement ? statusElement.value : "";

let signupData = {
        studentID: document.getElementById("studentID").value,
        fullName: document.getElementById("fullName").value,
        birthday: document.getElementById("birthday").value,
        email: document.getElementById("email").value,
        mobilePhone: document.getElementById("mobilePhone").value,
        gradeLevel: document.getElementById("gradeLevel").value,
        status: status,
        orgclub: document.getElementById("orgclub").value,
        reason: document.getElementById("reason").value
    };

signups.push(signupData);
localStorage.setItem("signups", JSON.stringify(signups));

alert("Signup saved successfully!");

document.querySelector("form").reset();

return false;
}