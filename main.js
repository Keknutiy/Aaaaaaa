// Макаров Анатолий Александрович
const todoControl = document.querySelector (".todo-control"),
todoList = document.querySelector (".todo-list"),
todoCompleted = document.querySelector (".todo-completed"),
todoContainer = document.querySelector (".todo-container");


MainCookie = document.cookie.split("=");
obj = JSON.parse(MainCookie[1] ? MainCookie[1] : "[]");

const render = () =>{
    todoList.textContent="";
    todoCompleted.textContent="";

    obj.forEach((el) =>{
        const li = document.createElement("li");
        li.classList.add("todo-item");
        li.innerHTML = `<span class="text-todo">${el.value}</span>
        <div class="todo-buttons">
        <button class="todo-remove"></button>
        <button class="todo-complete"></button>
        </div>`;
        if (el.completed) todoCompleted.append(li);
        else todoList.append(li);
    });
    document.cookie = "todo-list=" + JSON.stringify(obj);
    console.log(document.cookie);
}
render();

todoControl.addEventListener("submit", (event) =>{
    event.preventDefault();
    const input = todoControl.querySelector("input");
    if (input.value!=""){
        newObj = {value: input.value, completed: false}
        obj.push(newObj);
        input.value = "";
    }
    render();
});

const search = (elem) =>{
    const elemText = elem.querySelector("span").textContent,
    elemCompleted = todoCompleted.contains(elem);
    obj.forEach((el, index) =>{
        if(el.value === elemText) {
            if (el.completed === elemCompleted) {
                ind = index;
            }
        }
    })
        return ind;
}

todoContainer.addEventListener("click", (event) =>{
    event.preventDefault();
    const target = event.target;
    if(!target.matches("button")) return;
    let index = search(target.closest("li"));
    if (target.matches(".todo-complete")){
        if (obj[index].completed=obj[index].completed==true){
            obj[index].completed = false;
        }
        else{
            obj[index].completed = true;
        }
    }
    else if (target.matches(".todo-remove")){
        obj.splice(index, 1);
    };
    render();
});