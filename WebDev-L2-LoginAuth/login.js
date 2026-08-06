const loginForm = document.getElementById("loginForm");
const message = document.getElementById("message");
console.log("Entered Password:", password);


//login clicked
loginForm.addEventListener("submit", async (e) => {

    //avoid refreshing page
    e.preventDefault();

    const loginInput = document.getElementById("loginInput").value.trim();
    const password = document.getElementById("password").value;

    // check empty fields
    if (!loginInput || !password) {
        message.textContent = "Please fill all fields.";
        return;
    }


    const users = getUsers();

    // finding username existence
    const user = users.find(user =>
        user.username === loginInput ||
        user.email === loginInput.toLowerCase()
    );

    if (!user) {
        message.textContent =
            "Invalid username/email or password.";
        return;
    }

    
    //hash password
    const hashedPassword = await hashPassword(password);

    console.log("Entered Hash:", hashedPassword);
    console.log("Stored Hash:", user.password);
    console.log(hashedPassword === user.password);


    // check password correct or not
    if (hashedPassword !== user.password) {
        message.textContent =
            "Invalid username/email or password.";
        return;
    }

    

    user.lastLogin = new Date().toLocaleString();

    saveUsers(users);

    // create a session
    createSession(user);

    // move to dashboard
    window.location.href = "index.html";

});

