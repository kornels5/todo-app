//Fetch existing todos from localStorage
const getSavedTodos = function() {

    const todoJSON = localStorage.getItem('todos')

    if (todoJSON !== null) {
        return JSON.parse(todoJSON)
    } else {
        return []
    }
}

//save todos to localStorage

const saveTodos = function(todos) {
    localStorage.setItem('todos', JSON.stringify(todos))
}

//toggle completed value for a given todo

const toggleTodo = function(id) {
    const todo = todos.find(function(todo){
        return todo.id === id
    })

    if(todo !== undefined) {
        todo.completed = !todo.completed
    }
}

//remove a todo by id
const removeTodo = function(id) {
    const todoIndex = todos.findIndex(function(todo){
        return todo.id === id
    })
    
    if (todoIndex > -1) {
        todos.splice(todoIndex, 1)
    }
    
}

//render application todos based on filters

const renderTodos = function (todos, filters) {
    const filteredTodos = todos.filter(function (todo) {
        const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
        const hideCompletedMatch = !filters.hideCompleted || !todo.completed

        return searchTextMatch && hideCompletedMatch
    })

    const incompleteTodos = filteredTodos.filter(function (todo) {
        return !todo.completed
    })
    document.querySelector('#todos').innerHTML = ''
    document.querySelector('#todos').appendChild(generateSummaryDOM(incompleteTodos))

    filteredTodos.forEach(function (todo) {
        document.querySelector('#todos').appendChild(generateTodoDOM(todo))
    })
}

//get the DOM elements for an individual note
const generateTodoDOM = function(todo) {
    
    const todoEl = document.createElement('div')
    const checkbox = document.createElement('input')
    const todoText = document.createElement('span')
    const removeButton = document.createElement('button')

    //setup todo checkbox
    checkbox.setAttribute('type', 'checkbox')
    checkbox.checked = todo.completed
    todoEl.appendChild(checkbox)
    checkbox.addEventListener('change', function() {
        toggleTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })

    //setup the todo text
    todoEl.appendChild(todoText)
    todoText.textContent = todo.text

    //setup the remove removeButton
    todoEl.appendChild(removeButton)
    removeButton.textContent = 'x'
    removeButton.addEventListener('click', function() {
        removeTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })

    return todoEl
}

//get the DOM elements for list summary
const generateSummaryDOM = function(incompleteTodos) {
    const summary = document.createElement('h2')
    summary.textContent = `You have ${incompleteTodos.length} todos left`
    return summary
}

