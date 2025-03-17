// Get DOM HTML Elements
const todoForm = document.getElementById('todoForm'); // Assuming you have a form with this ID
const todoInput = document.getElementById('todoInput'); // Assuming you have an input field with this ID
const todoList = document.getElementById('todoList'); // Assuming you have a UL or DIV to display todos with this ID

// Fetch all todos when page loads
async function fetchTodos() {
    // add your code
    try {
        //Await the fetched input
        const response = await fetch('/api/todos'); // Sample API
        //The input response
        const todos = await response.json()
        //Display the todos in the console
        // Retrieve todos from localStorage or create an empty array if none exists
    
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

     //Create a update button
     const updateButton = document.createElement('button');
     updateButton.textContent = "Update" 

     // Add click event listener to the update button
     updateButton.onclick = () => {
      // Create an input field for editing the todo
    const inputField = document.createElement('input');
   inputField.type = 'text'; // Specify input type as text
   inputField.value = todo.title; // Set the current todo title as input value


 // Create a save button for saving the updated title
 const saveButton = document.createElement('button');
 saveButton.textContent = "Save";

 // Handle saving the updated title when the save button is clicked
 saveButton.onclick = async () => {
     const updatedTitle = inputField.value.trim(); // Get the trimmed value from the input
     if (updatedTitle) { // Check if the input is not empty
         // Update the todo in your data source here (e.g., API, localStorage)
         console.log(`Updating todo with ID ${todo.id}: ${updatedTitle}`);
         
         // After updating, reflect the changes in the UI
         li.textContent = updatedTitle; // Update the displayed text with the new title
         li.appendChild(updateButton); // Re-append the update button
         li.appendChild(deleteButton); // Re-append the delete button
         inputField.remove(); // Remove the input field from the DOM
         saveButton.remove(); // Remove the save button from the DOM

         try {
          //Await the fetched input
          const response = await fetch('/api/todos'); // Sample API
          //The input response
          const todos = await response.json()
          //Display the todos in the console
          // Retrieve todos from localStorage or create an empty array if none exists
      
          displayTodos(todos);
          //Error displayed when todos are unable to be fetched
        } catch (error) {
          console.error("Error fetching todos:", error);
        }

     } else {
         alert("Please enter a valid title."); // Alert if the input is empty
     }
 };

     // Clear existing content and add input field and save button
     li.innerHTML = ''; // Clear the todo item content
     li.appendChild(inputField); // Add input field for editing
     li.appendChild(saveButton); // Add save button to confirm changes
};

      // Create a delete button
      const deleteButton = document.createElement('button'); 
      deleteButton.textContent = 'Delete'; 

      // Add click event listener to delete the todo
      deleteButton.onclick = () => {
        deleteTodo(todo.id); // You need the ID to delete correctly
    };
    li.appendChild(updateButton); 
    li.appendChild(deleteButton); // Append the delete button to the list item
    todoList.appendChild(li); // Append the list item to the todo list
    });
    }
    
   // Function to handle deleting a todo
function deleteTodo(id) {
  // For now, we will just log the ID of the todo to be deleted
  console.log(`Todo with ID ${id} is to be deleted`);
   
   fetchTodos(); // Refresh the displayed todos
}

  
    // Handle form submission
    todoForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    const newTodo = todoInput.value.trim(); // Get the value from the input field and remove any unneccessary speach using .trim

    if (newTodo) {
      // Display the todos added into the console
      console.log("New Todo:", newTodo);

      const response = await fetch("https://example.org/post", {
        method: "POST",
        body: JSON.stringify({ title: newTodo }),
        // ...
      });

      // Clear the recent input 
      todoInput.value = '';
      
      // Add the new todo to the display page
      const li = document.createElement('li');
      li.textContent = newTodo;

    // Create an update button for the new todo
    const updateButton = document.createElement('button');
    updateButton.textContent = "Update";


    
 // Add click event listener to the update button
 updateButton.onclick = () => {
  // Create an input field for editing the todo
const inputField = document.createElement('input');
inputField.type = 'text'; // Specify input type as text
inputField.value = newTodo.title; // Set the current todo title as input value


// Create a save button for saving the updated title
const saveButton = document.createElement('button');
saveButton.textContent = "Save";

// Handle saving the updated title when the save button is clicked
saveButton.onclick = async () => {
 const updatedTitle = inputField.value.trim(); // Get the trimmed value from the input
 if (updatedTitle) { // Check if the input is not empty
     // Update the todo in your data source here (e.g., API, localStorage)
     console.log(`Updating todo with ID ${newTodo.id}: ${updatedTitle}`);
     
     // After updating, reflect the changes in the UI
     li.textContent = updatedTitle; // Update the displayed text with the new title
     li.appendChild(updateButton); // Re-append the update button
     li.appendChild(deleteButton); // Re-append the delete button
     inputField.remove(); // Remove the input field from the DOM
     saveButton.remove(); // Remove the save button from the DOM
 } else {
     alert("Please enter a valid title."); // Alert if the input is empty
 }
};

 // Clear existing content and add input field and save button
 li.innerHTML = ''; // Clear the todo item content
 li.appendChild(inputField); // Add input field for editing
 li.appendChild(saveButton); // Add save button to confirm changes
};


      // Create a delete button
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';

     // Add click event listener to the button
     deleteButton.onclick = () => {
     //console.log the delete action
     console.log("Deleted:", newTodo);
     li.remove(); // Just remove the todo from the DOM for now
};
li.appendChild(updateButton); 
li.appendChild(deleteButton); // Append the delete button to the list item

      todoList.appendChild(li);
    } else {
      alert("Please enter a todo.");
    }
    });
    
    // Load todos when page loads
    fetchTodos();
    