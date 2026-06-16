let editRow = null;

document.getElementById("studentForm").addEventListener("submit", function (e) {

    e.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let course = document.getElementById("course").value.trim();

    // Error elements
    document.getElementById("nameError").innerHTML = "";
    document.getElementById("emailError").innerHTML = "";
    document.getElementById("phoneError").innerHTML = "";
    document.getElementById("courseError").innerHTML = "";

    let isValid = true;

    // Name validation
    if (name === "") {
        document.getElementById("nameError").innerHTML =
            "Full Name is required";
        isValid = false;
    }

    // Email validation
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        document.getElementById("emailError").innerHTML =
            "Enter a valid email";
        isValid = false;
    }

    // Phone validation
    let phonePattern = /^[0-9]{11}$/;

    if (!phonePattern.test(phone)) {
        document.getElementById("phoneError").innerHTML =
            "Phone number must contain 11 digits";
        isValid = false;
    }

    // Course validation
    if (course === "") {
        document.getElementById("courseError").innerHTML =
            "Course Name is required";
        isValid = false;
    }

    if (!isValid) {
        return;
    }


    if (editRow == null) {

        let table = document.getElementById("studentTable");

        let row = table.insertRow();

        row.insertCell(0).innerHTML = name;
        row.insertCell(1).innerHTML = email;
        row.insertCell(2).innerHTML = phone;
        row.insertCell(3).innerHTML = course;

        row.insertCell(4).innerHTML =
            `<button class="btn btn-warning btn-sm" onclick="editStudent(this)">Edit</button>
             <button class="btn btn-danger btn-sm" onclick="deleteStudent(this)">Delete</button>`;

    }
    else {

        editRow.cells[0].innerHTML = name;
        editRow.cells[1].innerHTML = email;
        editRow.cells[2].innerHTML = phone;
        editRow.cells[3].innerHTML = course;

        editRow = null;

        document.getElementById("submitBtn").innerHTML =
            "Register Student";
    }


    document.getElementById("studentForm").reset();

});


function deleteStudent(button) {

    let row = button.parentElement.parentElement;

    row.remove();

}


function editStudent(button) {

    editRow = button.parentElement.parentElement;

    document.getElementById("name").value =
        editRow.cells[0].innerHTML;

    document.getElementById("email").value =
        editRow.cells[1].innerHTML;

    document.getElementById("phone").value =
        editRow.cells[2].innerHTML;

    document.getElementById("course").value =
        editRow.cells[3].innerHTML;

    document.getElementById("submitBtn").innerHTML =
        "Update Student";

}