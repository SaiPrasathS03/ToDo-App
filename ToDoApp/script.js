function loadTasks() {
    
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        return JSON.parse(storedTasks);
    } else {
        return {
            work: [],
            personal: [],
            health: [],
            learning: []
        };
    }
}


function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


let tasks = loadTasks();
console.log(tasks);

function addTasks(event){
    event.preventDefault();
    const desc = document.getElementById('description').value;
    const date = document.getElementById('date').value;
    const category= document.getElementById('category').value;
    
    if (!desc || !date) {
        alert("Are you mad?");
        return;
    }
    const newTask = {
        description: desc,
        date: date
    };
    tasks[category].push(newTask);
    saveTasks();
    displayTasks(category);
    document.getElementById('task-form').reset();
    

}

function displayTasks(category,event) {
    
    let div = document.getElementById('displayDiv');
    
    div.innerHTML = "";

    
    const selectedTasks = tasks[category];

    
    if (selectedTasks && selectedTasks.length > 0) {
        selectedTasks.forEach((task,index) => {
            let taskDesc = task.description;
            let taskDeadline = task.date;
            let taskDiv = document.createElement('div');
            taskDiv.className="taskList";
            taskDiv.setAttribute('id', `taskDiv${index}`);
            taskDiv.innerHTML=`
                <input id="eachTask${index}" value="${taskDesc}" disabled style="width:90%"/>
                <p>Deadline: ${taskDeadline}</p>
                <button onclick="fade(${index})">✔</button>
                <button onclick="editClicked(${index},'${category}')" id="editButton${index}">Edit</button>
                <button onclick="deleteTask(${index},'${category}')">Delete</button>
                
            `
            div.append(taskDiv);
        });
    }
    else div.innerHTML = `<p style="color:white">No Tasks in ${event.target.textContent}</p>`;
    
}

function fade(index) {
    let taskDiv = document.getElementById(`taskDiv${index}`);
    taskDiv.classList.toggle('faded');
}


function editClicked(index,category){
    let btn = document.getElementById(`editButton${index}`);
    let text = btn.textContent;
    let input = document.getElementById(`eachTask${index}`);
    let selectedTasks = tasks[category];
    
    if(text==="Edit"){
        if(input.disabled){
            input.disabled=false;
            input.focus();
            btn.textContent = "Save";
        }
        else{
            input.disabled=true;
            btn.textContent = "Edit ";
        }
    }

    else{
        btn.textContent = "Edit";
        input.disabled=true;
        selectedTasks[index].description = input.value;
        saveTasks();
    }
}

function deleteTask(index, category) {
    let selectedTasks = tasks[category];
    selectedTasks.splice(index, 1);
    saveTasks(tasks);
    displayTasks(category);
}
