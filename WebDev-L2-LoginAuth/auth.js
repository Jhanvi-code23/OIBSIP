// Fetch all registered users
function getUsers() {
    return JSON.parse(localStorage.getItem("users")) || []; // Return an empty array if no users are found
}

// Save updated users array
function saveUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
}

// Save current logged-in user
function createSession(user) {
    localStorage.setItem(
        "currentSession",
        JSON.stringify({
            username: user.username,
            email: user.email,
            loginTime: new Date().toLocaleString()
        })
    );
}

// Check if someone is logged in
function isLoggedIn() {
    return JSON.parse(localStorage.getItem("currentSession"));
}

// Logout current user
function logoutUser() {
    localStorage.removeItem("currentSession");
}