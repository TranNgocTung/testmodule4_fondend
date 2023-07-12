function home() {
    displayEmployee()
    getDepartment1()
    $("#detailEmployee").hide()
}
window.onload = home

function displayEmployee(){
    $.ajax({
        url : "http://localhost:8080/api/cities",
        type : "GET",
        success(data){
            tableEmployee(data)
            $("#saveForm").hide()
            $("#showEmployee").show()
        }
    })
}


function tableEmployee(data){
    let context = `<div class="container">
                            <h2 style="text-align: center">List Employee</h2>
                            <table class="table table-striped">
                            <thead>
                                <tr>                          
                                 <th>name</th>
                                 <th>nation</th>
                                 <th>area</th>
                                 <th>population</th>
                                  <th>GDP</th>
                                  <th>description</th>
                                  <th colspan="2" style="text-align: center">Action</th>                                                                                                                                                                       
                                </tr>
                            </thead>
                           <tbody>`

    for (let i = 0; i < data.length; i++){
        context+= `<tr>
                           <td>${data[i].name}</td>                      
                           <td>${data[i].nation.name}</td>
                           <td>${data[i].area}</td>
                           <td>${data[i].population}</td>
                           <td>${data[i].gdp}</td>                         
                           <td>${data[i].description}</td>
                           <td><button class="btn btn-warning" onclick="updateFormEmployee(${data[i].id})">Update</button></td>
                           <td><button class="btn btn-danger" onclick="deleteEmployee(${data[i].id})">Delete</button></td>                     
                       </tr>`
    }
    context+= `</tbody> </table> </div>`
    document.getElementById("showEmployee").innerHTML = context
}

function createFormEmployee(){
    document.getElementById("saveForm").reset()
    $("#employee").hide()
    getDepartment();
    document.getElementById("title").innerHTML = "CREATE"
    document.getElementById("action").setAttribute("onclick", "createEmployee()")
    document.getElementById("action").innerHTML = "Create"
    $("#saveForm").show()
}


function createEmployee(){
    let name = $("#name").val();
    let departmentId = $("#departments1").val();
    let area = $("#area").val();
    let population = $("#population").val();
    let gdp = $("#gdp").val();
    let description = $("#description").val();

    if (!name || !departmentId || !area || !population || !gdp || !description) {
        alert("Please fill in all fields.");
        return;
    }

    let employee = {
        name: name,
        nation: {
            id: departmentId,
        },
        area: area,
        population: population,
        gdp: gdp,
        description: description,
    };

    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        url: "http://localhost:8080/api/cities/create",
        type: "POST",
        data: JSON.stringify(employee),
        success() {
            alert("Successful!")
            home()
            displayEmployee()
            $("#showEmployee").show()
        }
    })
    event.preventDefault()
}


function getDepartment(){
    $.ajax({

        url : "http://localhost:8080/api/cities/nation",
        type: "GET",
        success(data){
            console.log(data)
            let context = `<label for="departments" class="form-label">Department</label><br>
                                        <select id="departments1" class="form-control"  style="width: 25%">`
            for (let i =0; i <data.length; i++){
                context+=`<option value="${data[i].id}">${data[i].name}</option>`
            }
            context += `</select>`
            document.getElementById("departmentOption").innerHTML = context
        },
    })
}

function getDepartment1(){
    $.ajax({

        url : "http://localhost:8080/api/cities/nation",
        type: "GET",
        success(data){
            console.log(data)
            let context = `
                                        <select id="departments" class="form-control" >`
            for (let i =0; i <data.length; i++){
                context+=`<option value="${data[i].id}">${data[i].name}</option>`
            }
            context += `</select>`
            document.getElementById("departmentOption1").innerHTML = context
        },
    })
}
function backToHome(){
    displayEmployee()
    $("#showEmployee").show()
    $("#detailEmployee").hide()
}


function updateFormEmployee(id){
    $.ajax({
        url : `http://localhost:8080/api/cities/${id}`,
        type: "GET",
        success(data) {
            $("#name").val(data.name)
            $("#departmentOption").val(data.nation.id);
            $("#area").val(data.area)
            $("#population").val(data.population)
            $("#gdp").val(data.gdp);
            $("#description").val(data.description)
            document.getElementById("title").innerHTML = "UPDATE"
            document.getElementById("action").setAttribute("onclick", `updateEmployee(${id})`)
            document.getElementById("action").innerHTML = "Update"
            $("#showEmployee").hide()
            $("#saveForm").show()
        }
    })
}


function updateEmployee(id){
    let name = $("#name").val();
    let departmentId = $("#departmentOption").val();
    let area = $("#area").val();
    let population = $("#population").val();
    let gdp = $("#gdp").val();
    let description = $("#description").val();

    if (!name || !departmentId || !area || !population || !gdp || !description) {
        alert("Please fill in all fields.");
        return;
    }
    let employee = {
        name: name,
        nation: {
            id: departmentId,
        },
        area: area,
        population: population,
        gdp: gdp,
        description: description,
    };
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        url: "http://localhost:8080/api/cities/save",
        type: "POST",
        data: JSON.stringify(employee),
        success() {
            alert("Successful!")
            displayEmployee()
            $("#showEmployee").show()
        }
    })
    event.preventDefault()
}


function deleteEmployee(id) {
    if (confirm("Do you want to delete ?")) {
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            url: `http://localhost:8080/api/cities/delete/${id}`,
            type: "DELETE",

            success() {
                alert("Delete successfully!")
                displayEmployee()
                $("#showEmployee").show()
            }
        })
    }
}
function detailEmployee(id){
    $.ajax({
        url: "http://localhost:8080/api/cities" + id,
        type: "GET",
        success(data) {
            showDetail(data)
            $("#showEmployee").hide()
            $("#detailEmployee").show()

        }
    })
}
function showDetail(data){
    let context = `
                    <h1>Employee Detail</h1> 
                  <p>EmployeeCode: ${data.codeEmployee} </p><br>
                  <p>Name: ${data.name} </p><br>
                  <p>Salary: ${data.salary} </p><br>
                  <p>Age: ${data.age} </p><br>
                  <p>Department:${data.department.name} </p><br>
                  <button class="btn btn-secondary" onclick="backToHome()">Back</button>
                 
                 `
    document.getElementById("detailEmployee").innerHTML = context
}
function sortEmployee(){
    $.ajax({
        url : "http://localhost:8080/api/cities/sort",
        type : "GET",
        success(data){
            tableEmployee(data)
            $("#saveForm").hide()
            $("#showEmployee").show()
        }
    })
}
function searchDepartment(){
    let id =  $("#departments").val()
    $.ajax({
        url : `http://localhost:8080/api/cities/search/${id}`,
        type : "GET",
        success(data){
            tableEmployee(data)
            $("#saveForm").hide()
            $("#showEmployee").show()
        }
    })
}
