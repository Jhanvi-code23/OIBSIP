// ====================================
// Login Form
// ====================================

const loginForm = document.getElementById("loginForm");
const message = document.getElementById("message");
console.log("Entered Password:", password);



// When user clicks Login
loginForm.addEventListener("submit", async (e) => {

    // Prevent page refresh
    e.preventDefault();

    // Get entered values
    const loginInput = document.getElementById("loginInput").value.trim();
    const password = document.getElementById("password").value;

    // ====================================
    // 1. Empty Validation
    // ====================================

    if (!loginInput || !password) {

        message.textContent = "Please fill all fields.";
        return;

    }

    // ====================================
    // 2. Fetch Registered Users
    // ====================================

    const users = getUsers();

    // Find user using username OR email
    const user = users.find(user =>
        user.username === loginInput ||
        user.email === loginInput.toLowerCase()
    );

    // ====================================
    // 3. If user doesn't exist
    // ====================================

    if (!user) {

        message.textContent =
            "Invalid username/email or password.";

        return;

    }

    // ====================================
    // 4. Hash Entered Password
    // ====================================

    const hashedPassword = await hashPassword(password);

    console.log("Entered Hash:", hashedPassword);
console.log("Stored Hash:", user.password);
console.log(hashedPassword === user.password);


    // ====================================
    // 5. Compare Password Hashes
    // ====================================

    if (hashedPassword !== user.password) {

        message.textContent =
            "Invalid username/email or password.";

        return;

    }

    // ====================================
    // 6. Update Last Login
    // ====================================

    user.lastLogin = new Date().toLocaleString();

    saveUsers(users);

    // ====================================
    // 7. Create Session
    // ====================================

    createSession(user);

    // ====================================
    // 8. Redirect to Dashboard
    // ====================================

    window.location.href = "index.html";

});

