const registerForm = document.getElementById("registerForm");
const message = document.getElementById("message");

// When user clicks Register
registerForm.addEventListener("submit", async (e) => {

    // avoid page refresh
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    
    // empty field check
    if (!username || !email || !password || !confirmPassword) {
        message.textContent = "Please fill all fields.";
        return;
    }

    //password check- minimum 8 characters and at least 1 number
    const passwordPattern = /^(?=.*\d).{8,}$/; 
    // ^ start check of string, ?= checks if the condition exists, . any character, * zero or more times, \d checks for a digit,
    // {.8,} . means split the string into characters and check if it has 8 or more characters, $ end of string check
    // start checking -> at least one number somewhere -> min 8 char -> end of checking


    if (!passwordPattern.test(password)) {
        message.textContent =
            "Password must contain at least 8 characters and 1 number.";
        return;
    }

    
    // Confirm Password Check
    if (password !== confirmPassword) {
        message.textContent = "Passwords do not match.";
        return;

    }

    
    // existing user check
    const users = getUsers();


    // Check duplicate username OR email
    const userExists = users.find(user =>
        user.username === username ||
        user.email === email
    );

    if (userExists) {
        message.textContent =
            "Username or Email already exists.";
        return;

    }

    // hash password 
    const hashedPassword =
        await hashPassword(password);
    const newUser = {
        username,
        email,
        password: hashedPassword,
        tasks: [] //every user gets only their tasks, so we create an empty array for tasks when a new user is registered
    };

    //add user
    users.push(newUser);

    saveUsers(users);

    //successful
    message.style.color = "#66ff99";

    message.textContent =
        "Registration Successful! Redirecting...";

    // move to login
    setTimeout(() => {
        window.location.href = "login.html";
    }, 1500);

});
