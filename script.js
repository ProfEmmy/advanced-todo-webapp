const form = document.querySelector("form")
const input_field = document.querySelector("#input-field")
const ul = document.querySelector("ul")
const APP_PREFIX = "TODO-APP"
const APP_KEY = `${APP_PREFIX}-TODOS`
let todos = getTodos() != null ? getTodos() : []


form.addEventListener("submit", e => {
    e.preventDefault()
    addTodo()
    saveTodos()
})

function addLoadedTodos(todo_name) {
    const new_item = document.createElement("li")
    new_item.innerText = todo_name
    ul.appendChild(new_item)
    const cancel = document.createElement("img")
    new_item.appendChild(cancel)
    cancel.src = "pngtree-vector-cancel-icon-png-image_420077.jpg"
    new_item.addEventListener("click", () => {
        new_item.classList.toggle("canceled-item")
        console.log(new_item.classList[0])
        if (new_item.classList[0] == "canceled-item") {
            complete(new_item.innerText)
            console.log("complete")
        } else {
            inComplete(new_item.innerText)
            console.log("not complete")
        }
    })

    cancel.addEventListener("click", () => {
        const list_child = cancel.parentElement
        list_child.parentElement.removeChild(list_child)
        deleteTodo(list_child.innerText)
    })
}

function addTodo() {
    const new_item = document.createElement("li")
    const todo_name = input_field.value
    new_item.innerText = todo_name
    ul.appendChild(new_item)
    const cancel = document.createElement("img")
    new_item.appendChild(cancel)
    cancel.src = "pngtree-vector-cancel-icon-png-image_420077.jpg"
    const new_todo = {
        name: todo_name,
        completed: false
    }
    todos.push(new_todo)
    new_item.addEventListener("click", () => {
        new_item.classList.toggle("canceled-item")
        console.log(new_item.classList[0])
        if (new_item.classList[0] == "canceled-item") {
            complete(new_item.innerText)
        } else {
            inComplete(new_item.innerText)
        }
    })
    const completed_items = document.querySelectorAll(".canceled-item")
    console.log(completed_items)
    // completed_items.forEach(item => {
    //     console.log(item)
    // })

    cancel.addEventListener("click", () => {
        const list_child = cancel.parentElement
        list_child.parentElement.removeChild(list_child)
        deleteTodo(list_child.innerText)
    })

    input_field.value = ""
}

function saveTodos() {
    localStorage.setItem(APP_KEY, JSON.stringify(todos))
}

function complete(completed_todo) {
    const saved_todos = JSON.parse(localStorage.getItem(APP_KEY))
    const completed_ = saved_todos.find(todo => completed_todo == todo.name)
    let index = saved_todos.indexOf(completed_)
    if (index == -1) return
    saved_todos[index].completed = true
    todos = saved_todos
    localStorage.setItem(APP_KEY, JSON.stringify(todos))
}

function inComplete(incomplete_todo) {
    const saved_todos = JSON.parse(localStorage.getItem(APP_KEY))
    const incompleted = saved_todos.find(todo => incomplete_todo == todo.name)
    let index = saved_todos.indexOf(incompleted)
    if (index == -1) return
    saved_todos[index].completed = false
    todos = saved_todos
    localStorage.setItem(APP_KEY, JSON.stringify(todos))
}

function deleteTodo(delete_todo) {
    const saved_todos_array = JSON.parse(localStorage.getItem(APP_KEY))
    todos = saved_todos_array.filter(todo => todo.name != delete_todo)
    localStorage.setItem(APP_KEY, JSON.stringify(todos))
}

function getTodos() {
    const saved_todos = localStorage.getItem(APP_KEY)
    return JSON.parse(saved_todos)
}

function loadTodos() {
    todos.forEach(todo => {
        addLoadedTodos(todo.name)
        const list_items = document.querySelectorAll("li")
        todos.forEach(todo => {
            if (todo.completed == true) {
                list_items.forEach(li => {
                    if (li.innerText == todo.name) {
                        li.classList.add("canceled-item")
                    }
                })
            }
        })
    })
}


loadTodos()
