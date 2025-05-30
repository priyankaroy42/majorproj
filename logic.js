// Select all elements with the class 'choice'
const choices = document.querySelectorAll('.choice');

if (choices.length === 0) {
  console.error("⚠️ No elements found with the class 'choice'. Check your HTML.");
}

// Loop through each choice and add a click event listener
choices.forEach(choice => {
  choice.addEventListener('click', event => {
    event.preventDefault(); // Prevent default behavior

    console.log("✅ Choice clicked! Redirecting to /public/login.html");
    window.location.href = "/login/templates/index.html";  // This now works with Flask

  });
});
