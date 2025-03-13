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
        const todos = await response.json()
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

      // Create a delete button
      const deleteButton = document.createElement('button'); 
      deleteButton.textContent = 'Delete'; 

      // Add click event listener to delete the todo
      deleteButton.onclick = () => {
        deleteTodo(todo.id); // You need the ID to delete correctly
    };
    li.appendChild(deleteButton); // Append the delete button to the list item

      todoList.appendChild(li); // Append the list item to the todo list
    });
    }
    
   // Function to handle deleting a todo
function deleteTodo(id) {
  // For now, we will just log the ID of the todo to be deleted
  console.log(`Todo with ID ${id} is to be deleted`);
}

  
    // Handle form submission
    todoForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    const newTodo = todoInput.value.trim(); // Get the value from the input field and remove any unneccessary speach using .trim
    const todoId = todoInput.dataset.todoId; // Get the stored todo ID if it exists


    if (newTodo) {
      // Display the todos added into the console
      console.log("New Todo:", newTodo);


      // Clear the recent input 
      todoInput.value = '';
      
      // Add the new todo to the display page
      const li = document.createElement('li');
      li.textContent = newTodo;

      // Create a delete button
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';

     // Add click event listener to the button
     deleteButton.onclick = () => {
     //console.log the delete action
     console.log("Deleted:", newTodo);
     li.remove(); // Just remove the todo from the DOM for now
};

li.appendChild(deleteButton); // Append the delete button to the list item

      todoList.appendChild(li);
    } else {
      alert("Please enter a todo.");
    }
    });
    
    // Load todos when page loads
    fetchTodos();
    