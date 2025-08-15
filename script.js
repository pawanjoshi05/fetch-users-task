const userContainer = document.querySelector("#user-container");
const reloadBtn = document.querySelector("#reload-btn");

// Fetch users from API
async function fetchUsers() {
  userContainer.innerHTML = "<p>Loading ....</p>";

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const users = await response.json(); // Parse JSON
    displayUsers(users); // Display data
  } catch (error) {
    userContainer.innerHTML = `<p style="color:red;">Error: ${error.message}</p>`;
  }
}

// Dynamically creating user cards
function displayUsers(users) {
  userContainer.innerHTML = ""; // Clear previous content
  users.forEach((user) => {
    const userCard = document.createElement("div"); // Create div
    userCard.classList.add("user-card"); // Add class
    userCard.innerHTML = `
      <h2>${user.name}</h2>
      <p><strong>Email</strong>: ${user.email}</p>
      <p><strong>Address</strong>: ${user.address.street}, ${user.address.city}</p>
    `;
    userContainer.appendChild(userCard);
  });
}

// Reload button event
reloadBtn.addEventListener("click", fetchUsers);

// Initial fetch
fetchUsers();
