// Wait for the page to load
document.addEventListener("DOMContentLoaded", function () {
  const button = document.getElementById("myButton");
  const text = document.getElementById("demo");

  button.addEventListener("click", function () {
    text.textContent = "You clicked the button! 🎉";
    text.style.color = "#e74c3c";
    text.style.fontWeight = "bold";
  });


  const likeButtons = document.querySelectorAll(".like-btn");
  const likes = {}; 

  likeButtons.forEach(function (button) {
    const imageId = button.getAttribute("data-image");
    likes[imageId] = 0; 

    button.addEventListener("click", function () {
      const heart = button.querySelector(".heart");
      const likeCount = button.querySelector(".like-count");
      
      if (button.classList.contains("liked")) {
        
        button.classList.remove("liked");
        heart.textContent = "♡";
        likes[imageId]--;
      } else {
        // Like the photo
        button.classList.add("liked");
        heart.textContent = "♥";
        likes[imageId]++;
        
        // Add a little animation
        heart.style.transform = "scale(1.3)";
        setTimeout(() => {
          heart.style.transform = "scale(1.2)";
        }, 150);
      }
      
      likeCount.textContent = likes[imageId];
    });
  });

  // Feedback form functionality
  const feedbackForm = document.getElementById("feedbackForm");
  const successMessage = document.getElementById("feedback-success");

  feedbackForm.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent form from actually submitting

    // Get form data
    const formData = new FormData(feedbackForm);
    const name = formData.get("name");
    const email = formData.get("email");
    const rating = formData.get("rating");
    const message = formData.get("message");

    // Simple validation (HTML5 validation will handle most of it)
    if (name && email && rating && message) {
      // Simulate form submission with a delay
      const submitBtn = feedbackForm.querySelector(".submit-btn");
      const originalText = submitBtn.textContent;
      
      submitBtn.textContent = "Sending...";
      submitBtn.disabled = true;

      setTimeout(() => {
        // Hide the form and show success message
        feedbackForm.style.display = "none";
        successMessage.style.display = "block";
        
        // Log the feedback data (in a real app, this would be sent to a server)
        console.log("Feedback received:", {
          name: name,
          email: email,
          rating: rating,
          message: message,
          timestamp: new Date().toISOString()
        });
        
        // Reset form after a delay (for demonstration)
        setTimeout(() => {
          feedbackForm.reset();
          feedbackForm.style.display = "flex";
          successMessage.style.display = "none";
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        }, 5000); // Reset after 5 seconds
      }, 1500); // Simulate network delay
    }
  });
});
