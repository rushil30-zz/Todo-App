function fetchData()
{
fetch("http://127.0.0.1:5000/getdata")
   
    .then(response => response.json())
    .then(json => {
  
        let li = `<tr><th>ID</th><th>Task</th></tr>`;
       
        json.forEach(task => {
            li += `<tr>
                        <td>${task.id} </td>
                        <td>${task.content}</td>        
                    </tr>`;
        });
  
    document.getElementById("task").innerHTML = li;
});
}

