function loadData(){
    fetch("http://127.0.0.1:5000/getdata")
   
    .then(response => response.json())
    .then(json => {
  
        let li = `<tr><th class='abc'>ID</th><th class='abc'>Task</th><th class='abc'>Date and Time</th><th class='abc'>Actions</th></tr>`;
       
        json.forEach(task => {
            li += `<tr>
                        <td class='xyz'><b>${task.id}</b></td>
                        <td class='xyz'><b>${task.content}</b></td>
                        <td class='xyz'><b>${task.date}</b></td>
                        
                        <td>
                <button id='ubutton' class='wi'onclick='updatedata(${task.id})'>Update</button>
                <button id='dbutton' class='wi'onclick='deletedata(${task.id})'>Delete</button>
                         </td>     
                    </tr>`;
        });         
    document.getElementById("data").innerHTML = li;
});
}
function add(){
    var content = document.getElementById('content1').value;
    var id = document.getElementById('id').value;
    if (content.trim() ==""){
        alert("Field cannot be empty");
    }
    else{
    alert("Task Executed")
    var entry = {"content":content, "id":id};
    fetch("http://127.0.0.1:5000/addtodo", {
                    method: "POST",                    
                    body: JSON.stringify(entry),
                    headers: new Headers({
                        "content-type": "application/json"
                    })
                })  
    .then(response => response.json()) 
    .then(json => {
        let li = `<tr><th class='abc'>ID</th><th class='abc'>Task</th><th class='abc'>Date and Time</th><th class='abc'>Actions</th></tr>`;
        json.forEach(task => {
            li += `<tr>
                        <td class='xyz'><b>${task.id}</b></td>
                        <td class='xyz'><b>${task.content}</b></td>
                        <td class='xyz'><b>${task.date}</b></td>
                        <td>
                <button id='ubutton' class='wi'onclick='updatedata(${task.id})'>Update</button>
                <button id='dbutton' class='wi'onclick='deletedata(${task.id})'>Delete</button>
                         </td>     
                    </tr>`;
        });   
        document.getElementById("data").innerHTML = li; 
        document.getElementById("content1").value = null; 
        document.getElementById('id').value = null;
        document.getElementById('btn').value = "Add Task"

    })}
}    

function updatedata(id)
{   //console.log(id)
    let confirmAction = confirm("Are you sure you want to update?");
    if (confirmAction) {
    var id = id.toString()
    var content = document.getElementById('content1').value;
    var entry = {"content":content};
    response = fetch("http://127.0.0.1:5000/updatedata/"+""+id, {
                            method: "POST",
                            body: JSON.stringify(entry),
                            headers: new Headers({
                                "content-type": "application/json"
                            })
                        })
        .then((response) => {
            return response.json();
        })
        .then((myJson) => {
            console.log(myJson);
            document.getElementById('content1').value = myJson['task']
            document.getElementById('btn').value = "Update"
            document.getElementById('id').value = myJson['id']
        })  }       
};

function deletedata(id)
{
    let confirmAction = confirm("Are you sure you want to delete?");
if (confirmAction) {

    fetch("http://127.0.0.1:5000/deletedata/"+""+id,)
    .then(response => response.json()) 
    .then(json => {
        let li = `<tr><th class='abc'>ID</th><th class='abc'>Task</th><th class='abc'>Date and time</th><th class='abc'>Actions</th></tr>`;
        json.forEach(task => {
            li += `<tr>
                        <td class='xyz'><b>${task.id}</b></td>
                        <td class='xyz'><b>${task.content}</b></td>
                        <td class='xyz'><b>${task.date}</b></td>
                        <td>
                <button id='ubutton' class='wi'onclick='updatedata(${task.id})'>Update</button>
                <button id='dbutton' class='wi'onclick='deletedata(${task.id})'>Delete</button>
                         </td>     
                    </tr>`;
        }); 
        alert("Deleted successfully");  
        document.getElementById("data").innerHTML = li; 
        document.getElementById("content1").value = null;        
    })} 
else{
    alert("Action cancelled");
    }    
};

function ascendingdata()
{
    fetch("http://127.0.0.1:5000/ascending")
   
    .then(response => response.json())
    .then(json => {
  
        let li = `<tr><th class='abc'>ID</th><th class='abc'>Task</th><th class='abc'>Date and Time</th><th class='abc'>Actions</th></tr>`;
       
        json.forEach(task => {
            li += `<tr>
                        <td class='xyz'><b>${task.id}</b></td>
                        <td class='xyz'><b>${task.content}</b></td>
                        <td class='xyz'><b>${task.date}</b></td>
                        
                        <td>
                <button id='ubutton' class='wi'onclick='updatedata(${task.id})'>Update</button>
                <button id='dbutton' class='wi'onclick='deletedata(${task.id})'>Delete</button>
                         </td>     
                    </tr>`;
        });         
    document.getElementById("data").innerHTML = li;
});
};

function descendingdata()
{
    fetch("http://127.0.0.1:5000/descending")
   
    .then(response => response.json())
    .then(json => {
  
        let li = `<tr><th class='abc'>ID</th><th class='abc'>Task</th><th class='abc'>Date and Time</th><th class='abc'>Actions</th></tr>`;
       
        json.forEach(task => {
            li += `<tr>
                        <td class='xyz'><b>${task.id}</b></td>
                        <td class='xyz'><b>${task.content}</b></td>
                        <td class='xyz'><b>${task.date}</b></td>
                        
                        <td>
                <button id='ubutton' class='wi'onclick='updatedata(${task.id})'>Update</button>
                <button id='dbutton' class='wi'onclick='deletedata(${task.id})'>Delete</button>
                         </td>     
                    </tr>`;
        });         
    document.getElementById("data").innerHTML = li;
});
};

function todaydata()
{
    fetch("http://127.0.0.1:5000/todaydata")

    .then(response => response.json())
    .then(json => {
  
        let li = `<tr><th class='abc'>ID</th><th class='abc'>Task</th><th class='abc'>Date and Time</th><th class='abc'>Actions</th></tr>`;
       
        json.forEach(task => {
            li += `<tr>
                        <td class='xyz'><b>${task.id}</b></td>
                        <td class='xyz'><b>${task.content}</b></td>
                        <td class='xyz'><b>${task.date}</b></td>
                        
                        <td>
                <button id='ubutton' class='wi'onclick='updatedata(${task.id})'>Update</button>
                <button id='dbutton' class='wi'onclick='deletedata(${task.id})'>Delete</button>
                         </td>     
                    </tr>`;
                console.log(task.content)    
        });         
    document.getElementById("data").innerHTML = li;
});


};

function validateForm(){
    var x = document.getElementById("content1").value;
    if (x ==""){
        alert("Field cannot be empty");
    }
}






