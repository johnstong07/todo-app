// Get DOM HTML Elements
const todoForm = document.getElementById('todoForm'); // Assuming you have a form with this ID
const todoInput = document.getElementById('todoInput'); // Assuming you have an input field with this ID
const todoList = document.getElementById('todoList'); // Assuming you have a UL or DIV to display todos with this ID

// Fetch all todos when page loads
async function fetchTodos() {
    // add your code
    try {
        //Await the fetched input
        const response = await fetch(''); // Sample API
        //The input response
        const todos = await response.json();
        //Display the todos in the console
        displayTodos(todos);
        //Error displayed when todos are unable to be fetched
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    }
    
    // Display todos in the list
    function displayTodos(todos) {
    // add your code
    todoList.innerHTML = ''; // Clear previous todos
    todos.forEach(todo => {
      const li = document.createElement('li'); // Create a new list item
      li.textContent = todo.title; // Set the text content to the todo title
      todoList.appendChild(li); // Append the list item to the todo list
    });
    }
    
    // Handle form submission
    todoForm.addEventListener('submit', async (e) => {
    // add your code  
    e.preventDefault(); // Prevent the default form submission behavior
    const newTodo = todoInput.value.trim(); // Get the value from the input field
  
    if (newTodo) {
      // Here you would usually send the newTodo to your backend
      // For the sake of this example, we'll just log it
      console.log("New Todo:", newTodo);
      
      // Optionally, clear the input
      todoInput.value = '';
      
      // Add the new todo to the display (this part could be handled with a real backend saving)
      const li = document.createElement('li');
      li.textContent = newTodo;
      todoList.appendChild(li);
    } else {
      alert("Please enter a todo.");
    }
    });
    
    // Load todos when page loads
    fetchTodos();
    