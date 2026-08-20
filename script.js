// ==============================
// Todo Variables
// ==============================

const todoInput = document.getElementById("todoInput");
const addTodoBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");
const taskCount = document.getElementById("taskCount");

let todos = [
    {
        id: 1,
        title: "Edit Video",
        completed: false
    },
    {
        id: 2,
        title: "Buy Eggs & Milk",
        completed: true
    },
    {
        id: 3,
        title: "Organize Files",
        completed: false
    },
    {
        id: 4,
        title: "Write Blog Post",
        completed: false
    }
];


// ==============================
// Add Todo
// ==============================

addTodoBtn.addEventListener("click", addTodo);

function addTodo() {

    const title = todoInput.value.trim();

    if (title === "") {
        alert("لطفاً یک کار وارد کنید.");
        return;
    }

    const newTodo = {
        id: Date.now(),
        title: title,
        completed: false
    };

    todos.push(newTodo);

    todoInput.value = "";

    renderTodos();
}


// ==============================
// Render Todos
// ==============================

function renderTodos() {

    todoList.innerHTML = "";

    todos.forEach(function(todo) {

        const todoItem = document.createElement("div");

        todoItem.className =
            "flex items-center gap-3 bg-white rounded-md p-3 shadow-sm";


        todoItem.innerHTML = `

            
            <input
                type="checkbox"
                ${todo.completed ? "checked" : ""}
                onchange="toggleTodo(${todo.id})"
                class="w-5 h-5 accent-blue-500 cursor-pointer"
            >

            <span
                class="flex-1 text-sm ${
                    todo.completed
                        ? "text-gray-400 line-through"
                        : "text-gray-700"
                }"
            >
                ${todo.title}
            </span>

            <button
                onclick="editTodo(${todo.id})"
                class="bg-blue-500 hover:bg-blue-600 text-white w-9 h-9 rounded-md flex items-center justify-center"
            >
                ✎
            </button>

            <button
                onclick="deleteTodo(${todo.id})"
                class="bg-red-500 hover:bg-red-600 text-white w-9 h-9 rounded-md flex items-center justify-center"
            >
                🗑
            </button>`

        
;

        todoList.appendChild(todoItem);
    });


    // Update task count

    taskCount.textContent = todos.length;
}


// ==============================
// Delete Todo
// ==============================

function deleteTodo(id) {

    todos = todos.filter(function(todo) {
        return todo.id !== id;
    });

    renderTodos();
}


// ==============================
// Edit Todo
// ==============================

function editTodo(id) {

    const todo = todos.find(function(todo) {
        return todo.id === id;
    });

    const newTitle = prompt(
        "عنوان جدید را وارد کنید:",
        todo.title
    );

    if (newTitle === null) {
        return;
    }

    if (newTitle.trim() === "") {
        alert("عنوان نمی‌تواند خالی باشد.");
        return;
    }

    todo.title = newTitle.trim();

    renderTodos();
}


// ==============================
// Toggle Todo
// ==============================

function toggleTodo(id) {

    const todo = todos.find(function(todo) {
        return todo.id === id;
    });

    todo.completed = !todo.completed;

    renderTodos();
}


// ==============================
// Get Data From API
// ==============================

const apiData = document.getElementById("apiData");

const apiUrl =
    "https://jsonplaceholder.typicode.com/todos";


async function getTodosFromAPI() {

    try {

        const response = await fetch(apiUrl);


        if (!response.ok) {
            throw new Error("خطا در دریافت اطلاعات");
        }


        const data = await response.json();


        displayApiData(data);

    } catch (error) {
		apiData.innerHTML = `

            <p class="text-red-500 text-center">
                دریافت اطلاعات با خطا مواجه شد.
            </p>`
        
;

        console.error(error);
    }
}


// ==============================
// Display API Data
// ==============================

function displayApiData(data) {

    apiData.innerHTML = "";


    // فقط 10 مورد اول را نمایش می‌دهیم

    const todosFromServer = data.slice(0, 10);


    todosFromServer.forEach(function(todo) {

        const item = document.createElement("div");


        item.className =
            "border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition";


        item.innerHTML = `


            <div class="flex items-center justify-between gap-4">

                <div>

                    <p class="font-semibold text-gray-800">
                        ${todo.title}
                    </p>

                    <p class="text-sm text-gray-500 mt-1">
                        شناسه: ${todo.id}
                    </p>

                </div>


                <span
                    class="${
                        todo.completed
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                    } px-3 py-1 rounded-full text-sm"
                >

                    ${
                        todo.completed
                            ? "انجام شده"
                            : "انجام نشده"
                    }

                </span>

            </div>`

        
;


        apiData.appendChild(item);
    });
}


// ==============================
// Start API Request
// ==============================

renderTodos();

getTodosFromAPI();