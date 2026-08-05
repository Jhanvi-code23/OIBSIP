// Select all eye icons
const toggles = document.querySelectorAll(".togglePassword");

// Add click event to each eye icon
toggles.forEach(toggle => {

    toggle.addEventListener("click", () => {

        // Find the input inside the same password box
        const input = toggle.previousElementSibling;

        if (input.type === "password") {

            input.type = "text";

            toggle.classList.remove("fa-eye");
            toggle.classList.add("fa-eye-slash");

        }

        else{

            input.type = "password";

            toggle.classList.remove("fa-eye-slash");
            toggle.classList.add("fa-eye");

        }

    });

});