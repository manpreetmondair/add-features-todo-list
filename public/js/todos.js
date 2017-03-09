var todosContainer = document.querySelector('#todos')
var todoItem = document.querySelector('#todoItem')
var todoButton = document.querySelector('#todoButton')
var selectBox = document.querySelector("#selectbox")
var date = document.querySelector("#duedate")

getTodos()

todoItem.addEventListener('keypress', handleKeyPressOnTodoItem)

todoButton.addEventListener('click', addTodo)

function handleKeyPressOnTodoItem(e) {
    if (e.key === 'Enter') {
        addTodo()
    }
}

function addTodo() {
    var todoTask = todoItem.value
    var selectCategory = selectBox.value
    var chooseDueDate = date.value

    var body = {
        todo: todoTask,
        category: selectCategory,
        due_date: chooseDueDate,
        completed: false
    }

    fetch('http://localhost:3000/api/v1/todos', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(showTodo)
  }

function getTodos() {
    fetch('http://localhost:3000/api/v1/todos')
    .then(response => response.json())
    .then(loopTodos)
   
}

function loopTodos(todos) {
    todosContainer.innerHTML = ''
    todos.forEach(showTodo)
    
}

function showTodo(todo) {
    console.log(todo)
    var todoTemplate = `
   <li class="list-group-item"> 
    <div class="checkbox"><label> <input type="checkbox" value=""> ${todo.todo}</label></div> 
    <div class="checkbox"><label><input type="checkbox" value=""><span class="badge badge-default badge-pill">${todo.due_date}</span> </label></div>
    <div class="checkbox"><label> <input type="checkbox" value="">
    <span class="badge badge-default badge-pill">${todo.category}</span></label>
    </div> </li>`
   todosContainer.innerHTML = todoTemplate + todosContainer.innerHTML
}